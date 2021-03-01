- [Render Function & JSX](#render-function--jsx)
- [Nodes, Trees, Virtual DOM](#nodes-trees-virtual-dom)
  - [`createElement` Arguments](#createelement-arguments)
    - [내부 Data Object](#내부-data-object)
    - [완성 예제](#완성-예제)
  - [제약 constraints](#제약-constraints)
  - [Template을 일반 JS로 대체하기](#template을-일반-js로-대체하기)
    - [`v-if` & `v-for`](#v-if--v-for)
    - [`v-model`](#v-model)
    - [Event & Key Modifier](#event--key-modifier)
  - [Slots](#slots)
  - [JSX](#jsx)
- [Functional Components](#functional-components)
    - [Attribute, Event를 Child Element/Component에 전달하기](#attribute-event를-child-elementcomponent에-전달하기)


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
이 지식을 토대로, component를 생성할 수 있습니다.
``` js
  const getChildrenTextContent = function (children) {
    return children.map(function (node) {
      return node.children ? getChildrenTextContent(node.children) : node.text
    }).join('')
  }

  Vue.component('anchored-heading', {
    render: function (createElement) {
      // kebab-case id 생성
      const headingId = getChildrenTextContent(this.$slots.default).toLowerCase().replace(/\W+/g, '-').replace(/^-|$/g, '')
      return createElement(`h${this.level}`, [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ])
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })
```

## 제약 constraints 

**VNodes는 unique 해야합니다.** 컴포넌트의 모든 VNodes tree는 특별해야합니다. 아래 예제처럼 하면 안됩니다.

``` js
  render: function (createElement) {
    const myParagraphVNode = createElement('p', 'hi')
    return createElement('div', [
      // VNode 복제..!! 안됩니다
      myParagraphNode, myParagraphNode
    ])
  }
```

똑같은 복제된 element/component를 사용해야 할 경우, 아래처럼 factory function을 이용하세요.

``` js
  render: function (createElement) {
    return createElement('div',
      Array.apply(null, { length: 20 }).map(function () {
        return createElement('p', 'hi')
      })
    )
  }
```

## Template을 일반 JS로 대체하기
template 문법을 프로그램적으로 생성하는 방법입니다.

### `v-if` & `v-for`
``` html
  <ul v-if="items.length">
    <li v-for="item in items"> {{ item.name }} </li>
  </ul>
  <p v-else>No items found</p>
```
``` js
  props: ['items'],
  render: function (createElement) {
    if (this.items.length) {
      return createElement('ul', this.items.map(function (item) {
        return createElement('li', item.name)
      }))
    } else {
      return createElement('p', 'No items found')
    }
  }
```

### `v-model`
`v-model`을 대체할만한 것은 render function엔 업시만, 로직을 사용하여 구현할 수는 있습니다.
``` js
  props: ['value'],
  render: function (createElement) {
    const self = this
    return createElement('input', {
      domProps: { value: self.value },
      on: {
        input: function (event) {
          self.$emit('input', event.target.value)
        }
      }
    })
  }
```

### Event & Key Modifier
`.passive`, `.capture`, `.once` event modifier같은 경우, Vue는 on을 사용한 prefix들을 제공합니다.

| Modifier(s)                        | Prefix |
| ---------------------------------- | ------ |
| `.passive`                         | `&`    |
| `.capture`                         | `!`    |
| `.once`                            | `~`    |
| `.capture.once` or `.once.capture` | `~!`   |

**example**

``` js
  on: {
    '!click': this.doThisInCapturingMode,
    '~keyup': this.doThisOnce,
    '~!mouseover': this.doThisOnceInCapturingMode
  }
```

다른 event나 key modifier들은, event methods가 handler에 있기 때문에, prefix가 필요하지 않습니다.
| Modifier(s)                                        | Equivalant in Hander                                                         |
| -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `.stop`                                            | `event.stopPropagation()`                                                    |
| `.prevent`                                         | `event.preventDefault()`                                                     |
| `.self`                                            | `if (event.target !== event.currentTarget) return`                           |
| keys: `.enter`, `.13`                              | `if (event.keyCode !== 13) return` `13`을 다른 keycode로 변경할 수 있습니다. |
| Modifiers Keys: `.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return `                                                |

**examples**
``` js
  on: {
    keyup: function (event) {
      if (event.target !== event.currentTarget) return
      if (!event.shiftKey || event.keyCode !== 13) return
      event.stopPropagation()
      event.preventDefault() 
      // ...
    }
  }
```

## Slots
정적인 slot contents에 `this.$slots`로부터 VNode 의 Array 형태로 접근할 수 있습니다.
``` js
  render: function (createElement) {
    // '<div><slot /></div>'
    return createElement('div', this.$slots.default)
  }
```
그리고 scoped slots를 VNode를 반환하는 `this.$scopedSlots` function을 사용하여 접근할 수 도 있습니다.

``` js
  props: ['message'].
  render: function (createElement) {
    // '<div><slot :text="message"/></div>'
    return createElement('div', [
      this.$scopedSlots.default({
        this.$scpoedSlots.default({
          text: this.message
        })
      })
    ])
  }
```
render function을 이용하여 scoped slots를 child component에 전달해주려면, VNode data 안에 `scopedSlots` filed를 사용합니다.

``` js
  render: function (createElement) {
    // <div><child v-slot> {{ props.text }} </child></div>
    return createElement('div', [
      createElement('child', {
        // 'scopedSlots'를 data object에 전달
        // 형식:: { name: props => VNode | Array<VNode> }
        scopedSlots: {
          default: function (props) {
            return createElement('span', props.text)
          }
        }
      })
    ])
  }
```

## JSX
만약 `render` function을 많이 쓰게된다면, 복잡한 코드를 작성하기 매우 어렵습니다.
특히나 template 버전이 비교적 간단하다면 특히나 어렵습니다.

그래서 JSX를 Vue에서 사용할 수 있도록, [Babel plugin](https://github.com/vuejs/jsx)이 존재합니다. 해당 플러그인은 template 문법과 비슷하게 사용할 수 있습니다.

``` jsx
  import AnchoredHeadinf from './AnchoredHeading.vue'

  nwe Vue({
    el: '#demo',
    render: function (h) {
      return (
        <AnchoredHeading level={1}>
          <span>Hello</span> world!
        </AnchoredHeading>
      )
    }
  })
```

# Functional Components
예제로 작성했던 컴포넌트는 state 관리, state 관찰, lifecycle methods 등이 존재하지 않았습니다.
이런 경우, functional component로 부르는데, state가 없고(reactive data가 없고), instanceless(`this` context가 없음)없습니다. functional component는 이렇게 생겼어요.
``` js
  Vue.component('my-component', {
    functional: true,
    props: { /* ... */ },
    render: function (createElement, context) {
      // instance가 없으므로, 두번째 context argument를 가집니다.
      // ...
    }
  })
```
single-file-component일 경우는 이렇게 작성될 수도 있습니다.
``` html
  <template functional></template>
```

component가 필요한 모든것은 context를 통해 전달됩니다. context에는 [여러 항목](https://vuejs.org/v2/guide/render-function.html#Functional-Components)들이 포함됩니다.

`functional: true`가 추가되면서, 컴포넌트의 render function은 context argument를 더하여, `this.$slots.default`를 `context.children`에 업데이트하고, `this.level`을 `context.props.level`에 업데이트 합니다.

functional 컴포넌트는 function이기 때문에, render 하는데 더 짧은 시간이 걸립니다.

**장점**
* children, props, data들을 child component에 전달하기 전에 생성할 수 있습니다.
* 프로그램적으로 몇몇 다른 컴포넌트들중 대표로 하나를 선택할 수 있습니다. (???)

**전체 코드 example**

``` js
  const EmptyList = { /* ... */}
  const TableList = { /* ... */}
  const OrderedList = { /* ... */}
  
  Vue.component('smart-list', {
    functional: true,
    props: {
      items: {
        type: Array,
        required: true
      },
      isOrdered: Boolean
    },
    render: function (createElement, context) {
      function appropriateListComponent () {
        const items = context.props.items

        if (items.length === 0) return EmptyList
        if (typeof items[0] === 'object') return TableList
        if (context.props.isOrdered) return OrderedList
        return UnorderedList
      }

      return createElement(
        appropriateListComponent(),
        context.data,
        context.children
      )
    }
  })
```

### Attribute, Event를 Child Element/Component에 전달하기

일반 component에서, prop으로 정의되지 않은 attribute는 같은 이름의 존재하는 attribute에 병합되거나 대체되면서, 컴포넌트의 root element에 자동으로 추가됩니다. 

그러나 Functional component는 행동을 명확하게 정의 해야합니다.

``` js
  Vue.component('my-functional-button', {
    functional: true,
    render: function (createElement, context) {
      // attribute, event listeners, children etc.를 전달합니다
      return createElement('button', context.data, context.children)
    }
  })
```

template-based functional component를 사용할 경우, 자동으로 attributes와 listener를 자동으로 추가해야합니다. 개별 context contents에 접근하기 때문에, HTML attribute를 전달하기 위해서 `data.attrs`를 사용하거나, event listeners를 전달하기 위해서 `listeners`를 사용할 수 있습니다.
``` html
  <template>
    <button
      v-bind="data.attrs"
      v-on="listeners"
    >
      <slot />
    </button>
  </template>
```

## `slots()` vs `children`

`slots()`와 `children()` 둘다 필요한 이유는 무엇일까요?

`slots().default`는 `children`이랑 같지 않나요? 가끔은 그렇지만, children과 함께 functional component를 가질 경우에는 다릅니다.

``` html
  <functional-component>
    <p v-slot:foo>
      first
    </p>
    <p> second </p>
  </functional-component>
```

> 이 component에는, `children`이 두개의 `p`를 주는데, `slots().default`는 두번째 `p`를 줄 것이고, `slots().foo`가 첫번째 `p` 요소를 줄 것입니다.
> 
> `children`, `slots()` 두개를 가지는것은 이 컴포넌트가 slot 시스템을 쓰는지, `children`에 의해 전달받은 컴포넌트인지 선택할 수 있게 해줍니다.
