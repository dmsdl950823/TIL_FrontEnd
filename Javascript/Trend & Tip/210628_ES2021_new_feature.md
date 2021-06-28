# ES2021 Features

- [ES2021 Features](#es2021-features)
  - [논리 할당 연산자 - Logical Assignment Operators](#논리-할당-연산자---logical-assignment-operators)
  - [숫자 분리 - Numeric Seperators](#숫자-분리---numeric-seperators)
  - [Promise.any 와 AggregateError](#promiseany-와-aggregateerror)
  - [String.prototype.replaceAll](#stringprototypereplaceall)
  - [WeakRefs 와 FinializationRegistry Objects](#weakrefs-와-finializationregistry-objects)


## 논리 할당 연산자 - Logical Assignment Operators 

``` js
  // Or Or Equal
  x ||= y
  x || (x = y)

  // And And Equals
  x &&= y
  x && (x = y)

  // QQ Eqauls
  x ??= y
  x ?? (x = y)
```

``` js
  // 사용 예제 - 모두 동일한 구문입니다

  if (!user.id) user.id = 1

  user.id = user.id || 1

  user.id ||= 1
```

``` js
  function setOpts (opts) {
    opts.cat ??= 'meow'
    opts.doc ??= 'bow'
  }
  setOpts({ cat: 'meow' })
```

## 숫자 분리 - Numeric Seperators

```js
  1_000_000_000          // 10 억
  101_475_938.38         // 수 억

  let fee = 123_00        // $123 (12300 cents)
  let fee = 12_300        // $12,300 (fee)
  let amount = 12345_00   // 12,345 (1234500 cents)
  let amount = 123_4500   // 123.45 (4-fixed financial)
  let amount = 1_234_500  // 1,234,500
```

``` js
  0.000_001     // 1 millionth
  1e10_000      // 10^1000 -- granted, far less useful / in-range
  0xA0_B0_C0
```

## Promise.any 와 AggregateError

``` js
  Promise.any([
    fetch('https://v8.dev').then(() => 'home'),
    fetch('https://v8.dev/blog').then(() => 'blog'),
    fetch('https://v8.dev/docs').then(() => 'docs')
  ])
  .then((first) => {
    // Promise 중 어떤것이든 수행되는 경우
    console.log(first) // home
  })
  .catch((error) => {
    // 모든 Promise 가 다 rejected 된 경우 ==> AggregateError
    console.log(error)
  })
```

## String.prototype.replaceAll

``` js
  const x = 'x'
  const xxx = 'xxx'

  x.replace('', '_')    // '_x'
  xxx.replace(/(?:)/g, '_')    // '_x_x_x_'
  xxx.replaceAll('', '_')    // '_x_x_x_'
```

## WeakRefs 와 FinializationRegistry Objects

``` js
  let target = {}
  let wr = new WeakRef(target)

  // wr 과 target 은 같지 않습니다!

  const registry = new FinailizationRegistry(heldValue => {
    // ...
  })

  registry.register(myObject, 'some value', myObject)

  // some time later, if you don't care about `myObject` anymore...
  registry.unregister(myObject)
```