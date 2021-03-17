# Javascript에서의 Event Loop, Callback, Promises, Async/Await

- [Event Loop](#event-loop)
- [Callback Functions](#callback-functions)
  - [Nested Callbacks and Pyramid of Doom](#nested-callbacks-and-pyramid-of-doom)
- [Promises](#promises)
- [Async Function with `async` / `await`](#async-function-with-async--await)

출처 [Trania Rascia](https://www.taniarascia.com/asynchronous-javascript-event-loop-callbacks-promises-async-await/)

-----------------------

# Event Loop

JS는 event loop로 어떻게 비동기(asyncronous) 코드를 핸들링할까요?

비동기적 Web API를 사용하지 않는 JS code 는 동기적으로(한번에 한줄씩, 순서대로) 코드를 실행합니다. 

``` js
  function first ()  {  console.log(1)  }
  function second () {  console.log(2)  }
  function third ()  {  console.log(3)  }

  first()
  second()
  third()    // 1 2 3
```
이 코드는 세개의 functions를 순서대로 실행합니다.

비동기적 Web API가 사용될 경우, 이 규칙은 조금더 복잡해집니다. (일반적으로 테스트 해볼 수 있는 내장 API 는 `setTimeout` 입니다) `setTimeout` 은 비동기적으로 실행될 필요가 있는데, 그렇지 않으면 **전체 브라우저는 응답을 대기하는 동안 동작하지 않습니다**.

``` js
  function first() {  console.log(1) }

  function second() {
    setTimeout(() => {
      console.log(2)
    }, 0)
  }
  function third() {  console.log(3)  }

  
  first()
  second()
  third()    // 1 3 2
```

timeout을 0 으로 지정해두어도 차이는 없습니다. 비동기적으로 실행되는 `console.log`는, 동기적으로 실행되는 우선적 function 뒤에 동작합니다. 이것은 Javascript host 환경에서 일어나기 때문인데, 이럴경우 브라우저에서는, 동시에 일어나는 이벤트를 처리하기 위해 ***event loop*** 라는 개념이 사용됩니다. Javascript는 한번에 한개의 구문만 실행하기 때문에, **어떤 특정한 구문이 언제 실행되어야 하는지에 대해서 알려줄 필요가 있습니다**. event loop는 이것을 *stack과 queue의 개념*으로 처리합니다.

* **Stack**

🎍

* **Queue**

🎍







# Callback Functions


## Nested Callbacks and Pyramid of Doom
# Promises
# Async Function with `async` / `await`
