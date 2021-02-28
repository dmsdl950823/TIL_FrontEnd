- [Vue Template Syntax](#vue-template-syntax)
  - [Interpolation `{{  }}`](#interpolation---)
  - [Directive](#directive)
    - [v-once](#v-once)
    - [v-html](#v-html)
    - [v-bind](#v-bind)
    - [v-on : event](#v-on--event)
  - [Computed](#computed)
  - [Watch](#watch)
    - [동적으로 watch를 추가하는 방법](#동적으로-watch를-추가하는-방법)
  - [Class & Style 바인딩](#class--style-바인딩)
    - [class 바인딩](#class-바인딩)
    - [style 바인딩](#style-바인딩)
  - [Logic rendering - 조건부 렌더링](#logic-rendering---조건부-렌더링)
    - [v-if](#v-if)
    - [v-show](#v-show)
  - [List rendering - 리스트 렌더링](#list-rendering---리스트-렌더링)
    - [v-for](#v-for)
    - [filtered result with v-for :: v-for를 이용한 filter된 결과 제작](#filtered-result-with-v-for--v-for를-이용한-filter된-결과-제작)
  - [Event Handling](#event-handling)
    - [v-on](#v-on)
    - [Event key](#event-key)
  - [Form binding](#form-binding)
    - [v-model](#v-model)
    - [Binding values - Value와 Binding 하기](#binding-values---value와-binding-하기)
  - [Modifiers](#modifiers)
  - [filter](#filter)

# Vue Template Syntax

## Interpolation `{{  }}`

문자열을 출력 할 수 있습니다.
또한 간단한 JS문법을 interpolation에 사용할 수 있습니다. (if 는 안됩니다)

``` html
  <span> message: {{ message }} </span> 

  {{ ok ? 'YES' : 'NO' }}

  {{ message.split('').reverse().join('') }}

  <div v-bind:id="'list-' + id"></div>
```

## Directive
### v-once

딱 한번만 출력하여 수정할 수 없게 지정할 수 있습니다.

``` html
  <span v-once> Can't modify this text : {{ message }} </span>
```
### v-html

Native HTML 태그를 그대로 프린트 할 수 있습니다.

``` html
  <p> Using v-html: <span v-html="rawHTML"></span> </p>
```
### v-bind

양방향 데이터 바인딩

** HTML attribute내 에 `{{  }}`는 사용할 수 없습니다.

``` html
  <!-- original syntax -->
  <a v-bind:href="url"> ... </a>

  <!-- simple version -->
  <a :href="url"> ... </a>

  <!-- shorthand with dynamic argument (2.6.0+) -->
  <a :[key]="url"> ... </a>
```
### v-on : event

이벤트를 발생시킵니다.

``` html
  <!-- original syntax -->
  <a v-on:click="doSomething"> ... </a>

  <!-- simple version -->
  <a @click="doSomething"> ... </a>

  <!-- shorthand with dynamic argument (2.6.0+) -->
  <a @[event]="doSomething"> ... </a>
```

## Computed
`method`와 `computed` 두개 모두 function/methods를 내부에 입력하여 사용할 수 있습니다.

그러나  `computed` 는 목표한 객체와 함께 **cached(캐시가 저장) 된다는 차이점**이 있습니다. `computed` 에서 사용하고있는 **data 프로퍼티에 변화가 있을 때 자동으로 다시 연산을 하여 연산한 값을 캐싱 해놓았다가 필요한 부분에 재사용**합니다. 다시말해 object에 변화가 있을때, function이 작동합니다. 반면에 `methods` 는 캐싱이라는 개념이 없기 때문에 **매번 재 랜더링**을 합니다.

캐싱효과가 필요한 상태를 변경하고 싶다면 강력한  `computed` 를 사용하고, 캐싱이 필요 없다면  `methods` 를 사용하면 됩니다.

``` js
  computed: {
    now: function () {
      return Date.now()  // => never update.
    }
  }
```
`computed` 는 'getter' function만을 가지고있지만(`get`), 원한다면 setter(`set`)를 만들 수 도 있습니다.

``` js
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
```

## Watch
지속적으로 특정 `data`의 변화를 관찰합니다. `async` 등의 작업을 할 때 `watch` 를 사용할 수 있습니다.

`computed` 와의 차이점은,  `computed` 는 **내장 api를 사용하는 간단한 연산정도에 적합**하고,
`watch` 는 데이터 호출과 같이 **시간이 상대적으로 더 많이 소모되는 비동기 처리에 적합**합니다.

``` js
  data () {
    return {
      watchData: 'sample'
    }
  },
  watch: {
    watchData (after, before) {
      console.log(after, before, '변화 전 data, 변화 후 data')
    }
  }
```
`watch` function에 매개변수(`after`, `before`)를 넣었다는 것을 주목해주세요. 이것은 **해당 데이터 값이 변할 때 마다 감지되는 새로운 값**을 의미합니다. `data` 프로퍼티가 변화할 때 마다 이 function 은 수행됩니다.

### 동적으로 watch를 추가하는 방법
우리가 가지고있는 변수 내부에서 `$watch` method도 사용할 수 있습니다. 이 `method`는 watcher 를 등록할 수 있게 해줍니다.

``` js
  data () {
    return {
      counter: 1
    }
  },
  methods: {
    watchingCounter () {
      vm.$watch('counter', function(newValue, oldValue) {
          alert('Counter changed from ' + oldValue + ' to ' + newValue + '!');
      });
    }
  }
```

## Class & Style 바인딩
### class 바인딩

``` html

  <!-- if 'isactive' is true, add 'active' class -->
  <div v-bind:class="{ active: isActive }" />

  <!-- It will be with 'static' class -->
  <div
    class="static"
    v-bind:class="{ active: isActive, 'text-danger': hasError }"
  />

  <!-- data: { activeClass: 'active', errorClass: 'text-danger' } -->
  <div v-bind:class="[activeClass, errorClass]"></div>

  <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

  <div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### style 바인딩

``` html
  <!-- data: { activeColor: 'red', fontSize: 30 } -->
  <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }" />

  <!-- styleObject: { color: 'red', fontSize: '13px' } -->
  <div v-bind:style="styleObject" />

  <div v-bind:style="[baseStyles, overridingStyles]" />
```

## Logic rendering - 조건부 렌더링
### v-if

조건에 맞으면 DOM에 요소를 추가합니다.

``` html
  <!-- // if 'ok' is true, render -->
  <h1 v-if="ok"> Yes </h1>
  <h1 v-else> No </h1>

  <div v-if="Math.random() > 0.5">
    Now you can see me
  </div>
  <div v-else>
    Not now!
  </div>

  <!-- // 2.1.0 + -->
  <div v-if="type === 'A'">       A  </div>
  <div v-else-if="type === 'B'">  B  </div>
  <div v-else-if="type === 'C'">  C  </div>
  <div v-else>                    Not A/B/C </div>
```


### v-show

조건에 맞으면 요소를 `display: none / block` 으로 숨김 / 보여줍니다

``` html
  <!-- // simply, display toggle -->
  <h1 v-show="ok">안녕하세요!</h1>
```

## List rendering - 리스트 렌더링
### v-for

반복 루프를 돌려 여러개의 요소를 렌더링합니다.

``` html
  <!-- // ... items: [ { message: 'Foo' }, { message: 'Bar' } ] -->
  <!-- // You can use 'of' instead of 'in' -->
  <div v-for="item of items" />

  <!-- // second parameter is index. + key is mandatory. -->
  <ul id="example-1">
    <li v-for="(item, index) in items" v-bind:key="item.id">
      {{ item.message }} + {{ index }}
    </li>
  </ul>

  <!-- // v-for object  -->
  <ul id="v-for-object" class="demo">
    <li v-for="(value, name) in object">
      {{ value }} : {{ value }}
    </li>
  </ul>
  <!--
    // data property -
    //... object: {
    //  title: 'How to do lists in Vue',
    //  author: 'Jane Doe',
    //  publishedAt: '2016-04-10'
    //}
  -->
```

### filtered result with v-for :: v-for를 이용한 filter된 결과 제작

``` html
  <li v-for="n in evenNumbers">{{ n }}</li>
  <!-- 
    // data property -
    /* evenNumbers: function () {
      return this.numbers.filter(function (number) {
      return number % 2 === 0
      })
    } */
  -->
```

만약 `v-for`과 `v-if`가 같은 노드에 있을경우, `v-for`가 더 높은 우선권을 가집니다.
**그러므로 `v-for`과 `v-if`를 같이쓸 수는 없습니다.**

## Event Handling
### v-on

이벤트를 발생시킵니다.

``` html
  <!-- // data : { counter: 0 } -->
  <button v-on:click="counter += 1">Add 1</button>
  <p> {{ counter }} </p>

  <button v-on:click="greet"> Greet </button>
```
``` js
  // methods
  ... greet: function(event) {
    alert('hello! You clicked ' + event.target.tagName)
  }
```
------
```html
  // Inline method 
  <button v-on:click="say('hi')"> Say hi </button>
```
``` js
  // methods
  ... say: function (message) {
    alert(message)
  }
```
이벤트객체를 parameter로 넘길수도 있습니다.

``` html
  <!-- // $event : DOM Event -->
  <button
    v-on:click="warn('Form cannot be submitted yet.', $event)"
  >
    Submit
  </button>
```
``` js
  // methods
  ... warn: function (message, event) {
    // now you can acess to Native Event
    if (event) event.preventDefault()
    alert(message)
  }
```
`stopPropagation()`과 `preventDefault()` 메서드와, 이벤트 캡쳐링를 미리 사용할 수도 있습니다.

``` html
  <!-- // .stop : stop click event  -->
  <a v-on:click.stop="doThis"></a>

  <!-- // .pervent = e.preventDefault() -->
  <form v-on:submit.prevent="onSubmit"></form>

  <!-- // chaining -->
  <a v-on:click.stop.prevent="doThat"></a>

  <!-- // simply use without method -->
  <form v-on:submit.prevent></form>

  <!-- // .capture : Using event capturing  -->
  <!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
  <div v-on:click.capture="doThis">...</div>

  <!-- event.target이 그 element하나뿐일 경우에 .self 메서드를 사용할 수 있습니다. -->
  <!-- // .self : handle trigger if event.target is only element itself(Not child element) -->
  <div v-on:click.self="doThat">...</div>

  <!-- // 2.1.4 +  -->
  <!-- // .once : click event can be triggered only once -->
  <a v-on:click.once="doThis"></a>

  <!-- // 2.3.0 +  -->
  <!-- // .passive : addEventListner's passive option -->
  <div v-on:scroll.passive="onScroll">...</div>
```

### Event key

마우스 / 키보드의 특정 키를 눌렀을 때 발생하는 이벤트를 지정합니다.

``` html
  <!-- // only call `submit()` when the `key` is `Enter` -->
  <input v-on:keyup.enter="submit">

  <!-- // keycode usage -->
  <input v-on:keyup.13="submit">

  <!-- // .enter  .tab  .delete  .space  .up  .down  .left  .right -->
  <!-- // .ctrl  .alt  .shift  .meta -->
  <input @keyup.alt.67="clear"> => Alt + C
  <div @click.ctrl="doSomething"> Ctrl + Click </div>

  <!-- // .exact : press certain key's comination exactly -->
  <button @click.ctrl.exact="onCtrlClick"> only work when ctrl key is pressed </button>

  <!-- // mouse button -->
  <!-- // .left  .right  .middle -->
```

## Form binding
### v-model

`data` 프로퍼티와 `form` 데이터 `value`를 직접적으로 연결시켜줄 수 있는 Directive 입니다.

``` html
  <!-- // data - message: '' -->
  <input v-model="message" placeholder="여기를 수정해보세요">
  <p>메시지: {{ message }}</p>
```
``` html
  <p style="white-space: pre-line">{{ message }}</p>
  <br>
  <textarea v-model="message" placeholder="여러줄을 입력해보세요"></textarea>
```
``` html
  <!-- // *** checkbox *** -->
  <!-- // data - checked = '' -->
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">{{ checked }}</label>
```
``` html
  <!-- // *** checked array *** -->
  <!-- // data - chekedNames : [] -->
  <div>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span> checked names: {{ checkedNames }}</span>
  </div>
```
``` html
  // *** radio ***
  // data - picked : ''
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>선택: {{ picked }}</span>
```
``` html
  <!-- // *** select - one *** -->
  <!-- // data - selected: '' -->
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span> Selected : {{ selected }}</span>
  <!-- // *** select - multiple *** -->
  <!-- // data - selected : '' -->
  <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }} </span>
```

### Binding values - Value와 Binding 하기
``` html
  <!-- //`picked` is "a" when it's selected -->
  <input type="radio" v-model="picked" value="a" />

  <!-- // `toggle` is true or false  -->
  <input type="checkbox" v-model="toggle">

  <!-- // `selected` is "abc" when "ABC" is selected -->
  <select v-model="selected">
    <option value="abc">ABC</option>
  </select>
```

## Modifiers

``` html
  <!-- // .lazy : sync after 'change' event -->
  <input v-model.lazy="msg" >

  <!-- // .number : Use if you want user input to be automatically changed as a Number -->
  <input v-model.number="age" type="number">

  <!-- // .trim : Use if you want to trim whitespace from user input automatically -->
```

## filter

**이 메서드는 Vue3에서 동작하지 않습니다.**

filters 는 **택스트에 대한 변화를 수행하는 방법을 제공**합니다. 문자열 인터폴레이션 `{{ }}` 안에서 사용될 수 있지만, 또한 `v-bind` 안에서도 사용할 수 있습니다. filters 프로퍼티는 의미론적으로는 `methods` 프로퍼티와 동일하지만, `key`는 `name` 을, `value` 로는 `functions`를 가집니다. 

``` js
  filters: {
    uppercase: function(value) {
      if (!value) {
        return '';
      }
        
      return value.toString().toUpperCase();
    }
  }
```
``` html
  <h1>{{ message | uppercase }}</h1>
```
예시에서는 `uppercase` 라는 `filters` 를 만들었습니다. `key`로 사용할 `name`은 `uppercase` 입니다. 값은 `function`이고 '`value`'를 매개변수로 받는데, 변경할 값을 받습니다.

이 필터를 사용하는 방법은 아주 간단합니다. 간단하게 interpolation `{{ }}` 안에 데이터를 넣고, 그 옆에 pipe symbol( `|` )를 추가하여 `filters` 의 `name`을 추가하는 것입니다. *(여기서는 `uppercase` )*

`filters` 는 사실 연결(chained)될 수 있는데, pipe 뒤에 또 다른 pipe를 추가하고 filter name을 뒤에 추가로 입력할 수 있습니다. 두번째 `filter`는 첫번 째 `filter`의 결과를 받고, 여러분이 여러번의 텍스트 변화를 주고싶을때 유용합니다.

filters 는 JS function이기 때문에, 이 기능은 필요할 때 우리가 지정해놓은 매개변수(변화할 값)를 입력하여 더 유용하게 작성할 수 있습니다.

``` js
  filters: {
    uppercase: function(value, onlyFirstCharacter) {
      if (!value) {
        return '';
      }
        
      value = value.toString();
        
      if (onlyFirstCharacter) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      } else {
        return value.toUpperCase();
      }
    }
  }
```
``` html
  <h1>{{ message | uppercase(true) }}</h1>
```

우리가 interpolation `{{ }}` 정의한 인자가 두번째 매개변수로 들어가있습니다. Vue는 항상 변화를 위해서 첫번째 매개변수로는 기존 데이터의 값을 받습니다.
