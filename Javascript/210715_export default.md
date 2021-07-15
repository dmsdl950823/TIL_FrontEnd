# `export default thing` 이 `export { thing as default }` 와 다른점

## Import 는 참조이지, 값은 아닙니다.

``` js
  import { thing } from './module.js'
```

여기서 `thing` 은 `modules.js` 에 존재하는 `thing` 과 같습니다. 그러나 아래와같은 경우는 조금 헷갈리죠.

``` js
  const module = await import('./modules.js')
  const { thing: destructedThing } = await import('./modules.js')
```

`module.thing` 은 `modules.js` 의 `thing` 과 같지만,

`destructedThing` 은 새로운 객체이며, `modules.js` 에 있는 `thing` 에 할당되고, 다르게 동작합니다. `module.js` 가 아래와 같이 생겼다고 가정해봅시다.

``` js
  // modules.js
  export let thing = 'initial'

  setTimeout(() => {
    thing = 'changed'
  }, 500)
```

``` js
  // main.js
  import { thing as importedThing } from './modules.js'
  const module = await import('./modules.js')
  let { thing } = await import('./modules.js')
  
  setTimeout(() => {
    console.log(importedThing) // 'changed'
    console.log(module.thing) // 'changed'
    console.log(thing) // 'initial'
  })
```
destructed 된 import 는 변화를 가져오지 않는데, 그 이유는 **최근 값** 을 새로운 식별자에 할당하기 때문입니다.

``` js
  // These give you a live reference to the exported thing(s):
  import { thing } from './module.js'
  import { thing as otherName } from './module.js'
  import * as module from './module.js'
  const module = await import('./module.js')

  // This assigns the current value of the export to a new identifier:
  let { thing } = await import('./module.js')
```

## `export default`

``` js
  // module.js
  let thing = 'initial'

  export { thing }
  export default thing

  setTimeout(() => {
    thing = 'changed'
  }, 500)
```

``` js
  // main.js
  import { thing, default as defaultThing } from './module.js'
  import anotherDefaultThing from './module.js'

  setTimeout(() => {
    console.log(thing) // 'changed'
    console.log(defaultThing) // 'initial'
    console.log(anotherDefaultThing) // 'initial'
  }, 1000)
```

## `export { thing as default }`

`export {}` 로 직접적으로 값을 사용할 수 없으므로, live reference 를 전달합니다.

``` js
  // module.js
  let thing = 'initial'

  export { thing, thing as default }

  setTimeout(() => {
    thing = 'changed'
  }, 500)
```

``` js
  // main.js
  import { thing, default as defaultThing } from './module.js'
  import anotherImportThing from './module.js'

  setTimeout(() => {
    console.log(thing) // 'changed'
    console.log(defaultThing) // 'changed'
    console.log(anotherImportThing) // 'changed'
  })
```

``` js
  // 아래는 live reference 를 exported 된 things 에 전달합니다.
  import { thing } from './modules.js'
  import { thing as otherName } from './modules.js'
  import * as module from './modules.js'
  const module = await import('./modules.js')
  
  // 아래는 최근 export 값을 새로운 식별자에게 할당합니다.
  let { thing } = await import('./module.js')

  // These export a live reference
  export { thing }
  export { thing as otherName }
  export { thing as default }
  // These export the current value
  export default thing
  export default 'hello'
```

출처 : [jakearchibald.com](https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default/)