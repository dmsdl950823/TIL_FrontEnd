# 🐱‍🚀 Redux Basic

## What it is?
It helps you write applications that behave consistently, run in different environments
다른 환경에서 같은 작업을 하는 앱 작성/테스트 를 도와주는 도구
React 등 다른 view library와 함께 이용 가능

## Install

    # NPM
    npm install redux
    # Yarn
    yarn add redux

## Redux Toolkit
It's a tool for redux to help using it more easily.
Redux 사용을 더 편하게 해줄 수 있는 도구


# Getting Started

### Action
Actions are payloads of information that send data from your application to your store. <br/>
They are the only source of information for the store. <br/>
You send them to the store using ```store.dispatch()```. <br/>
Actions are plain JavaScript objects.

Action은 app에서 store로 데이터를 보내는 정보 루트이며 store를 위한 유일한 정보소스이다.
```store.dispatch()```를 이용하여 store에 전송할 수 있다.
상태에 어떠한 변화가 필요하게 될 때 액션 발생, 하나의 객체로 표현

Actions must have a type property that indicates the type of action being performed.
action은 수행할 방식을 가리키는 TYPE 필드를 필수적으로 가지고 있어야 한다.

Other than type, the structure of an action object is really up to you.
그 외의 값은 개발자 마음대로 넣을 수 있다.

    {
      type: ADD_TODO,
      text: 'Build my first Redux app',
      index: 5
    }
-------------------------------------------------------------

### Action Creator
functions that create actions - return an action: by getting parameter
액션을 만드는 함수 - 파라미터를 받아와서 액션 객체 제작

    function addTodo(data) {
      return {
        type: "ADD_TODO",
        data
      };
    }

To actually initiate a dispatch, pass the result to the ```dispatch()``` function:
dispatch를 초기화하기 위해서는 ```displatch()``` 함수에 넘겨주면 됨.

```
    dispatch(addTodo(text))
    dispatch(completeTodo(index))

```
    # Alternative way (the same way)
    const boundAddTodo = text => dispatch(addTodo(text))
    const boundCompleteTodo = index => dispatch(completeTodo(index))
    
    boundAddTodo(text)
    boundCompleteTodo(index)


```dispatch()``` function can be accessed directly from the store as ```store.dispatch()```, but more likely you'll access it using a helper like react-redux's ```connect()```.
```dispatch()``` 함수는 ```store.dispatch()```로도 접근 가능하지만 react-redux의 ```connect()```로도 접근 가능하다.

-------------------------------------------------------------

### Reducer
Function for occuring changes. Get two parameters
변화를 일으키는 함수 - 두가지 파라미터를 받음

    function reducer(state, action) {
      // 상태 업데이트 로직
      return alteredState;
    }
    
    
    
### Store

한 애플리케이션 당 하나의 스토어를 만들게 됩니다
스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있습니다


### Dispatch
스토어의 내장함수 - 액션을 발생 시키는 것
dispatch 라는 함수에는 액션을 파라미터로 전달 - dispatch(action)

호출할 경우, 스토어는 리듀서 함수를 실행 - 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태제작

### Subscribe
스토어의 내장함수 - 함수 형태의 값을 파라미터로 받음
subscribe 함수에 특정 함수를 전달 - 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출
