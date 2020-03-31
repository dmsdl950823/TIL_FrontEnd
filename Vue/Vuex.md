# Vuex
<img src="https://vuex.vuejs.org/flow.png" width="500"/>
<img src="https://vuex.vuejs.org/vuex.png" width="700"/>

### store 생성
store : 저장소

    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      }
    })
