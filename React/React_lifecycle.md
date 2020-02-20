# 🌯 React_lifecycle.md

## Adding Lifecycle Methods to a Class
컴포넌트가 많을 경우, 컴포넌트가 파괴될 때 사용했던 자원들을 자유롭게 하는것은 중요하다.

### Lifecycle methods

> 1. ```constructor(props) { ... } ``` <br />
  component가 만들어질 때 실행 ( 기본 state를 설정할 수 있음 )
  
> 2. ```componentWillMount()``` <br />
  component가 DOM에 렌더링전 실행 ( DOM 처리를 할 수 없음 )

> 3. ```render()```

> 4. ```componentDidMount()``` <br />
  component 결과가 DOM에 렌더링 된 후 작동<br />
  ( 다른 js 프레임워크 연동 및 setTimeout, setInterval 및 AJAX 사용, DOM 처리 가능 )
  
> 5. ```componentWillReceiveProps()``` <br />
  새로운 props를 받았을 때, props에 따라 state를 업데이트할 때 유용
  ( setState 가능 )
  
> 6. ```shouldComponentUpdate(nextProps, nextState)``` <br />
  component가 DOM에 업데이트를 할지 말지 정하는 부분<br/>
  props/state가 변경되었을 때 리렌더링을 할지 말지 정함<br/>
  실제로 사용시 필요한 비교를 하고 값 반환 필요 <br/><br/>
  ```return nextProps.id !== this.props.id  // true/false```<br/>
  JSON.stringify를 사용하여 여러 field 비교 가능
  
> 7. ```componentWillUpdate()``` <br />
  component가 DOM에 업데이트 되기 전 실행<br/>
  ( setState 사용 X -> 무한루프 )
  
> 8. ```componentDidupdate()``` <br />
  component가 DOM에 업데이트 후 실행 <br />
  ( setState 사용X )
  
> 9. ```componentWillUnmount()``` <br />
component가 제거 될 때 실행 되는 메서드

-----------------------------------
* unmount
> ```componentWillUnmount()```

* props를 받았을 때(처음)
> ```componentWillReceiveProps()```

* props가 업데이트 될 때
> ```componentWillUpdate```
> ```render```
> ```componentDidUpdate```

