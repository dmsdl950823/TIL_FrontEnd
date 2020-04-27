# 🥫VueJS_basic.md

## Template Syntax

### Interploation  
#### 1. String :: {{ }}
문자열을 출력 할 수 있습니다<br />
You can print normal string with {{}}

    <span> message: {{ message }} </span> 

한번만 출력하여 수정할 수 없게 지정할 수 있습니다. <br />
You can designate not to modify the text with v-once directive

    <span v-once> Can't modify this text : {{ message }} </span>

#### 2. Native HTML :: v-html 
HTML태그를 그대로 프린트 할 수 있습니다. <br />
You can print raw HTML tags with v-html directive<br />

    <p> Using v-html: <span v-html="rawHTML"></span> </p>

#### 3. Attribute :: v-bind
HTML attribute에 {{ }}는 사용할 수 없습니다. <br />
You can not use {{ }} in HTML attribute <br />

    <div v-bind:id="dynamicId"></div>
    
v-bind의 변수가 boolean, undefined, null, `disabled` 일경우 `button` 요소가 반영되지 않습니다.<br />
When v-bind's variable is boolean(false), undefined, null, `disabled` attribute wouldn't be included in `<button>` element. <br />

    <button v-bind:disabled="isButtonDisabled"> Button </button>

#### 6. Javascript expression
간단한 JS 문법을 {{ }}에 사용할 수 있습니다. (if 는 안됩니다)<br />
You can use simple Javascript syntax inside of {{ }} => But if! <br />

    {{ ok ? 'YES' : 'NO' }}

    {{ message.split('').reverse().join('') }}

    <div v-bind:id="'list-' + id"></div>

<hr />

### 🛴 Directive ★

    <p v-if="seen"> You can see me now! </p>
    
### Dynamic argument ( 2.6.0 + )
JS 문법을 [] 안에 넣을 수도 있습니다. - 예외 존재<br />
You can use Javascript syntax inside [] :: exception exists

    <a v-bind:[attributeName]="url"> ... </a>


### simple vue syntax
##### v-bind
    <!-- original syntax -->
    <a v-bind:href="url"> ... </a>

    <!-- simple version -->
    <a :href="url"> ... </a>

    <!-- shorthand with dynamic argument (2.6.0+) -->
    <a :[key]="url"> ... </a>

##### v-on
    <!-- original syntax -->
    <a v-on:click="doSomething"> ... </a>

    <!-- simple version -->
    <a @click="doSomething"> ... </a>

    <!-- shorthand with dynamic argument (2.6.0+) -->
    <a @[event]="doSomething"> ... </a>
  
------
# Computed, Watch

        <div id="example">
          <p> original message : "{{ message }}" </p>
          <p> reverse message : "{{ reversedMessage }}" </p>
        </div>

        var vm = new Vue({
          el: '#example',
          data: {
            message: '안녕하세요'
          },
          computed: {
            // computed getter
            reversedMessage: function () {
              // `this` = vm instance(data)
              return this.message.split('').reverse().join('')
            }
          }
        });
        
        console.log(vm.reversedMessage) // => '요세하녕안'
        vm.message = 'Goodbye';
        console.log(vm.reversedMessage) // => 'eybdooG'

* Method vs Computed
두 개 모두 function/method를 안에 입력할 수 있지만, 'Computed'는 목표된 객체와 함께 cached(저장)됩니다.
object가 변화가 생길때, function에서 작동합니다. <br />
Both can initiate function/method inside of them. But the diference is <strong> 'Computed' is cached(saved) along with subjected object. When the object has changed, it works their function. </strong> 

        computed: {
          now: function () {
            return Date.now()  // => never update.
          }
        }

* 'Computed' 's setter function

Computed는 'getter' function을 가지고있지만, 원한다면 setter를 만들수도 있습니다. <br />  
Computed has basically 'getter' function, but you can generate setter if you need.

        computed: {
          fullName: {
            // getter
            get: function () {
              return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
              var names = newValue.split(' ')
              this.firstName = names[0]
              this.lastName = names[names.length - 1]
            }
          }
        }

