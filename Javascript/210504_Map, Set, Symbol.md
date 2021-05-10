# Map, WeakMap, Set, WeakSet

- [Map, WeakMap, Set, WeakSet](#map-weakmap-set-weakset)
  - [Map](#map)
    - [set() 과 get() 으로 값 할당하기](#set-과-get-으로-값-할당하기)
    - [Map 내부 순회](#map-내부-순회)
    - [Array 와의 관계](#array-와의-관계)
  - [WeakMap](#weakmap)
    - [사용 방법](#사용-방법)
  - [Set](#set)
    - [add() 와 delete() 로 Set 객체 사용](#add-와-delete-로-set-객체-사용)
    - [Set 내부 순회](#set-내부-순회)
    - [Array 와의 관계](#array-와의-관계-1)
    - [String 과의 관계](#string-과의-관계)
  - [WeakSet](#weakset)
    - [사용 방법](#사용-방법-1)

## Map

`Map` 객체는 `Object` 와 동일하게 키-값 쌍을 저장하며 삽입 순서도 기억하는 콜렉션 입니다. 어떤 값이라도 key, value 로 설정할 수 있습니다.

`Map` 이 `Object` 와 구별되는 중요한 특징이 있는데, 주요한 특징들은,

1. `Map` 의 key 는 함수, 객체 등을 포함한 모든 값이 가능합니다.
2. `Map` 은 명시적으로 제공한 키 외에는 어떤 키도 가지지 않습니다.
3. `Map` 의 키는 **정렬됩니다**! (순서가 있는 값) `Object` 는 순서가 없는 값입니다.
4. `size` 속성을 통해 항목 갯수를 알아낼 수 있습니다.
5. 성능이 좋습니다.

자세한 차이점은 [MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)를 참조하세요.

### set() 과 get() 으로 값 할당하기

``` js
    let map = new Map()

    // keys
    let keyString = 'string'
    let keyObj1 = {}
    let keyObj2 = { name: 'Princess' }
    let keyFunc = function () {}
    let override = () => {}

    // values
    const valObj1 = { name: 'JJD' }
    const valObj2 = { nickname: '공주' }

    // set(key, value) :: Object 와 유사하게 key와 value 할당
    map.set('key', 'value')
    map.set(keyString, '문자열 관련된 값')
    map.set(keyObj1, valObj1)
    map.set(keyObj2, valObj2)
    map.set(keyFunc, () => 'functionValue')
    map.set(override, 'Before Override')
    map.set(override, 'After Override')

    map.set(NaN, 'not a number') // NaN 을 key 로 사용

    // get(key) :: 키에 해당하는 값을 반환합니다.
    map.get('key') // 'value'
    map.get(keyString) // '문자열 관련된 값'
    map.get(keyObj2) // { nickname: '공주' }
    map.get(keyFunc) // [λ] :: Function
    map.get(keyFunc)() // 'functionValue'
    map.get(function () {}) // undefined
    map.get(() => {}) // undefined

    map.get('wrongKey') // undefined
    map.get(override) // After Override
    map.get(NaN) // 'not a number'

    map.size // 6
```

### Map 내부 순회

``` js
    let map = new Map()

    map.set(0, 'zero')
    map.set(1, 'one')

    /*
        0 : 'zero'
        1 : 'one' 
    */
    for (let [key, value] of map) {
        console.log(`${key} : ${value}`)
    }

    /*
        0 : 'zero'
        1 : 'one' 
    */
    for (let [key, value] of map.entries()) {
        console.log(`${key} : ${value}`)
    }

    /*
        0
        1
    */
    for (const key of map.keys()) {
        console.log(key)
    }

    /*
        zero
        one
    */
    for (const value of map.values()) {
        console.log(value)
    }

    /*
        0 : 'zero'
        1 : 'one' 
    */
    map.forEach((value, key) => {
        console.log(`${key} : ${value}`)
    }) 
```

### Array 와의 관계

``` js
    let map = new Map()

    // Array
    const array = [['key1', 'value1'], ['key2', 'value2']]
    // Map { 'key1' => 'value1', 'key2' => 'value2' }

    map.get('key1') // 'value1'
    map.get('key2') // 'value2'

    Array.from(map) // [['key1', 'value1'], ['key2', 'value2']]
    const isArray = [...map] // [['key1', 'value1'], ['key2', 'value2']]
    Array.from(map.keys()) // [ 'key1', 'key2' ]
```



## WeakMap
[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#weakmap_object) 객체는 Object 와 동일하게 키-값 쌍을 저장하며 삽입 순서도 기억하는 콜렉션 입니다. 어떤 값이라도 key, value 로 설정할 수 있습니다.

객체 참조는 *느슨하게* 연결되어있습니다. 만약 **더이상 참조하는 객체가 없다면 가비지 컬렉션 (GC) 의 타겟**이 된다는 의미입니다. `WeakMap` API 는 `Map` API 와 동일합니다.

`Map` 객체와의 차이점은, key를 순회할 수 없다는 것 입니다.

### 사용 방법

``` js
    const wm1 = new WeakMap()
    const wm2 = new WeakMap()
    const wm3 = new WeakMap()

    const o1 = {}
    const o2 = function () {}
    const o3 = window

    wm1.set(o1, 37)
    wm1.set(o2, 'azerty')
    wm2.set(o1, o2)
    wm2.set(wm1, wm2)
```

## Set

`Set` 객체는 자료형에 관계 없이 원시 값과 객체 참조 모두 유일한 값을 저장할 수 있습니다.


<img src="./images/스크린샷%202021-05-04%20오후%206.55.33.png" width=200>

### add() 와 delete() 로 Set 객체 사용

``` js
    const set = new Set([1, 2, 3, 4, 5])

    set.has(1) // true
    set.has(2) // true
    set.has(5) // true
    set.has(8) // false

    const setCopy = new Set(set)
    set === setCopy // false
```

``` js
    const set = new Set()

    set.add(1) // Set { 1 }
    set.has(1) // true

    set.add(5) // Set { 1, 5 }
    set.add('텍스트') // Set { 1, 5, '텍스트' }

    const o = { a: 1, b: '레몬' }
    set.add(o) // Set { 1, 5, '텍스트', { a: 1, b: '레몬' } }
    set.add({ a: 1, b: '레몬' }) // Set { 1, 5, '텍스트', { a: 1, b: '레몬' }, { a: 1, b: '레몬' } }

    set.has(o) // true

    set.size // 5

    set.delete(5) // Set { 1, '텍스트', { a: 1, b: '레몬' }, { a: 1, b: '레몬' } }
    set.size // 4
```

### Set 내부 순회

``` js
    const set = new Set()
    const arr = ['candy', 123, true, { key: 'value' }, [1, 2 , 3]]
    for (let i of arr) set.add(i)

    for (let item of set) item
    for (let item of set.keys()) item
    for (let item of set.values()) item
    for (let [key, value] of set.entries()) key, value // key와 value는 같음
    set.forEach(item => item)
    // 'candy', 123, true, { key: 'value' }, [1, 2 , 3]

    const setArr = Array.from(set)
    // [ 'candy', 123, true, { key: 'value' }, [ 1, 2, 3 ] ]

    set.add(document.body)
    set.has(document.querySelector('body')) // true

    const set1 = new Set([1, 2, 3, 'four'])
    set1.size // 4
    [...set1] // [1, 2, 3, 'four']

    // 집합
    const set2 = new Set([2, 3, 5, 17, true])
    const set3 = new Set([4, 5, 9, true, 'candy'])

    // 교집합, 차집합
    const intersection = new Set([...set2].filter(x => set3.has(x))) // Set { 5, true }
    const difference = new Set([...set2].filter(x => !set3.has(x)))  // Set { 2, 3, 17 }
```

### Array 와의 관계

``` js
    const arr = ['val1', 'val2', 'val3']
    const set = new Set(arr)

    set.has('val1') // true
    [...set] // ['val1', 'val2', 'val3']
```

### String 과의 관계

``` js
    const set = new Set('meow')

    set      // Set { 'm', 'e', 'o', 'w' } 
    set.size // 4
```

## WeakSet

[WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) 객체는 object 를 저장하는 집합입니다. `WeakSet` 내부의 객체는 한번만 생성될 수 있습니다. `WeakSet` 의 집합 안에서 고유하며(중복된 객체가 없습니다), 순회할 수 없습니다. 

[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) 객체와의 차이점은 아래와 같습니다.

* `Set` 과 다르게 `WeakSet` 은 객체의 집합이며, **객체만 저장**할 수 있습니다. 특정 type 의 값을 저장할 수 없습니다.
* 약한 참조를 가집니다. WeakSet 내에 저장된 객체에대한 참조가 없어지면, 가비지 컬렉션 (GC) 의 대상이 되어 수거됩니다.
* 내부를 순회할 수 없습니다.

### 사용 방법

``` js
    const ws = new WeakSet()
    const obj = {}
    const str = 'cat'

    ws.add(obj)
    ws.add(str) // Error :: Invalid value used in weak set

    ws.has(obj)    // true
    ws.delete(obj)
    ws.has(obj)    // false
```
