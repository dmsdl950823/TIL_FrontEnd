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
  - [Different Colors](#different-colors)
  - [Animate](#animate)
    - [points 를 object 로써 사용하는 방법](#points-를-object-로써-사용하는-방법)
    - [attributes 를 변경하는 방법](#attributes-를-변경하는-방법)
  - [Custom Shade 사용하기](#custom-shade-사용하기)

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

- `size`  :: particle 의 크기 설정
- `sizeAttenuation` :: 멀리있는 particle 들이 앞에있는 particle 보다 작아져야한다는것을 구체화

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

최근에, WebGL 은 pixel 을 다른 물체 위에 그렸습니다.

`blending` 프로퍼티를 바꾸면, WebGL 에게 pixel 을 바꿀 뿐 아니라 pixel 의 color 를 추가할 수 있게 해줍니다. 채도 효과를 만들어내는데, 보기가 좋습니다.

``` js
    // particleMaterial.alphaTest = 0.001
    // particleMaterial.depthTest = false // 이 프로퍼티에는 버그가 있습니다.
    particleMaterial.depthWrite = false
    particleMaterial.blending = THREE.AdditiveBlending // 빛을 쐬는 것 같은 블랜딩 모드 (퍼포먼스에 영향을 줄 수 있습니다.)
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-13.png" width=500>

particle 의 갯수를 `20000` 개로 늘려주면 더 좋은 효과를 확인할 수 있습니다.

<img src="https://threejs-journey.xyz/assets/lessons/17/step-14.png" width=500>

그러나 이 효과는 퍼포먼스에 영향을 주며, 너무 많은 particles 들을 만들수는 없습니다.(60fps 직전까지)

이제 `cube` 를 제거하면 이런 결과를 볼 수 있습니다.
<img src="https://threejs-journey.xyz/assets/lessons/17/step-15.png">

## Different Colors

각각의 particle 을 위한 다른 색상을 지정해 줄 수도 있습니다. position 을 위해서 했던것 처럼 새로운 `color` 라는 attribute 를 지정해주어야 합니다. color 는 red, green, blue (3 가지 값) 로 이루어져있으므로, 코드는 `position` attribute 와 유사할 것 입니다. 여기서는 두개의 attribute 를 같은 루프를 이용하여 정의할 것 입니다.

``` js
    /**
    * Particles
    */
    // Geometry ...
    const positions = new Float32Array(count * 3) // xyz, xyz, xyz ...
    const colors = new Float32Array(count * 3) // rgba(n, n, n, n)

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10
        colors[i] = Math.random()
    }
    particlesGeometry.setAttribute(
        'position', new THREE.BufferAttribute(positions, 3)
    )
    particlesGeometry.setAttribute(
        'color', new THREE.BufferAttribute(colors, 3)
    )
```

이렇게 설정된 vertex color를 `vertexColors` 프로퍼티를 `true` 로 설정하여 활성화시켜줍니다.

``` js
    // Material ...
    particleMaterial.vertexColors = true
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-16.png" width=500>

material main color 가 여전히 이 vertext colors 에 영향을 주고있으므로 주석처리합니다.

``` js
    // Material ...
    // particleMaterial.color = new THREE.Color('#ff88cc')
```

<img src="https://threejs-journey.xyz/assets/lessons/17/step-17.png" width=500>

## Animate

particles 들을 애니메이팅 시키는 방법은 여러가지가 있습니다.

### points 를 object 로써 사용하는 방법

[Points](https://threejs.org/docs/#api/en/objects/Points) 클래스가 [Object3D](https://threejs.org/docs/#api/en/core/Object3D) 를 상속하기 때문에, point 를 움직이거나, 회전, 스케일링 등이 가능합니다.

`tick` function 에서 particles 를 회전합니다.

``` js
    /**
     * Animate
     */
    const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        // Update particles
        particles.rotateion.y = elapsedTime * 0.3
    }
```

<video src="https://threejs-journey.xyz/assets/lessons/17/step-18.mp4"></video>

이미 이상태로 멋지긴 하지만, 각각의 particle 을 움직이고싶습니다.

### attributes 를 변경하는 방법

또다른 방법은 각각의 vertext position 을 개별적으로 업데이트시키는 방법입니다. 이 방법으로는, 꼭짓점은 다른 귀도를 가지고 있을 수 있습니다. 이 particles 를 마치 파도에 떠다니는것 같은 효과 애니메이션을 구현할 것입니다. 먼저 어떻게 꼭짓점들을 업데이트 시킬 수 있는지 확인해 봅시다.

이전 rotation 활동을 주석처리합니다.

``` js
    /**
     * Animate
     */
    const tick = () => {
        // ...
        // Update particles
        // particles.rotateion.y = elapsedTime * 0.3
        // ...
    }
```

각 꼭지점을 업데이트하려면 모든 꼭지점이 첫 번째 3개의 값이 첫 번째 꼭지점의 x, y 및 z 좌표에 대응하고 다음 3개의 값이 두 번째 꼭지점의 x, y 및 z에 대응되는 이 1차원 배열에 저장되기 때문에 `position` attribute 의 올바른 부분을 업데이트해야 합니다.

> To update each vertex, we have to update the right part in the position attribute because all the vertices are stored in this one dimension array where the first 3 values correspond to the x, y and z coordinates of the first vertex, then the next 3 values correspond to the x, y and z of the second vertex, etc.

우리는 꼭짓점만 위 아래로 움직이길 원합니다. 다시 말해 `y` 축만 움직일 거란 의미입니다. `position` attribute 가 1 차원 배열이기 때문에, 3 * 3 (`y` 축) 씩 업데이트 씩 업데이트해야합니다. 

각 꼭짓점에 적용해봅시다.

``` js
    const tick = () => {
        // ...
        // Update particles ...
        for (let i = 0; i < count; i++) {
            count i3 = i * 3 // 3 * 3
        }
        // ...
    }
```

`0` 부터 `count` 까지 순회하는 간단한 `for` 루프를 사용했고, `i` 를 `3` 으로 곱해서 3 * 3 인 `i3` 변수를 만들었습니다.

파도 움직임을 구현하는 가장 쉬운 방법은 `sin` 을 사용하는 방법입니다. 먼저, 모든 꼭짓점을  같은 빈도로 위 ,아래로 업데이트 시켜줄 것 입니다.

`y` 축은 배열의 `i3 + 1` 인덱스에서 접근할 수 있습니다.

``` js
    const tick = () => {
        // ...
        // Update particles ...
        for (let i = 0; i < count; i++) {
            const i3 = i * 3 // 3 * 3
            particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime)
        }
        // ...
    }
```

안타깝게도 아무것도 움직이지 않을것입니다. 문제는, Three.js 는 이 geometry 가 변경되었다는 것을 감지해야한다는 것 입니다. 꼭짓점 업데이트가 완료되면, `position` attribute 에서 `needsUpdate` 를 `true` 로 변경해주어야합니다.

``` js
    const tick = () => {
        // ...
        // Update particles...
        for (let i = 0; i < count; i++) {
            const i3 = i * 3 // 3 * 3
            particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime)
        }
        particlesGeometry.attributes.position.needsUpdate = true
        // ...
    }
```

![dfssd](https://threejs-journey.xyz/assets/lessons/17/step-19.mp4)

모든 particles 는 이제 평면 (plane) 처럼 위 아래로 움직입니다.

이제 거의 다 왔습니다! 이제 해야할 일은 particles 사이의 `sin`  에 offset 을 적용하는 일입니다.  이렇게 하면 파도치는 모양을 만들 수 있습니다.

`x` 축이 필요합니다. 이 값을 `y` 축을 구할때와 같은 테크닉으로 구할 수 있습니다. `x` 를 구하려면 `i3 + 1` 대신에, `i3` 만 이용하면 됩니다.

``` js
    const tick = () => {
        // ...
        // Update particles...
        for (let i = 0; i < count; i++) {
            const i3 = i * 3 // 3 * 3
            const x = particlesGeometry.attributes.position.array[i3]
            particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        }
        particlesGeometry.attributes.position.needsUpdate = true
        // ...
    }
```

![](https://threejs-journey.xyz/assets/lessons/17/step-20.mp4)

이런 결과가 나왔습니다!!

그러나 이 테크닉은 피해야합니다. 만약 `20000` 개의 particles 가 있다면, 이 모든 particles 를 다루어야 하기 때문에 새로운 position 을 계산해야하고, 전체 attribute 를 매 frame 마다 업데이트해주어야 하기 때문입니다. 적은 갯수의 particles 는 괜찮지만, 많은 숫자의 particles 를 사용하는일이 많기 때문입니다.

## Custom Shade 사용하기

좋은 프레임률 (framerate) 로 각각의 frame 에  이 백만개 이상의 particles 를 업데이트 하기 위해선, 우리는 우리만의 shader 를 이용해 material 을 만들어낼 필요가 있습니다. 다음 레슨에서 배울 것 입니다.