* methods vs computed

computed는 data 속성에 변화가 있을때 자동으로 다시 연산을 한다.<br><br>

computed에서 사용하고 있는 data의 프로퍼티에 변화가 있을때만 다시 연산을하고 한번 연산한 값을 캐싱 해놓았다가 필요한 부분에 다시 재사용한다. <br>
같은 페이지내에서 같은 연산을 여러번 반복해야 할 경우에 성능면에서 효율적으로 사용할 수 있다. <br>

반면 methods는 캐싱이라는 개념이 없기 때문에 매번 재 렌더링된다. <br>
<strong>캐싱 효과가 필요하다면 computed를 사용하고 캐싱이 필요없다면 methods를 사용하도록 하자.</strong>


#### Watch 
지속적으로 data 변화를 관찰합니다. async나 작업을 할때 attribute를 사용할 수 있습니다.<br />
computed는 내장 api를 사용하는 간단한 연산정도에 적합하고 <br>
watch는 <strong>데이터 호출과 같이 시간이 상대적으로 더 많이 소모되는 비동기 처리에 적합합니다.</strong><br>
Observer for reacting changes. You can use this Attribute while using async or works eating up a lot of time.

        watch: {
        // it works whenever input text is changing.
        question: function (newQuestion) {
          this.answer = '입력을 기다리는 중...'
          this.getAnswer()
        }
      },


  <hr/>
  
  # Class / Style binding
  
  #### v-bind:class
        // if 'isactive' is true, add 'active' class
        <div v-bind:class="{ active: isActive }"> </div>
        
        // It will be with 'static' class
        <div
          class="static"
          v-bind:class="{ active: isActive, 'text-danger': hasError }"
         ></div>
         
         // data: { activeClass: 'active', errorClass: 'text-danger' }
         <div v-bind:class="[activeClass, errorClass]"></div>
         
         <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
         
         <div v-bind:class="[{ active: isActive }, errorClass]"></div>
         
  #### v-bind:style
        // data: { activeColor: 'red', fontSize: 30 }
        <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
        
        // styleObject: { color: 'red', fontSize: '13px' }
        <div v-bind:style="styleObject"></div>
         
        <div v-bind:style="[baseStyles, overridingStyles]"></div>
        
<hr />

# Logic rendering

#### v-if
        // if 'ok' is true, render
        <h1 v-if="ok"> Yes </h1>
        <h1 v-else> No </h1>
        
        <div v-if="Math.random() > 0.5">
         Now you can see me
        </div>
        <div v-else>
          Not now!
        </div>
        
        // 2.1.0 +
        <div v-if="type === 'A'">       A </div>
        <div v-else-if="type === 'B'">  B  </div>
        <div v-else-if="type === 'C'">  C </div>
        <div v-else>                    Not A/B/C </div>
        
#### v-show
        // simply, display toggle
        <h1 v-show="ok">안녕하세요!</h1>

<hr />

# List rendering

#### v-for
        
        // ... items: [ { message: 'Foo' }, { message: 'Bar' } ]
        // You can use 'of' instead of 'in'
        <div v-for="item of items"></div>
        
        // second parameter is index, key is mandatory.
        <ul id="example-1">
          <li v-for="(item, index) in items" v-bind:key="item.id">
            {{ item.message }} + {{ index }}
          </li>
        </ul>
        
<br />
        
        // v-for object 
        <ul id="v-for-object" class="demo">
          <li v-for="(value, name) in object">
            {{ value }} : {{ value }}
          </li>
        </ul>
        
        //... object: {
        //  title: 'How to do lists in Vue',
        //  author: 'Jane Doe',
        //  publishedAt: '2016-04-10'
        //}
        

##### Filtered result with v-for
        <li v-for="n in evenNumbers">{{ n }}</li>
        
        // evenNumbers: function () {
            return this.numbers.filter(function (number) {
              return number % 2 === 0
            })
          }
            
