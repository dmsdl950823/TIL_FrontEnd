# Animation

``` js
  import './style.css'
  import * as THREE from 'three'
  import gsap from 'gsap'


  // Canvas
  const canvas = document.querySelector('canvas.webgl')

  // Scene
  const scene = new THREE.Scene()

  // Object
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Sizes
  const sizes = {
      width: 800,
      height: 600
  }

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 3
  scene.add(camera)

  // Renderer
  const renderer = new THREE.WebGLRenderer({
      canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)

  /* Time */
  // let time = Date.now()

  /**
   * Clock
   * Three 내부 Class - 시작 0 부터 1s씩 count
   */
  const clock = new THREE.Clock()

  /* library 사용 */
  // gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
  // gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

  /**
   * Animations
   * @function requestAnimationFrame
   * 다음 frame에서 제공한 function을 호출하는 목적으로 사용 (딱 한번만 실행됨)
   * animation을 위한 목적으로 사용되지 않음. animation을 만들려면 호출하고, 호출하고, 호출하고... 해야함
   */
  const tick = () => {
      /* Time - second 제어 */
      // const currentTime = Date.now()
      // const deltaTime = currentTime - time
      // time = currentTime

      /* Clock */
      const elapsedTime = clock.getElapsedTime()
      // console.log(elapsedTime)


      /* Update objects */
      // mesh.rotation.y += 0.001 * deltaTime

      // mesh.rotation.y = elapsedTime * Math.PI * 2

      mesh.position.y = Math.sin(elapsedTime)
      mesh.position.x = Math.cos(elapsedTime)

      // camera.position.y = Math.sin(elapsedTime)
      // camera.position.x = Math.cos(elapsedTime)
      // camera.lookAt(mesh.position)

      // Render
      renderer.render(scene, camera)

      window.requestAnimationFrame(tick)
  }

  tick() // 한번은 호출해야함

```
