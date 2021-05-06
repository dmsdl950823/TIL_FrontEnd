# Particles 

- [Particles](#particles)
  - [First Particles](#first-particles)
    - [Geometry](#geometry)
    - [PointsMaterial](#pointsmaterial)
    - [Points](#points)
  - [Custom Geometry](#custom-geometry)
  - [Color, map, alpha map](#color-map-alpha-map)
    - [alphaTest 사용하기](#alphatest-사용하기)
    - [depthTest 사용하기](#depthtest-사용하기)
    - [depthWrite 사용하기](#depthwrite-사용하기)
  - [Blending](#blending)

Particle 은 다양한 효과 (은하수들, 연기, 비, 먼지, 불 등등)를 줄 수 있는 아주 잘 알려진 효과입니다.

particle 의 좋은점은 합리적인 frame rate 로 화면에 수백수천개를 생성할 수 있다는 것 입니다. 단점은 각각의 particle 은 카메라를 향하고 있는 평평한 plane 으로 구성되어있다는 것 입니다.

particle 을 생성하는것은 [Mesh](https://threejs.org/docs/#api/en/objects/Mesh) 를 만드는 것 만큼 간단합니다. particle([PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial)) 을 제어할 수 있는 material 인 [BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry) 가 필요하고, Mesh 를 생성하는 것 대신에 [Points](https://threejs.org/docs/#api/en/objects/Points) 를 생성해야합니다.


## First Particles

### Geometry

Three.js geometry 아무거나 사용할 수 있습니다. Mesh 와 같은 이유로, [BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry) 를 사용하는 것 이 더 좋습니다. geometry의 각각의 꼭짓점은 particle 이 될 것 입니다.

``` js
    /**
     * Particles
     */
    // Geometry
    const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
```

### PointsMaterial

특별한 타입의 material 인, [PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial) 가 필요합니다. 이 material 은 이미 일을 많이 하지만, 다음 강의에서 particle material 을 생성하는 방법을 더 자세히 배웁니다.

[PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial) 는 여러개의 particle 에 특화된 프로퍼티를 가집니다.

* `size`  :: particle 의 크기 설정
* `sizeAttenuation` :: 멀리있는 particle 들이 앞에있는 particle 보다 작아져야한다는것을 구체화

``` js
    // Material
    const particleMaterial = new THREE.PointsMaterial({ size: 0.02, sizeAttenuation: true })
```

항상 그렇듯이 이 프로퍼티들을 material 을 생성한 다음에 변경할 수 있습니다.

``` js
    // Material
    // const particleMaterial = new THREE.PointsMaterial({ size: 0.02, sizeAttenuation: true })
    const particleMaterial = new THREE.PointsMaterial()
    particleMaterial.size = 0.2
    particleMaterial.sizeAttenuation = true // false
```

### Points

마지막으로, [Mesh](https://threejs.org/docs/#api/en/objects/Mesh) 를 생성했던 것 과 같이 마지막 particle 를 생성합니다. 그러나 이번에는 [Points](https://threejs.org/docs/#api/en/objects/Points) 클래스를 사용합니다. scene 에 추가하는 것을 잊지 마세요!

``` js
    // Points
    const particles = new THREE.Points(particlesGeometry, particleMaterial)
    scene.add(particles)
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-02.png" width=500>


## Custom Geometry

custom geometry 를 생성하기 위해서는, [BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry) 에서 시작해서, [Geometries](210228_09%20Geometry.md) 강의에서했던것 처럼 `position` attribute 를 추가해야합니다. [SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry) 를 custom geometry 로 대체해주고, `'position'` attribute 를 추가해줍니다.

``` js
    /**
     * Particles
     */
    // Geometry
    const particlesGeometry = new THREE.BufferGeometry()
    const count = 500

    // 각각의 position 이 3 값으로 이루어져있기 때문에 * 3 을 해줍니다. (x, y, z)
    const position = new Float32Array(count * 3) // xyz, xyz, xyz ...

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10 // Math.random - 0.5 -> -0.5 ~ +0.5 사이의 값을 가지기 위함
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3)) // Three.js BufferAttribute 를 생성하고 3 value 로 이루어진 각각의 정보를 구체화합니다.
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-03.png" width=500>

이제 scene 전체에 아주 많은 particles 들을 가지고있습니다. 이제 컴퓨터의 한계를 시험해 봅시다. `count` 값을 `5000`, `50000`, `500000` 등으로 늘려보도록 합니다. 아재 아주 많은 particles 들을 가지게 되고, 합리적인 frame rate 를 가지게 됩니다.

한계가 있을 것 이라고 생각할것입니다. 내부 컴퓨터나 스마트폰에서는, 수백만 particle 들을 가지고는 60fps 를 가질 수 없습니다. 극적으로 frame rate 를 줄이는 방법도 살펴볼 것 입니다.

`5000` 으로 `count` 를 설정해두고 size 를 `0.1` 로 변경해 보세요.

``` js
    // Geometry
    count = 5000

    // ...

    // Material
    const particleMaterial = new THREE.PointsMaterial()
    particleMaterial.size = 0.1
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-04.png" width=500>


## Color, map, alpha map

[PointsMaterial]() 의 `color` 프로퍼티를 이용해 particle 의 색상을 변경할 수 있습니다. [Color](https://threejs.org/docs/#api/en/materials/PointsMaterial) 클래스가 필요하다는 것을 잊지마세요!

``` js
    // Material ...
    particleMaterial.color = new THREE.Color('#ff88cc')
```

`map` 프로퍼티를 이용해서 이 particles 에 textrue 를 입력해 줄 수도 있습니다. 코드에서 이미 [TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader) 를 사용하여 `static/textures/particles/` 에 위치한 이미지를 로드합니다.

``` js
    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('/textures/particles/2.png')

    // ...

    // Material ...
    particleMaterial.map = particleTexture
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-05.png" width=500>

다른 texture 로도 사용 가능합니다. 

보시다시피, `color` 프로퍼티는 다른 material 처럼 `map` 을 변경시킵니다. 그러나 이 이미지를 가까이 볼 경우, 앞 particles 는 뒤 particles 를 가리고있습니다.

![ㅁㄴㅇㄹㄴㅁㅇㄹ](https://threejs-journey.xyz/assets/lessons/17/step-06.mp4)

투명도를 `transparent` 프로퍼티를 이용하여 활성화 시키고, `alphaMap` 을 사용하여 `map` 대신에 texture 에 도포합니다. 

``` js
    // Material ...
    // particleMaterial.map = particleTexture
    particleMaterial.alphaMap = particleTexture
    particleMaterial.transparent = true
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-07.png" width=500>

괜찮아 보이긴 하지만, 여전히 particle 의 모서리가 간간히 보입니다.

![ㅁㄴㅇㄹ](https://threejs-journey.xyz/assets/lessons/17/step-08.mp4)

이것은 생성될 때 particle 이 같은 순서(order) 로 그려지기 때문이며, WebGL 은 어떤 particle 이 어디가 앞에있는지/뒤에있는지 알지 못합니다.

이 문제를 고치는 몇 가지 방법이 있습니다.

### alphaTest 사용하기

`alphaTest` 는 `0` 과 `1` 사이의 값인데, WebGL 에게 pixel 의 투명도에 따라 언제 pixel 을 렌더링하면 안되는지에 대해서 알려줄 수 있습니다. 기본적으로, 값은 `0`(pixel 이 언제든지 렌더되어야 한다는 의미) 입니다. 만약 `0.001` 같이 적은 값이라면, pixel 은 alpha 가 0 일 경우 렌더되지 않습니다.

``` js
    // Material ...
    particlesMaterial.alphaTest = 0.001
```

![](https://threejs-journey.xyz/assets/lessons/17/step-09.mp4)

이 해결법은 완벽하지 않고, 가까이 확인할 경우 글리치 등 을 확인할 수 있으므로 완벽한 해결법은 아닙니다.

### depthTest 사용하기

그려줄 때, WebGL 은 이미 그려진 요소보다 더 가까이 그려져있는지 테스트합니다. 이것을 **depth testing** 이라고 하며, 비활성화 시킬 수 있습니다. (`alphaTest` 를 주석처리합니다.)

``` js
    // Material ...
    // particlesMaterial.alphaTest = 0.001
    particlesMaterial.depthTest = false // 이 프로퍼티에는 버그가 있습니다.
```

![](https://threejs-journey.xyz/assets/lessons/17/step-10.mp4)

이 해결법은 문제를 해결해 준것처럼 보이지만, depth testing 을 비활성화 하는것은 다른 object 가 scene 에 있을 경우, 또는 particles 가 각각 다른 색상을 가지고 있을 경우 버그를 발생시킵니다. particles 는 마치 scene 의 다른 요소들 맨 위에 그려져있는 것 처럼 보입니다. (depth 를 무시해버립니다!)

![](https://threejs-journey.xyz/assets/lessons/17/step-11.mp4)

### depthWrite 사용하기

말했듯이, WebGL 은 이미 그려진 요소보다 더 가까이 있는지 테스트를 한다고 했습니다. 이미 그려진 요소의 depth 는 depth buffer 라고 불리는 곳에 저장됩니다. 'particle 이 depth buffer 에 있는 것 보다 가까이 있다면 테스트' 하는 것 대신에, WebGL 에게 particles 를 이 depth buffer 에 작성하지 않도록 알려줄 수 있습니다. (`depthTest`를 주석처리 합니다.)

``` js
    // Material ...
    // particlesMaterial.alphaTest = 0.001
    // particlesMaterial.depthTest = false // 이 프로퍼티에는 버그가 있습니다.
    particlesMaterial.depthWrite = false 
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-12.mp4">

이 경우에, 우리가 가지고 있던 문제를 기타 버그 없이 해결할 수 있습니다! 때때로 다른 object 가 scene 에 그려진 오브젝트들이 가지고있는 투명도 등의 많은 요소에 의해서 particles 의 뒤/앞 에 그려질 수 있습니다.

지금까지 다양한 테크닉을 보았으며, 완벽한 해결방법은 없습니다. 프로젝트에 따라 가장 적절한 방법을 찾는것이 제일 좋습니다.

## Blending