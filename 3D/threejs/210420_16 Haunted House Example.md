# Haunted House Example
- [Haunted House Example](#haunted-house-example)
  - [Walls (벽)](#walls-벽)
  - [Graves (묘비)](#graves-묘비)
  - [Lights](#lights)
  - [Fog](#fog)
  - [Textures](#textures)
  - [The Door](#the-door)
  - [Walls (벽 텍스쳐)](#walls-벽-텍스쳐)
  - [바닥 (Grass)](#바닥-grass)
  - [Ghost](#ghost)
    - [Shadow](#shadow)


## Walls (벽)


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

## Graves (묘비)

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

``` js
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6 // 4 ~ 6 사이
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    graves.add(grave)
  }
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-07.png" width=500>

## Lights

지금까지 멋진 scene 을 만들었지만, 그렇게 무섭지는 않습니다. 먼저, 어둑한 파란빛의 ambient, moon light 를 만들어 봅시다.

``` js
    /**
    * Lights
    */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#d9d5ff', 0.12)
    // ...

    // Directional light
    const moonLight = new THREE.DirectionalLight('#d9d5ff', 0.12)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-08.png" width=500>

이렇게 설정해두니, 오브젝트들이 잘 보이지 않으므로, 문 위에 [PointLight](https://threejs.org/docs/index.html#api/en/lights/PointLight) 를 추가해봅시다. `scene` 에다가 추가하는 것 대신에, `house` 에 추가할 것 입니다.

``` js
    // Door Lights
    const doorLight = new THREE.PointLight('#ff7d45', 1, 7)
    doorLight.position.set(0, 2.2, 2.7)
    house.add(doorLight)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-09.png" width=500>

## Fog

호러 영화에서, fog 를 사용합니다. Three.js 도 [Fog](https://threejs.org/docs/#api/en/scenes/Fog) Class 를 지원합니다.

파라미터는,
1. `color`
2. `near`: camera 가 얼마나 멀리있을 때 부터 for 가 시작될지를 정합니다.
3. `far` : camera 가 얼마나 멀리있을 때 부터 fog 가 뿌옇게 될지를 정합니다.

fog를  활성화 시키기위해서는. `fog` 프로퍼티를 `scene` 에 추가합니다.

``` js
    // Fog
    const fog = new THREE.Fog('#262837', 1, 15)
    scene.fog = fog
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-10.png" width="500">

나쁘진 않지만, 묘비와 어두운 배경 사이에 명확한 경계가 있습니다.

이것을 고치기 위해서는, `renderer` 의 색을 fog와 색이 같도록 변경 해야합니다. `renderer` 인스턴스 바로 뒤에 추가합니다.

``` js
    /**
    * Renderer
    */
    // ...
    renderer.setClearColor('#262837')
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-11.png" width=500>

꽤 무서운 scene 이 탄생했습니다.

## Textures

`textureLoader` 를 추가합니다.

## The Door

앞에서 배운 door texture 를 모두 로드합니다.

``` js
    const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
    const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
    const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
    const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
    const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
    const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
    const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
```

그 후, 모든 texture 를 door material 에 적용시킵니다. `displacementMap` 이 이동할 꼭짓점이 생기도록  **[PlaneGeometry](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry) 에 더 많은 subdivision 을 추가해야하는것을 기억하세요!** 또한, [Material](210317_12%20Materials.md) 강의에서 배운것 처럼, geometry에 `aoMap` 을 위한 `uv2` attribute 를 추가하세요.

이제 door 의 geometry 를 `mesh.geometry` 로 접근할 수 있습니다.

``` js
    // Door
    const door = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
        new THREE.MeshStandardMaterial({
            map: doorColorTexture,
            transparent: true,
            alphaMap: doorAlphaTexture,
            aoMap: doorAmbientOcclusionTexture,
            displacementMap: doorHeightTexture,
            displacementScale: 0.1,
            // wireframe: true
            normalMap: doorNormalTexture,
            metalnessMap: doorMetalnessTexture,
            roughnessMap: doorRoughnessTexture
        })
    )
    door.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
    )
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-12.png" width=500>

## Walls (벽 텍스쳐)

벽에 `/static/textures/bricks/` 폴더 내부에 있는  texture 를 이용하여 표면에 질감을 줍니다. 문 처럼 많은 texture 가 있지는 않지만, 그렇게 큰 문제는 아닙니다. alpha texture와 metal은 필요없으므로, metalness texture 도 필요하지 않습니다.

``` js
    /**
    * Textures
    */
    // ...
    const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
    const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
    const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
    const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
```

그 다음, 벽의 [MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) 를 업데이트 해줄 수 있습니다. `color` 프로퍼티를 삭제하고 ambient occlusion 을 위한 `uv2`  속성을 추가하는것을 잊지마세요!

``` js
    // Walls
    const walls = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4, 2.5, 4),
        new THREE.MeshStandardMaterial({
            map: brickColorTexture,
            aoMap: brickAmbientOcclusionTexture,
            normalMap: brickNormalTexture,
            roughnessMap: brickRoughnessTexture
        })
    )
    walls.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
    )
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-14.png" width=500>

## 바닥 (Grass)

벽과 마찬가지로, `/static/textures/grass/` 에 위치한 풀 texture 를 로드합니다.

``` js
    /**
    * Textures
    */
    // ...
    const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
    const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
    const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
    const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
```

바닥의 [MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) 을 업데이트하고, `color` 프로퍼티를 제거하고 `aoMap` 을 위하여 `uv2` attribute 를 추가합니다.

``` js
    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({
            map: grassColorTexture,
            aoMap: grassAmbientOcclusionTexture,
            normalMap: grassNormalTexture,
            roughnessMap: grassRoughnessTexture
        })
    )
    floor.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
    )
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-15.png" width=500>

현재 texture 가 너무 큽니다. 수정하려면 간단하게 grass texture 를 `repeat` 프로퍼티를 이용하여 반복시켜주면 됩니다.

``` js
    /**
    * Textures
    */
    // ...
    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-16.png" width=500>

반복을 활성화 시켜주려면 `wrapS` 와 `wrapT` 프로퍼티를 변경해야합니다.

``` js
    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping

    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-17.png" width="500">


## Ghost

유령을 만들기 위해서는, 우리가 아는 내용들을 간단하게 사용해야합니다.

간단한 light 를 집 주변으로 둥둥 띄워서 묘비 주변을 지나다니도록 설정할 것 입니다.

``` js
    // Ghosts
    const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
    const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
    const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
    scene.add(ghost1, ghost2, ghost3)
```

이제 삼각법 수학적 공식을 이용하여 애니메이션을 입힙니다.

``` js
    /**
    * Animate
    */
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update Ghosts
        const ghost1Angle = elapsedTime * 0.5
        ghost1.position.x = Math.cos(ghost1Angle) * 4
        ghost1.position.z = Math.sin(ghost1Angle) * 4
        ghost1.position.y = Math.sin(ghost1Angle * 3)

        const ghost2Angle = - elapsedTime * 0.5
        ghost2.position.x = Math.cos(ghost2Angle) * 5
        ghost2.position.z = Math.sin(ghost2Angle) * 5
        ghost2.position.y = Math.sin(ghost2Angle * 4) * Math.sin(elapsedTime * 2.5)

        const ghost3Angle = - elapsedTime * 0.18
        ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
        ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
        ghost3.position.y = Math.sin(ghost3Angle * 5) + Math.sin(elapsedTime * 2)

        // ...
    }
```

### Shadow

마지막으로, 진짜같이 보이도록 하기 위해서 shadow 를 추가합니다.

``` js
    /**
    * Shadows
    */
    renderer.shadowMap.enabled = true
```

그림자를 만들어야 할 곳에 빛의 shadow 를 활성화 시켜줍니다.

``` js
    moonLight.castShadow = true
    doorLight.castShadow = true
    ghost1.castShadow = true
    ghost2.castShadow = true
    ghost3.castShadow = true

    walls.castShadow = true
    bush1.castShadow = true
    bush2.castShadow = true
    bush3.castShadow = true
    bush4.castShadow = true
```

scene 의 각 object 에 적용하세요.

``` js
    // Graves
    // ...
    for (let i = 0; i < 50; i++) {
        // ...
        grave.castShadow = true // shadow
        // ...
    }

    /**
    * Shadows
    */
    // ...
    floor.receiveShadow = true
```

<img src="https://threejs-journey.xyz/assets/lessons/16/step-19.png" width=500>

그림자가 있어서 훨씬 더 자연스러워졌지만, 퍼포먼스때문에 최적화를 시켜주어야 합니다.

``` js
    /**
    * Renderer
    */
    // ...
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

``` js
    /**
    * Shadows
    */
    // ...
    moonLight.shadow.mapSize.width = 256
    moonLight.shadow.mapSize.height = 256
    moonLight.shadow.camera.far = 15
    // ...

    doorLight.shadow.mapSize.width = 256
    doorLight.shadow.mapSize.height = 256
    doorLight.shadow.camera.far = 7
    // ...

    ghost1.shadow.mapSize.width = 256
    ghost1.shadow.mapSize.height = 256
    ghost1.shadow.camera.far = 7
    // ...

    ghost2.shadow.mapSize.width = 256
    ghost2.shadow.mapSize.height = 256
    ghost2.shadow.camera.far = 7
    // ...

    ghost3.shadow.mapSize.width = 256
    ghost3.shadow.mapSize.height = 256
    ghost3.shadow.camera.far = 7
    // ...
```

과정은 길지만 퍼포먼스를 위해서는 필수적입니다. 이미 퍼포먼스 한계에 대해서 언급하였으므로, 이 예제는 모바일에서는 60fps 를 지원하는 모바일 환경에서는 지원되지 않을 수 있습니다. 추후 강의에서 퍼포먼스에 대한 이야기를 나눠볼 것 입니다.
