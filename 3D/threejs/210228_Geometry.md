- [Geometry](#geometry)
  - [Geometry는 무엇인가요?](#geometry는-무엇인가요)
  - [다른 내장 geometry](#다른-내장-geometry)
  - [Box 예시 생성](#box-예시-생성)
  - [buffer geometry 생성하기](#buffer-geometry-생성하기)
    - [전체 코드](#전체-코드)
  - [Index](#index)

# Geometry

## Geometry는 무엇인가요?
Three.js에서, geometry는 3D 좌표의 꼭짓점(vertice 또는 vertex)과 면 들로 이루어져있습니다.

지금까지의 예제는 mesh를 생성하기 위해서 geometry를 사용했지만, geometry를 particle 형태로 사용할 수도 있습니다. 각각의 꼭짓점은 particle과 일치합니다. (추후에 설명)

더 많은 데이터를 꼭짓점 안의 위치에 저장할 수 있습니다.

## 다른 내장 geometry

Three.js는 많은 built-in geometry를 가지고있습니다. 정확하기 각각을 어떻게 사용하는지 알 필요는 없지만, 알고는 있는게 좋아요.

* [`BufferGeometry`](https://threejs.org/docs/#api/en/core/BufferGeometry) :: mesh, line, point geometry의 대표. 
* [`BoxGeometry`](https://threejs.org/docs/#api/en/geometries/BoxGeometry) box 생성
* [`PlaneGeometry`](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) plane 생성
* [`CircleGeometry`](https://threejs.org/docs/#api/en/geometries/CircleGeometry) disc나 disc의 부분 생성
* [`ConeGeometry`](https://threejs.org/docs/#api/en/geometries/ConeGeometry) cone 생성. cone의 시작/끝부분을 설정할 수 있다.
* [`CylinderGeometry`](https://threejs.org/docs/#api/en/geometries/CylinderGeometry) cylinder 생성. cylinder의 시작, 끝, radius를 설정할 수 있다.
* [`RingGeometry`](https://threejs.org/docs/#api/en/geometries/RingGeometry) 평평한 ring 또는 평평한 circle의 부분을 생성.
* [`TorusGeometry`](https://threejs.org/docs/#api/en/geometries/TorusGeometry) Torus 생성
* [`TorusKnotGeometry`](https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry) 엮여있는 geometry 생성
* [`DodecahedronGeometry`](https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry) 12면을 가진 구를 생성/설정 할 수 있다.
* [`OctahedronGeometry`](https://threejs.org/docs/#api/en/geometries/OctahedronGeometry) 8면을 가진 구를 생성/설정 할 수 있다.
* [`TetrahedronGeometry`](https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry) 4면을 가진 구를 생성/설정 할 수 있다
* [`IcosahedronGeometry`](https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry) 삼각형으로 이루어진 구를 생성할 수 있다.
* [`SphereGeometry`](https://threejs.org/docs/#api/en/geometries/SphereGeometry) 가장 흔한 구 형태를 생성할 수 있다. 
* [`ShapeGeometry`](https://threejs.org/docs/#api/en/geometries/SphereGeometry) path 기반으로 구를 생성
* [`TubeGeometry`](https://threejs.org/docs/#api/en/geometries/TubeGeometry) path를 기반으로 tube를 생성
* [`ExtrudeGeometry`](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) path를 기반으로 추출(extrusion)합니다. bevel 도 컨트롤 할 수 있습니다.
* [`LatheGeometry`](https://threejs.org/docs/#api/en/geometries/LatheGeometry) vase 형태를 생성
* [`TextGeometry`](https://threejs.org/docs/#api/en/geometries/TextGeometry) 3D text 생성. json 형태로 typeface를 제공해야합니다.

Three.js에서 제공되지 않는 특별한 geometry가 필요한경우엔 JS로 특별한 geometry를 만들거나 3D software로 만든 후 export/import하여 만들수 있습니다.

## Box 예시 생성


![BoxGeometry](https://threejs-journey.xyz/assets/lessons/09/step-01.png)
``` js
  /**
   * @function BoxGeometry
   * @param width - x 축 사이즈
   * @param height - y 축 사이즈
   * @param depth - z 축 사이즈
   * @param widthSegments - x축 segment 갯수
   * @param heightSegments - y축 segment 갯수
   * @param depthSegments - z축 segment 갯수
   */
  const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)
  
  const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true // wireframe 만 볼 수 있도록 설정
  })
```

![SphereGeometry](https://threejs-journey.xyz/assets/lessons/09/step-02.png)
``` js
  const geometry = new THREE.SphereGeometry(1, 32, 32)
```

## buffer geometry 생성하기

만약 geometry가 아주 복잡하거나 정교한 모양을 가지고 있다면, 3D software를 사용하여 제작하는게 낫지만,
엄청나게 복잡하지는 않자면, `BufferGeomery`를 사용하여 제작할 수 있습니다.


buffer geometry를 생성하기 위해서는, 빈 [`BufferGeometry`](https://threejs.org/docs/#api/en/core/BufferGeometry)를 사용합니다. 간단한 삼각형을 만들어봅시다.

``` js
  // empty BufferGeometry
  const geometry = new THREE.BufferGeometry()
```
`BufferGeometry`에 꼭짓점을 추가하기 위해서는, `Float32Array`(JS typed Array)를 사용히여야 합니다.  float와, array가 고정된 길이를 저장할 수 있습니다.

``` js
  // 선으로된 삼각형 생성
  const positionArray = new Float32Array([
    0, 0, 0, // 첫번째 꼭짓점 x, y, z
    0, 1, 0, // 두번째 꼭짓점 x, y, z
    1, 0, 0  // 세번째 꼭짓점 x, y, z
  ])
```
이 Array는 첫번째 꼭짓점의 `x`, `y`, `z` 가 정의된 1차원적 Array 입니다.

`BufferGeometry`에 해당 Array를 보내기 전에, [`BufferAttribute`](https://threejs.org/docs/#api/en/core/BufferAttribute)를 변경시켜주어야 합니다.

`BufferAttribute`의 첫번째 param은 정의한 `Float32Array`이고, 두번째 param은 하나의 vertex 속성을 생성하기위해 얼마의 값을 생성해야할지를 알려주는 값입니다. 이 Array를 읽기위해서는, 꼭짓점 위치가  3개의 값 (`x`, `y`, `z`) 이므로 `3`을 사용해야합니다.

``` js
 const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
```

그리고 이 속성을 `BufferGeometry`에 `setAttribute(...)` 를사용하여 추가해줍니다. 첫번째 param은 이 attribute의 이름이고, 두번째 param은 값입니다.

``` js
  geometry.setAttribute('position', positionAttribute)
```
이것은 Three.js 내부 shader가 꼭짓점 위치(`position`)의 값을 찾기 때문에, `'position'`을 선택합니다.

면은 자동으로 꼭짓점의 순서대로 생성됩니다.

### 전체 코드

![BufferAttribute](https://threejs-journey.xyz/assets/lessons/09/step-06.png)
``` js
  // Create an empty BufferGeometry
  const geometry = new THREE.BufferGeometry()

  // Create a Float32Array containing the vertices position (3 by 3)
  const positionsArray = new Float32Array([
      0, 0, 0, // First vertex
      0, 1, 0, // Second vertex
      1, 0, 0  // Third vertex
  ])

  // Create the attribute and name it 'position'
  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
  geometry.setAttribute('position', positionsAttribute)
```

## Index

`BufferGeometry`의 흥미로운 점은 `index` 프로퍼티를 사용하여 꼭짓점을 상호적으로 만든다는 것 입니다. cube같은경우, 여러개의 면들이 한개의 꼭짓점을 공유하고 있습니다. 그리고 모든 꼭짓점이 다양한 이웃 삼각형들을 사용하게 됩니다. 이것은 결국 더 작은 attribute array와 performance 향상으로 이어집니다. 이것은 추후 설명.
