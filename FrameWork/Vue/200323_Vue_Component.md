- [Component](#component)
  - [Generate Component](#generate-component)
  - [Components - Local Registration 지역 등록](#components---local-registration-지역-등록)
- [Props](#props)
  - [동적 props](#동적-props)
  - [props 검증](#props-검증)
- [`slot`](#slot)
  - [`slot-scope`](#slot-scope)
- [동적 컴포넌트](#동적-컴포넌트)
  - [keep-alive](#keep-alive)
  - [재사용 가능한 컴포넌트 제작하기](#재사용-가능한-컴포넌트-제작하기)
  - [자식 컴포넌트 참조](#자식-컴포넌트-참조)
  - [비동기 컴포넌트](#비동기-컴포넌트)
  - [컴포넌트 사이의 순환 참조](#컴포넌트-사이의-순환-참조)
  - [인라인 템플릿](#인라인-템플릿)
  - [X-templates](#x-templates)


# Component
기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 사용

## Generate Component
루트 Vue 인스턴스를 인스턴스화하기 전에 컴포넌트가 등록되어야 함
``` html
  <div id="example">
    <my-component></my-component>
  </div>
```
``` js
  // 등록
  Vue.component('my-component', {
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
  })

  // 루트 인스턴스 생성
  new Vue({
    el: '#example'
  })
```

## Components - Local Registration 지역 등록
컴포넌트를 components 인스턴스 옵션으로 등록함으로써 다른 인스턴스/컴포넌트의 범위에서만 사용할 수있는 컴포넌트를 만들 수 있습니다
``` js
  var Child = {
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
  }

  new Vue({
    el: '#example',
    components: {
      // <my-component> 는 상위 템플릿(id="example")에서만 사용할 수 있습니다.
      'my-component': Child
    }
  })
  // ... 
``` 
``` html
  <div id="example">
    <my-component></my-component>
  </div>
```
* component의 data는 반드시 함수여야 합니다

``` html
  <div id="example-2">
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
  </div>
```
``` js
  Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
    // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
    data: function () {
      // 각 컴포넌트의 고유한 상태를 입력함
      return {
        counter: 0
      }
    }
  })
```

--------
# Props
데이터는 props 옵션 을 사용하여 하위 컴포넌트로 전달 될 수 있습니다.

``` js
  Vue.component('child', {
    template: '<span>{{ message }}</span>',
    // props 정의
    props: ['message']
    // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
    // vm의 this.message로 사용할 수 있습니다.
  })
```
``` html
  <!-- ... -->
  <child message="안녕하세요!"></child>
```

## 동적 props

`v-bind`를 사용하여 부모의 데이터에 `props`를 동적으로 바인딩 할 수 있습니다. 데이터가 상위에서 업데이트 될 때마다 하위 데이터로도 전달됩니다.
``` html
  <div>
    <input v-model="parentMsg">
    <br>
    <child v-bind:my-message="parentMsg"></child>
  </div>
```

## props 검증
`prop`에 대한 요구사항을 지정할 수 있습니다. 요구사항이 충족 되지 않으면 Vue에서 경고를 내보냅니다. 

``` js
  Vue.component('example', {
    props: {
      propA: Number,            // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
      propB: [String, Number],  // 여러개의 가능한 타입
      propC: {                  // 문자열이며 꼭 필요합니다
        type: String,
        required: true
      },
      propD: {                  // 숫자이며 기본 값을 가집니다
        type: Number,
        default: 100
      },    
      propE: {                  // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
        type: Object,
        default: function () {
          return { message: 'hello' }
        }
      },
      propF: {                  // 사용자 정의 유효성 검사 가능
        validator: function (value) {
          return value > 10
        }
      }
    }
  })
```

# `slot`
원래 `<slot>` 태그 안에 있는 내용은 대체 콘텐츠 로 간주됩니다. 대체 콘텐츠는 하위 범위에서 컴파일되며 호스팅 엘리먼트가 비어 있고 삽입할 콘텐츠가 없는 경우에만 표시합니다.
`<slot>` 엘리먼트는 특별한 속성 인 `name` 을 가지고 있습니다. 이 속성은 **어떻게 내용을 배포해야 하는지를 더 커스터마이징하는 데 사용**할 수 있습니다. **이름이 다른 슬롯이 여러 개 있을 수 있습니다**. 이름을 가진 슬롯은 내용 조각에 해당 slot 속성이 있는 모든 엘리먼트와 일치합니다.
  ``` js
    <slot name="header"></slot>
  ```
    
## `slot-scope` 
``` html
  <li
    slot="item"
    slot-scope="props"
    class="my-fancy-item">
    {{ props.text }}
  </li>
```

----------------------------

# 동적 컴포넌트
 같은 마운트 포인트를 사용하고 예약된 `<component>` 엘리먼트를 사용하여 **여러 컴포넌트 간에 동적으로 트랜지션**하고 `is` 속성에 동적으로 바인드 할 수 있습니다.
 ``` js
  new Vue({
    el: '#example',
    data: {
      currentView: 'home'
    },
    components: {
      home: { /* ... */ },
      posts: { /* ... */ },
      archive: { /* ... */ }
    }
  })
```
``` html
  <component v-bind:is="currentView">
    <!-- currentView가 변경되면 컴포넌트가 변경됩니다! -->
  </component>
```
  
## keep-alive

트랜지션된 컴포넌트를 **메모리에 유지하여 상태를 보존**하거나 **다시 렌더링하지 않도록하려면** 동적 컴포넌트를 `<keep-alive>` 엘리먼트에 래핑 할 수 있습니다.

``` html
  <keep-alive>
    <component :is="currentView">
      <!-- 비활성화 된 컴포넌트는 캐시 됩니다! -->
    </component>
  </keep-alive>
```

## 재사용 가능한 컴포넌트 제작하기
Vue 컴포넌트의 API는 `prop`, `event` 및 `slot`의 세 부분으로 나뉩니다. 

* `props` 는 외부 환경이 데이터를 컴포넌트로 전달하도록 허용합니다.
* `event` 를 통해 컴포넌트가 외부 환경에서 사이드이펙트를 발생할 수 있도록 합니다.
* `slot` 을 사용하면 외부 환경에서 추가 컨텐츠가 포함 된 컴포넌트를 작성할 수 있습니다.

```v-bind``` 와 ```v-on``` 을 위한 전용 약어문을 사용하여 **의도를 명확하고 간결하게 템플릿에 전달**할 수 있습니다.

``` html
  <my-component
    :foo="baz"
    :bar="qux"
    @event-a="doThis"
    @event-b="doThat"
  >
    <img slot="icon" src="...">
    <p slot="main-text">Hello!</p>
  </my-component>
```

## 자식 컴포넌트 참조
`props`나 이벤트가 있었음에도 불구하고 때때로 JavaScript로 하위 컴포넌트에 직접 액세스 해야 할 수도 있으므로, ```ref``` 를 이용하여 참조 컴포넌트 ID를 자식 컴포넌트에 할당해야 합니다. 
```ref```가 ```v-for```와 함께 사용될 때, 얻을 수 있는 ref는 데이터 소스를 미러링하는 자식 컴포넌트를 포함하는 배열이 될 것입니다

``` html
  <div id="parent">
    <user-profile ref="profile"></user-profile>
  </div>
```
``` js  
  var parent = new Vue({ el: '#parent' })
  // 자식 컴포넌트 인스턴스에 접근합니다.
  var child = parent.$refs.profile
```

## 비동기 컴포넌트

진행중..

## 컴포넌트 사이의 순환 참조


## 인라인 템플릿


## X-templates




