# Galaxy Generator

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
    const generateGalaxt = () => {
        if (points !== null) {
            geometry.dispose()
            meterial.dispose()
            scene.remove(points)
        }
    }
```