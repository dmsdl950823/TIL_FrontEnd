- [Module Export & Import](#module-export--import)
  - [Export](#export)
  - [Import](#import)
  - [Export 사용 예시](#export-사용-예시)

# Module Export & Import

MDN `export, import` 모듈 설명이 너무 성의없이 되어있어 사용 방법이랑 정리를 해봤다.

## Export 
``` js
// Exporting individual features
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function functionName(){...}
export class ClassName {...}

// Export list
export { name1, name2, …, nameN };

// Renaming exports
export { variable1 as name1, variable2 as name2, …, nameN };

// Exporting destructured assignments with renaming
export const { name1, name2: bar } = o;

// Default exports
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// Aggregating modules
export * from …; // does not set the default export
export * as name1 from …; // Draft ECMAScript® 2O21
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default, … } from …;
```

## Import
``` js
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export1 [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";

var promise = import("module-name");
```



## Export 사용 예시

``` js
/* export.js */
// Exporting individual features
export const name1 = 'name1'
export let name2 = 'name2'
export var name3 = 'name3'

// 또는 아래 Export list 와 같이 사용할 수 있다
const name1 = 'name1'
let name2 = 'name2'
var name3 = 'name3'
export { name1, name2, name3 }


/* import.js */
// Exporting individual features
import { name1 } from './test'
import { name2 } from './test'
import { name3 } from './test'

// 또는 아래 Export list 와 같이 사용할 수 있다
import { name1, name2, name3 } from './test'
console.log(name1, name2, name3)
```

``` js
/* export.js */
export function func1 () {
  console.log('func1 :: Hello World!')
}
export class ClassExample1 {
  constructor () {
    this.print = 'Hello Print!'
    this.func = () => {
      console.log('Hello Class Func!')
    }
  }
}


/* import.js */
import { func1, ClassExample1 } from './test'
func1()  // 'func1 :: Hello World!'

const classEx1 = new ClassExample1()
console.log(classEx1.print) // 'Hello Print!'
classEx1.func()             // 'Hello Class Func!'
```

------

``` js
// Renaming exports
/* export.js */
const var1 = 'var_1'
const var2 = 'var_2'

export { var1 as variable1, var2 as variable2 }


/* import.js */
import { variable1, variable2 } from './test'
console.log(variable1, variable2)   // var_1, var_2
```

------

``` js
// Exporting destructed assignments with renaming
/* export.js */
const o = { val1: 'val_1', val2: 'val_2' }
export const { val1, val2: bar } = o


/* import.js */
import { val1, bar } from './test'
console.log(val1, bar) // 'val_1 val_2'
```

-----
``` js
// Default exports
/* export.js */
const defaultVal = 'default1' 
const name6 = 'name6'

// export default 는 1 개만 할 수 있음
export default defaultVal                // 1
export default function () {             // 2
  return 'This is Default Function'
}
export default function defFunc () {     // 3
    return 'This is Default Function'
}
export { defaultVal as default, name6 }  // 4


/* import.js */
import defaultVal from './test'              // 1
import defFunc from './test'                 // 2, 4
import defaultVal, { name6 } from './test'   // 4

console.log(defaultVal) // default1
console.log(defFunc())
console.log(defaultVal, name6) // default1 name6
```


