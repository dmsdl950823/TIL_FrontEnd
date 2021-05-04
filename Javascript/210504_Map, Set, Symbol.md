# Map, Set, Symbol

- [Map, Set, Symbol](#map-set-symbol)
  - [Map](#map)
    - [set() 과 get() 으로 값 할당하기](#set-과-get-으로-값-할당하기)
    - [Map 내부 순회](#map-내부-순회)
    - [Array 와의 관계](#array-와의-관계)

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