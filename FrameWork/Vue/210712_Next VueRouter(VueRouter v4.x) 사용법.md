# Next VueRouter(VueRouter v4.x) 사용법 및 Hash 삭제

- [Next VueRouter(VueRouter v4.x) 사용법 및 Hash 삭제](#next-vueroutervuerouter-v4x-사용법-및-hash-삭제)
  - [기존 VueRouter 호출방식](#기존-vuerouter-호출방식)
  - [Next VueRouter](#next-vuerouter)
  - [기본 Hash 삭제](#기본-hash-삭제)

이번에 새로 시작하게된 프로젝트를 Vue3 로 설정하게되었는데, Vue Router 를 사용하려니 기존 Vue 2 와 조금 다른 설정방식에 적응이 안되었다. 정말 간단하게 딱 두가지만 설명할 것이다.

## 기존 VueRouter 호출방식
일단 기존 Vue Router 에서 처럼, `import VueRouter from 'vue-router'` 를 호출하면 `undefined` 가 나온다. 이제는 모듈로 내보내주므로, 아래와 같은 방법으로는 Router 를 호출할 수 없다.

``` js
  // 안되는 예제 - VueRouter 4 는 이렇게 호출하지 않습니다.
  import VueRouter from 'vue-router'
  console.log(VueRouter) // undefined

  const router = new VueRouter({ routes })
  const app = new Vue({ router }).$mount('#app')
```

## Next VueRouter
VueRouter 4 버전 이상부터는, `createRouter`, `createWebHashHistory` 함수를 이용하여 라우터를 생성하고, 생성된 Vue App 에서 `use` 로 사용할 수 있다. ~~(왜 이렇게 바꾼지는 ... 불편하다)~~

[API 참고](https://next.router.vuejs.org/guide/#router-view)

``` js
  import { createRouter, createWebHashHistory } from 'vue-router'

  const routes = [
    {
      path: '',
      redirect: { name: 'login' }
    },
    {
      path: '/login', // 로그인 페이지
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login')
    },
    // ...
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  export default router
```

## 기본 Hash 삭제

라우터를 생성하면, url 에서 이제 원하는 대로 라우팅을 할 수 있는데.... 문제는 이번 업데이트에서 이런 이상한게 생겼다는것이다. 어느 url 로 가든 해시(`#`) 가 붙는다. 

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fco1DvE%2Fbtq9tJuJXwC%2FYMfrmY7OAq3pjolgEfmYw1%2Fimg.gif">

이럴땐 `createWebHashHistory` 가 아닌 `createWebHistory` 함수로 바꿔주면 원래 의도한 라우팅 사용이 가능하다.

``` js
  // router/index.js
  import { createRouter, createWebHistory } from 'vue-router'

  const routes = [/* ... */]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router
```

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Foo6Am%2Fbtq9sDIyWcI%2F5ZgfjkWkBmK8uPMKK5S2sk%2Fimg.gif">