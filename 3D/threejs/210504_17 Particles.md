# Particles 

- [Particles](#particles)
  - [First Particles](#first-particles)
    - [Geometry](#geometry)
    - [PointsMaterial](#pointsmaterial)
    - [Points](#points)
  - [Custom Geometry](#custom-geometry)

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