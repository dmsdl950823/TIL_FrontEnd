- [Vue 반응형이란](#vue-반응형이란)
  - [변경된 내용을 추적하는 방법](#변경된-내용을-추적하는-방법)
  - [변경 감지 경고](#변경-감지-경고)
  - [반응형 속성 선언하기](#반응형-속성-선언하기)
  - [비동기 업데이트큐(Queue)](#비동기-업데이트큐queue)

# Vue 반응형이란

Vue의 특징 중 하나는 눈에 잘 띄지 않는 **반응형 시스템**입니다. 모델은 단순한 JS 객체이고, 데이터를 수정하면 화면이 갱신됩니다. 반응형 시스템은 상태 관리를 간단하고 직관적으로 만들어주지만, 잘 사용하려면 어떻게 작동하는지 이해가 필요합니다.

## 변경된 내용을 추적하는 방법
Vue 인스턴스에 JS 객체를 `data` 옵션으로 전달하면,
Vue는 모든 속성에 `Object.defineProperty()` 를 사용하여 getter / setter로 변환합니다. (Vue가 ES5와 IE8 이하를 지원하지 않는 이유이기도 합니다.)

getter / setter 는 사용자에게는 보이지 않지만, 속성(attr)에 접근하거나 수정할 때 Vue는 **property 추적 및 변경 알림을 수행**합니다. 이 반응형 동작을 이용하여, Vue는 변화가 언제 만들어졌는지 추적할 뿐 아니라, 언제 property에 접근되었는지도 추적합니다. 

변환된 데이터 객체가 기록될 때, 브라우저가 getter / setter 형식을 다르게 처리하므로 Vue `devtools`를 설치해야합니다.


모든 컴포넌트 인스턴스에는 해당 `Watcher` 인스턴스가 있으며, 이 인스턴스는 컴포넌트가 렌더링 되는 동안 **수정된 모든 속성을 기록**합니다. 고로 데이터 변화에 '**반응**' 하는것을 담당하게 됩니다. 데이터에 변화가 있을 때, setter가 trigger되면 `Watcher` 에 알리고, 컴포넌트의 `template`이 다시 렌더링 됩니다.

## 변경 감지 경고

최신 JS의 한계(그리고 `Object.observe()` 의 사용 중지)로 인해 Vue는 속성의 추가 제거를 감지할 수 없습니다. Vue 는 인스턴스 초기화중에 getter / setter 변환 프로세스를 수행하기 때문에 data 객체 내부에 속성이 정의되어 있어야 Vue가 이를 변환하고 응답할 수  있습니다.

``` js
  var vm = new Vue({
    data: {
      a: 1
    }
  })
  // `vm.a` 은 이제 반응적입니다.

  vm.b = 2
  // `vm.b` 은 이제 반응적이지 않습니다.
```

Vue는 이미 만들어진 인스턴스에 새로운 루트 수준의 반응 속성을 동적으로 추가하는 것을 허용하지 않습니다.
그러나  `Vue.set(object, key, value)` 메소드를 사용하여, 또는 `Vm.$set()` 인스턴스 메서드를 사용하여 중첩된 객체에 반응성 속성을 추가 할 수 있습니다.

왜 Vue는 `Array`의 변화를 감지하여 업데이트를 하지 못하는 것일까요? 이것은 Vue가 추적하지 못하는 JS의 한계인데, `array`의 `value`가 이렇게 변화할 때 생깁니다. 이를 위한 두가지 대안이 있는데, 
1. JS array function을 같은 방식으로 수행하기 위해서, Vue를 이것을 감싸면서 그 변화를 감지합니다.
2. 또하나는, Vue가 제공하는 `method`를 사용하는 것입니다.(`set` 메서드)


`Vue.set()` 메서드는 3가지 매개변수를 받는데,

1. 값을 바꾸고자하는 object나 array에 대한 참조,
2. 우리가 바꾸고자하는 `key`
3. 첫번째 매개변수에 정해놨던 `value`(?)

첫번째 매개변수로 전달한 `reference`는 Vue instance 나 Vue instance의 `data object`는 사용할 수 없습니다.

``` js
  Vue.set(vm.someObject, 'b', 2);

  this.$set(this.someObject, 'b', 2);
```

때로는 `Object.assign()` 또는 `_.extend()` 를 사용하여 기존 객체에 많은 속성을 할당 할 수 있습니다. 그러나 객체에 추가된 새 속성은 변경 내용을 trigger 하지 않습니다. 이 경우 원본 객체(`{ }`)와 mixin 객체(`this.someObject`) 의 속성을 사용하여 새 객체를 만듭니다.

``` js
  // `Object.assign(this.someObject, { a: 1, b: 2 })` 대신에
  this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

## 반응형 속성 선언하기

Vue는 data 옵션에 반응형 속성을 동적으로 추가 할 수 없으므로 모든 반응성 data 프로퍼티를 빈 값으로라도 초기에 선언하여 Vue 인스턴스를 초기화 해야 합니다.

``` js
  var vm = new Vue({
    data: {
      // 빈 값으로 message를 선언 합니다.
      message: ''
    },
    template: '<div>{{ message }}</div>'
  })
  // 나중에 `message`를 설정합니다.
  vm.message = 'Hello!'
```

data  옵션에 `message` 를 선언하지 않으면 Vue는 렌더 함수가 **존재하지 않는 속성에 접근**하려고 한다는 경고를 보냅니다.

## 비동기 업데이트큐(Queue)

Vue는 DOM 업데이트를 비동기로 합니다.
Vue는 같은 이벤트 루프 안에서 적용되는 모든 데이터를 변화시키는 역할을 하는 queue를 사용합니다.

데이터 변경이 발견 될 때마다 큐를 열고, 같은 이벤트 루프(`event loop`)에서 발생하는 모든 데이터 변경을 버퍼에 담습니다.

`event loop`란 DOM에 적용되지 않은 변화를 체크하고 그들을 적용하는 `for` 루프처럼 생각할 수 있습니다. event loop '`ticks`'와 변화의 `queue`는 항상 초기화 됩니다.
가장 중요하게 알아야 할 것은 `queue`는 DOM에 아직 적용되지 않았다는 점과, 아직 user에게 보이지 않은 변화라는 것입니다. 우리가 같은 값을 같은 이벤트 루프에서 반복적으로 두번 변화시킨다면, 가장 **최근의 변화가 `queue`에 추가**됩니다. 중요한것은 **DOM을 불필요하게 생산해내는 것을 피하고, 불필요한 계산을 피하게 해준다는 것**입니다. DOM은 비동기적으로 업데이트 되기 때문에, 변화가 적용되는데 조금이라도 늦어질 수 있기 때문입니다.

같은 `watcher`가 여러번 발생하면 **대기열에서 한 번만 푸시**됩니다. 이 버퍼링된 중복의 제거는 불필요한 계산과 DOM 조작을 피하는데 있어 중요합니다.

그 다음, 이벤트 루프 "`tick`"에서 Vue는 대기열을 비우고 실제(이미 중복 제거된) 작업을 수행합니다. 내부적으로는 Vue는 비동기 큐를 위해 네이티브`Promise.then` 과 `MessageChannel`을 시도하고 `setTimeout(fn, 0)` 으로 작동됩니다.

`data` 에 새로운 value를 설정하면, 컴포넌트는 즉시 재랜더링 되지 않고, `Queue`가 `flush` 될 때 - 다음 "`tick`"에서 업데이트 됩니다. 대개의 경우 이 작업을 신경 쓸 필요 없지만 **업데이트 후 DOM 상태에 의존하는 작업을 수행하려는 경우 까다로울 수 있습니다**. Vue는 일반적으로 개발자가 "데이터 중심" 방식으로 생각하고 **DOM을 직접 만지지 않도록 권장하지만 때로는 건드려야 할 수도 있습니다**.

Vue가 데이터 변경후 DOM업데이트를 마칠 때 까지 기다리면 데이터가 변경된 직후에 `Vue.$nextTick(callback)` 을 사용할 수 있습니다. **콜백은 DOM이 업데이트 된 후 호출**됩니다. 이는 내부 컴포넌트들에게 특히 유용합니다. 전역 Vue가 필요 없고 콜백의 `this` 컨텍스트가 자동으로 현재 **Vue 인스턴스에 바인드** 되기 때문입니다.  이 메서드는 `arguments`를 `callback` 함수로 받는데, 동작 후에 **Vue가 DOM을 업데이트 합니다**.

`$nextTick()` 은 `Promise`를 반환하므로, **ES2017 `async` /  `await` 문법을 사용하여 똑같은 동작을 수행할 수 있습니다**.

출처: [codingexplained - understanding vuejs reactivity](https://codingexplained.com/coding/front-end/vue-js/understanding-vue-js-reactivity)
출처: [codingexplained - array change detection](https://codingexplained.com/coding/front-end/vue-js/array-change-detection)

