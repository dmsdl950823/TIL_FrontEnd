- [Vue 2 vs Vue 3 차이점](#vue-2-vs-vue-3-차이점)
  - [1. Creating App](#1-creating-app)
    - [변경된 이유](#변경된-이유)
  - [2. Multiple Root](#2-multiple-root)
  - [3. Composition API](#3-composition-api)
    - [사용 이유](#사용-이유)
    - [특징](#특징)
  - [4. Reactive Reference](#4-reactive-reference)
  - [5. Methods](#5-methods)
  - [6. Computed](#6-computed)
  - [7. Watch](#7-watch)
  - [8. Props](#8-props)
  - [Remove Vue filter](#remove-vue-filter)
  - [9. Multiple v-models](#9-multiple-v-models)
  - [10. Modular](#10-modular)


[출처: plainenglish](https://js.plainenglish.io/differences-between-vue-2-and-vue-3-ee627e2c83a8)

# Vue 2 vs Vue 3 차이점

Vue 3 공식 버전은 2020년에 나왔는데, API, core, structures 들이 안정적이고 production 배포가 가능해졌습니다.

Vue 3 는 Vue 2와 많이 다르지는 않지만 더욱 작고, 빠르고 더 강력하게 우리의 애플리케이션을 만들어줄 수 있도록 기대됩니다.

## 1. Creating App

### Vue 2
``` js
  import Vue from 'vue'
  import App from './App.vue'

  Vue.config.productionTip = false

  new Vue({
    render: h => h(App)
  }).$mount('#app')
```
### Vue 3
``` js
  import { createApp } from 'vue'
  import App from './App.vue'
  import './index.css'

  createApp(App).mount('#app')
```
### 변경된 이유
* Global configurations은 unit test중에 문제를 만들어냅니다. test case가 각 global configuration에 영향을 주기 때문입니다.
* Vue 3 는 다른 global configuration을 제공하지만 여러개의 `apps`에게 configuration 복사본을 공유하기가 어렵게 만듭니다.
  * Vue 2
    > ``` js
    >  // 이 mixin 은 하단의 두 인스턴스에 영향을 줍니다.
    >  Vue.mixin({ /* ... */ })
    >
    >  const app1 = new Vue({ el: '#app-1' })
    >  const app2 = new Vue({ el: '#app-2' })
    > ```
  * Vue 3
    > ``` js
    >  const app = createApp(App)
    >  // 이 configuration은 오직 1개의 instance에 영향을 줍니다.
    >  app.mixin(/* ... */)
    >  app.mount('#app')
    > ``` 

## 2. Multiple Root

Vue 2에서는, template 에서 single root 노드만 실행시킬수 있었지만, Vue 3에서는 components를 위해 더이상 single root node가 필요하지 않습니다. 그 말은, 개발자에게 template 안에서 여러개의 root가 가능하다는 의미입니다.

### Vue 3
``` html
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>
```

## 3. Composition API

### 사용 이유

* 큰 component는 유지 및 읽기가 어렵습니다.
* component 사이의 유지 보수 로직이 아주 큰 문제입니다. (mixins)

그러므로 composition API가 이 두 문제를 해결합니다.

### 특징
* Optimal TypeScript 지원.
* 하나의 component가 매우 크고 좋은 코드 조합이 필수.
* 재사용 가능한 code가 필요.

... 생략

## 4. Reactive Reference

`ref` 는 '반응적 레퍼런스 Reactive Reference' 입니다. `ref`는 우리가 변화를 감지할 수 있도록 원시 데이터를 감싸고 있습니다. `data ()` 를 이용하여 감싸는것을 잊지마세요.

### Vue 2
``` js
  <script>
    export default {
      name: 'App',
      data () {
        return {
          name: 'Name'
        }
      }
    }
  </script>
```

### Vue 3
``` js
<script>
  import { ref } from 'vue'
  export default {
    setup () {
      const name = ref('Name')
      return { name }
    }
  }
</script>
```

## 5. Methods

Vue 2는 methods 를 위해 분리된 section을 갖지만, Vue 3 에서는 `setup()` 메서드에서 메서드를 정의합니다.

### Vue 2
```js
<script>
  export default {
    methods: {
      increaseAmount() {
        this.amount += 1
      }
    },
    data () {
      return {
        amount: 3
      }
    }
  }
</script>
```

### Vue 3
``` js
  import { ref } from 'vue'
  export default {
    setup () {
      const amount = ref(3)
      function increaseAmount () {
        amount.value += 1
      }
      return { amount, increaseAmount }
    }
  }
```

## 6. Computed

Vue 2는 computed 를 위해 분리된 section을 갖지만, Vue 3 에서는 `setup()` 메서드에서 computed를 정의합니다.

### Vue 2
``` js
<script>
  export default {
    computed: {
      upperName () {
        return this.name.toUpperCase() + 'Vue_2'
      }
    },
    data () {
      return {
        name: 'author'
      }
    }
  }
</script>
```

### Vue 3
``` js
<script>
  import { ref, computed } from 'vue'
  export default {
    setup () {
      const name = ref('author')

      const upperName = computed(() => {
        return name.value.toUpperCase() + 'Vue_3'
      })

      return { name, upperName }
    }
  }
</script>
```

## 7. Watch

Vue 2의 watch 는 관찰 하고, data 변화에 반응하지만, Vue 3는 그 일을 하기위해서 새로운 무언가를 제공합니다.

### Vue 2

``` js
<script>
  export default {
    watch: {
      name (newVal, oldVal) {
        console.log(`${newVal} ${oldVal}`)
      }
    },
    data () {
      return {
        name: null
      }
    }
  }
</script>
```

### Vue 3
새로운 버전은 변화의 반응적인 관찰을 위해 `watchEffect()` 라고 부르는 데이터를 제공합니다. 이것은 그들의 dependency가 변화할 때 재실행 될 것입니다.

``` js
<script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup () {
      const name = ref('')
      watchEffect(() => {
        console.log(name.value)
      })
      return { name }
    }
  }
</script>
```

또는 Vue 2 와 유사한 `watch` function을 쓸 수도 있습니다.

``` js
<script>
  import { ref, watch } from 'vue'

  export default {
    setup () {
      const name = ref('')
      watch((name, (newVal, oldVal)) => {
        console.log(`${newVal} ${oldVal}`)
      })
      return { name }
    }
  }
</script>
```

## 8. Props
`setup()` 내부에서 `this` 없이 props에 접근할 수 있습니다.
``` js
  setup (props) {
    watch(() => {
      console.log(props.name)
    })
  } 
```

## Remove Vue filter

Vue 3 에서 deprecate 된 filter는, 일반 text formatting에 적용하도록 사용됩니다.

Vue filter를 만드는 목적은, `template`을 좀더 예쁘게 하고 여러개의 컴포넌트에서 재사용하기 위해서지만 performance에 차이가 없으므로 `methods`로 대체됩니다. 

Vue 저자가 filter 삭제를 결심한 또 다른 이유는 문법 때문인데, `{{ new Date | filterName }}` 같이 `|` 를 사용한 문법은 개발자를 혼란스럽게 만들기 때문입니다. 

삭제한 궁극적인 이유는 개발자들에게 더 일관된 재사용가능한 functions를 생성하거나 독자적인 메서드들을 각각의 컴포넌트에서 생성하는 것을 독려하기 위해서입니다.

### Example
``` js
  // DateFormat.js
  import moment from 'moment'
  const format = function formatUnix (value) {
    if (value) return moment(value).format('DD/MM/YYYY')
  }
  export default format
```

``` html
<template>
  <div>{{ formatUnix(new Date()) }}</div>
</template>
<script>
  import formatUnix from './DateFormat.js'

  export default {
    name: 'App',
    setup () {
      return formatUnix
    }
  }
</script>
```

## 9. Multiple v-models
`v-model`은 주어진 component에서 양방향 바인딩이 가능합니다. 그러나 Vue 2 에서는 `v-model`을 한개밖에 가질 수 없습니다. 양방향 바인딩은 사용자가 `input value`를 입력하면, `v-model`은 `value` 프로퍼티를 `input` 이벤트를 통해 보내주는 간단한 방법입니다.

#### Vue 3
``` html
  <!-- InviteForm.vue -->
<template>
  Name:
  <input
    type="text"
    :value="name"
    @input="updateName(${event.target.value})"
  >
  <br>
  E-mail: 
  <input
    type="text"
    :value="name"
    @input="updateName(${event.target.value})"
  >
</template>

<script>
  export default {
    props: {
      name: String,
      email: String
    },
    setup (props, { emit }) {
      const updateName = (value) => {
        emit('update:name', value)
      }
      const updateEmail = (value) => {
        emit('update:email', value)
      }
      return { updateName, updateEmail }
    }
  }
</script>
```

``` html
<template>
  <InviteForm
    v-model:name="inviteName"
    v-model:email="inviteEmail"
  />
  <p>{{ inviteName }}</p>
  <p>{{ inviteEmail }}</p>
</template>

<script>
  import InviteForm from './InviteForm.vue'
  import { ref } from 'vue'

  export default {
    name: 'App',
    components: {
      InviteForm
    },
    setup () {
      const inviteName = ref('name')
      const inviteEmail = ref('invite')
      return {
        inviteName,
        inviteEmail
      }
    }
  }
</script>
```

component 는 여러개의 `v-model` 을 이러한 방식으로 핸들링합니다.
``` js
  <InviteForm
    v-model:name="inviteName"
    v-model:email="inviteEmail"
  />
```
컴포넌트에서, 우리는 2개의 `props` (`name`, `email`) 를 가지고 있습니다. 이 value를 부모 component에게서 update 하기 위해서는, emit을 이용하여 value를 업데이트 합니다.

* `name` value를 업데이트 : `emit('update:name, value')`
* `email` value를 업데이트 : `emit('update:email, value')`

child component 에서 parnet component로 각 value를 전달해야하는 Vue 2 보다 더 간단하고 쉽습니다.

## 10. Modular

아 씨 졸ㄹ ㅕ비ㅏㅁㅇㄴㅁㅇ;ㅁㄴㄹ이;ㄴ먼ㅁㄹㅇㅁㄴ렁ㅁㄴㄹ이;ㅁㄴㄹ이ㅏ;
