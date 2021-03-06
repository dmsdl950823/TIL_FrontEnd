# VueRouter_hard

## 네비게이션 가드
리디렉션하거나 취소하여 네비게이션을 보호하는 데 사용 <br>
전역, 라우트별 또는 컴포넌트로 라우터 탐색 프로세스에 연결 가능

### 전역 가드
```router.beforeEach((to, from, next) => { ... })``` 로 보호하기 이전에 전역 등록을 할 수 있음 <br>
네비게이션이 작동될 때마다 가드가 작성순서에 따라 호출되기 전의 모든 경우에 발생합니다. 가드는 비동기식으로 실행될 수 있으며 네비게이션은 모든 훅이 해결되기 전까지 <strong>보류 중</strong>으로 간주됩니다.

```
  router.beforeEach((to, from, next) => {
    // ...
  })
```

-  `to: 라우트` : 대상 Route 객체로 이동
-  `from: 라우트` : 현재 라우트로 오기전 라우트
-  `next: 함수` : 훅을 해결하기 위해 호출 되어야 함 - 액션은 `next`에 제공된 전달인자에 달려 있음
  - `next()` : 파이프 라인의 다음 훅으로 이동. 훅이 없는 경우 네비게이션은 승인됩니다.
  - `next(false)`: 현재 네비게이션을 중단합니다. 브라우저 URL이 변경되면 (뒤로 버튼을 통해 수동으로 변경) `from` 경로의 URL로 재설정 됩니다.
  - `next('/')` 또는 `next({ path: '/' })` : 다른 위치로 리디렉션합니다. 현재 네비게이션이 중단되고 새 네비게이션이 시작됩니다.
  - `next(error)`: `next`에 전달된 인자가 `Error`의 인스턴스이며 탐색이 중단되고 `router.onError()`를 이용해 등록 된 콜백에 에러가 전달됩니다.
  
  
<strong>항상 `next` 함수를 호출하십시오. 그렇지 않으면 훅이 절대 불러지지 않습니다.</strong>

### Global Resolve Guards
`router.beforeResolve`를 사용하여 글로벌 가드를 등록가능. <br>
`router.beforeEach`와 
모든 컴포넌트 가드와 비동기 라우트 컴포넌트를 불러온 후 네비게이션 가드를 확인하기 전에 호출된다는 차이 존재

### Global After Hooks
전역 훅을 등록 할 수도 있지만, 가드와 달리 이 훅은 `next` 함수를 얻지 못하며 네비게이션에 영향을줄 수 없음
```
  router.afterEach((to, from) => {
    // ...
  })
```

### 라우트 별 가드
```beforeEnter``` 가드를 라우트의 설정 객체에 직접 정의 가능 <br>
이러한 가드는 전역 이전 가드와 동일한 서명을 가짐
```
  routes: [
      {
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
          // ...
        }
      }
    ]
```

### 컴포넌트 내부 가드
`beforeRouteEnter` 와 `beforeRouteLeave`를 사용하여 라우트 컴포넌트(라우터 설정으로 전달되는 컴포넌트) 안에 라우트 네비게이션 가드를 직접 정의 가능
```
  const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
      // 이 컴포넌트를 렌더링하는 라우트 앞에 호출됩니다.
      // 이 가드가 호출 될 때 아직 생성되지 않았기 때문에
      // `this` 컴포넌트 인스턴스에 접근 할 수 없습니다!
    },
    beforeRouteUpdate () {
      // ...
    },
    beforeRouteLeave (to, from, next) {
      // 이 컴포넌트를 렌더링하는 라우트가 이전으로 네비게이션 될 때 호출됩니다.
      // `this` 컴포넌트 인스턴스에 접근 할 수 있습니다.
    }
  }
```

------

## 전체 네비게이션 시나리오

1. 네비게이션이 트리거
2. 비활성화될 컴포넌트에서 가드 호출
3. 전역 `beforeEach` 가드 호출
4. 재사용되는 컴포넌트에서 `beforeRouteUpdate` 가드 호출
5. 라우트 설정에서 `beforeEnter` 호출
6. 비동기 라우트 컴포넌트 해결
7. 활성화된 컴포넌트에서 `beforeRouteEnter` 호출.
8. 전역 `beforeResolve` 가드 호출
9. 네비게이션 완료
10. 전역 `afterEach` 훅호출
11. DOM 갱신 트리거
12. 인스턴스화 된 인스턴스들의 `beforeRouteEnter` 가드에서 `next`에 전달 된 콜백을 호출합니다.

-------

