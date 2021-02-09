# Transform

``` js
import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 * Mesh는 geometry와 metarial의 조합인 object 입니다.
 */
const geometry = new THREE.BoxGeometry(1, 1, 1) // cube
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // color
const mesh = new THREE.Mesh(geometry, material) // create mesh


/**
 * Transform
 * position, scale, rotation, quaternion 은 Object에서 모두 상속됩니다.
 * 해당 프로퍼티들은 render 전에 어디든 위치시켜 적용할 수 있습니다.
 */
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = -1
mesh.position.set(0.7, -0.6, -1)

scene.add(mesh)

/**
 * Scale
 * box의 x, y, z 크기 지정
 */
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.y = 0.5
mesh.scale.set(2, 0.5, 0.5)

/**
 * Rotation - 축을 기준으로 얼마나 회전할 것인지 설정
 * reorder() :: 설정 순서에 따라 rotation 결과가 달라집니다
 * Math.PI 를 사용하면 '얼만큼 회전할 것인지' 계산하기 편합니다.
 */
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI / 2
mesh.rotation.y = Math.PI / 2
mesh.rotation.z = 1

/**
 * Quaternion - 쿼터니온
 * rotaion을 표현하긴 하지만 더 수학적인 방법이고 order 문제를 풀수 있도록 해줍니다.
 * 해당 부분은 다루기 까다로우므로 수업에서 생략되었습니다
 */


/**
 * Groups Object
 * 그룹을 생성하여 생성한 3d 오브젝트들을 그룹핑합니다.
 */
const group = new THREE.Group()

scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

cube2.position.x = -1

group.add(cube1)
group.add(cube2)

/**
 * 그룹의 position, scale, rotation 속성을 변경할 경우
 * 그 그룹 내부의 모든 objects들의 해당 속성이 함께 변경됩니다.
 */
group.position.y = 0.8
group.scale.y = 2
group.rotation.y = 1


/**
 * Axes Helper
 * x, y, z 축 helper를 보여줍니다.
 * @param {Number} - axis 길이 :: c4d 축 같은것
 */
const axesHelper = new THREE.AxesHelper(1.5)
scene.add(axesHelper)

// scene과 object position 사이의 거리 확인 (?)
// vector의 길이를 구합니다.
// console.log(mesh.position.length())

/**
 * Normalize
 * @method normalize()
 * position.length() 의 값을 floor -> int로 변경해줍니다.
 */
// console.log(mesh.position.normalize())
// console.log(mesh.position.length())

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}


/**
 * Camera
 * PerspectiveCamera
 * @param {Number} fov - Field of view (시야각)
 * 큰 angle을 사용할 경우, 작은 사각형 내부에 그려지기 때문에 왜곡이 많더라도 모든 방향을 한번에 봐야합니다.
 * :: If you use a very large angle, you'll be able to see in every direction at once but with much distortion, because the result will be drawn on a small rectangle.
 * @param {Float || Number} - aspect ratio (화면비) :: height 으로 나눈 canvas width 값
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1

scene.add(camera)

/**
 * lookAt
 * 카메라가 정확하게 특정 오브젝트를 바라보게 하는 것!
 * @param {Vector 3} - 오브젝트의 x, y, z position를 가진 Vetor obj
 */

// camera.lookAt(new THREE.Vector3(3, 0, 0))
camera.lookAt(mesh.position)

// scene과 camera position 사이의 거리
// console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 * WebGLRenderer ... 그 외 Renderer가 많으므로 docs 참고
 * @param {Object} canvas canvas where we want to draw scene.
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```
