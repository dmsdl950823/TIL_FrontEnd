# Component

### Components - Local Registration 지역 등록
```
var Child = {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
    'my-component': Child
  }
})

... 

<div id="example">
  <my-component></my-component>
</div>
```
* data는 반드시 함수여야 함


### Props
데이터는 props 옵션 을 사용하여 하위 컴포넌트로 전달 될 수 있습니다.

```
Vue.component('child', {
  // props 정의
  props: ['message'],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
  template: '<span>{{ message }}</span>'
})

...
<child message="안녕하세요!"></child>
```

#### 동적 props
