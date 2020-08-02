
# 라우트 메타 필드
라우트를 정의할 때 `meta` 필드를 포함시킬 수 있습니다.

```
  const router = new VueRouter({
    routes: [
      {
        path: '/foo',
        component: Foo,
        children: [
          {
            path: 'bar',
            component: Bar,
            // 메타 필드
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  })
```

### meta 필드에 접근하는 방법

`routes` 설정의 각 라우트 객체를 라우트 레코드라고 합니다. 라우트가 일치하면 둘 이상의 라우트 레코드와 잠재적으로 일치 할 수 있습니다. <br>
라우트와 일치하는 모든 라우트 레코드는 `$route` 객체에 `$route.matched` 배열로 노출됩니다. <br>
그러므로 우리는 `$route.matched`를 반복하여 라우트 레코드의 메타 필드를 검사할 필요가 있습니다.




---------

### 스크롤 동작
<strong>이 기능은 HTML 5 히스토리 모드에서만 작동합니다.</strong> <br>
클라이언트 측 라우팅을 사용할 때 새로운 경로로 이동할 때 맨 위로 스크롤 하거나 실제 페이지를 다시 로드하는 것 처럼 컨텐츠 항목의 스크롤 위치를 유지 할 수 있습니다. <BR>


라우터 인스턴스를 생성 할 때 `srollBehavior` 함수를 제공할 수 있습니다.

```
  const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
      // 맨 위 위치로 돌아가기
      return { x: 0, y: 0 }
    }
  })
```

`savedPosition`은 브라우저의 뒤/앞으로 버튼으로 호출되는 `popstate` 네비게이션인 경우에만 사용할 수 있습니다. <br>
`savedPosition`을 반환하면 네이티브와 같은 동작이 발생합니다.

* `to`: 
