# React Hooks

- [React Hooks](#react-hooks)
- [Hook 이란?](#hook-이란)
- [Basic Hooks](#basic-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
    - [Rules of Hooks](#rules-of-hooks)
    - [Building Your Own Hooks](#building-your-own-hooks)
  - [useContext](#usecontext)
    - [Context](#context)
- [Additional Hooks](#additional-hooks)
  - [useReducer](#usereducer)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [useImperativeHandle](#useimperativehandle)
  - [useLayoutEffect](#uselayouteffect)
  - [useDebugValue](#usedebugvalue)

# Hook 이란?

React 에서 Hook 은, function 컴포넌트 내부에서 React 의 state 와 lifecycle 특징을 연결시켜주는 (hook) function 입니다.

리액트는 내장 Hooks 들을 제공하며, 개발자가 직접 작성한, 재사용 가능한 Hook 을 사용할 수도 있습니다.

# Basic Hooks

## useState

``` js
    const [state, setState] = useState(initalState) 
```

`useState` 는 function component 내부에 호출하여 지역 state 로 이용할 수 있는 *Hook* 입니다. React는 이 state 를 유지하고, [*현재 상태* `state`, *업데이트를 도와주는 function* `setState`] 를 반환합니다. 이 function 을 이벤트핸들러 등에서 호출할 수 있습니다. (class 컴포넌트에서는 `this.setState()` 방식으로 호출합니다. 비슷하지만 기존 state 와 병합하지 않는다는 차이가 있습니다.)

또한 초기 값 `initialState` 을 매개변수로 받습니다. 초기값 state 매개변수는 첫 번째 렌더링 중에만 딱 한번 사용됩니다.

``` js
  /* function component example */
  import React, { useState } from 'react'

  const react = () => {
    // const [state, setstate] = useState(initialState)
    const [count, setCount] = useState(0)
    return (
      <div>
        <p>you clicked {count} Times</p>

        <button onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    )
  }

  export default react
```

## useEffect

``` js
  useEffect(didUpdate) 
```
data fetching, React 컴포넌트에서 수동으로 DOM 을 변경하는  등의 작업을 하고싶을경우, 다른 컴포넌트에 영향을 줄 수 있기 때문에 사이드 이펙트가(부작용) 발생할 수 있었습니다.

`useEffect` 는, function 컴포넌트의 한쪽에서 행동을(side effect) 수행하는 기능을 합니다. class 컴포넌트의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 과 같은 일을 하지만, 하나의 API 로 통합된 것입니다.
 
`useEffect` 를 호출할 경우, React 에게 **DOM 을 변경한 후, `effect` function 을 호출하도록 알려줍니다.** DOM 을 업데이트 한 바로 직후에, 선언한 effect 를 동작시킵니다. Effects 는 component 내부에 선언되어있으므로, `props` 와 `state` 에 접근 가능합니다.

> [useEffect reference](https://reactjs.org/docs/hooks-reference.html#useeffect), [useEffect docs](https://reactjs.org/docs/hooks-effect.html)

``` js
  /* function component example */
  import React, { useState, useEffect } from 'react'

  const react = () => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
    return (
      <div>
        <p>you clicked {count} Times</p>

        <button onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    )
  }

  export default react
```

* 조건부 Effect 발생시키기
  
``` js
  useEffect(() => {
    const subscription = props.source.subscribe()
    return () => subscription.unsubscribe()
  }, [props.source])
  // props.source 값이 변경될 때만 실행됩니다.
```

특정 값을 관찰하여, 해당 값이 변경되면 DOM 을 업데이트 할 수도 있습니다.
`useEffect()` 의 두번째 인자로 관찰하고 싶은 값을 입력합니다.


### Rules of Hooks

hook 은 js function 이긴 하지만 몇 가지 특징이 있습니다.

1. 오직 상단에 선언을 해주어야합니다. 루프, 조건문, 내부 function 에서 선언하지마세요.
2. Function 컴포넌트에서만 사용할 수 있습니다. 일반 javascript function 에서 호출하여 사용하지 않습니다.

### Building Your Own Hooks

hook 을 직접 제작하는 작업은, **컴포넌트 로직**을 **재사용 가능한 함수에 적용**할 수 있도록 도와줍니다.

``` js
/* created custom hooks */
import React, { useState, useEffect } from 'react'

const useFriendStatus = (friendId) =>  {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status.isOnline)
    }
    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange)

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange)
    }
  })

  return isOnline
}
```

``` js
  /* using custom hooks */
  // ...
  const FriendStatus = ({ friend }) => {
    const isOnline = useFriendStatus(friend.id)

    if (isOnline === null) return 'loading ... '
    return isOnline ? 'Online' : 'Offline'
  }
```

## useContext

``` js
  import React, { createContext } from 'react'

  const initialState = { /* value */ }

  export const GlobalContext = createContext(initialState)

  // ...
  function App () {
    return (
      <GlobalContext.Provider
        value={initialState.value}
      >
          {children}
      </GlobalContext.Provider>
    )
  }
```

``` js
  import { GlobalContext } from '../context/GlobalState'
  const state = useContext(GlobalContext)

  function Usage () {
    return <p>{state.value}</p>
  }
```

`useContext` 는 `Context.Provider` 와 함께 사용하여야 합니다.

### Context

컨텍스트에 관한 자세한 설명은 [이 포스팅](./210623_React%20Context.md)를 참조하세요.

# Additional Hooks

## useReducer

``` js
  import React, { useReducer } from 'react'

  const [state, dispatch] = useReducer(reducer, initialArg, init)
```

`useState()` 의 대체 함수입니다. (Redux)

## useCallback

``` js
  import React, { useCallback } from 'react'

  const memoizedCallback = useCallback(() => {
    doSomething(a, b)
  }, [a, b])
```
> 메모이제이션 : 메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, **이전에 계산한 값을 메모리에 저장**함으로써 **동일한 계산의 반복 수행을 제거**하여 프로그램 실행 속도를 빠르게 하는 기술이다. 동적 계획법의 핵심이 되는 기술이다. 메모아이제이션이라고도 한다.

`useCallback` 은 불필요한 렌더링을 방지하며, 자식 컴포넌트에 콜백을 전달할 때 유용합니다.

`useCallback(fn, deps)`은 아래의 `useMemo(() => fn, deps)` 와 같습니다.

## useMemo

``` js
  import React, { useMemo } from 'react'

  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

`useMemo`로 전달된 함수는 **렌더링 중에 실행**됩니다. 렌더링 중에는 하면 안되는 행동을 이 함수 내에서도 하지 않습니다.

<small>ex) 사이드 이펙트(side effects)는 `useEffect`에서 하는 일,  `useMemo`에서 하는 일 X</small>

## useRef

``` js
  import React, { useRef } from 'react'

  const refContainer = useRef(initialValue);
```

`useRef` 는 `.current` 프로퍼티로 전달된 인자(`initialValue`) 로 선언된, 변경가능한 ref 객체를 반환합니다.

``` js
  function App () {
    const inputEl = useRef(null)
    const onButtonClick = () => inputEl.current.focus()
    // `current` 는 input 요소에 focus 를 추가합니다.

    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </input>
    )
  }
```

## useImperativeHandle

``` js
  import React, { useImperativeHandle } from 'react'

  useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 는 `forwardRef` 와 함께 사용하세요.

``` js
  function FancyInput () {
    const inputRef = uesRef()
    const obj = {
      focus: () => {
        inputRef.current.focus()
      }
    }
    useImperativeHandle(ref, () => (obj))

    return <input ref={inputRef}>
  }

  FancyInput = forwardRef(FancyInput)
```

`<FancyInput ref={inputRef} />` 를 렌더링한 부모 컴포넌트는 `inputRef.current.focus()` 를 호출할 수 있습니다.

## useLayoutEffect

이 함수는 `useEffect` 와 동일하긴 하지만, 모든 DOM 변경 후에 동기적으로 발생합니다. DOM 에서 레이아웃을 읽고 동기적으로 재랜더링이 필요한 경우 사용합니다. `useLayoutEffect` 의 갱신은 **브라우저가 화면을 그리기 이전 시점**에 동기적으로 수행됩니다.

## useDebugValue

``` js
  useDebugValue(value)
  useDebugValue(date, date => date.toDateString())
```

`useDebugValue` 는 React 개발자도구에서 사용하는 Hook 레이블을 표시하는데 사용할 수 있습니다.

출처 :: [React Hook Reference 공식문서](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)