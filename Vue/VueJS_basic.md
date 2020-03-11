# VueJS_basic.md

## Template Syntax

### Interploation  
> <strong> String :: {{ }} </strong>  <br />
<small> You can print normal string with {{}} </small> <br />
``` <span> message: {{ message }} </span> ```<br />
<small> You can designate not to modify the text with v-once directive </small> <br />
``` <span v-once> Can't modify this text : {{ message }} </span> ```

> <strong> Native HTML :: v-html  </strong> <br />
<small> You can print raw HTML tags with v-html directive </small> <br />
```<p> Using v-html: <span v-html="rawHTML"></span> </p>```

> <strong> Attribute :: v-bind  </strong> <br />
<small> You can not use {{ }} in HTML attribute </small> <br />
```<div v-bind:id="dynamicId"></div>```  <br />
<small> When v-bind's variable is boolean(false), undefined, null, `disabled` attribute wouldn't be included in `<button>` element </small> <br />
```<button v-bind:disabled="isButtonDisabled"> Button </button>```

> <strong> Javascript expression </strong> <br />
<small> You can use simple Javascript syntax inside of {{ }} => But if! </small> <br />

    {{ ok ? 'YES' : 'NO' }}

    {{ message.split('').reverse().join('') }}

    <div v-bind:id="'list-' + id"></div>

<hr />

### Directive

    <p v-if="seen"> You can see me now! </p>
    
#### dynamic argument ( 2.6.0 + )
<small> You can use Javascript syntax inside [] :: exception exists</small>

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
  

# Computed, watch
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

Both can initiate function/method inside of them. But the diference is <strong> 'Computed' is cached(saved) along with subjected object. When the object has changed, it works their function. </strong> 

        computed: {
          now: function () {
            return Date.now()  // => never update.
          }
        }

* 'Computed' 's setter function

computed has basically 'getter' function, but you can generate setter if you need.

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


#### Watch 
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
        
<small></small> <br />
        
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
            
* If there are `v-for` and `v-if` in a one node, `v-for` has higher priority than `v-if` 

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
        
