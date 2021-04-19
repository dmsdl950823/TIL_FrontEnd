# Vue Router

## 동적 라우터
같은 레이아웃을 가졌지만 다른 경로로 접근하여 같은 내용을 포함한 다른 내용을 표시해야할 경우
```
const User = {
  template: '<div>User name is : </div>'
}

const router = new VueRouter({
  routes: [
    // 동적 세그먼트는 콜론으로 시작합니다.
    { path: '/user/:id', component: User }
  ]
})

// 결과
'/user/foo'  =>  User name is : foo
'/user/foo'  =>  User name is : foo
```
동일한 라우트에 여러 동적 세그먼트를 가질 수 있으며, ```$routes.params``` 의 해당 필드에 매핑

|패턴|일치하는 패스|$route.params|
|------|---|---|
|/user/:username|	/user/evan|```{ username: 'evan' }```|
|/user/:username/post/:post_id|/user/evan/post/123|```{ username: 'evan', post_id: '123' }```|

## Params 변경 사항에 반응하기
동일한 컴포넌트의 params 변경 사항에 반응하려면 `$route` 객체를 `watch`하면 됩니다.
```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 경로 변경에 반응하여...
    }
  }
}
```

## 중첩된 라우트
여러단계로 중첩된 컴포넌트로 이루어진 UI에 쉽게 사용 가능
```
const User = {
  template: `
    <div class="user">
      <h2>User :: {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const router = new VueRouter({
// User, UserHome, UserProfile, UserPosts component가 있다는 가정
  routes: [
    { path: '/user/:id', component: User,
      children: [
        { path: '', component: UserHome }, 
        { path: 'profile', component: UserProfile },
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

// 결과
'user/foo'         => User :: foo / home
'user/foo/profile' => User :: foo / profile
'user/foo/posts'   => User :: foo / posts
```

-------------

## <router-view />

```<router-view>```는 url이 바뀔 경우 변경될 해당 레이아웃을 의미한다. <br>
```children```을 사용하여 변경될 범위 라우팅을 한다. <br>
해당 부분에서 routing 된 페이지가 움직이므로 많이 쓰지 않는게 좋다.

-------------

## 네비게이션

#### 🔹 router.push(location, onComplete?, onAbort?)
둘 다 같은 방식으로 URL을 이동할 수 있습니다.
|선언적 방식|프로그래밍 방식|
|------|---|
|```<router-link :to="...">```|```router.push(...)```|

```
  // 리터럴 string
  router.push('home')

  // object
  router.push({ path: 'home' })

  // 이름을 가지는 라우트, 해당 라우트에 넘길 파라미터
  router.push({ name: 'user', params: { userId: 123 }})

  // 쿼리와 함께 사용, 결과는 /register?plan=private 입니다.
  router.push({ path: 'register', query: { plan: 'private' }})
```

#### 🔹 router.replace(location)
router.push와 같은 역할을 하지만 유일한 차이는 새로운 히스토리 항목에 추가하지 않고 탐색 <br />
현재 항목을 대체

|선언적 방식|프로그래밍 방식|
|------|---|
|```<router-link :to="..." replace>```|```router.replace(...)```|

#### router.go(n)
이 메소드는 ```window.history.go(n)```와 비슷하게 히스토리 스택에서 앞으로 또는 뒤로 이동하는 단계를 나타내는 하나의 정수를 매개 변수로 사용

-----------

## 이름을 가지는 라우트
이름을 가진 라우트에 링크하려면, 객체를 ```router-link```, 컴포넌트의 ```to``` prop로 전달할 수 있습니다.
```
  routes: [
    {
      path: '/user/:userId',
      name: 'user', 👈🏻
      component: User
    }
  ]
  ...
  router.push({ name: 'user', params: { userId: 123 }})
  <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
  // 두 경우 모두 라우터는 /user/123 경로로 이동합니다.
```

-----------
## 이름을 가지는 뷰
여러 개의 뷰를 중첩하지 않고 동시에 표시해야 하는 경우 ```name```
```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

routes: [
  {
    path: '/',
    components: {
      default: Foo,
      a: Bar,
      b: Baz
    }
  }
]

// 결과
class="view one"            =>  Foo
class="view two" name="a"   =>  Bar
class="view three" name="b" =>  Baz
```

-----------

## 리다이렉트(리디렉션)
사용자가 `/a`를 방문했을 때 URL이 `/b`로 대체 된 다음 `/b`로 매칭된다는 것을 의미 <br>
사용자가 `/a`를 입력하여 방문을 시도할 때, URL이 `/b`로 이동하는것

```
  /* 'a'를 입력했을 때 - '/a' 에서 'b'로 리디렉션 */
  const router = new VueRouter({
    routes: [
      { path: '/a', redirect: '/b' }
    ]
  })
  
  /* '/a'를 입력했을 때 - 이름(name)이 'foo'로 지정된 라우트로 이동 */
  const router = new VueRouter({
    routes: [
      {
        path: '/a',
        redirect: { name: 'foo' }
      }
    ]
  })
  
  /* 동적 리디렉션을 위한 함수 사용 */
  const router = new VueRouter({
  routes: [
      { path: '/a', redirect: to => {
        // 함수는 인수로 대상 라우트를 받습니다.
        // 여기서 path/location 반환합니다.
      }}
    ]
  })
```

### 별칭
`/a`의 별칭은 `/b`는 사용자가 `/b`를 방문했을 때 URL은 `/b`을 유지하지만 사용자가 `/a`를 방문한 것처럼 매칭
```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

-----------------


## 라우트 컴포넌트에 속성 전달

1. `$route` 에 의존성 추가

```
  const User = {
    template: '<div>User {{ $route.params.id }}</div>'
  }
  const router = new VueRouter({
    routes: [
      { path: '/user/:id', component: User }
    ]
  })
```

2. 속성 의존성 해제
```
  const User = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
  }
  const router = new VueRouter({
    routes: [
      { path: '/user/:id', component: User, props: true },
    ]
  })
```

3. boolean 모드
```props = true``` 일경우 ```route.params```가 컴포넌트 ```props```로 설정


4. 객체모드 
```props```가 객체일때 컴포넌트 ```props```가 있는 그대로 설정 - 정적일 때 유용
```
  const router = new VueRouter({
    routes: [
      { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
    ]
  })
```

5. 함수모드
`props`를 반환하는 함수를 만들 수 있음. 이를 통해 전달인자를 다른 타입으로 캐스팅하고 적정인 값을 라우트 기반 값과 결합
```
  const router = new VueRouter({
    routes: [
      { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
    ]
  })
```


