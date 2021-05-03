import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Particles
 */
// Geometry
// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
const count = 3000

const positions = new Float32Array(count * 3) // xyz, xyz, xyz ...
const colors = new Float32Array(count * 3) // rgba(n, n, n, n)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
    // console.log(colors[i])
}
particlesGeometry.setAttribute(
    'position', new THREE.BufferAttribute(positions, 3)
)
particlesGeometry.setAttribute(
    'color', new THREE.BufferAttribute(colors, 3)
)

// console.log(particlesGeometry.attributes.position.array) // 접근은 할 수 있지만 수정하면 안돼요!

// Material
// const particleMaterial = new THREE.PointsMaterial({ size: 0.02, sizeAttenuation: true })
const particleMaterial = new THREE.PointsMaterial()
particleMaterial.size = 0.2
particleMaterial.sizeAttenuation = true // false
particleMaterial.color = new THREE.Color('#ff88cc')
particleMaterial.alphaMap = particleTexture
particleMaterial.transparent = true
// particleMaterial.alphaTest = 0.001
// particleMaterial.depthTest = false // 이 프로퍼티에는 버그가 있습니다.
particleMaterial.depthWrite = false
particleMaterial.blending = THREE.AdditiveBlending // 빛을 쐬는 것 같은 블랜딩 모드 (퍼포먼스에 영향을 줄 수 있습니다.)
particleMaterial.vertexColors = true


// Points
const particles = new THREE.Points(particlesGeometry, particleMaterial)
scene.add(particles)

// depthTest 프로퍼티 버그를 테스트 / depthWrite 를 사용해보기 위한 Cube
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial()
)
// scene.add(cube)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles
    // particles.rotation.y = elapsedTime * 0.3
    for (let i = 0; i < count; i++) {
        const i3 = i * 3// 3 * 3
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true
    // GPU 나 퍼포먼스가 좋지 않은 예제입니다.

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()