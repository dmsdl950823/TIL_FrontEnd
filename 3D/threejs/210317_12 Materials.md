# Materials

- [Materials](#materials)
- [Prepare scene](#prepare-scene)
- [Material Class](#material-class)
  - [MeshBasicMaterial](#meshbasicmaterial)
  - [MeshNormalMaterial](#meshnormalmaterial)
  - [MeshMatcapMaterial](#meshmatcapmaterial)
  - [MeshDepthMaterial](#meshdepthmaterial)
  - [Adding a few light](#adding-a-few-light)
  - [MeshLambertMaterial](#meshlambertmaterial)
  - [MeshPhongMaterial](#meshphongmaterial)
  - [MeshToonMaterial](#meshtoonmaterial)
  - [MeshStandardMaterial](#meshstandardmaterial)
  - [MeshPhysicalMaterial](#meshphysicalmaterial)
  - [PointsMaterial](#pointsmaterial)
  - [ShaderMaterial 과 RawShaderMaterial](#shadermaterial-과-rawshadermaterial)
  - [Environment map](#environment-map)
- [Environtment maps를 찾는 곳](#environtment-maps를-찾는-곳)

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

Normal 은 각각의 면의 바깥쪽이 향하고있는 방향을 포함하고있는 꼭짓점(vertex) 정보입니다. 화살표로 normal을 보여준다면, 하단의 이미지처럼 geometry를 구성하고있는 각각의 꼭짓점은 바깥을 향하고 있다는것을 볼 수 있습니다.

<img src="https://threejs-journey.xyz/assets/lessons/12/normals.png" width="400">

Normal은 '어떻게 환경이 geometry의 표면에서 반사/왜곡 되어야 하는지' 등을 계산하는데 사용합니다.

[MeshNormalMaterial](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial)을 사용할 때, 색상은 카메라에서 상대적인, 일반적인 방향만 보여줍니다. 만약 sphere가 rotate 한다면, 어느 방향에서 확인을 하더라도, 색상은 항상 같다는 것을 확인할 수 있을 것 입니다.

MeshBasicMaterial 에서 사용한 몇몇 property(`wireframe`, `transparent`, `opacity`, `side`) 들 도 있지만, `flatShading` 이라는 프로퍼티도 사용할 수 있습니다.

`flatShading` 은 면을 flat 하게 만들어주며, 꼭짓점 사이를 연걸하지 않아 단순하게 만들어줍니다.

``` js
  material.flatShading = true
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-11.png" width=400>

MeshNormalMaterial 은 normal 을 debug 할 때 유용하지만, 그 자체로도 시간적으로 좋기 때문에 그냥 사용해도 됩니다.

## MeshMatcapMaterial

[MeshMatcapMaterial](https://threejs.org/docs/#api/en/materials/MeshMatcapMaterial) 은 퍼포먼스도 좋으며, 완벽한 material 입니다. 

MeshMatcapMaterial 은 sphere 같이 생긴 reference texture가 필요합니다.

<img src="https://threejs-journey.xyz/assets/lessons/12/1.jpg">

material 은 카메라와 연관된 normal 방향에 따라 색상을 추출할 것 입니다.

reference matcap texture를 세팅하기 위해서는 `matcap` 프로퍼티가 필요합니다.

``` js
  const material = new THREE.MeshMatcapMaterial()
  material.matcap = matcapTexture
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-12.png" width=400>

mesh에 빛이 비춰지는 것 같아 보이지만, 이건 텍스쳐가 그렇게 생겼기 때문에 그렇게 보이는 것 입니다.

여기서 문제는, 어떤 방향이든 같은 상을 보는 것 입니다. 또한, light가 없기 때문에, light를 업데이트할 수 없습니다.

[matcap 자료 github](https://github.com/nidorx/matcaps)

2D / 3D software 를 사용하여 직접 matcap을 만들 수도 있습니다.

## MeshDepthMaterial

[MeshDepthMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshDepthMaterial) 은, 카메라의 `near` 값과 가깝다면 (카메라와 가까이 있으면) 하얗게, 카메라의 `far` 값과 가깝다면 (카메라와 멀리 있으면) 검정으로  geometry를 간단하게 컬러링 합니다.

``` js
  const material = new THREE.MeshDepthMaterial()
```

## Adding a few light

material 이 보여지기 위해서는 light 가 필요합니다. 간단한 light를 scene에 추가해봅시다. light 에 대한 자세한 설명은 다음 강의에서 다룹니다.

* [AmbientLight](https://threejs.org/docs/index.html#api/en/lights/AmbientLight)
``` js
  /**
  * ✨ Lights
  */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
```
* [PointLight](https://threejs.org/docs/#api/en/lights/PointLight)

``` js
  // ...
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.x = 2
  pointLight.position.y = 3
  pointLight.position.z = 4
  scene.add(pointLight)
```

## MeshLambertMaterial

[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) 는 빛을 반사하는 material 입니다.

``` js
  const material = new THREE.MeshLambertMaterial()
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-15.png" width=400>

점점 실사에 가까워지고 있습니다. 빛 반사는 아주 진짜같지는 않지만, 좋습니다.

[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) 는 [MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)과 같은 property들을 지원할 뿐 아니라 빛과 관련된 property들도 지원합니다. 

MeshLambertMaterial 는 빛을 사용하는 가장 퍼포먼스에 강한 material 입니다. 안타깝게도 parameter들은 간단하진 않으며, sphere 같은 둥근 geometry를 자세히 보면 이상한 패턴을 표면에서 확인할 수 있습니다.


## MeshPhongMaterial

[MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) 은 [MeshLamberMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) 와 아주 유사하지만, 이상한 패턴은 덜 보이고, 빛 반사를 geometry 표면에서 볼 수 있습니다.

``` js
  const material = new THREE.MeshPhongMaterial()
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-16.png" width=400>

MeshPhongMaterial 은 [MeshLamberMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) 보다  퍼포먼스가 약간 떨어지지만, 이런 수준(간단한 geometry) 에서는 큰 상관이 없습니다.

`shiness`, `specular`  property로 빛 반사를 제어, 색상 설정을 할 수도 있습니다.

``` js
  material.shininess = 100
  material.specular = new THREE.Color(0x1188ff)
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-17.png" width=400>


## MeshToonMaterial

[MeshToonMaterial](https://threejs.org/docs/#api/en/materials/MeshToonMaterial) 는 [MeshLamberMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) 과 property가 비슷하지만 조금 더 만화적인 느낌이 납니다.

``` js
  const material = new THREE.MeshToonMaterial()
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-18.png" width=400>

기본으로는 2가지 색상으로 이루어져있습니다(하나는 그림자, 하나는 빛). 색상 단계를 더 추가하고싶을 경우에는 `gradientMap` property를 사용합니다.

``` js
  material.gradientMap = gradientTexture
```

테스트해보면, 만화적인 효과가 나타나지 않습니다. 이것은 우리가 load한 gradient texture(`gradientTexture`) 파일이 너무 작고, texture의 pixel들이 혼합되어 그렇습니다. **[Texture 강의](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210309_11%20Texture.md#filtering%EA%B3%BC-mipmapping)에서 본 `mipmapping` 과 같은 `minFilter`, `magFilter` 의 문제입니다.**

이 문제를 해결하기 위해서는, `minFilter`, `magFilter` 를 `THREE.NearestFilter`로 변경해주어야 합니다.
> `THREE.NearestFitler` 는 mipmapping을 사용하지 않겠다는 의미이므로, `gradientTexture.generateMipmaps = false` 로 설정할 수 있습니다.

``` js
  // ...
  const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
  gradientTexture.minFilter = THREE.NearestFilter
  gradientTexture.magFilter = THREE.NearestFilter
  gradientTexture.generateMipmaps = false
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-20.png" width=400>

## MeshStandardMaterial

[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) 은 물리적으로 rendering 원칙을 기반으로 사용합니다. Texture 강의에서 [PBR](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210309_11%20Texture.md#pbr)에 대해서 배웠죠. 
[MeshLambertMaterial](https://threejs.org/docs/#api/en/materials/MeshLambertMaterial) 과 [MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) 과 윳하게, 빛(light)을 더 진짜같은 알고리즘을 이용하여 지원하고, roughness와 metalness같은 더 나은 파라미터들 지원합니다.

PBR은 많은 software, engine, library 에서 표준이 되고 있으므로 "standard" 라고 부릅니다. 이 아이디어는 실제같은 parameter와 함께 진짜같은 결과를 가지기 위한 것 이며, 사용하는 기술에 상관없이 정말 비슷한 결과를 얻을 수 있을 것 입니다.

``` js
  const material = new THREE.MeshStandardMaterial()
```

<img src="https://threejs-journey.xyz/assets/lessons/12/step-22.png" width=400>

``` js
  material.metalness = 0.45
  material.roughness = 0.65
  material.map = doorColorTexture
```

* `roughness`, `metalness` property를 직접적으로 수정할 수 있습니다.
  
  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-23.png" width=400>

* `map` property는 간단한 texture를 입력할 수 있습니다.
  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-25.png" width=400>

* `apMap` property는 (말 그대로 'ambient occlusion map') texture가 어두운 부분에 그림자를 추가합니다. 이 기능이 작동하기 위해서는 "두 번째 UV 세트(geometry 에서 texture를 배치하는데 도움이 되는 좌표)"를 추가해야합니다.
  
  [Geometry 강의](https://github.com/dmsdl950823/TIL_FrontEnd/blob/master/3D/threejs/210228_09%20Geometry.md#buffer-geometry-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)에서처럼 기본 `uv` attribute를 사용하여 새로운 attribute를 추가해야합니다. 더 간단한 용어로, `uv` attribute를 복사합니다.

  ``` js  
    const sphere = new THREE.Mesh( /* ... */ )
    sphere.position.x = -1.5
    const sphereUV = sphere.geometry.attributes.uv.array
    sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphereUV, 2))

    const plane = new THREE.Mesh( /* ... */ )
    const planeUV = plane.geometry.attributes.uv.array
    plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(planeUV, 2))

    const torus = new THREE.Mesh( /* ... */ )
    torus.position.x = 1.5
    const torusUV = torus.geometry.attributes.uv.array
    torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torusUV, 2))
  ```

  이제 `doorAmbientOcclusionTexture` texture 를 사용하여 `aoMap` 을 추가하고 `aoMapIntensity` property를 사용하여 강도를 조절합니다.

``` js
  material.aoMap = doorAmbientOcclusionTexture
  material.aoMapIntensity = 1
```
  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-26.png" width=400>

  갈라진 틈은 이제 더 어두워지고, 대비와 단계가 생성되었습니다.

* `displacementMap` property는 꼭짓점을 움직여 실제 경감도(높낮이)를 조절합니다.
  
``` js
  material.displacementMap = doorHeightTexture
```

  > <img src="https://threejs-journey.xyz/assets/lessons/12/step-27.png" width=400>

  엄청 구려보이네요. 이것은 geometry의 꼭짓점이 부족하기 때문 이며, deplacement가 너무 크게 설정되어있기 때문입니다. 세분화가 필요하므로 꼭짓점을 크게 설정합니다.

  ``` js
  material.displacementScale = 0.05

  // ...
  new THREE.SphereGeometry(0.5, 64, 64),
  // ...
  new THREE.PlaneGeometry(1, 1, 100, 100),
  // ...
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  ```


``` js
  material.metalnessMap = doorMetalnessTexture
  material.roughnessMap = doorRoughnessTexture
```
* `metalnessMap`과 `roughnessMap` 을 이용하여 물체의 상세한 쇠/요철 등을 표현할 수 있습니다.

* `normalMap` 은 normal 방향을 속일 수 있고 세분화에 상관없이 표면의 자세한 요철을 재현해 낼 수 있습니다.
* `normalScale`로 normal 강도를 조절할 수 있습니다. - [Vector2](https://threejs.org/docs/index.html#api/en/math/Vector2) 이므로 조심해야합니다.  

``` js
  material.normalMap = doorNormalTexture
  material.normalScale.set(0.5, 0.5)
```
> <img src="https://threejs-journey.xyz/assets/lessons/12/step-31.png" width=400>

``` js
  material.transparent = true
  material.alphaMap = doorAlphaTexture
```

* `alphaMap` property를 이용하여 alpha를 조절 할 수 있습니다. `transparent` proeprty를 true로 설정하는것, 잊지 마세요!
  
> <img src="https://threejs-journey.xyz/assets/lessons/12/step-32.png" width=400>


## MeshPhysicalMaterial

[MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial) 는 [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) 와 비슷하지만 clear coat 효과를 지원합니다. clear coat property를 제어할 수 있고, [Three.js](https://threejs.org/examples/#webgl_materials_physical_clearcoat) 예제 같은 texture를 사용할 수도있습니다.

## PointsMaterial

[PointsMaterial](https://threejs.org/docs/index.html#api/en/materials/PointsMaterial) 는 particle과 함께 사용할 수 있습니다. 다음 레슨에서 확인할 수 있습니다.

## ShaderMaterial 과 RawShaderMaterial

[ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial) 와 [RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial) 는 material을 직접 생성하기 위해 사용됩니다. 다음 레슨에서 확인할 수 있습니다.

## Environment map

환경 맵(environment map)은 scene을 둘러싸고있는 이미지 입니다. 환경 맵에 추가된 이미지를 반사, 왜곡 등을 생성된 오브젝트에 추가할 수 있습니다. 조절하기 위해서는 lighting 정보가 사용됩니다.

다시 간단한 MeshStandardMaterial 을 기본으로 세팅해놓습니다.

``` js
  const material = new THREE.MeshStandardMaterial()
  material.metalness = 0.7
  material.roughness = 0.2
  
  // gui debugger
  gui.add(material, 'metalness').min(0).max(1).step(0.0001)
  gui.add(material, 'roughness').min(0).max(1).step(0.0001)
```
환경 맵을 material에 추가 하기 위해서는 `envMap` property 를 사용해야합니다. Three.js는 cube 형태의 환경 맵을 지원합니다. Cube 환경 맵은 각 면에 해당하는 6개의 이미지 로 구성되어있습니다.

[TextureLoader](https://threejs.org/docs/index.html#api/en/loaders/TextureLoader) 대신 [CubeTextureLoader](https://threejs.org/docs/index.html#api/en/loaders/CubeTextureLoader) 를 사용하여 texture를 불러옵니다.


CubeTextureLoader 를 `material`를 정의하기 전에 초기화 하고, `load(...)` 메서드를 여러개의 image path를 Array 형식으로 호츨합니다.

``` js
    const cubeTextureLoader = new TRHEE.CubeTextureLoader()

    const environmentMapTexture = cubeTextureLoader.load([
        '...',
        '...',
        '...',
        '...',
    ])

    // ...
    material.envMap = environmentMapTexture
```



❤
<img src="" width=400> asdfasdf

이제 주변 이미지가 geometry의 표면에 반사되는 것을 볼 수 있습니다. `metalness` 와 `roughness` 를 변경하여 다른 결과를 만들어 낼 수 있습니다.

다른 environment map 이미지를 사용하여 테스트 해보세요.


# Environtment maps를 찾는 곳

[HDRIHaven]() - HDRI 이미지들이 많이 있는 곳 입니다. HDRI 는 (**High Dynamic Range Imaging**) 이미지로 이루어져있고, 하나의 이미지 대신에 light 정보를 향상시킬 수 있는 더 많은 복잡한 데이터를 가지고 있기 때문에 더 진짜같은 결과를 확인할 수 있습니다.
 
그러나 Three.js 는 cube map 만을 지원하기 때문에, HDRI 이미지를 cube map으로 변환하기 위해서는, [여기]() 를 이용할 수 있습니다.

HDRI 이미지를 업로드하고, 원하는 화면을 찾을때까지 회전시킨 후, 6개의 이미지로 이루어진 cubemap을 다운로드 하면 됩니다. 기본 파일 형식은 `.png` 이고, `.jpg` 로 변경도 할 수 있습니다.
