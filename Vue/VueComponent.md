# Component
기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 사용

### Generate Component
루트 Vue 인스턴스를 인스턴스화하기 전에 컴포넌트가 등록되어야 함
```
<div id="example">
  <my-component></my-component>
</div>

// 등록
Vue.component('my-component', {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
})

// 루트 인스턴스 생성
new Vue({
  el: '#example'
})
```


### Components - Local Registration 지역 등록
컴포넌트를 components 인스턴스 옵션으로 등록함으로써 다른 인스턴스/컴포넌트의 범위에서만 사용할 수있는 컴포넌트를 만들 수 있습니다
```
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

... 

<div id="example">
  <my-component></my-component>
</div>
```
* component의 data는 반드시 함수여야 합니다

```
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>

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


### Props
데이터는 props 옵션 을 사용하여 하위 컴포넌트로 전달 될 수 있습니다.

```
Vue.component('child', {
  template: '<span>{{ message }}</span>',
  // props 정의
  props: ['message']
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
})

...
<child message="안녕하세요!"></child>
```

#### 동적 props
