
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

## 스크롤 동작
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

--------------------------------------------------

## Lazy loading
번들러를 이용하여 앱을 제작할 경우, js 번들이 상당히 커져 페이지 로드 시간에 영향을 줄 수 있습니다. <br>
각 라우트의 컴포넌트를 별도의 단위로 분할하고 경로를 방문할 때 로드 하는것이 효율적일 것입니다.

Vue의 비동기 컴포넌트와 Webpack의 코드 분할을 결합하므로 라우트 컴포넌트를 쉽게 불러올 수 있습니다.

비동기 컴포넌트는 Promise를 반환하는 팩토리 함수로 정의할 수 있습니다. (컴포넌트가 resolve 되어야 합니다)

```
  const Foo = () => Promise.resolve({ /* 컴포넌트 정의 */ })
```

Webpack에서 dynamic import를 사용하여 코드 분할 포인트를 지정할 수 있습니다.
```
  import('./Foo.vue') // Promise를 리턴
```

