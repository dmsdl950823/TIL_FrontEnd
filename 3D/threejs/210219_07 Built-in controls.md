
- [Built-in controls](#built-in-controls)
  - [Classes](#classes-1)
    - [DeviceOrientationControls](#deviceorientationcontrols)
    - [FlyControls](#flycontrols)
    - [FirstPersonControls](#firstpersoncontrols)
    - [PointerLockControls](#pointerlockcontrols)
    - [OrbitControls](#orbitcontrols)
    - [TrackballControls](#trackballcontrols)
    - [DragControls](#dragcontrols)
  - [Code - OrbitControl](#code---orbitcontrol)
    - [Code 분석](#code-분석-2)


이전 포스트 [210218_07 Camera.md](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210218_07%20Camera.md) 와 연결

# Built-in controls
[Three.js Document](https://threejs.org/docs/index.html#api/en/math/Euler) 에서 control을 검색하면, 미리 만들어진 controls들이 많은 것을 확인할 수 있습니다.

**Docs를 잘 읽어보시기 바랍니다.**

## Classes

### DeviceOrientationControls
[DeviceOrientationControls](https://threejs.org/docs/#examples/en/controls/DeviceOrientationControls) 는 자동으로 device의 위치/기울기를 찾아 그에 따라 camera를 회전합니다.
적절한 장치를 가지고 있는경우, immersive universe나 VR 도 제작할 수 있습니다.

### FlyControls
[FlyControls](https://threejs.org/docs/#examples/en/controls/FlyControls) 는 camera를 우주선에 타고있는것 같이 움직입니다. x, y, z 로 회전할 수 있습니다.

### FirstPersonControls
[FirstPersonControls]() 는 FlyControls와 같은데, 고정된 axis를 가지고있다는것만 다릅니다.

You can see that like a flying bird view where the bird cannot do a barrel roll. While the FirstPersonControls contains "FirstPerson," it doesn't work like in FPS games.

### PointerLockControls
[PointerLockControls](https://threejs.org/docs/#examples/en/controls/PointerLockControls) 는 [pointer lock Javascript API](https://developer.mozilla.org/docs/Web/API/Pointer_Lock_API)를 사용합니다.
이 API는 cursor를 숨기고, 중심에 고정시킨후, 움직임을 `mousemove` event에 전달합니다. 이 API를 이용하여, FPS game 을 browser에서 제작할 수 있습니다.

이 class가 아주 유용해 보이지만, pointer가 고정되어있을 때 camera rotation만 핸들링 합니다. camera position과 pame 물체를 여러분 스스로 핸들링해야합니다.

### OrbitControls
[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) 는 point를 마우스 좌측버튼을 이용하여 rotate 시킬 수 있고, 우측 버튼을 사용하여 이동, 휠을 사용해 zoom 이 가능합니다.

### TrackballControls
[TrackballControls](https://threejs.org/docs/#examples/en/controls/TrackballControls)는 OrbitControls과 비슷하지만 vertical angle에 제한이 없다는 것 입니다. 계속 rotate 할 수 있고, camera를 무한 회전 할 수 있습니다.

### DragControls
[DragControls]()는 camera랑 관계가 없습니다. object를 drag, drop 하여 이동할 수 있습니다.

## Code - OrbitControl

``` js
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  // Cursor Event ...
  // Canvas ...
  // Sizes ...
  // Scene ...
  // Object ...
  // Camera - PerspectiveCamera...

  camera.position.z = 3

  scene.add(camera)

  /**
  * Controls
  * @function OrbitControls
  * @param {Object} camera
  * @param {Object} canvas
  */
  const controls = new OrbitControls(camera, canvas)
  // controls.target.y = 2
  // controls.update() // render 될때 바로 카메라 위치를 설정함

  controls.enableDamping = true // smoothing

  // Renderer ...
  // Animate ...

  const tick = () => {
    /* Update controls */
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
```

### Code 분석
``` js
  const controls = new OrbitControls(camera, canvas)
  // controls.target.y = 2
  // controls.update() // render 될때 바로 카메라 위치를 설정함

  controls.enableDamping = true // smoothing
```
> `OrbitControls` 클래스를 이용하여 설정해줄 경우,
> `target` 프로퍼티를 사용하여 위치를 지정해줄 수 있습니다. 위치를 지정할 경우 `update()`를 이용하여 render를 시켜주어야 화면에 적용됩니다.
>
> `enableDamping` 프로퍼티는, 사용자가 인터랙션할 때, 부드러운 모션이 가능하도록 자동 설정해줍니다.

``` js
  const tick = () => {
    /* Update controls */
    controls.update()
    // ...
  }
```
> rendering function 내부에서, rendering을 할 때마다, 설정한 `damping`을 `update()` 되도록 설정합니다.