* 만약 `v-for`과 `v-if`가 같은 노드에 있을경우, `v-for`가 더 높은 우선권을 가집니다. <br />
If there are `v-for` and `v-if` in a one node, `v-for` has higher priority than `v-if` 

<hr />


# Event Handling
#### v-on
         
        // data : { counter: 0 }
        <button v-on:click="counter += 1">Add 1</button>
        <p> {{ counter }} </p>

        <button v-on:click="greet"> Greet </button>
        
        // Generate 'great()' method 
        ... greet: function(event) {
                        alert('hello! You clicked ' + event.target.tagName)
                   }

        // Inline method 
        <button v-on:click="say('hi')"> Say hi </button>
        
        // Generate 'say()' function
        ... say: function (message) {
              alert(message)
            }
            
        // $event : DOM Event
        <button v-on:click="warn('Form cannot be submitted yet.', $event)">  Submit  </button>
        
        ... warn: function (message, event) {
            // now you can acess to Native Event
            if (event) event.preventDefault()
            alert(message)
          }

        // .stop : stop click event 
        <a v-on:click.stop="doThis"></a>

        // .pervent = e.preventDefault()
        <form v-on:submit.prevent="onSubmit"></form>

        // chaining
        <a v-on:click.stop.prevent="doThat"></a>

        // simply use without method
        <form v-on:submit.prevent></form>

        // .capture : Using event capturing 
        <!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
        <div v-on:click.capture="doThis">...</div>

        // .self : handle trigger if event.target is only element itself(Not child element)
        <div v-on:click.self="doThat">...</div>

        // 2.1.4 + 
        // .once : click event can be triggered only once
        <a v-on:click.once="doThis"></a>
        
        // 2.3.0 + 
        // .passive : addEventListner's passive option
        <div v-on:scroll.passive="onScroll">...</div>

#### Event key
        // only call `submit()` when the `key` is `Enter`
        <input v-on:keyup.enter="submit">
        
        // keycode usage
        <input v-on:keyup.13="submit">
        
        // .enter  .tab  .delete  .space  .up  .down  .left  .right
        // .ctrl  .alt  .shift  .meta
        <input @keyup.alt.67="clear"> => Alt + C
        <div @click.ctrl="doSomething"> Ctrl + Click </div>
        
        // .exact : press certain key's comination exactly
        <button @click.ctrl.exact="onCtrlClick"> only work when ctrl key is pressed </button>
        
        // mouse button
        // .left  .right  .middle

<hr />

# Form binding
#### v-model

        <input v-model="message" placeholder="여기를 수정해보세요">
        <p>메시지: {{ message }}</p>

        <p style="white-space: pre-line">{{ message }}</p>
        <br>
        <textarea v-model="message" placeholder="여러줄을 입력해보세요"></textarea>

        // checkbox
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>

        // checked array
        // data : { chekedNames : [] }
        <div>
          <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
          <label for="jack">Jack</label>
          <input type="checkbox" id="john" value="John" v-model="checkedNames">
          <label for="john">John</label>
          <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
          <label for="mike">Mike</label>
          <br>
          <span> checked names: {{ checkedNames }}</span>
        </div>

        // radio
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>선택: {{ picked }}</span>
        
        // select - one
        // data: { selected: '' }
        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span> Selected : {{ selected }}</span>
        
        // select - multiple
        <select v-model="selected" multiple>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <br>
        <span>Selected: {{ selected }} </span>

#### Binding values
        //`picked` is "a" when it's selected
        <input type="radio" v-model="picked" value="a">

        // `toggle` is true or false 
        <input type="checkbox" v-model="toggle">

        // `selected` is "abc" when "ABC" is selected
        <select v-model="selected">
          <option value="abc">ABC</option>
        </select>
        
#### Modifiers
        // .lazy : sync after 'change' event
        <input v-model.lazy="msg" >
        
        // .number : Use if you want user input to be automatically changed as a Number
        <input v-model.number="age" type="number">
        
        // .trim : Use if you want to trim whitespace from user input automatically
        
