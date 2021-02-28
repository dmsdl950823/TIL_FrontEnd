# Vue `Computed` - Getter & Setter

## `Computed`
`computed` 프로퍼티는 `methods`와 비슷하지만, 아주 강력한 힘을 가지고 있습니다. `Computed`는 **캐싱(cache)을 가지고있다는 것**입니다.

### 그래서 캐싱이 뭔가요?

**캐시(cache)는 잠시 저장해 둔다는 의미**를 가진 특별한 기능입니다.

> 하드웨어에서 **'캐시 메모리'**라고 하면 실제 메모리와 CPU 사이에서 빠르게 전달하기 위해 미리 데이터들을 저장해 두는 좀 더 빠른 메모리입니다.
> 
> 같은 맥락으로 네트워크 영역에서도 캐시는 **로컬 장소에 파일을 미리 받아놓는것을 의미**합니다. 웹 서버에서도 매번 번거롭고 느리게 로딩을 해야 하는 파일들을 미리 로딩해두고, 발빠른 응답을 주기도 합니다. 데이터 베이스를 매번 확인해야 하는 것도 캐시 서버를 이용한다면 빠른 응답을 줄 수 있습니다. 먼 곳에 있는 파일을 매번 가져와야 한다면 네트워크 구간이 멀기 때문에 실패율도 있을 수 있으며, 전송 속도가 느려질 수 있습니다. 캐싱은 이러한 문제를 방지하고 빠른 접근을 위해 가까운 서버에 올려놓는 것을 의미합니다.  출처

## `Computed` 프로퍼티로 퍼포먼스 최적화 하기
`computed` 프로퍼티는, Vue 인스턴스 Function 내에서 `this` 키워드와 연결됩니다. `computed` 프로퍼티는 data 프로퍼티 / methods와 같은 scope에 존재하며, 같은 방법으로 `<template>` 안에서 접근할 수 있습니다. 
`computed` 프로퍼티는 기본적으로 `getter` 만 가지고 있지만, 필요하다면 `setter` 를 지정하는 것도 가능합니다.

그러기 위해서는 `computed` 프로퍼티를 `get` 과  `set` 두가지 프로퍼티를 가진 `object` 로 변경해주어야 합니다.

두 프로퍼티 (또는 메서드로도 사용 가능합니다)는 우리가 `computed` 프로퍼티를 사용할 때,
get 은 값을 변경할 때, set 은 값을 변경할 때 사용됩니다.

``` js
  computed: {
    fullName: {
      get: function () { ... },        // get () { ... }
      set: function (newValue) { ...}  // set () { ... }
    }
  }
```
`set` methods 을 설정하면, 보시는 바와 같이 `newValue` 매개변수를 받습니다. 해당 매개변수는 `computed` 프로퍼티에 **특정 값을 등록하고자 할 때 입력할 새로운 값을 포함**하고 있습니다. 그래서 `set` methods 안에서는, **`data` 프로퍼티를 간단하게 업데이트** 할 수 있습니다.

실제 사용 예제를 보겠습니다.

``` html
<button v-on:click="changeNameSetter("Mark Gonzales")">Change Name (setter)</button>
```
``` js
  computed: {
    fullName: {
      get () {
        alert("Assembling Full Name ... ");
        return this.firstName + ' ' + this.lastName;
      },
      set (newValue) {
        alert("Setting new name: " + newValue);
        const parts = newValue.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[parts.length - 1];
      }
    }
  },
  methods: {
    // ...
    changeNameSetter: function(newName) {
      this.fullName = newName; 
    }
  },
  data: {
    firstName: 'Bo',
    lastName: 'Andersen'
  }
```

출처[codingExplained - optimizing performance computed properties](https://codingexplained.com/coding/front-end/vue-js/optimizing-performance-computed-properties), [codingExplained - adding getters setters computed properties](https://codingexplained.com/coding/front-end/vue-js/adding-getters-setters-computed-properties)
