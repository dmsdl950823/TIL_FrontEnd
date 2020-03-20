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
----------

## Array
#### for of

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

#### spread operator(펼침 연산자)
```
    let pre = ["apple", "orange", 100];
    let newData = [...pre];
    console.log(newData);           // ["apple", "orange", 100]
    console.log(pre === newData);   // false (같은참조를 유지하지 않음 - 배열 복사)
```
활용
```
    let pre = [100, 200, "hello", null];
    let newData = [0, 1, 2, 3, ...pre, 4];
    console.log(newData);           // [0, 1, 2, 3, 100, 200, "hello", null, 4]
```

```
    function sum(a, b, c) { return a + b + c }
    let pre = [100, 200, 300];
    console.log( sum.apply(null, pre) );    // 600
    console.log( sum(...pre) )              // 600
```

#### from()
```
    // 기존 방식
    function addMark() {
        let newData = [];
        for (let i = 0; i < arguments.length; i++) {
            newData.push(arguments[i]) + "!");
        }
        console.log(newData);
    }
    addMark(1,2,3,4,5,6,7,8,9);     // ["1!", "2!", "3!", "4!", "5!", "6!", "7!", "8!", "9!"]
```

```
    // from()을 사용한 방식
    function addMark() {
        let newArray = Array.from(arguments);  // arguments는 진짜 배열이 아니라 배열의 형태를 한 
        let newData = newArray.map(function(value) {
            return value + "!";
        });
        console.log(newData);
    }
    addMark(1,2,3,4,5,6,7,8,9);     // ["1!", "2!", "3!", "4!", "5!", "6!", "7!", "8!", "9!"]
```
------
## Generate Object
```
    function getObj() {
        const name = "crong";
        
        const getName = function() {
            return name;
        }
        
        const setName = function(newname) {
            name = newname;
        }
        const printName = function() {
            console.log(name);
        }
        return {
            getName,    // getName = getName()
            setName     // setName = setName()
            name        // name = name
        }
    }
    
    var obj = getObj();
    console.log(obj.getName());

```

---------

## Destructing
#### Array 에서
```
    let data = ["crong", "honux", "jk", "hinny"];
    /*  // 기존 방법
        let myname = data[0];
        let jisu = data[0];    */
    
    // es6
    let [jisu,,jung] = data;    // jisu = data[0], jung = data[2]
    console.log(jisu, jung);    // "crong", "jk"
```

#### Object 에서
key, value 값을 같은 이름에 할당함
```
    let obj = {
        name = "crong",
        address = "Korea",
        age:  10
    }
    
    let {name, age} = obj;
    console.log( name, age );    // "crong", 10

    let {name: myName, age: myAge} = obj;
    console.log( myNAme, age );  // "crong", 10
````

#### Json parsing
```
    // destructing 활용 json 파싱 방법
    var news = [
        { title: "sbs", "imgurl": 123, "newsList" : ["news1", "news2", "news3"]},
        { title: "mbc", "imgurl": 456, "newsList" : ["news4", "news5", "news6"]},
    ]
    
    let [,mbc] = news;
    console.log(mbc);   // { imgurl: 456, newsList : ["news4", "news5", "news6"]}, title: "mbc" }
    
    let {title, imgurl} = mbc;
    console.log(title, imgurl)  // "mbc", 456
    
    function getNewsList( [, { newsList }] ) {  // 2번째 데이터에 newsList
    function getNewsList( [{ newsList }] ) {    // 1번째 데이터의 newsList
        console.log(newsList);
    }
    
    getNewsList(mbc);
```

#### Event 객체 전달
```
    element.addEventListner("click", ( {target, type} ) => {  // event객체의 target, type선택
        console.log(target.tagName)
    })
```
------

## Set - 특별한자료구조

#### Set
set: 중복 없이 유일한 값을 저장하려고 할때사용. 이미 존재하는지 체크할때 유용
```
    let mySet = new Set();
    console.log(toString.call(mySet));     // [object Set]

    mySet.add( "crong" );
    mySet.add( "hary" );
    mySet.add( "crong" );

    // 배열에 "crong"이 있는지 확인
    console.log(mySet.has("crong"))     // true

    mySet.forEach(function(v) {
        console.log(v);         // "crong" "hary"
    })
    
    mySet.delete("crong");  // "hary"
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
    






