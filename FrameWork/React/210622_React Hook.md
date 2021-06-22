# React Hooks

- [React Hooks](#react-hooks)
- [Hook 이란?](#hook-이란)
- [Basic Hooks](#basic-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
    - [Rules of Hooks](#rules-of-hooks)
    - [Building Your Own Hooks](#building-your-own-hooks)
  - [useContext](#usecontext)
- [Additional Hooks](#additional-hooks)
  - [useReducer](#usereducer)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [useImperativeHandle](#useimperativehandle)
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
data fetching, React 컴포넌트에서 수동으로 DOM 을 변경하는  등의 작업을 하고싶을경우, 다른 컴포넌트에 영향을 줄 수 있기 때문에 사이드 이펙트가 발생할 수 있었습니다.

`useEffect` 는, function 컴포넌트의 사이드 이펙트를 수행하는 기능을 추가합니다. class 컴포넌트의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 과 같은 일을 하지만, 하나의 API 로 통합된 것입니다.
 
`useEffect` 를 호출할 경우, React 에게 DOM 을 변경한 후, `effect` function 을 호출하도록 알려줍니다. Effects 는 component 내부에 선언되어있으므로, `props` 와 `state` 에 접근 가능합니다.

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
https://reactjs.org/docs/hooks-reference.html#useeffect

https://reactjs.org/docs/hooks-effect.html

``` js
/* class component example */
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
      </div>
    )
  }
}
```

### Rules of Hooks

### Building Your Own Hooks

## useContext

# Additional Hooks

## useReducer

## useCallback

## useMemo

## useRef

## useImperativeHandle

## useDebugValue