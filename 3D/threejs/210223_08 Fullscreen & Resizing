- [Fullscreen & Resizing](#fullscreen--resizing)
  - [Resizing](#resizing)
  - [Handling Pixel Ratio](#handling-pixel-ratio)
    - [Pixel Ration의 특징](#pixel-ration의-특징)
    - [Handle the pixel Ratio](#handle-the-pixel-ratio)
  - [Handle Fullscreen](#handle-fullscreen)
  - [CSS Handling](#css-handling)

# Fullscreen & Resizing

## Resizing
``` js
  /** 
   * Sizes
   */
  const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
  }
```

> 초기 화면 사이즈를 입력할 때, `window.innerWidth`, `window.innerHeight` 를 이용하여 캔버스를 전체 화면 크기로 설정해줍니다.

``` js
  window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 하단 Pixel Ratio 참고
  })
```
> 1. `resize` 이벤트를 통해 화면이 resize 될 때마다 canvas의 크기를 업데이트 시켜주고,
> 2. camera의 aspect ratio를 `camera.aspect` 프로퍼티를 이용하여 설정해줍니다.
> 3. `aspect` 같은 카메라 프로퍼티를 변경할 때, projection matrix를 업데이트시켜주어야 합니다.
> `updateProjectionMatrix()` 를 이용하여 업데이트 시킵니다. Matrix에 대해서는 추후에 설명합니다.
> 4. 이벤트가 발생할때마다 rendering을 다시 해줍니다.

## Handling Pixel Ratio

<img src="https://secureservercdn.net/104.238.69.231/9vz.5e7.myftpupload.com/wp-content/uploads/2020/05/image-2.png">

### Pixel Ration의 특징
```
  - pixel ratio가 2이면 4배로 느려짐
  - pixel ratio가 3이면 9배로 느려짐
  - pixel ratio가 4이면 16배로 느려짐 ...
```
* pixel ratio가 높을수록 GPU 계산에 무리가 가고, 퍼포먼스가 안좋아집니다.
* mobile에서 보통 높은 pixel ratio 사용합니다.
* three.js 앱 제작시 높은 pixel ration는 불필요합니다.

### Handle the pixel Ratio

``` js
  // Renderer
  const renderer = new THREE.WebGLRenderer({
      canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))  // 2 이상일경우 2 반환
```

> screen pixel ratio 를 구하기 위해선, `window.devicePixelRatio`를 사용하고, renderer에서 pixel ratio를 업데이트 하기 위해서는, 간단하게 `renderer.setPixelRatio(...)` 를 호출하면 된다.
> 
> 여기서 해당 메서드에 `window.devicePixelRatio` 만 매개변수로 줄 경우, 퍼포먼스 문제 및 배터리를 빠르게 소모하는 문제 발생할 수 있으므로 주의해야한다.
> 
> 사람들은 pixel ratio의 `2`와 `3` 사이에 차이를 못 느끼므로, pixel ratio를 최댓값을 `2`로 설정 하여 작업하자. 그러기 위해서는, `Math.min()` 메서드를 사용하여 값을 넘겨주면 된다.
> 
> 모니터마다 pixel ration가 다를수 있으므로, `resize` event가 일어날 때마다 `renderer.setPixelRatio(...)` 를 호출하여 pixel ration를 설정해주도록 한다.

``` js
  window.addEventListener('resize', () =>
  {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
```

## Handle Fullscreen
``` js
  // ...
  // double click시 화면 fullscreen
  window.addEventListener('dblclick', () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

      if (!fullscreenElement) {
          if (canvas.requestFullscreen) canvas.requestFullscreen()
          // safari
          else if (canvas.webkitFullscreenElement) canvas.webkitFullscreenElement()
      } else {
          if (document.exitFullscreen) document.exitFullscreen()
        // safari
          else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      }
  })
  // ...
```

> `window`를 double click시 브라우저 화면을 fullscreen으로 확장/축소 시키도록 이벤트를 추가한다. `requestFullscreen()`은, `canvas`를 확장하여 fullscreen으로 만들어줍니다. safari에서는 해당 메서드를 지원하지 않으므로 `webkitFullscreenElement()` 를 사용할 수 있습니다.
> 
> `if (!fullscreenElement) {...` 를 이용하여 현재 화면이 fullscreen인지 확인하여 동작합니다.

## CSS Handling

`canvas` 가 화면을 꽉 채우도록 설정할 때, css의 역할도 중요합니다.

``` css
* {
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
}

.canvas {
  position: fixed;
  top: 0; left: 0;
  outline: none;
}
```
