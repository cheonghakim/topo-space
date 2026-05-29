import * as THREE from 'three'
import { watch, nextTick } from 'vue'
import { SceneManager }         from '@/renderers/SceneManager'
import { DeviceRenderer }       from '@/renderers/DeviceRenderer'
import { SpaceRenderer }        from '@/renderers/SpaceRenderer'
import { LinkRenderer }         from '@/renderers/LinkRenderer'
import { ParticleRenderer }     from '@/renderers/ParticleRenderer'
import { BlastRadiusRenderer }  from '@/renderers/BlastRadiusRenderer'
import { VirtualNodeRenderer }  from '@/renderers/VirtualNodeRenderer'
import { FlashEffectRenderer }  from '@/renderers/FlashEffectRenderer'
import { RaycastManager }       from '@/interaction/RaycastManager'
import { LinkDragManager }      from '@/interaction/LinkDragManager'
import { DragMoveManager }      from '@/interaction/DragMoveManager'
import { CameraController }     from '@/interaction/CameraController'
import { ArrowGizmo }            from '@/interaction/ArrowGizmo'
import type { GizmoAxis }        from '@/interaction/ArrowGizmo'
import { PermissionGuard }      from '@/core/PermissionGuard'
import { ChangeManager }        from '@/core/ChangeManager'
import { TimelineManager }      from '@/core/TimelineManager'
import { useEditorStore }       from '@/stores/editor'
import { useUIStore }           from '@/stores/ui'
import type { EdgeType, SavedView } from '@/types'
import type { BlastInfo }       from '@/renderers/BlastRadiusRenderer'

const scene   = new SceneManager()
const perm    = new PermissionGuard({ topologyEdit: true, layoutEdit: true, spaceEdit: true, annotationEdit: true })
const changes = new ChangeManager({})
export const timeline = new TimelineManager()

let device:   DeviceRenderer
let space:    SpaceRenderer
let link:     LinkRenderer
let particle: ParticleRenderer
let blast:    BlastRadiusRenderer
let vnode:    VirtualNodeRenderer
let flash:    FlashEffectRenderer
let raycast:  RaycastManager
let linkDrag: LinkDragManager
let dragMove: DragMoveManager
let gizmo:    ArrowGizmo
let camera:   CameraController
let _canvas:  HTMLCanvasElement | null = null
let _mounted  = false
let _startPointer = { x: 0, y: 0 }
let _isDragCandidate = false

let _gizmoAxis:        GizmoAxis | null = null
let _gizmoStartDrag:   THREE.Vector3 | null = null
let _gizmoStartPos:    THREE.Vector3 | null = null
let _spaceChildren:    { id: string; offset: THREE.Vector3 }[] = []
const _prevStatus = new Map<string, string>()

