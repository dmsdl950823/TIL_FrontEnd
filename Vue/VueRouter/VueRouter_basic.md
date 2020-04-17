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

