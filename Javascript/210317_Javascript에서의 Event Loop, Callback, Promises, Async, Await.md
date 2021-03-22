# Javascript에서의 Event Loop, Callback, Promises, Async/Await

- [Javascript에서의 Event Loop, Callback, Promises, Async/Await](#javascript에서의-event-loop-callback-promises-asyncawait)
- [Event Loop](#event-loop)
    - [Stack](#stack)
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

### Stack

 *stack*은  (또는 call stack 이라고 부릅니다) 실행중인 function의 상태를 유지합니다. stack 에 대한 개념이 생소하다면, "후입선출(Last in, first out - LIFO)" 법을 가진 배열 이라고 생각하면 됩니다. Javascript는 stack에서 *current frame* 을 실행하며 (또는 특정한 환경에서 함수를 호출합니다), 삭제한 후, 다음 이동합니다.

 예를들어, 동기적인 코드만 실행한다고 했을 때, 브라우저는 아래 순서대로 실행합니다.

 * `first()` 를 스택에 추가하고, 1을 console에 찍는 `first()` 함수를 실행하고, `first()` 를 스택에서 삭제합니다.
 * `second()` 를 스택에 추가하고, 2를 console에 찍는 `second()` 함수를 실행하고, `second()` 를 stack에서 삭제합니다.
 * `third()`를 스택에 추가하고, 3을 console에 찍는 `third()` 함수를 실행하고, `third()` 를 스택에서 제거합니다.

두번째 예제 같은 `setTimeout` 을 이용한 예제는,

 * `first()` 를 스택에 추가하고, 1을 console에 찍는 `first()` 함수를 실행하고, `first()` 를 스택에서 삭제합니다.
 * `second()` 를 스택에 추가하고, timer를 실행하는 `setTimeout()` Web API 를 실행하고, 익명 함수를 `queue` 에 추가한뒤, `setTimeout()` 을 stack에서 제거합니다.
 * `second()` 를 stack에서 제거합니다.
 * `third()`를 스택에 추가하고, 3을 console에 찍는 `third()` 함수를 실행하고, `third()` 를 스택에서 제거합니다.
 * event loop는 pending message를 위해서  queue 를 확인하고, 익명 함수를 `setTimeout()` 에서 찾습니다. console에 2를 찍는 function을 stack에 추가하고, stack 에서 지웁니다.

비동기 Web API `setTimeout` 을 사용하는 것은, *queue* 의 개념을 도입하는 것 입니다.



* **Queue**

message queue 나 task queue라고 언급되기도 하는 *queue* 는, function을 위한 대기 공간 입니다. call stack이 비어있을 때, event loop는 wating message를 위해서 queue를  오래된 메세지부터 체크합니다. 하나를 찾으면 stack에 추가하고 function을 메세지 안에서 실행합니다.

`setTimeout` 예제에서, 익명 함수는 즉시 top-level function 실행을 먼저 한 후, `0` 초로 설정되어 있기 때문에 즉시 실행됩니다. timer는 정확히 0 초, 또는 어떤 시간을 입력하든지간에 그 후 바로 실행되지 않고, 입력된 시간 내에 익명함수를 queue에 추가한다는 것을 명심하고 있어야 합니다.

만약 timer가 timer가 끝나자 마자  익명함수를 직접적으로 stack에 추가한다면, 최근에 실행되고 있던 function들을 방해할 수 있습니다. 이것은 예상/의도되지 않은 결과를 낳을 수도 있습니다. 이 queue 시스템은, 이러한 문제를 방지하기 위해서 사용됩니다.

> *job queue* 또는  *microtask queue* 라고 하는, promise를 다루는 또다른 queue의 종류도 있습니다. Promise 같은 Microtask 는 `setTimeout` 같은 Macrotask 보다 더 높은 우선순위에서 처리 욉니다.

이제 event loop가 stack과 queue를 사용하여 코드 실행 순서를 처리를 하는 방법을 알았습니다. 다음 힐일은 실행 순서를 제어하는 방법을 찾는 것 입니다.

# Callback Functions

`setTimeout` 예제에서, timeout을 가진 function은 모든 top-level 실행 컨텍스트안에 있는 모든것이 끝난 후에 실행되었습니다. 그러나 만약, timeout 후에 실행되었던 `third` function 같은, function들 중 하나를 확실하게 하고 싶다면, 비동기적 코드 메서드를 사용하는게 좋습니다. 여기서 timeout 은 데이터를 가직있는 비동기 API를 대표합니다. 여러분은 API 호출로부터 data를 가져와서 작업하고싶지만, data가 제일 먼저 반환 되는지 확인해야합니다.

이런 문제를 해결하기 위한 기본 해결책은 *callback function* 을 활용하는 것 입니다. Callback function은 특별한 문법을 가지고있지는 않습니다. funtion 내부에 매개변수로 건내지는 function 입니다. 다른 function을 매개변수로 부여받은 function은 *higher-order function*이라고 불립니다. 정의에 의하면,  매개변수로 입력되면 어떤 function도 callback function 이될 수 있습니다. Callback은 자연적으로 비동기는 아니지만 비동기적 목적으로 사용될 수 는 있습니다.

higher-order function과 callback 예시 코드가 있습니다.

``` js
  function fn () {
    console.log('Just a function')
  }

  function higherOrderFunction (callback) {
    callback()
  }

  higherOrderFunction(fn)  // Just a function
```


다시 `setTimeout` 예제로 돌아와서, 

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

작업은 `second` 함수에서의 비동기 실행 후까지   `third` function 실행 을 항상 지연시킵니다. callback은 여기서 나옵니다. top-level 실행에서의 `first`, `second`, `third` 를 실행 시키는 대신, `third` function을 두번째로 넘겨줍니다. `second` function은 `callback`의 비동기 활동이 끝난 후 실행합니다.

``` js
  function first() {  console.log(1) }

  function second(callback) {
    setTimeout(() => {
      console.log(2)

      callback()
    }, 0)
  }
  function third() {  console.log(3)  }

  
  first()
  second(third) // 1 2 3
```

function을 callback으로 전달해줌으로써, 비동기적 Web API(`setTimeout`)가 끝나기 전에 function의 실행을 성공적으로 지연시켰습니다.

`setTimeout`은 비동기 업무를 담당하는 비동기적 Web API입니다만, callback function은 비동기가 아니라는 것이 중요합니다. callback은 언제 비동기적 업무가 끝나는지 알려주고, task의 성공/실패를 다룹니다.

어떻게 callback을 비동기 task에서 다루는지 배웠습니다. 다음은 너무많은 callback을 가질 경우, 콜백 지옥에 대해 설명합니다.

## Nested Callbacks and Pyramid of Doom
# Promises
# Async Function with `async` / `await`
