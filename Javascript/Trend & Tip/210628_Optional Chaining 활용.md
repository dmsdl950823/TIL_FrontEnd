# Javascript Optional Chaining 활용

[Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 을 이용하여 내부 프로퍼티 및 메서드에 접근 가능합니다

``` js
  const adventurer = {
    name: 'Alice',
    cat: {
      name: 'Dinah'
    },
    methods () {
      return 'This is methods!'
    }
  }

  const dogName = adventurer.dog?.name
  console.log(docName) // undefined

  console.log(adventurer.someMethods?.()) // 'This is methods!'
```

``` js
  // optional chaining 사용방법
  const greeting = object?.deepProp?.deeperProp?.greet
```

``` js
  // function 호출
  object?.deepProp?.function?.(args)
```

``` js
  // Array 접근
  object?.deepProp?.deepArray?.[5]
```

``` js
  // 구문 
  object?.deepProp?.[console.log("runs if deepProp defined")]
```