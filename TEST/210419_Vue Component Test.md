---
title: 'Vue Component Test'
---

- [Vue Component Test](#vue-component-test)
- [Vue Test Util](#vue-test-util)
  - [Test Util 사용법](#test-util-사용법)
  - [자주 사용하는 API](#자주-사용하는-api)
    - [`mount` 와 `shallowMount()` 의 차이점](#mount-와-shallowmount-의-차이점)
  - [간단한 Vue Test Uilts 테스트](#간단한-vue-test-uilts-테스트)
  - [Mock 과 Spy 사용하기](#mock-과-spy-사용하기)

# Vue Component Test

Vue 공식 문서에 정의되어있는 [Vue 컴포넌트를 위한 단위 테스트](https://kr.vuejs.org/v2/guide/unit-testing.html) 도 가능합니다.

<img src="/images/VueTest.gif" width="700">

```html
<!-- TestSampleComponent.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
  export default {
    name: 'TestSampleComponent',
    created() {
      this.message = 'created!'
    },
    data() {
      return {
        message: 'default message!'
      }
    }
  }
</script>
```

```js
// TestSampleComponent.unit.spec.jsimport Vue from 'vue'
import component from '@/views/TestSampleComponent.vue'
// TestSampleComponent 컴포넌트 이름이 너무 길기 때문에 component 로 축약합니다.

describe('TestSampleComponent Test', () => {
  it("컴포넌트의 data property 타입 은 'fundtion' 인가요?", () => {
    // console.log('==== created()/data() 의 타입은? ', typeof component.created, typeof component.data)
    expect(typeof component.created).toBe('function')
    expect(typeof component.data).toBe('function')
  })

  test('data() 함수 결과를 테스트합니다.', () => {
    const defaultData = component.data()
    // console.log(defaultData) // data() 메서드내부에 정의된 모든 프로퍼티를 Object 형태로 반환합니다.
    expect(defaultData.message).toBe('default message!')
  })

  it('Mount 할 때 컴포넌트의 data() 내부 데이터를 테스트합니다.', () => {
    const vm = new Vue(component)
    // console.log('data() 의 message 프로퍼티의 값은?', vm.message)
    expect(vm.message).toBe('created!')
  })
})
```

# Vue Test Util

Vue Test Utils(VTU) 은 간단하게 Vue.js 컴포넌트를 테스트해볼 수 있는 utility function 입니다. Vue 컴포넌트들을 독립된 방법으로 테스트할 수 있도록 도와줍니다. 관련 [API 문서](https://vue-test-utils.vuejs.org/api/#shallowmount)를 참고하세요.

## Test Util 사용법

Vue Test Util 은 Spharos CMP 프로젝트 dependencies 내부에 `@vue/test-utils` 로 정의되어있으며, 테스트 파일에 `import` 하여 사용할 수 있습니다.

```json
    "devDependencies": {
        "@vue/test-utils": "version..."
    }
```

`render()` 와 `renderToString()` 을 사용하기 위해서는 `@vue/server-test-utils` 설치가 필요합니다.

```bash
  $ npm i -D @vue/server-test-utils
```

## 자주 사용하는 API

| 함수                              | 반환      | 설명                                              |
| --------------------------------- | --------- | ------------------------------------------------- |
| `mount()`                         | `Wrapper` | 컴포넌트 마운트 (하위 컴포넌트 렌더링)            |
| `shallowMount(component, option)` | `Wrapper` | 컴포넌트의 얕은 마운트 (하위 컴포넌트 스텁)       |
| `render()`                        | `Promise` | 문자열로 렌더링하고 Cheerio 객체(Promise) 를 반환 |
| `renderToString()`                | `Promise` | HTML 로 렌더링                                    |

Vue Test Utils 는 [`Wrapper`](https://vue-test-utils.vuejs.org/api/wrapper/#wrapper) 로 구성되어 있습니다. `Wrapper` 는 컴포넌트나 vnode 를 테스트하기 위한 mounted 된 컴포넌트나 vnode 와 메서드를 포함하는 `object` 입니다.

### `mount` 와 `shallowMount()` 의 차이점

| 함수             | 차이점                                                                       |
| ---------------- | ---------------------------------------------------------------------------- |
| `mount()`        | 기본 마운트로 하위 컴포넌트를 렌더링                                         |
| `shallowMount()` | 얕은 마운트, 하위 컴포넌트를 Stub(스텁 - 실제로 동작하는 것처럼 보이는 객체) |

<small>\*\* `shallowMount()`의 [`options`](https://vue-test-utils.vuejs.org/api/options.html) 는 여기를 참고하세요 </small>

## 간단한 Vue Test Uilts 테스트

컴포넌트의 간단한 테스트 방법은 아래와 같습니다. 기본 작성법은 [공식문서](https://vue-test-utils.vuejs.org/guides/#getting-started)를 참조하세요.

```html
<!-- TestSampleComponent.vue -->
<template>
  <div>
    <button @click="clickEvent">메롱</button>

    <input type="text" />
  </div>
</template>

<script>
  export default {
    name: 'TestSampleComponent',
    props: {
      kitty: {
        type: String,
        default: '🐱'
      }
    },
    methods: {
      clickEvent() {
        console.log('클릭클릭했어!')
      }
    }
    // ...
  }
</script>
```

```js
import { mount } from '@vue/test-utils'
import component from './TestSampleComponent.vue'

describe('test-util 테스트입니다.', () => {
  test('wrapper 와 element 체크하기!', async () => {
    // const spy = sinon.spy()
    const wrapper = mount(component)

    // 요소 확인하기
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true) // wrapper가 존재하는지 확인합니다.
    expect(button.text()).toBe('메롱') // 컨텐츠의 text 를 반환합니다.
    expect(button.text()).toContain('메롱')
  })
})
```

설정된 props 를 확인할 수도 있습니다.

```js
test('props 확인하기 및 기타 작업 해보기!', async () => {
  const wrapper = mount(component, {
    propsData: {
      // component 의 props 데이터
      kitty: '고양이는 귀여워' // 해당 props 를 주석처리하면 default 데이터 (🐱) 가 표시됩니다
    }
  })

  // props 확인하기
  expect(wrapper.props().kitty).toBe('고양이는 귀여워')
  expect(wrapper.props('kitty')).toBe('고양이는 귀여워')

  // event 발생시키기
  const button = wrapper.find('button')
  button.trigger('click') // '클릭클릭했어!' 가 표시됩니다.
  button.trigger('keydown.up')

  // value 설정하기
  const input = wrapper.find('input')
  await input.setValue('text value 설정...')
  // console.log(input.element)

  expect(input.element.value).toBe('text value 설정...')
})
```

<img src="/images/vue-test-util-test-complete.gif">

그 외 자세한 다른 API 는 [문서](https://vue-test-utils.vuejs.org/api/#mount)를 참고하세요.

## Mock 과 Spy 사용하기

<!-- 작업중입니다 🚗🚗🚗... -->

---

**출처 및 참고자료**

> - Vue Test Utils - [Vue Test Utils](https://vue-test-utils.vuejs.org/api)
> - Vue Test Utils - [Jest와 Vue Test Utils 로 Vue 컴포넌트 단위(Unit) 테스트](https://heropy.blog/2020/05/20/vue-test-with-jest/)
