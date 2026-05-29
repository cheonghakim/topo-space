import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DRenderer }  from 'three/addons/renderers/CSS2DRenderer.js'

export class SceneManager {
  scene!:         THREE.Scene
  camera!:        THREE.PerspectiveCamera
  renderer!:      THREE.WebGLRenderer
  css2dRenderer!: CSS2DRenderer
  controls!:      OrbitControls
  private _animId = 0
  private _wrapper!: HTMLElement

  init(canvas: HTMLCanvasElement, overlayEl: HTMLElement, wrapper: HTMLElement) {
    this._wrapper = wrapper

    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true,
      logarithmicDepthBuffer: true,   // z-fighting 완화
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true

    this.css2dRenderer = new CSS2DRenderer()
    this.css2dRenderer.domElement.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;'
    overlayEl.appendChild(this.css2dRenderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x080c18)
    this.scene.fog = new THREE.FogExp2(0x080c18, 0.005)

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.5, 1000)
    this.camera.position.set(0, 60, 80)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping  = true
    this.controls.dampingFactor  = 0.06
    this.controls.maxPolarAngle  = Math.PI / 2.05
    this.controls.minDistance    = 3
    this.controls.maxDistance    = 220

    this._setupLights()
    this._setupGrid()
    this.resize()
    window.addEventListener('resize', () => this.resize())
  }

  private _setupLights() {
    this.scene.add(new THREE.AmbientLight(0x2a3a5c, 3.0))
    const sun = new THREE.DirectionalLight(0xffffff, 2.0)
    sun.position.set(20, 60, 30)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.camera.left = -120; sun.shadow.camera.right  = 120
    sun.shadow.camera.top  =  120; sun.shadow.camera.bottom = -120
    this.scene.add(sun)
    const fill = new THREE.DirectionalLight(0x4466aa, 0.7)
    fill.position.set(-20, 20, -30)
    this.scene.add(fill)
  }

  private _setupGrid() {
    // 바닥과 그리드 간격을 충분히 벌려 z-fighting 방지
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 300),
      new THREE.MeshStandardMaterial({ color: 0x0b1020, roughness: 1 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.5
    floor.receiveShadow = true
    this.scene.add(floor)

    const grid = new THREE.GridHelper(300, 60, 0x1a2a4a, 0x1a2a4a)
    grid.position.y = -0.2
    this.scene.add(grid)
  }

  resize() {
    const w = this._wrapper?.clientWidth  || window.innerWidth
    const h = this._wrapper?.clientHeight || window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.css2dRenderer.setSize(w, h)
  }

  startLoop(onFrame: (delta: number, elapsed: number) => void) {
    const clock = new THREE.Clock()
    const loop = () => {
      this._animId = requestAnimationFrame(loop)
      const delta   = clock.getDelta()
      const elapsed = clock.getElapsedTime()
      this.controls.update()
      onFrame(delta, elapsed)
      this.renderer.render(this.scene, this.camera)
      this.css2dRenderer.render(this.scene, this.camera)
    }
    loop()
  }

  dispose() {
    cancelAnimationFrame(this._animId)
    this.renderer.dispose()
    this.css2dRenderer.domElement.remove()
  }
}
