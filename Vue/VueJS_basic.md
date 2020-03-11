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
        
        // second parameter is index
        <ul id="example-1">
          <li v-for="(item, index) in items">
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
        
        
        
            
















