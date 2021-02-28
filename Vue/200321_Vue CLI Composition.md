# Vue-cli 구성

``` html
  <template>
    <div>
      <p :id="num"> 
        <!-- id(attribute)에 data.num 데이터 바인딩 -->
        {{num}}
      </p>
      
      <!-- props(msg)를 해당 컴포넌트에 넘겨줌 --> 
      <HelloWorld msg="Welcome to Your Vue.js App"/> 
      
    </div>
  </template>
```

``` js
  <script>
  import HelloWorld from '../components/HelloWorld.vue';
  // import HelloWorld from '@/components/HelloWorld.vue'; // router 있을 때
  
  
  export default {
    // 해당 component의 이름
    name: 'HelloWorld',

    // props
    props: {
      // msg props를 String 으로 설정
      msg: String,
    },

    // data binding
    data(){
      return {
        num: '2',
        uuid: 'abc1234'
      }
    },
    
    // console 찍어보기
    created () {
      console.log(JSON.stringify(ths.data)
    },

    // method definition
    methods: {
      increment () {
        this.num++;
      },
      decrement () {
        this.num--;
      }
    },
    
    // 사용할 component 등록
    components: {
      HelloWorld,
    },
    
  };
  </script>
```

``` html
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped lang="scss">
    h3 {
      margin: 40px 0 0;
      color: var(--h3-color, blue);
    }
    </style>
```
