- [🌯 React lifecycle](#-react-lifecycle)
  - [Adding Lifecycle Methods to a Class](#adding-lifecycle-methods-to-a-class)
- [Lifecycle methods](#lifecycle-methods)
    - [1. ```constructor()```](#1-constructor)
    - [2. ```componentWillMount()```](#2-componentwillmount)
    - [3. ```render()```](#3-render)
    - [4. ```componentDidMount()```](#4-componentdidmount)
    - [5. ```componentWillReceiveProps()```](#5-componentwillreceiveprops)
    - [6. ```shouldComponentUpdate(nextProps, nextState)```](#6-shouldcomponentupdatenextprops-nextstate)
    - [7. ```componentWillUpdate()```](#7-componentwillupdate)
    - [8. ```componentDidupdate()```](#8-componentdidupdate)
    - [9. ```componentWillUnmount()```](#9-componentwillunmount)
- [분류](#분류)
    - [unmount](#unmount)
    - [props를 받았을 때(처음)](#props를-받았을-때처음)
    - [props가 업데이트 될 때](#props가-업데이트-될-때)
# 🌯 React lifecycle

## Adding Lifecycle Methods to a Class
컴포넌트가 많을 경우, 컴포넌트가 파괴될 때 사용했던 자원들을 제거 및 제어 하는것은 중요합니다.

# Lifecycle methods

<img src="https://grokonez.com/wp-content/uploads/2018/04/react-component-lifecycle-methods-diagram.png">
<img src="https://www.edureka.co/blog/wp-content/uploads/2017/08/ReactDOM.png">

<br>
<br>

### 1. ```constructor()```
``` js
  constructor (props) { ... }
```
component가 만들어질 때 실행 ( 기본 `state`를 설정할 수 있음 )
  
### 2. ```componentWillMount()```

component가 DOM에 렌더링전 실행 ( DOM 처리를 할 수 없음 )

### 3. ```render()```

### 4. ```componentDidMount()```
component 결과가 DOM에 렌더링 된 후 작동 ( 다른 js 프레임워크 연동 및 setTimeout, setInterval 및 AJAX 사용, DOM 처리 가능 )
  
### 5. ```componentWillReceiveProps()```

새로운 props를 받았을 때, props에 따라 state를 업데이트할 때 유용
  ( setState 가능 )
  
### 6. ```shouldComponentUpdate(nextProps, nextState)```
* component가 DOM에 업데이트를 할지 말지 정하는 부분.
* props/state가 변경되었을 때 리렌더링을 할지 말지 정함.
* 실제로 사용시 필요한 비교를 하고 값 반환 필요

``` js
  return nextProps.id !== this.props.id  // true/false
```
`JSON.stringify`를 사용하여 여러 field 비교 가능
  
### 7. ```componentWillUpdate()```
component가 DOM에 업데이트 되기 전 실행 ( 해당 cycle에서는 무한루프실행이 되므로 `setState` 사용 X )
  
### 8. ```componentDidupdate()```
component가 DOM에 업데이트 후 실행 ( setState 사용 X )
  
### 9. ```componentWillUnmount()```
component가 제거 될 때 실행 되는 메서드

# 분류
### unmount
* ```componentWillUnmount()```

### props를 받았을 때(처음)
* ```componentWillReceiveProps()```

### props가 업데이트 될 때
* ```componentWillUpdate```
* ```render```
* ```componentDidUpdate```

