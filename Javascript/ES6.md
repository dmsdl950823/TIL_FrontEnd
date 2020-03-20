## new String Method - ES6
#### startsWith() , endsWith() , include()
두 단어가 앞/뒤에 정확히 매칭하고 있는지 확인 (boolean)
```
    let str = "Hello world!";
    let matchstr = "hello";
    console.log( str.startsWith(matchstr) );  // true
    console.log( str.endsWith(matchstr) );  // false
    console.log( str.includes("!") );  // true
```

## Array - for of

```
    var data = [1, 2, undefined, NaN, null, ""];
    data.forEach(function(value) {  // 방법 1.
        console.log(value);
    })
    
    for (let idx in data) { // 방법 2. -> 별로 좋지 않은 방법
        console.log(data[idx]);
    }
    
    for (let value of data) { // 방법 3. 배열을 순회하는 새로운 방법 - string 순회도 가능
        console.log(value);
    }
```


------
## Module
webpack, babel등을 이용하여 module 사용 가능

#### export
다른 스크립트 내에서 사용하기 위해서는 export를 해주어야함
```
// location.js
export function log(data){
    console.log(data);
};

// default 는 '기본'으로 내보낸다는 뜻
export default function log2(data) {  ...  }

// class
export class MyLogger {
    constructor(props) {
        this.lectures = ['java', 'iOS'];
    }
    
    getLectures() {
        return this.lectures;
    }
}

// const/let 은 export default와 함께 쓸 수 없다
export const log3 = () => { ... }  // 방법 1.
const log3 = () => { ... } // 방법 2.
export default log3;

```
    
#### import
스크립트에 파일을 불러올때 사용
```
// export시 {객체}로 넘어오기 때문에 {} 사용 
import { log1, MyLogger } from './location';

// export default는 기본이기때문에 따로 처리를 하지 않아도 됨
import log2 from './location';

log1('my first data');

const logger = new MyLogger();
log1(logger.getLectures());
```
    






