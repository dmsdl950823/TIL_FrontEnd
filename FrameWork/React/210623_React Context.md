
# React Context

- [React Context](#react-context)
  - [Context 란?](#context-란)
  - [Context.Provider](#contextprovider)
  - [Class.contextType](#classcontexttype)
  - [Context.Consumer](#contextconsumer)
  - [Context.displayName](#contextdisplayname)


## Context 란?
> Context 는 **컴포넌트 트리의 매 계층마다 props 전달 없이 데이터를 제공**하는 방식입니다. (global context)
 
Context 는 특정한 데이터가 다수의 컴포넌트에서 사용될때/필요할 때 사용합니다. 많은 컴포넌트에서 사용하므로, 사용시 주의가 필요합니다. [Context API](https://reactjs.org/docs/context.html#api)

``` js
  // create context object
  const context = React.createContext(defaultValue)
```

## Context.Provider

이 `context` 오브젝트는 트리에서 `Provider` 와 가장 가깝게 일치하는 context value 를 읽습니다.  `defaultValue` 매개변수는 일치하는 컴포넌트가 없을때만 사용됩니다.

``` js
  // Context.Provider
  <MyContext.Provider value={ /* some value */ }/>
```

모든 Context 오브젝트는 context 변화를 위한 Provider React 컴포넌트와 함께 사용됩니다. Provider 컴포넌트는 해당 Provider 의 자식 컴포넌트에게 건내줄 `value` props 를 받습니다.

Provider 의 모든 자식들은 Provider 의 `value` props 가 바뀔때 마다 재랜더링(re-render) 을 합니다. 자식들에게 건내진 데이터는(`.contextType`, `useContext`) 부모(조상) 컴포넌트가 update 를 하지 않아도 업데이트가 됩니다. (`shouldComponentUpdate` 메서드의 목표물이 아니기 때문입니다)

## Class.contextType

``` js
/* Class Component */
  class MyClass extends React.Component {
    componentDidMount() {
      let value = this.context;
      /* perform a side-effect at mount using the value of MyContext */
    }
    componentDidUpdate() {
      let value = this.context;
      /* ... */
    }
    componentWillUnmount() {
      let value = this.context;
      /* ... */
    }
    render() {
      let value = this.context;
      /* render something based on the value of MyContext */
    }
  }
  
  MyClass.contextType = MyContext // 위에 정의했었음
```

클래스 컴포넌트의 `contextType` 프로퍼티는 `this.context` 를 사용한 Context 타입의 가장 최근 value 값을 알려줍니다.

``` js
  class MyClass extends React.Component {
    static contextType = MyContext;
    render() {
      let value = this.context;
      /* render something based on the value */
    }
  }
```

## Context.Consumer

``` js
  <MyContext.Consumer>
    { value => /* render something based on the context value */ }
  </MyContext.Consumer>
```

React 컴포넌트는 context 변화를 감지합니다. 이 컴포넌트를 사용하는것은 function 컴포넌트 내부에서 context 를 관찰할 수 있도록 해줍니다. 


## Context.displayName

``` js
  const MyContext = React.createContext(/* some value */)
  MyContext.displayName = 'MyDisplayName'

  <MyContext.Provider> // "MyDisplayName.Provider" in DevTools
  <MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

Context 오브젝트는 `displayName` 이라는 문자열 프로퍼티를 받습니다. React DevTools 는 이 string 을 Context 를 위해 어떤것을 보여줄지(display) 결정합니다.

-------

출처: [React context API](https://reactjs.org/docs/context.html#contextconsumer)