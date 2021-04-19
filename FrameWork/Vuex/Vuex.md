# Vuex
<img src="https://vuex.vuejs.org/flow.png" width="500"/>
<img src="https://vuex.vuejs.org/vuex.png" width="700"/>

### store 생성
store : 통합 저장소

    const store = new Vuex.Store({
      state: {
        count: 0
      },
      
      // 상태 변형
      mutations: {
        increment (state) {
          state.count++
        }
      }
    })
    ...
    store.commit('increment')
    
### Vuex 를 Vue 컴포넌트에 가져오기


    // Counter 컴포넌트를 만듭니다
    const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count () {
          return store.state.count
        }
      }
    }

### mapState()
    // 독립 실행 형 빌드에서 헬퍼가 Vuex.mapState로 노출됩니다.
    import { mapState } from 'vuex'

    export default {
      // ...
      computed: mapState({
        // 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
        count: state => state.count,

        // 문자열 값 'count'를 전달하는 것은 `state => state.count`와 같습니다.
        countAlias: 'count',

        // `this`를 사용하여 로컬 상태에 액세스하려면 일반적인 함수를 사용해야합니다
        countPlusLocalState (state) {
          return state.count + this.localCount
        },
        
        // 매핑 된 계산된 속성의 이름이 상태 하위 트리 이름과 같을 때 문자열 배열을 ```mapState```에 전달
        'count'
      })
    }

### getters
Vuex를 사용하면 저장소에서 "getters"를 정의 할 수 있습니다.<br />
저장소의 계산된 속성으로 생각할 수 있습니다. 계산된 속성처럼 getter의 결과는 종속성에 따라 캐쉬되고, 일부 종속성이 변경된 경우에만 다시 재계산 됩니다.

    const store = new Vuex.Store({
      state: {
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
      },
      getters: {
        // 첫 번째 전달 인자로 상태를 받음
        doneTodos: state => {
          return state.todos.filter(todo => todo.done)
        }
      }
    })

    // 접근 방식
    store.getters.doneTodos

### mapGetters()
저장소 getter를 로컬 계산된 속성에 매핑 <br />
getter를 다른 이름으로 매핑하려면 객체를 사용

    import { mapGetters } from 'vuex'

    export default {
      // ...
      computed: {
        // getter를 객체 전개 연산자(Object Spread Operator)로 계산하여 추가합니다.
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }
    }

# Mutation - 변이

    const store = new Vuex.Store({
      state: {
        count: 1
      },
      mutations: {
        increment (state) {
          // 상태 변이 
          state.count++
        }
      }
    })

### commit()
```store.commit()``` 에 추가  전달인자를 사용하여 호출 가능 <br />
작업은 동기적이야만 합니다.

    store.commit('increment', 10)
    
    
# Action
액션은 변이와 유사합니다.<br />
상태를 변이시키는 대신 액션으로 변이에 대한 커밋을 하고, 작업에 임의의 비동기 작업이 포함 될 수 있다는 점이 다름

    const store = new Vuex.Store({
      ...
      actions: {
        increment (context) {
          context.commit('increment')
        }
      }
    })

### dispatch()
```store.commit()``` 은 동기적이지만 ```store.dispatch()```는 비동기작업도 수행할 수 있습니다.

    ...
    actions: {
        // 객체와 함께 디스패치
        store.dispatch({
          type: 'incrementAsync',
          amount: 10
        })
        
        // 내부에 또다른 액션을 만들 수 있음
        store.dispatch('actionA').then(() => {
            commit('someOtherMutation')
        })
        
        // async/await 사용 가능
        async actionB({commit){
            commit('gotData', await getData())
        },
        async actionC({ dispatch, commit }) {
            await dispatch('actionA')   // actionA가 끝나기를 기다립니다.
            commit('gotOtherData', await getOtherData())
        }
    }
    
    
# Module
여러개의 저장소(```store```)를 모듈로 나눌 수 있다. <br />
각 모듈은 자체 상태, 변이, 액션, 게터 및 심지어 중첩된 모듈을 포함 할 수 있습니다.

    const moduleA = {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }

    const moduleB = {
      state: { ... },
      mutations: { ... },
      actions: { ... }
    }

    const store = new Vuex.Store({
      modules: {
        // import 도 가능
        a: moduleA,
        b: moduleB
      }
    })

    store.state.a // -> moduleA'의 상태
    store.state.b // -> moduleB'의 상태

모듈이 독립적이거나 재사용되길 원할경우 ```namespaced: true```라고 네임스페이스에 명시하면 됨

    const store = new Vuex.Store({
      modules: {
        ...
        namespaced: true
      }
    })















    
