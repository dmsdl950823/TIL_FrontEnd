# Materials

- [Prepare scene](#prepare-scene)
- [Material Class](#material-class)
  - [MeshBasicMaterial](#meshbasicmaterial)
  - [MeshNormalMaterial](#meshnormalmaterial)

Materials 는 geometry의 보여지는 pixel에 색상을 입힐때 사용됩니다.

각각의 픽셀의 색상을 결정하는 알고리즘은 **shader** 라 불리는 프로그램으로 작성되었습니다. shader를 작성하는것은 WebGL과 Three.js에서 가장 어려운 부분이긴 하지만, Three.js는 만들어져있는 내장 material 을 가지고있습니다.

이 장에서는, Three.js material을 사용하는 방법에서만 다룹니다.

# Prepare scene

material을 세팅하기 위해서는, scene과 texture를 로딩하는 준비를 해야합니다.

각자 다른 geometry로 이루어진 3 개의 [Mesh](https://threejs.org/docs/#api/en/objects/Mesh)(sphere, plane, torus)들을 준비하고, 3 개의 오브젝트에 같은 [MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial) 를 사용합니다.

`add()` 메서드를 사용하여 object를 scene에 한번에 추가합니다.

``` js
  /**
  * 🧨 Object
  */
  const material = new THREE.MeshBasicMaterial()

  const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      material
  )
  sphere.position.x = - 1.5

  const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      material
  )

  const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 16, 32),
      material
  )
  torus.position.x = 1.5

  scene.add(sphere, plane, torus)
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-01.png" width="400">

`tick` function 을 이용하여 rotate animation을 실행시킵니다. ([Animation lesson은 여기](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210212_06%20animation.md))

``` js
 /**
 * Animate
 */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1

    sphere.rotation.x = elapsedTime * 0.15
    plane.rotation.x = elapsedTime * 0.15
    torus.rotation.x = elapsedTime * 0.15

    // ...
  }

  tick()
```

이제 오브젝트가 rotation 하는 모습을 볼 수 있습니다.

우리가 발견할 material 은 많은 다른 방법으로 texture 를 사용하는 것 입니다. [TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader)를 이용하여 texture를 불러옵니다.

이 강의의 모든 texture 이미지들은 `/static/textures/` 폴더에 있습니다.

* door texture - `/static/textures/door/`
* matcap texture - `/static/textures/matcaps/`
* gradient texture - `/static/textures/gradient`

정의한 `material` 앞에서 로드해야합니다.

``` js
  /**
  * ✨ Textures
  */
  const textureLoader = new THREE.TextureLoader()

  const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
  const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
  const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
  const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
  const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
  const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
  const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

  const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
  const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

  // Canvas ...
  // Scene ...
  // 🧨 Objects ...
```
모든 texture가 잘 load되었으면, [이전 강의](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210309_11%20Texture.md#texture-%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0)처럼 정석대로 material을 `map` 프로퍼티를 이용하여 사용할 수 있습니다.

``` js  
  const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-03.png" width=500>

[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)은 한개의 color나 texture를 geometry에 적용시킵니다.

Three.js documentation에 "material"을 검색하면, 많은 class들이 있는것을 확인할 수 있습니다.

# Material Class
## MeshBasicMaterial
[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial) 는 아마 가장 "기초적인" material 일 것입니다.. 그러나 우리가 사용해보지 못한 여러 property들이 있는데,

우리가 material을 정의했을 때 object의 parameter로 전달해주었던 대부분의 property들을, 직접적으로 설정할 수도 있습니다.

``` js
  const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture
  })

  // => Equal
  const material = new THREE.MeshBasicMaterial()
  material.map = doorColorTexture
  material.color.set('yellow')
  material.color = new THREE.Color('#ff00ff')
  material.color = new THREE.Color(0xff00ff)

  material.wireframe = true
  material.transparnet = true
  material.opacity = 0.5
  material.alphaMap = doorAlphaTexture

  // material.side = THREE.FrontSide 
  // material.side = THREE.BackSide 
  material.side = THREE.DoubleSide 


```

* `map` 프로퍼티는 texture를 geometry에 적용시켜줍니다.
* `color` 프로퍼티는 일관된 색상을 geometry 에 적용시킵니다. `color` 프로퍼티를 직접적으로 수정할 때는, [Color](https://threejs.org/docs/index.html#api/en/math/Color) class를 이용하여 코드로 바꾼 후 사용해야합니다.
* `map` texture와 `color` 를 함께 사용할 경우 texture를 color로 염색한 결과를 볼 수 있습니다.

  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-05.png" width=400>

* `wireframe` 프로퍼티는 geometry를 이루고있는 삼각형들을 얇은 라인으로 보여줍니다. camera distance에 상관없이 1px 입니다.

  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-06.png" width=400/>

* `opacity` 프로퍼티는 투명도를 조절합니다. `transparent` 프로퍼티를 `true`로 설정해야만 투명도를 조절할 수 있습니다.

  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-07.png" width=400>

* `alphaMap` 프로퍼티는 textue를 이용하여 투명도를 조절 할 수 있습니다.
  > ``` js
  >   material.transparent = true
  >   material.alphaMap = doorAlphaTexture
  > ```
  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-08.png" width="400">

* `side` 프로퍼티는, 어떤 면을 보여줄 것인지 설정합니다. 기본적으로 앞 면만 보여지지만( `THREE.FrontSide` ), 뒷 면 ( `THREE.BackSide` ) 나 양면 모두 ( `THREE.DoubleSide` ) 보여줄 수도 있습니다.
  > `THREE.DoubleSide` 사용은 피하세요. render 하기 위한 삼각형이 두배로 늘어난다는 뜻 입니다.

## MeshNormalMaterial
[MashNormalMaterial](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial) 은 [이전 강의](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210309_11%20Texture.md#texture-type) 에서 texture 이미지와 같이, 예쁜 보라,파랑,녹색 으로 이루어진 "normal texture" 같이 보이는 색상입니다.

``` js
  const material = new THREE.MeshNormalMaterial()
```

Normal 은 각각의 면의 바깥쪽이 향하고있는 방향을 포함하고있는 꼭짓점(vertex) 정보입니다. 화살표로 normal을 보여준다면, 하단의 이미지처럼 geometry를 구성하고있는 각각의 꼭짓점이 바깥을 향하고 있다는것을 볼 수 있습니다.

<img src="https://threejs-journey.xyz/assets/lessons/12/normals.png" width="400">

