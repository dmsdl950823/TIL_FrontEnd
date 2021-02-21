# Promise
`Promise`는 말그대로 "**지금은 없는데 이상 없으면 이따가 주고, 없으면 알려줄게**" 라는 "**약속**" 이다. 

## 1. promise 의 상태 ( `states` )

<img src="https://mdn.mozillademos.org/files/15911/promises.png"> 

`new Promise` 로 `Promise`를 생성하고 종료될 때까지를 의미하는 상태, 처리 과정

`Promise`로 등록된 내용이 `script`에 있다면, `Promise` 부분을 `pass` 한 후, 그 뒤의 일반 `script`들을 먼저 렌더링합니다.

* `Pending` - **대기** : 비동기 처리 로직이 아직 완료되지 않은 상태
  > new Promise 메서드를 호출한 상태입니다.
  >
  > `callback` 함수를 선언할 수 있으며, 매개변수는 `resolve` , `reject` 를 가지고 있습니다.
  > ``` js
  > const promise1 = new Promise( function ( resolve, reject ) {
  >   // ...
  > });
  > console.log(promise1())
  > // Promise {...} - Promise 객체 반환 
  > ```
* `Fullfilled`  -  **이행** : 비동기 처리가 완료되어 Promise가 결과값을 반환해준 상태
  > 콜백 함수의 인자 `resolve` 를 아래와 같이 실행하면 이행상태(사실은 완료)가 됩니다. `resolve` 는 `Promise` 객체를 반환합니다.
  >
  > 이제 `then` 을 이용하여 `Promise` 객체의 결과 값을 받을 수 있습니다.
`then` 은
  > 1. *성공(resolve)했을 때 사용하는 콜백함수*
  > 2. *실패(reject)했을때를 위한 콜백함수[옵션]*
  >
  > 두 가지를 매개변수로 받을 수 있습니다. 또한 `then` 은 'chaining' 을 사용하여 계속 연이어 사용할 수 있습니다.
  > ``` js
  >  new Promise( function ( resolve, reject ) {
  >    resolve('result contents');
  >  })
  >    .then( function (result) {
  >    console.log( result )	
  >    } )
  >  // .then(...).then(...)
  > ```

* `Rejected`  -  **실패** : 비동기 처리가 실패하거나 오류가 발생한 상태
  > `reject` 를 실행하면 실패 상태가 됩니다.
  > 실패 상태가 되면 *실패한 이유* (실패 처리의 결과 값) 를 `catch()`  로 받을 수 있습니다.
  > ``` js
  >  new Promise( ... ).then().catch();
  > ```
* `Settled` -  **결과** : 비동기 처리가 끝난 상태 (성공, 실패 둘다 포함)

## 2. Promise API

### `Promise.all()`
`Promise` 객체가 여러개 있어, 실행을 여러번 해야할 경우 코드가 복잡해지고 실행시간이 길어지기 때문에 `Promise.all()`을 사용하여 비동기 처리를 한번에 하여 시간을 단축시킬 수 있습니다.
``` js
  const promise1 = new Promise(function(resolve,reject){
    resolve('result1')
  });
  const promise2 = new Promise(function(resolve,reject){
    resolve('result2')
  });

  Promise.all([promise1,promise2]).then(function(values){
      console.log("1,2 모두완료",values);
  });
  // "1,2 모두 완료" ['result1', 'result2']
```

### `Promise.allSettled()`

결과가 `reject` 되든, `resolve` 되든 실행하는 메서드입니다. status에 `rejected` 사유가 들어갑니다.

``` js
  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
  const promises = [promise1, promise2];

  Promise.allSettled(promises).
    then((results) => results.forEach((result) => console.log(result.status)));

  // "fulfilled"
  // "rejected"
```
### `Promise.allSettled()`
`Promise`객체들 중 하나가 `fullfill`/`reject`가 더 빨리 해결될 경우 해당 `Promise`객체를 리턴합니다.
``` js
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
  });

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
  });

  Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  });

  // result :: "two"
```
이외에도 많은 메서드가 있으니 [문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)를 참조하세요

