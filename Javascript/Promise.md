# Promise

### Promise 3가지 상태 (states)
> 프로미스의 처리 과정 - `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태 <br>
promise에 등록된 내용이 있다면, 먼저 pass 하고, 가능한 나머지 내용들을 먼저 렌더링.


1. Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태

>> `new Promise()` 메서드를 호출한 상태 <br>
콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, ```reject```

```
    new Promise(function(resolve, reject) {
      // ...
    });
```


2. Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태

>> 콜백 함수의 인자 ```resolve```를 아래와 같이 실행하면 이행(Fulfilled) 상태 - 사실은 완료 <br>
이제 ```then()```을 이용하여 처리 결과 값을 받을 수 있음

```
    new Promise(function(resolve, reject) {
      resolve();
    });
```


3. Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

>> `reject`를 호출하면 실패(Rejected) 상태 <br>
실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 ```catch()```로 받을 수 있음

```
    new Promise( ... ).then().catch();

```

### 두번째 인자

> Promise 객체에 두번째 인자가 있다면, 해당 시간 만큼 await하여 기다림.


```
    // 2초간 기다림
    new Promise((resolve, reject) => {
        // ...
    }, 2000)
```

