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
  
  
  
  
  
  
  <hr/>
>   <strong> </strong> <br />
<small> </small> <br />
  <br />