~~1. 두번째 인자(await와 함께 사용해야함)~~

~~Promise 객체에 두번째 인자가 있다면, 해당 시간 만큼 await하여 기다립니다.~~

## `async`  /  `await`
`async`  , `await`  를 사용하면 비동기 코드를 작성할 때 비교적 쉽고 명확하게 코드를 작성할 수 있습니다. 사실상 비동기 처리는 그 결과가 언제 반환 될지 알 수 없기 때문에 동기식으로 처리하는 기법이 사용되어야 합니다. 대표적으로 `setTimeOut` , `callback` (체이닝 문제/가독성) , `promise` (체이닝/가독성)  가 있지만, 각자 약간의 문제점을 가지고 있습니다. `async`와 `await`는 이런 문제들을 해결함과 동시에 간단하게 사용 할 수 있습니다.

### 사용방법
`async` 는 `function` 앞에 붙여주면 되며, `await` 는 `async function` 안에만 있어야 합니다.  `await`  는 여러개 사용도 가능합니다. `async function` 자체와 `await`  는 모두 `Promise`를 반환합니다.

``` js
  async function goWork(time1, timeStartWork) {
    const time2 = await wakeUp(time1)
    const time3 = await takeSubway(time2)
    const time4 = await takeOffSubway(time3)
    const arrivalTime = await arriveWork(time4)
    if (arrivalTime > timeStartWork) {
      fire()
    }
  }
```
### 동작 순서
`async` 함수는 `await`  구문을 만나면 일단 멈춥니다.

``` js
  async function asynFuncSample() {
    setTimeout(function (){
      console.log(3)
    }, 0)
    console.log(1)
    const tile1 = await awaitFunc()
  }

  function awaitFunc() {
    console.log(2)
  }

  asynFuncSample()
  // 1 , 2 , 3
```
이때 `promise`에 두번째 인자가 있다면 그만큼 기다림

# Macrotask 와 Microtask

Javascript는 `microtask`를 먼저 실행시키고, `macrotask`를 실행시킵니다.

| | |
|---|---|
| macrotask  | setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering .etc  |
| microtask |Promises, process.nextTick, queueMicrotask, MutationObserver .etc |


## `Promise`, `await`, `async` 사용 예제
### `Promise` 생성, 실행
``` js
  // Promise 생성
  const promise1 = function(bool){
    return new Promise(function(resolve,reject){
      if (bool) {
        resolve("결과값을 반환합니다.");
      } else {
        reject('에러가 있습니다.')
      }
    });
  }

  // Promise 실행
  promise1(true)
    .then(function(result){
      console.log(result); // 결과값을 반환합니다.
    }, function(err){
      console.log(err);    // 에러가 있습니다.
    });
```

### Promise 실행 순서

``` js
  const promise = (val = 0) => {
    console.log('2')
    return new Promise(resolve => {
      console.log('3')
      resolve(val)
      console.log('4')
    })
  }

  const fn1 = (val = 0) => {
    console.log('1')
    setTimeout(() => {
      console.log('8')
    }, 0)
    promise(val).then(resolved => {
      console.log('6')
      console.log(resolved)
    })
    console.log('5')
  }

  fn1('7')
  const promise = (val) => {
    console.log('1')
    return new Promise(resolve => {
      console.log('2')
      resolve(val)
      console.log('3')
    })
  }

  const fn1 = async (val) => {
    console.log('4')
    setTimeout(() => {
      console.log('5')
    }, 0)
    val = await promise(val)
    console.log('6')
    console.log(val)
  }

  fn1('안녕')
```
 

### Promise 에러 반환
``` js
  // 에러만 처리할 때
  Axios.post(`/sample`, {
    parameter
  }).catch(error => {
    console.error(error, 'error!')
  })


  Axios.post(`/sample`, {
    parameter
  }).then((res) => {
    console.log(res, 'gg')
  }, (error) => {
    console.log(error, 'error')
  })
```
[출처](https://blueshw.github.io/2018/02/27/async-await/)
