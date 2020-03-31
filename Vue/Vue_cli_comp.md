# Vue-cli component manage

```
    <template>
      <div>
        <p :id="num"> 
          <!-- id(attribute)에 data.num 데이터 바인딩 -->
          {{num}}
        </p>
      </div>
    </template>

    <script>
    export default {
      // 해당 component의 이름
      name: 'HelloWorld',

      // props
      props: {
        msg: String,
      },

      // data binding
      data(){
        return {
          num: '2',
          uuid: 'abc1234'
        }
      },

      // method definition
      methods: {
        increment () {
          this.num++;
        },
        decrement () {
          this.num--;
        }
      }
    };
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped lang="scss">
    h3 {
      margin: 40px 0 0;
      color: var(--h3-color, blue);
    }
    </style>
```
