# Galaxy Generator

- [Galaxy Generator](#galaxy-generator)
  - [기본 Particles](#기본-particles)
  - [Tweaks](#tweaks)
  - [모양 - Shape](#모양---shape)
    - [Radius](#radius)
    - [Branches](#branches)
    - [Spin](#spin)
    - [Randomness](#randomness)
    - [Colors](#colors)

## 기본 Particles

``` js
    /**
    * Galaxy
    */
    const parameters = {}

    const generateGalaxy = () => {

    }
    generateGalaxy()
```

먼저, `generateGalaxy()` function 을 만듭니다. 매번 function 을 호출 할때마다,  **이전 은하수를 제거하고 새로운것을 생성**할 것입니다.

모든 은하수 parameter 를 저장하는 object 를 만들고, 확인을 위해 몇 개의 particle 들만 만들것 입니다. `parameter` 오브젝트를 `generateGalaxy()` 위에 생성해주세요. geometry 와 particle 갯수를 parameter 에 추가합니다.

``` js
    /**
    * Galaxy
    */
    const parameters = {}
    parameters.count = 1000

    const generateGalaxy = () => {
        /**
        * Geometry
        */
        const geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(parameters.count * 3)

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i *3
            positions[i3 + 0] = (Math.random() - 0.5) * 3
            positions[i3 + 1] = (Math.random() - 0.5) * 3
            positions[i3 + 2] = (Math.random() - 0.5) * 3
        }

        geometry.seAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
    generateGalaxy()
```

이제 [PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial) 클래스 를 이용하여 material 을 생성합니다. 이번엔 `parameters` object 를 변경할 수 있도록 gui를 추가합니다.

``` js
    /**
    * Galaxy
    */
    // ...
    parameters.size = 0.002

    const generateGalaxy = () => {
        // ...

        /**
        * Material
        */
        material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })
    }
```

이제 points 를 [Points](https://threejs.org/docs/#api/en/objects/Points) 클래스를 사용해서 추가하고, scene 에 추가합니다.

``` js
    const generateGalaxy = () => {
        // ...

        /**
        * Points
        */
        const points = new THREE.Points(gemetry, material)
        scene.add(points)
    }
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-02.png" width=500>

## Tweaks

이미 두개의 파라미터(`count`, `data`)가 있지만, `Dat.GUI` 에 추가하여 변경시켜봅시다.

``` js
    /**
    * Galaxy
    */
    parameters.count = 1000
    parameters.size = 0.02

    // ...
    gui.add(parameters, 'count').min(100).max(1000000).step(100)
    gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001)
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-03.png" width=500>

이렇게 두개의 새로운 범위를 설정할 수 있게되었지만, 이것을 변화시켜도 새로운 은하수가 만들어지진 않고, 그 위에 쌓입니다. 새로운 은하수를 만들기 위해선, 변화하는 event 를 listen 해야합니다. 더 정확하게 이벤트가 끝난 후에 발생하는, `finishChange` 이벤트를 사용해야합니다.

``` js
    // ...
    gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
    gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
```

이 코드를 추가해도 새로운 은하수들이 추가될 뿐, 새로운 변화는 없을 것 입니다. 이것을 고치기 위해서는 `geometry`, `material`, `points` 변수를 `generateGalaxy` 함수 밖에서 선언해주어야 합니다. 

``` js
/**
 * Galaxy
 */
// ...
let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
    // ...

    /**
    * Geometry
    */
    const geometry = new THREE.BufferGeometry()
    // ...

    /**
    * Material
    */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    points = new THREE.Points(gemetry, material)
}
```

그리고, 해당 변수를 할당하기 전에, 이 변수들이 이미 존재하는지를 확인해야합니다. 그러기 위해서는 geometry 에서 `dispose()` 를 호출합니다. 그런 뒤, `remove()` 메서드를 이용하여 points 를 scene 에서 제거합니다.

``` js
    const generateGalaxy = () => {
        if (points !== null) {
            geometry.dispose()
            meterial.dispose()
            scene.remove(points)
        }
    }
```

이전 강의에서 봤던, (버그가 있는) depth 와 alpha 를 생성할 수 있는 texture 를 사용하는 대신에, 여기에서는 기본 육면체를 사용했습니다. 육면체가 아니라는 것을 알 수 있도록 아주 작은 particles 들을 생성할 것 입니다.

이제 `count` 와 `size` parameter 를 늘려줍니다.

<img src="https://threejs-journey.xyz/assets/lessons/18/step-06.png" width=500>

## 모양 - Shape

은하수는 각각 다른 모양을 가지고있습니다. 우리는 여기서 나선형의 모양을 제작해볼 것 입니다. 은하수를 생성하기 위해서 다양하게 particles 를 위치시킬 수 있는 방법이 있으므로 다양하게 시도해보세요.

### Radius

`radius` parameter 를 생성해줍니다.

``` js
    /**
    * Galaxy
    */
    // ...
    parameters.radius = 5

    // ...

    gui.add(parameters, 'add').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
```

각 별들은 이 `radius` 에 맞게 위치될 것 입니다. 만약 `radius` 가 `5` 라면, 별들은 0 ~ 5 사이에 위치하게 됩니다. 여기서는 모든 particles 를 선형으로 나열해보도록 하겠습니다.

``` js
    // generateGalaxy ()
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius

        positions[i3 + 0] = radius
        positions[i3 + 1] = 0
        positions[i3 + 2] = 0
    }
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-07.png" width=500>


### Branches

나선형 은하수는 적어도 두개 이상의 가지가 있을 수 있습니다.

`branches` parameters 를 추가해줍니다.

``` js
    /**
    * Galaxy
    */
    // ...
    parameters.branches = 3

    gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
```

`Math.cos()` 와 `Math.sin()` 을 사용하여 branch 위에 particle 위치를  설정할 수 있습니다. 먼저, modulo(`%`) 를 사용하여 angle 을 계산하고, 결과를 branch 의 갯수만큼 나누어서 `0` 과 `1` 사이의 값을 가질것 입니다.

``` js
    // generateGalaxy ()
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        positions[i3 + 0] = Math.cos(branchAngle) * radius
        positions[i3 + 1] = 0
        positions[i3 + 2] = Math.sin(branchAngle) * radius
    }
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-08.png" width=500>

### Spin

spin 효과를 추가해봅시다.

`spin` parameter 를 추가해줍니다.

``` js
    // ...
    parameters.spin = 1

    // ...
    gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
```

``` js
    // generateGalaxy ()
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * (Math.PI * 2)

        positions[i3 + 0] = Math.cos(branchAngle) * radius
        positions[i3 + 1] = 0
        positions[i3 + 2] = Math.sin(branchAngle) * radius
    }
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-09.png" width=500>

### Randomness

particles 들이 완벽하게 정렬되었으니, 이제는 임의로 배치가 필요합니다. 그치만 정말로 필요한 것은, 내부로 가면 갈수록 빽빽하고, 외부로 가면 갈수록 별이 분포되어야 합니다.

`randomness` parameter 를 추가합니다.

``` js
    parameters.randomness = 0.2

    // ...

    gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
```

이제 각 축을 위한 값을 `Math.random()` 으로 생성해야합니다. `radius` 를 사용하여 곱하고 이 값을 `positions` 에 추가합니다.

``` js
    // generateGalaxy ()
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = (Math.random() - 0.5) * parameters.randomness * radius
        const randomY = (Math.random() - 0.5) * parameters.randomness * radius
        const randomZ = (Math.random() - 0.5) * parameters.randomness * radius

        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    }
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-10.png" width=500>

동작하기는 하지만 아주 원하던 결과는 아닙니다. 그리고 아직도 패턴을 볼 수가 있어요. 이것을 고치려면 `Math.pow()` 를 적용하고 `-1` 을 곱하여 해결 할 수 있습니다.

``` js
    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-11.png" width=500>

### Colors

`parameter` 에 색상 을 추가합니다.

``` js
    parameters.insideColor = '#eb6aa5'
    parameters.outsideColor = '#3091ff'

    // ...
    gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
```

각 꼭지점에 색상을 제공할 것 입니다. `vertextColors` 를 material 에 활성화주어야 합니다.

``` js
    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
```

그리고, `position` attribute 에 했던것 처럼 `color` attribute 를 geometry 에 추가합니다. 지금은, `insideColor` 과 `outsideColor` 를 사용하지는 않을것 입니다.

``` js
    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    for (let i = 0; i < parameters.count; i++) {
        // ...
        
        colors[i3 + 0] = 1
        colors[i3 + 1] = 0
        colors[i3 + 2] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
```

<img src="https://threejs-journey.xyz/assets/lessons/18/step-12.png" width=500>

빨간 은하수가 생성되었습니다.

parameters 로부터 colors 를 사용하려면, 각각의 particle 에 [Color](https://threejs.org/docs/index.html#api/en/math/Color) 인스턴스를 생성해야합니다.
`generateGalaxy` function 내부에서 해야합니다.

``` js
    const generateGalaxy = () => {
        // ...
        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)
        // ...
    }
```

루프 안에서, 이 두가지 색상을 혼합하려고 합니다. 이것은 은하수의 중심으로부터의 거리에 따라 혼합됩니다.
만약 particle 이 은하수의 중심에 있을 경우, `insideColor` 값을 가지며, 중심으로부터 멀리 갈 수록 `outsideColor` 와 혼합됩니다.

세번째 Color 인스턴스를 생성하는것 대신에, 우리는 서로 다른 색상을 혼합하기위해 `colorInside` 를 복사하는 것과 `lerp(...)` 메서드를 사용하기로 합니다.

`lerp(...)` 의 첫 번째 파라미터는 또다른 색상이고, 두번째 파라미터의 값은 `0` 과 `1` 사이의 값입니다. 만약 `0` 일경우, 색상은 기본 값을 유지할 것이고, `1` 일경우, 결과 색상은 제공된 하나의 값 입니다.

`radius` parameter 를 사용하여 조절할 수 있습니다.

``` js
    // Color
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
```

`r`, `g`, `b` 값을 `colors` 배열에 사용할 수 있습니다.

<img src="https://threejs-journey.xyz/assets/lessons/18/step-13.png" width=500>
