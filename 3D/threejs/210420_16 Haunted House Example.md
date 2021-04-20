# Haunted House Example

### 벽 만들기


1. 먼저 group 을 생성해줍니다.

``` js 
    /**
     * House
     */

    // Group
    const house = new THREE.Group()
    scene.add(house)
```

2. 벽을 세워줍니다.

``` js
    // Walls
    const walls = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4, 2.5, 4),
        new THREE.MeshStandardMaterial({ color: '#ac8e82' }) // 임시 색상입니다.
    )

    walls.position.y = 2.5 / 2
    house.add(walls)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-03.png" width=500>

3. 지붕 만들기
   
``` js
    // Roof
    const roof = new THREE.Mesh(
        new THREE.ConeBufferGeometry(3.5, 1, 4),
        new THREE.MeshStandardMaterial({ color: '#b35f45' })
    )
    roof.position.y = 2.5 + 0.5
    roof.rotation.y = Math.PI / 4
    house.add(roof)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-04.png" width=500>

4. 문 만들기

``` js
    // Door
    const door = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2, 2),
        new THREE.MeshStandardMaterial({ color: '#aa7b7b' })
    )
    door.position.y = 1
    door.position.z = 2 + 0.01
    house.add(door)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-05.png" width=500>

5. 풀숲 만들기

``` js
    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
    const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush1.scale.set(0.5, 0.5, 0.5)
    bush1.position.set(0.8, 0.2, 2.2)

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(1.4, 0.1, 2.1)

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush3.scale.set(0.4, 0.4, 0.4)
    bush3.position.set(- 0.8, 0.1, 2.2)

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush4.scale.set(0.15, 0.15, 0.15)
    bush4.position.set(- 1, 0.05, 2.6)

    house.add(bush1, bush2, bush3, bush4)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-06.png" width=500>

## 묘비 만들기

각각의 묘비를 수동으로 하나씩 작성하기 보다는, 자동으로 생성하고 위치시키도록 해볼 것 입니다.

묘비를 랜덤하게 집 주변으로 원을 그리면서 놓을 수 있도록 하는것이 목적입니다.

``` js
    // Graves
    const graves = new THREE.Group()
    scene.add(graves)
```

이전 [3D Text](./210324_13%203D%20Text.md) 에서 하나의 geometry에 많은 도넛과 하나의 material을 생성한 것 처럼, 각각의 묘비 사이에서 공유하는 하나의 [BoxGeometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry) 와 [MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) 을 생성할 것 입니다.

``` js
    const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
    const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
```

마지막으로, 원에서 랜덤한 angle을 생성할 것 입니다. 전체적으로 돌린 것은 파이(`PI`) 의 두 배 입니다. 그리고 이 앵글을 `sin(...)` 과 `cos(...)` 두 단계에서 사용할 것 입니다. 이 방법은 circle 의 위치를 설정할 수 있습니다. 그리고 마지막으로 이 `sin(...)` 과 `cos(...)` 결과 값을 특정한 값으로 곱해줍니다. 완벽한 원형으로 그리지 않게 하기 위해서 입니다.