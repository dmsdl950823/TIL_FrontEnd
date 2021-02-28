- [Render Function & JSX](#render-function--jsx)
- [Nodes, Trees, Virtual DOM](#nodes-trees-virtual-dom)
  - [`createElement` Arguments](#createelement-arguments)
    - [내부 Data Object](#내부-data-object)
    - [완성 예제](#완성-예제)


# Render Function & JSX

Vue는 HTML을 빌드하기위해서 `template`를 사용합니다. 그러나 JS 프로그램 방식으로 생성할 필요한 경우가 있습니다. 여기서 `render function` 이 필요한데, `compiler`와 가까운, `template` 대체제로 사용할 수 있습니다.

간단한 `render` function 예제를 살펴봅시다.
``` html
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h1 v-if="level === 2">
    <slot></slot>
  </h1>
  <h1 v-if="level === 3">
    <slot></slot>
  </h1>
  <h1 v-if="level === 4">
    <slot></slot>
  </h1>
  <h1 v-if="level === 5">
    <slot></slot>
  </h1>
```
``` js
  Vue.component('anchored-heading', {
    template: '#anchored-heading-template',
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })
```
이 `template`은 보기 좋지도 않고, 장황할 뿐만아니라 <slot/>을 매우 많이 사용합니다. 

`template`은 대부분의 컴포넌트에는 좋지만, 이런 경우에는 불편합니다. `render` function을 이용할 때입니다.

``` js
  Vue.component('anchored-heading', {
    render: function (createElement) {
      return createElement(
        'h' + this.level,   // tag name
        this.$slote.default // array of children
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })
```

코드는 훨씬 간단합니다. 이런경우, `children`을 `v-slot` directive 없이 컴포넌트에 전달해줄 때, `anchored-heading` 안의 `Hello World!` 처럼, 해당 children은 `$slots.default`의 component instance에 저장됩니다. [관련 API](https://vuejs.org/v2/api/#Instance-Properties)


# Nodes, Trees, Virtual DOM
render function을 살펴보기 전에, 어떻게 브라우저가 동작하는지부터 확인해봅시다.

브라우저가 HTML 코드를 읽을 때, 모든 내용을 추적하기 위해서 **'DOM Node' 트리**를 생성합니다.

![dom-tree](https://vuejs.org/images/dom-tree.png)

모든 노드를 효과적으로 업데이트하는것은 어렵지만, 직접 할 필요는 없습니다! 대신에, Vue가 개발자가 원하는 HTML 을 페이지에 `template`에 전달합니다.

render function 에서는,
``` js
  // <h1>{{ blogTitle }}</h1>
  render: function (createElement) {
    return createElement('h1', this.blogTitle)
  }
```
이 경우에, Vue는 page를 계속 업데이트합니다. `blogTitle`이 변할때 도 말이죠.

> `createElement()`는 실제 DOM 요소가 아닌, VNode(virtual DOM) 을 반환합니다. 해당 메서드는 Vue에게 이 페이지에서 **어떤 종류의 노드를 반환해야하는지를 알려주**기 때문에, `createNodeDescription` 으로 불리는것이 더 정확할 것 같습니다. *Virtual DOM 은 Vue 컴포넌트의 트리로 만들어진 VNode의 전체 트리를 말합니다.*

## `createElement` Arguments

`createElement` function의 사용법에 대해서 익숙해져야합니다. `createElement`가 받을 수 있는 매개변수의 종류입니다. [detail](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments)

``` js
  /**
   * @returns {VNode} 
   */
  createElement('div', { /* ... */, [
    'text...', createElement('h1', 'a headline'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
    ]
  })
```

### 내부 Data Object

`v-bind:class`와 `v-bind:style`  은 template에서 특별한 취급(?)을 받는데, VNode data object에 그들만의 top-level field를 가지고 있다는 것 입니다. 이 object는 DOM 프로퍼티(`innerHTML 같은`) 뿐 아니라 HTML attribute에 bind 하도록 해줍니다.

``` js
  {
    class: {
      // v-bind:class 와 같은 API => string, object, string/object 의 array 모두 가능
      foo: true,
      bar: false
    },
    style: {
      // v-bind:style 과 같은 API => string, object, object의 array
      color: 'red',
      fontSize: '14px'
    },
    attrs: {
      // 일반 HTML attributes
      id: 'foo'
    },
    props: {
      // Component props
      myProp: 'bar'
    },
    // DOM properties
    domProps: {
      innerHTML: 'baz'
    },
    on: {
      // Event Handler는 'on'에 있지만, v-on:keyup.enter같은 modifier는 지원되지 않습니다.
      // handler의 keyCode를 직접 확인해야 합니다.
      click: this.clickHandler
    },
    nativeOn: {
      // components 전용입니다.
      // vm.$emit을 사용하여 event를 emit하는 것 대신 native event를 listen 할 수 있습니다.
      click: this.nativeClickHandler
    }.
    directives: [
      // custom directive 입니다.
      // Vue가 계속 추적하므로써, 'binding'의 'oldvalue'는 설정될 수 없습니다.
      {
        name: 'my-costom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    scopedSlots: {
      // { name: props => VNode | Array<VNode> } 형태의 scoped slots
      default: props => createElement('span', props.text)
    },
    // slot의 이름 - component가 또다른 component의 자식일 경우.
    slot: 'name-of-slot',
    key: 'myKey', // 특별한 top-level properties
    ref: 'myRef'
    // 똑같은 이름의 ref를 render function내의 여러 elements에 적용시킬 경우, $refs.myRef를 array로 만들어줍니다.
    refInFor: true
  }
```

### 완성 예제
[여기부터 재개](https://vuejs.org/v2/guide/render-function.html#Complete-Example)
