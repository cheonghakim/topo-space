import { ref } from 'vue'
import type { DeviceStatus } from '@/types'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'

export function useWebSocketSim() {
  const editor    = useEditorStore()
  const ui        = useUIStore()
  const connected = ref(false)
  const eventLog  = ref<{ time: string; msg: string }[]>([])
  let   timers: ReturnType<typeof setInterval>[] = []

  function log(msg: string) {
    eventLog.value.unshift({ time: new Date().toLocaleTimeString(), msg })
    if (eventLog.value.length > 50) eventLog.value.pop()
  }

  function connect() {
    if (connected.value) return
    connected.value = true
    ui.addToast('🟢 WebSocket 연결됨 — 실시간 업데이트 시작', 'success')
    log('WebSocket 연결')

    // ── 장비 상태 변경 (3초 간격) ────────────────────────────────────────
    const STATUS_POOL: DeviceStatus[] = ['normal','normal','normal','warning','critical','offline','maintenance']
    timers.push(setInterval(() => {
      const ids = [...editor.devices.keys()]
      if (!ids.length) return
      const id  = ids[Math.floor(Math.random() * ids.length)]
      const dev = editor.devices.get(id)
      if (!dev) return
      const newStatus = STATUS_POOL[Math.floor(Math.random() * STATUS_POOL.length)]
      if (newStatus === dev.status) return
      const oldStatus = dev.status
      editor.updateDeviceStatus(id, newStatus)

      if (newStatus === 'critical') {
        ui.addToast(`🔴 ${dev.hostname} → CRITICAL`, 'critical')
        log(`🔴 CRITICAL: ${dev.hostname}`)
      } else if (newStatus === 'warning' && oldStatus !== 'critical') {
        ui.addToast(`⚠ ${dev.hostname} → WARNING`, 'warning')
      } else if (newStatus === 'offline') {
        ui.addToast(`⚫ ${dev.hostname} → OFFLINE`, 'warning')
      } else if (newStatus === 'normal' && (oldStatus === 'critical' || oldStatus === 'warning')) {
        ui.addToast(`✓ ${dev.hostname} 복구됨`, 'success')
      }
    }, 3000))

    // ── 메트릭 업데이트 (1.5초) ──────────────────────────────────────────
    timers.push(setInterval(() => {
      const ids = [...editor.devices.keys()]
      const sample = ids.slice(0, Math.min(5, ids.length))
      sample.forEach(id => {
        const dev = editor.devices.get(id)
        if (!dev?.metrics) return
        editor.updateDeviceStatus(id, dev.status ?? 'normal', {
          cpu:        Math.min(100, Math.max(0, (dev.metrics.cpu ?? 50) + (Math.random() - 0.5) * 15)),
          memory:     Math.min(100, Math.max(0, (dev.metrics.memory ?? 50) + (Math.random() - 0.5) * 8)),
          networkIn:  Math.max(0, (dev.metrics.networkIn  ?? 100) + (Math.random() - 0.5) * 200),
          networkOut: Math.max(0, (dev.metrics.networkOut ?? 50)  + (Math.random() - 0.5) * 100),
        })
      })
    }, 1500))

    // ── 링크 상태 (12초) ────────────────────────────────────────────────
    timers.push(setInterval(() => {
      const linkIds = [...editor.links.keys()]
      if (!linkIds.length) return
      const id   = linkIds[Math.floor(Math.random() * linkIds.length)]
      const link = editor.links.get(id)
      if (!link) return
      const newStatus = Math.random() > 0.15 ? 'up' : 'down'
      if (newStatus !== link.status) {
        editor.updateLink(id, { status: newStatus as 'up' | 'down' })
        if (newStatus === 'down') {
          ui.addToast(`🔴 링크 DOWN (${link.type})`, 'critical')
          log(`Link DOWN: ${link.type}`)
        } else {
          ui.addToast(`✓ 링크 UP (${link.type})`, 'success')
        }
      }
    }, 12000))

    // ── 신규 장비 발견 (25초) ────────────────────────────────────────────
    timers.push(setInterval(() => {
      if (editor.unmappedDevices.length > 8) return
      const types = ['server', 'switch', 'vm'] as const
      const t     = types[Math.floor(Math.random() * types.length)]
      const id    = `ws-dev-${Date.now()}`
      const hostname = `discovered-${t}-${id.slice(-4)}`
      editor.upsertDevices([{
        id, source: 'zabbix', externalId: id,
        hostname,
        ip: `10.99.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
        normalizedType: t,
        status: 'unknown',
        syncState: 'active',
        lastSeenAt: new Date().toISOString(),
      }])
      ui.addToast(`📡 신규 장비 발견: ${hostname}`, 'info')
      log(`📡 NEW: ${hostname}`)
    }, 25000))
  }

  function disconnect() {
    if (!connected.value) return
    connected.value = false
    timers.forEach(t => clearInterval(t))
    timers = []
    ui.addToast('⚫ WebSocket 연결 해제', 'info')
    log('WebSocket 해제')
  }

  return { connected, eventLog, connect, disconnect }
}
