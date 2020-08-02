# API Reference

------

## `<router-link>`
사용자 네비게이션을 가능하게 하는 컴포넌트입니다. <br>
목적지의 위치는 `to` prop으로 지정됩니다.

##### `<router-link>`가 `<a href="...">` 보다 선호되는 이유

* history mode & hash mode 모두 동일한 방식으로 작동
* HTML 5 history mode에서, `<router-link>`는 클릭 이벤트를 차단하여 브라우저가 페이지를 다시 로드하지 않도록 합니다.
* HTML 5 history mode에서, `base` 옵션을 사용할 때 to prop의 URL에 이를 포함할 필요가 없습니다.

### `<router-link>` Props

#### `to`
- 자료형: ```string | location```

링크의 목적지를 나타냅니다. 클릭시 `to` props의 값은 내부적으로 `router.push()` 에 전달되므로 값은 문자열이나 위치 discriptor 객체가 될 수 있습니다.
```
  <router-link to="home">Home</router-link>
```

### replace
- 자료형: `boolean` - 기본값 `false`

`replace` prop을 설정하면 클릭할 때 `router.push()` 대신 `router.replace()` 를 호출 할 것이므로 내비게이션은 히스토리 레코드를 남기지 않습니다.
```
  <router-link :to="{ path: '/abc'}" replace></router-link>
```


### append
- 자료형: `boolean` - 기본값 `false`

`append` prop를 설정하면 항상 상대 경로가 현재 경로에 추가됩니다.
```
  // http:.../relative/path
  <router-link :to="{ path: 'relative/path'}" append></router-link>
```

### tag
- 자료형: `string` - 기본값: `"a"`

`router-link>`를 <li> 같은 태그로 렌더링하기 위해서 사용합니다.
```
  <router-link to="/foo" tag="li">foo</router-link>
  <!-- 이렇게 렌더링됩니다 -->
  <li>foo</li>
```

### active-class
- 자료형: `string` - 기본 값: `"router-link-active"`

링크가 활성화 되어있을 때 적용된 active CSS 클래스를 구성합니다. 


### exact
- 자료형: `boolean` - 기본 값: `false`

?..

### event
- 자료형: `string | Array<string>` - 기본값: `'click'`

링크 네비게이션을 트리거 할 수 있는 이벤트를 지정합니다.


### exact-active-class
- 자료형: `string` - 기본값: `"router-link-exact-active"`

정확하게 일치하는 링크가 활성된 상태일 때 적용되는 CSS 클래스를 지정합니다.

----

## `<router-view>`
`<router-view>` 컴포넌트는 주어진 라우트에 대해 일치하는 컴포넌트를 렌더링 하는 함수형 컴포넌트 입니다.

### `<router-view>` props


### name **
- 자료형: `string` - 기본 값: `"default"`

`<router-view>` 가 이름을 가지고 있을 때, 그것은 일치된 라우트 레코드의 components 옵션에서 해당 이름으로 컴포넌트를 렌더링 합니다.

-----

# 라우터 인스턴스

### router.app
- 자료형: `Vue instance`

`router`가 주입된 루트 Vue 인스턴스

### router.mode
- 자료형: `string`

router가 사용하는 모드


### router.currentRoute
- 자료형: `Route`

라우트 객체로 표시된 현재 라우트


## Methods

### router.beforeEach
### router.beforeResolve
### router.afterEach

전역 네비게이션 가드 추가.

### router.push
### router.replace
### router.go
### router.back
### router.forward

프로그래밍 방식으로 새 URL로 이동합니다.

### router.getMatchedComponents
지정된 위치 또는 현재의 라우트에 일치하는 컴포넌트의 배열을 반환합니다.<br>
이는 주로 데이터를 prefetching 하기 위해 서버 측 렌더링 동안 사용됩니다.

### router.resolve
역방향 URL 해석. `<router-link/> 에서 사용된 것과 같은 형식의 위치가 주어지면 다음과 같이 처리된 속성을 가진 객체를 반환합니다.
```
{
  location: Location;
  route: Route;
  href: string;
}
```

- `current` 현재 라우트를 나타냅니다. - 변경할 일이 없습니다.
- `append`는 `current` 라우트에 추가할 수 있도록 합니다.

### router.addRoutes
라우터에 동적으로 더 많은 라우트를 추가할 수 있습니다. <br>
전달 인자는 `routes` 생성자 옵션과 동일한 경로 설정 포맷을 사용하는 배열이어야 합니다.

### router.onReady
라우터가 초기 탐색을 완료할 때 호출하는 콜백을 대기시킵니다. <br>
초기 라우트와 연결된 모든 비동기 입력 훅 / 비동기 컴포넌트를 해결합니다.

### router.onError
라우트 탐색 중에 에러가 발견되면 호출 될 콜백을 등록하세요.

호출할 에러
* 에러는 라우트 가드 기능 내에서 동기적으로 발생한 경우
* 에러는 라우트 가드 함수 내에서 `next(err)` 를 호출하여 캐치한 경우
* 라우트를 렌더링하는데 필요한 비동기 컴포넌트를 처리하려고 할 때 에러가 발생한 경우


----

## 주입된 속성

이러한 프로퍼티는 라우터 인스턴스를 루트 인스턴스에 `router` 옵션으로 전달함으로써 모든 자식 컴포넌트에 주입됩니다.

* `$router` - 라우터 인스턴스
* `$route` - 현재 활성화 된 Route 입니다.  읽기 전용이므로 속성은 변경 할 수 없습니다.