export function useNmsEditor() {
  const editor = useEditorStore()
  const ui     = useUIStore()

  function init(canvas: HTMLCanvasElement, overlay: HTMLElement, wrapper: HTMLElement) {
    if (_mounted) return
    _canvas  = canvas
    _mounted = true

    scene.init(canvas, overlay, wrapper)
    device   = new DeviceRenderer(scene.scene)
    space    = new SpaceRenderer(scene.scene)
    link     = new LinkRenderer(scene.scene)
    particle = new ParticleRenderer(scene.scene)
    blast    = new BlastRadiusRenderer(scene.scene)
    vnode    = new VirtualNodeRenderer(scene.scene)
    flash    = new FlashEffectRenderer(scene.scene)
    camera   = new CameraController(scene.camera, scene.controls)

    dragMove = new DragMoveManager()
    raycast  = new RaycastManager(scene.camera, device, space, link)
    linkDrag = new LinkDragManager(scene.camera, link, device,
      (srcId, tgtId, mx, my) => ui.showContextMenu(mx, my, srcId, tgtId))

    gizmo = new ArrowGizmo(scene.scene)

    editor.loadMockData()
    nextTick(() => _buildScene())

    _bindEvents(canvas)
    _bindWatchers()
    _startLoop()
  }

  function _buildScene() {
    space.loadSpaces([...editor.spaces.values()])
    device.loadInstanced([...editor.devices.values()], editor.mappings, id => editor.getMappingByDeviceId(id))
    link.loadLinks([...editor.links.values()], id => device.getDeviceWorldPos(id))
    _syncParticles()
    vnode.loadNodes([...editor.virtualNodes.values()])
  }

  function _syncParticles() {
    particle.syncLinks(
      [...editor.links.values()],
      id => link.getLinkPath(id),
      id => editor.devices.get(id)?.metrics?.networkOut ?? 100,
    )
  }

  function _bindEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener('pointerdown',  onPointerDown)
    canvas.addEventListener('pointermove',  onPointerMove)
    canvas.addEventListener('pointerup',    onPointerUp)
    canvas.addEventListener('contextmenu',  (e) => e.preventDefault())
    window.addEventListener('keydown',      onKeyDown)
  }

  function _bindWatchers() {
    editor.devices.forEach(d => _prevStatus.set(d.id, d.status ?? 'unknown'))
    watch(
      () => { let s = ''; editor.devices.forEach(d => { s += `${d.id}:${d.status};` }); return s },
      () => {
        editor.devices.forEach(d => {
          const cur = d.status ?? 'unknown'
          const prev = _prevStatus.get(d.id)
          device.updateStatus(d.id, cur)

          if (prev !== undefined && prev !== cur) {
            const pos = device.getDeviceWorldPos(d.id)
            if (pos) {
              if (cur === 'critical' || cur === 'offline') {
                flash.flash(pos, 'critical')
              } else if (cur === 'warning') {
                flash.flash(pos, 'warning')
              } else if (cur === 'normal' && (prev === 'critical' || prev === 'warning' || prev === 'offline')) {
                flash.flash(pos, 'recover')
              }
            }
          }
          _prevStatus.set(d.id, cur)
        })
      },
    )

    watch(() => editor.links.size, () => rebuildLinks())

    watch(() => [...ui.visibleLinkTypes], (types) => {
      const all: EdgeType[] = ['physical','logical','service_dependency','traffic_flow','security_path','manual','inferred']
      all.forEach(t => link.setVisible(t, types.includes(t)))
    })

    watch(() => ui.hoveredId, (newId, oldId) => {
      if (oldId) { device.setHighlight(oldId, false); link.setHighlight(null, oldId) }
      if (newId) {
        if (ui.selection?.type === 'link') link.setHighlight(newId, null)
        else device.setHighlight(newId, true)
      }
    })

    watch(() => ui.selection, (sel, prev) => {
      if (prev?.type === 'space') space.setSelected(prev.id, false)
      if (prev?.type === 'link')  link.setSelected(null)

      if (sel && (sel.type === 'device' || sel.type === 'space')) {
        attachGizmoToSelection(sel)
      } else {
        gizmo?.detach()
      }

      if (!sel) {
        blast.clear(); ui.blastSourceId = null
        ui.showRackServerList = false
        return
      }

      if (sel.type === 'device') {
        const dev = editor.devices.get(sel.id)
        if (dev && (dev.status === 'critical' || dev.status === 'warning') && ui.showBlastRadius) {
          showBlastRadius(sel.id)
        } else blast.clear()

        const m = editor.getMappingByDeviceId(sel.id)
        if (m?.primarySpaceId) {
          ui.selectedRackForList = m.primarySpaceId
          ui.showRackServerList  = true
        }
      } else if (sel.type === 'space') {
        space.setSelected(sel.id, true)
        const sp = editor.spaces.get(sel.id)
        if (sp?.type === 'rack') {
          ui.selectedRackForList = sel.id
          ui.showRackServerList  = true
        } else {
          ui.showRackServerList  = false
        }
      } else if (sel.type === 'link') {
        link.setSelected(sel.id)
      }
    })


    watch(() => ui.linkToolActive, (on) => {
      if (!on) linkDrag.cancel()
      if (_canvas) _canvas.style.cursor = on ? 'crosshair' : ''
      if (on) ui.addToast('Connect mode on — drag from one device to another', 'info')
    })

    watch(() => ui.showParticles, (v) => particle.setVisible(v))
    watch(() => ui.showBlastRadius, (v) => { if (!v) blast.clear() })

    watch(() => editor.virtualNodes.size, () => {
      vnode.dispose()
      vnode = new VirtualNodeRenderer(scene.scene)
      vnode.loadNodes([...editor.virtualNodes.values()])
    })

    watch(() => ui.timelineFrameIdx, (idx) => {
      if (idx < 0) return
      const frame = timeline.getFrame(idx)
      if (!frame) return
      Object.entries(frame.states).forEach(([id, s]) => editor.updateDeviceStatus(id, s.status, s.metrics))
    })

    watch(() => editor.spaces.size, () => editor.spaces.forEach(s => space.addSpace(s)))

    watch(
      () => `${ui.filter.search}|${ui.filter.status.join(',')}|${ui.filter.type.join(',')}`,
      () => applySearchFilter(),
    )
  }

  function _verticalPlanePoint(e: PointerEvent, anchor: THREE.Vector3): THREE.Vector3 | null {
    if (!_canvas) return null
    const rect = _canvas.getBoundingClientRect()
    const ndc  = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    )
    const ray = new THREE.Raycaster()
    ray.setFromCamera(ndc, scene.camera)
    const camDir = new THREE.Vector3()
    scene.camera.getWorldDirection(camDir)
    camDir.y = 0
    if (camDir.lengthSq() < 1e-6) camDir.set(0, 0, 1)
    camDir.normalize()
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(camDir, anchor)
    const pt = new THREE.Vector3()
    return ray.ray.intersectPlane(plane, pt) ? pt : null
  }

  function attachGizmoToSelection(sel: { type: string; id: string }) {
    if (!gizmo) return
    if (sel.type === 'device') {
      const pos = device.getDeviceWorldPos(sel.id)
      if (pos) gizmo.attach({ type: 'device', id: sel.id }, pos)
    } else if (sel.type === 'space') {
      const sp = editor.spaces.get(sel.id)
      if (sp?.position) {
        gizmo.attach({ type: 'space', id: sel.id }, new THREE.Vector3(sp.position.x, 0, sp.position.z))
      } else {
        gizmo.detach()
      }
    } else {
      gizmo.detach()
    }
  }

  function applySearchFilter() {
    const f = ui.filter
    const q = f.search.toLowerCase().trim()
    const hasFilter = !!q || f.status.length > 0 || f.type.length > 0
    if (!hasFilter) {
      device.applySearchFilter(new Set(), false)
      return
    }
    const matchingIds = new Set<string>()
    editor.devices.forEach(dev => {
      const matchSearch = !q || (dev.hostname ?? '').toLowerCase().includes(q) || (dev.ip ?? '').includes(q)
      const matchStatus = !f.status.length || f.status.includes(dev.status ?? 'unknown')
      const matchType   = !f.type.length   || f.type.includes(dev.normalizedType ?? 'unknown')
      if (matchSearch && matchStatus && matchType) matchingIds.add(dev.id)
    })
    device.applySearchFilter(matchingIds, true)
  }

  function _startLoop() {
    scene.startLoop((delta, elapsed) => {
      link.update(delta)
      blast.update(delta)
      vnode.update(elapsed)
      flash.update(delta)
      gizmo.update(scene.camera)
      if (ui.showParticles) particle.update(delta, ui.visibleLinkTypes)

      // warning/critical pulse
      editor.devices.forEach(d => {
        if (d.status === 'warning')  device.pulseStatus(d.id, 'warning',  0.4 * Math.abs(Math.sin(elapsed * 1.6)))
        if (d.status === 'critical') device.pulseStatus(d.id, 'critical', 0.7 * Math.abs(Math.sin(elapsed * 4.0)))
      })

      if (!_gizmoAxis && !linkDrag.isDrawing && !dragMove.hasPending) {
        const hit    = raycast.castHover(32)
        const newHov = hit.deviceId ?? hit.linkId ?? hit.linkHandleId ?? null
        if (newHov !== ui.hoveredId) ui.hoveredId = newHov
      }
    })
  }

  function onPointerDown(e: PointerEvent) {
    if (!_canvas) return
    _startPointer = { x: e.clientX, y: e.clientY }
    raycast.updatePointer(e, _canvas)
    _isDragCandidate = false

    if (gizmo.isVisible) {
      const axis = gizmo.pickAxis(raycast.currentPointer, scene.camera)
      if (axis) {
        _gizmoAxis     = axis
        _gizmoStartPos = gizmo.position
        _gizmoStartDrag = (axis === 'y')
          ? _verticalPlanePoint(e, _gizmoStartPos)
          : raycast.getGroundPoint(e, _canvas)

        const t = gizmo.currentTarget
        _spaceChildren = []
        if (t?.type === 'space') {
          const spacePos = _gizmoStartPos.clone()
          ;(editor.devicesBySpace.get(t.id) ?? []).forEach(d => {
            const dp = device.getDeviceWorldPos(d.id)
            if (dp) _spaceChildren.push({ id: d.id, offset: dp.clone().sub(spacePos) })
          })
        }
        scene.controls.enabled = false
        return
      }
    }

    const hit = raycast.castClick(ui.linkToolActive)

    if (ui.linkToolActive && hit.deviceId) {
      linkDrag.onMouseDown(hit.deviceId, e)
      _isDragCandidate = true
      scene.controls.enabled = false
      return
    }

    if (hit.linkHandleId) {
      dragMove.onMouseDown(hit.linkHandleId, 'linkHandle', e)
      _isDragCandidate = true
      scene.controls.enabled = false
      return
    }

    scene.controls.enabled = true
  }

  function onPointerMove(e: PointerEvent) {
    if (!_canvas) return
    raycast.updatePointer(e, _canvas)

    if (_gizmoAxis && _gizmoStartDrag && _gizmoStartPos) {
      const cur = (_gizmoAxis === 'y')
        ? _verticalPlanePoint(e, _gizmoStartPos)
        : raycast.getGroundPoint(e, _canvas)
      if (cur) {
        const delta  = cur.clone().sub(_gizmoStartDrag)
        const newPos = _gizmoStartPos.clone()
        if (_gizmoAxis === 'x' || _gizmoAxis === 'xz') newPos.x += delta.x
        if (_gizmoAxis === 'z' || _gizmoAxis === 'xz') newPos.z += delta.z
        if (_gizmoAxis === 'y') newPos.y = Math.max(0, _gizmoStartPos.y + delta.y)
        gizmo.setPosition(newPos)

        const t = gizmo.currentTarget
        if (t?.type === 'device') {
          device.setPosition(t.id, newPos)
          link.refreshPositions(id => device.getDeviceWorldPos(id))
        } else if (t?.type === 'space') {
          space.setPosition(t.id, newPos)
          _spaceChildren.forEach(c => device.setPosition(c.id, newPos.clone().add(c.offset)))
          link.refreshPositions(id => device.getDeviceWorldPos(id))
        }
      }
      return
    }

    if (ui.linkToolActive && linkDrag.isDrawing) {
      linkDrag.onMouseMove(e, _canvas)
      return
    }

    if (dragMove.hasPending) {
      const newPos = dragMove.onMouseMove(e, _canvas, scene.camera)
      if (newPos && dragMove.isDragging) {
        const target = dragMove.currentTarget
        if (target.type === 'device') {
          device.setPosition(target.id!, newPos)
        } else if (target.type === 'space') {
          space.setPosition(target.id!, newPos)
        } else if (target.type === 'linkHandle') {
          link.updateMidpoint(target.id!, newPos.x, newPos.z)
          _syncParticles()
        }
        return
      }
    }

    if (gizmo.isVisible && gizmo.isHovering(raycast.currentPointer, scene.camera)) {
      ui.hideTooltip()
      _canvas.style.cursor = 'move'
      return
    }

    // hover tooltip
    const hit = raycast.castHover(0)
    if (hit.deviceId) {
      ui.showTooltipAt(e.clientX, e.clientY, hit.deviceId)
      _canvas.style.cursor = ui.linkToolActive ? 'crosshair' : 'pointer'
    } else if (hit.linkHandleId || hit.linkId) {
      ui.hideTooltip()
      _canvas.style.cursor = ui.mode === 'edit' ? 'move' : 'pointer'
    } else {
      ui.hideTooltip()
      _canvas.style.cursor = ui.linkToolActive ? 'crosshair' : ''
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (!_canvas) return

    scene.controls.enabled = true

    if (_gizmoAxis) {
      const t   = gizmo.currentTarget
      const pos = gizmo.position
      if (t?.type === 'device') {
        editor.mapDevice(
          t.id,
          editor.getMappingByDeviceId(t.id)?.primarySpaceId ?? '',
          0,
          { x: pos.x, y: pos.y, z: pos.z },
        )
        editor.logChange('layout.update', `Device moved: ${t.id}`)
        ui.addToast('Device moved', 'success')
      } else if (t?.type === 'space') {
        editor.updateSpace(t.id, { position: { x: pos.x, y: pos.y, z: pos.z } })
        _spaceChildren.forEach(c => {
          const np = pos.clone().add(c.offset)
          editor.mapDevice(c.id, editor.getMappingByDeviceId(c.id)?.primarySpaceId ?? t.id, 0,
            { x: np.x, y: np.y, z: np.z })
        })
        editor.logChange('space.update', `Space moved: ${t.id} (+${_spaceChildren.length} devices)`)
        ui.addToast('Space moved', 'success')
      }
      // Refresh link positions instead of full rebuild (keeps manual routing, cheaper)
      link.refreshPositions(id => device.getDeviceWorldPos(id))
      _syncParticles()
      _gizmoAxis      = null
      _gizmoStartDrag = null
      _gizmoStartPos  = null
      _spaceChildren  = []
      return
    }

    raycast.updatePointer(e, _canvas)
    const hit = raycast.castClick(ui.linkToolActive)

    if (ui.linkToolActive && linkDrag.isDrawing) {
      linkDrag.onMouseUp(hit.deviceId ?? null, e)
      _isDragCandidate = false
      return
    }

    if (dragMove.hasPending) {
      const result = dragMove.onMouseUp(e, _canvas, scene.camera)
      if (result) {
        const { targetId, targetType, newPos } = result
        if (targetType === 'device') {
          editor.mapDevice(
            targetId,
            editor.getMappingByDeviceId(targetId)?.primarySpaceId ?? '',
            0,
            { x: newPos.x, y: 0, z: newPos.z },
          )
          editor.logChange('layout.update', `Device moved: ${targetId}`)
          ui.addToast(`Device moved`, 'success')
          rebuildLinks()
        } else if (targetType === 'space') {
          editor.updateSpace(targetId, { position: { x: newPos.x, y: 0, z: newPos.z } })
          editor.logChange('space.update', `Space moved: ${targetId}`)
          ui.addToast(`Space moved`, 'success')
        } else if (targetType === 'linkHandle') {
          editor.updateLink(targetId, { midX: newPos.x, midZ: newPos.z })
          editor.logChange('topology.link.update', `Link routing changed`)
        }
        _isDragCandidate = false
        return
      }
    }

    const dx = e.clientX - _startPointer.x
    const dy = e.clientY - _startPointer.y
    if (Math.sqrt(dx * dx + dy * dy) > 8) {
      _isDragCandidate = false
      return
    }
    _isDragCandidate = false

    if (hit.deviceId) {
      ui.select({ type: 'device', id: hit.deviceId })
    } else if (hit.spaceId) {
      ui.select({ type: 'space', id: hit.spaceId })
    } else if (hit.linkId) {
      ui.select({ type: 'link', id: hit.linkId })
    } else if (!hit.linkHandleId) {
      ui.select(null)
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      ui.select(null); ui.hideContextMenu()
      linkDrag.cancel(); dragMove.cancel()
      scene.controls.enabled = true
      blast.clear(); ui.blastSourceId = null
      return
    }
    if (e.key === 'f' || e.key === 'F') { camera.flyToOverview(); return }
    if ((e.key === 'l' || e.key === 'L') && !isInputFocused()) { ui.toggleLinkTool(); return }

    if ((e.key === 'Delete' || e.key === 'Backspace') && !isInputFocused()) {
      e.preventDefault()
      const sel = ui.selection
      if (!sel) return
      if (sel.type === 'device') {
        editor.unmapDevice(sel.id)
        editor.logChange('device.unmap', `Device removed: ${sel.id}`)
        ui.addToast('Device removed', 'info')
        ui.select(null)
      } else if (sel.type === 'link') {
        editor.removeLink(sel.id)
        editor.logChange('topology.link.delete', `Link deleted: ${sel.id}`)
        ui.addToast('Link deleted', 'info')
        ui.select(null)
      } else if (sel.type === 'space') {
        editor.archiveSpace(sel.id)
        editor.logChange('space.archive', `Space archived: ${sel.id}`)
        ui.addToast('Space archived', 'info')
        ui.select(null)
      }
      return
    }

    if (e.ctrlKey && e.key === 'z') { changes.undo(); return }
    if (e.ctrlKey && e.key === 'y') { changes.redo(); return }
  }

  function isInputFocused() {
    const el = document.activeElement
    return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement
  }

  // ── Blast Radius ─────────────────────────────────────────────────────
  function showBlastRadius(deviceId: string) {
    const affected: BlastInfo[] = []
    const links = [...editor.links.values()]
    links.forEach(l => {
      const isS = l.sourceDeviceId === deviceId
      const isT = l.targetDeviceId === deviceId
      if (!isS && !isT) return
      const otherId = isS ? l.targetDeviceId : l.sourceDeviceId
      if (!affected.find(a => a.deviceId === otherId)) {
        affected.push({ deviceId: otherId, hop: 1, linkedDeviceId: deviceId })
      }
      links.forEach(l2 => {
        const is2S = l2.sourceDeviceId === otherId
        const is2T = l2.targetDeviceId === otherId
        if (!is2S && !is2T) return
        const hop2Id = is2S ? l2.targetDeviceId : l2.sourceDeviceId
        if (hop2Id !== deviceId && !affected.find(a => a.deviceId === hop2Id)) {
          affected.push({ deviceId: hop2Id, hop: 2, linkedDeviceId: otherId })
        }
      })
    })
    blast.show(affected, id => device.getDeviceWorldPos(id))
    ui.blastSourceId = deviceId
  }

  function rebuildLinks() {
    link.dispose()
    link = new LinkRenderer(scene.scene)
    link.loadLinks([...editor.links.values()], id => device.getDeviceWorldPos(id))
    const all: EdgeType[] = ['physical','logical','service_dependency','traffic_flow','security_path','manual','inferred']
    all.forEach(t => link.setVisible(t, ui.visibleLinkTypes.has(t)))
    _syncParticles()
    raycast  = new RaycastManager(scene.camera, device, space, link)
    linkDrag = new LinkDragManager(scene.camera, link, device,
      (srcId, tgtId, mx, my) => useUIStore().showContextMenu(mx, my, srcId, tgtId))
  }

  function dropDeviceAt(deviceId: string, e: DragEvent) {
    if (!_canvas) return
    const rect = _canvas.getBoundingClientRect()
    const ndc  = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    )
    const ray   = new THREE.Raycaster()
    ray.setFromCamera(ndc, scene.camera)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const pt    = new THREE.Vector3()

    const target  = scene.controls.target
    let dropPos   = pt
    if (!ray.ray.intersectPlane(plane, pt) || pt.distanceTo(target) > 60) {
      dropPos = target.clone().setY(0)
    }

    editor.mapDevice(deviceId, '', 0, { x: dropPos.x, y: 0.4, z: dropPos.z })
    editor.logChange('device.map', `Device placed: ${deviceId}`)
    ui.addToast('Device placed', 'success')
    nextTick(() => {
      const dev = editor.devices.get(deviceId)
      const m   = editor.getMappingByDeviceId(deviceId)
      if (dev && m?.position) {
        device.loadInstanced([dev], editor.mappings, id => editor.getMappingByDeviceId(id))
        ui.select({ type: 'device', id: deviceId })
      }
    })
  }

  function confirmCreateLink(srcId: string, tgtId: string, type: EdgeType) {
    const id = `link-${Date.now()}`
    editor.addLink({ id, sourceDeviceId: srcId, targetDeviceId: tgtId, type, source: 'manual', status: 'up' })
    editor.logChange('topology.link.create', `Link created: ${type}`)
    ui.addToast(`${type} link created`, 'success')
    useUIStore().hideContextMenu()
  }

  function saveCurrentView(name: string) {
    const view: SavedView = {
      id: `view-${Date.now()}`, name,
      cameraPos:    { x: scene.camera.position.x, y: scene.camera.position.y, z: scene.camera.position.z },
      cameraTarget: { x: scene.controls.target.x,  y: scene.controls.target.y,  z: scene.controls.target.z },
      createdAt:    new Date().toLocaleString(),
    }
    editor.addSavedView(view)
    ui.addToast(`View saved: ${name}`, 'success')
  }

  function loadSavedView(view: SavedView) {
    camera.flyTo(
      new THREE.Vector3(view.cameraPos.x, view.cameraPos.y, view.cameraPos.z),
      new THREE.Vector3(view.cameraTarget.x, view.cameraTarget.y, view.cameraTarget.z),
    )
  }

  function focusVirtualNode(id: string) {
    const pos = vnode.getNodeWorldPos(id)
    if (pos) camera.flyToDevice(pos)
  }

  function onTimelineScrub(frameIdx: number) {
    if (frameIdx < 0) return
    const frame = timeline.getFrame(frameIdx)
    if (!frame) return
    Object.entries(frame.states).forEach(([id, s]) => editor.updateDeviceStatus(id, s.status, s.metrics))
  }

  function refreshSpace(spaceId: string) {
    const sp = editor.spaces.get(spaceId)
    space.removeSpace(spaceId)
    if (sp && !sp.archived) {
      space.addSpace(sp)
      if (ui.selection?.type === 'space' && ui.selection.id === spaceId) {
        space.setSelected(spaceId, true)
      }
    }
  }

  function dispose() {
    _mounted = false
    _canvas?.removeEventListener('pointerdown', onPointerDown)
    _canvas?.removeEventListener('pointermove', onPointerMove)
    _canvas?.removeEventListener('pointerup',   onPointerUp)
    window.removeEventListener('keydown', onKeyDown)
    gizmo?.dispose()
    device?.dispose(); space?.dispose(); link?.dispose()
    particle?.dispose(); blast?.dispose(); vnode?.dispose(); flash?.dispose()
    scene.dispose()
  }

  return {
    init, dispose,
    dropDeviceAt, confirmCreateLink,
    saveCurrentView, loadSavedView,
    focusVirtualNode, onTimelineScrub, refreshSpace,
    getScene: () => scene,
  }
}
