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

  // 이름을 가지는 라우트
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










