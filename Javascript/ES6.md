# 🌯 ES6

## 💕new String Method - ES6
#### ✔ startsWith() , endsWith() , include()
두 단어가 앞/뒤에 정확히 매칭하고 있는지 확인 (boolean)
```
    let str = "Hello world!";
    let matchstr = "hello";
    console.log( str.startsWith(matchstr) );  // true
    console.log( str.endsWith(matchstr) );  // false
    console.log( str.includes("!") );  // true
```
----------

## 💕 Array
#### ✔ for of

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

#### ✔ spread operator(펼침 연산자)
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

#### ✔ from()
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
## 💕 Generate Object
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

## 💕 Destructing
#### ✔ Array 에서
```
    let data = ["crong", "honux", "jk", "hinny"];
    /*  // 기존 방법
        let myname = data[0];
        let jisu = data[0];    */
    
    // es6
    let [jisu,,jung] = data;    // jisu = data[0], jung = data[2]
    console.log(jisu, jung);    // "crong", "jk"
```

#### ✔ Object 에서
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

#### ✔ Json parsing
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

#### ✔ Event 객체 전달
```
    element.addEventListner("click", ( {target, type} ) => {  // event객체의 target, type선택
        console.log(target.tagName)
    })
```
------

## 💕 Set, WeakSet - 특별한자료구조
Array 를 개선한 자료구조

#### ✔ Set
et: 중복 없이 유일한 값을 저장하려고 할때사용. 이미 존재하는지 체크할때 유용
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

#### ✔ WeakSet
WeakSet: 참조를 가지고 있는 객체만 저장이 가능하다 <br />
객체형체를 중복없이 저장하려고 할 때 유용함
```
    let arr = [1,2,3,4];
    let arr = [5,6,7,8];
    let obj = {arr, arr2};
    let ws = new WeakSet();
    
    ws.add(arr);
    
    // ws.add(111);
    // ws.add("111");
    // ws.add(null);   // => 모두 집어넣을수 없는 형태
    ws.add(function(){});  // => 집어넣을 수 있는 형태
    
    ws.add(arr2);
    ws.add(obj);
    
    arr = null;
    
    console.log( ws );  //  WeakSet {(4) [5, 6, 7, 8], [1, 2, 3, 4], function, Object {arr: Array(4), arr2: Array(4)}}
    console.log( ws.has(arr), ws.has(arr2) )    // false, true  =>  실제로는 null로 인해 지워져있는 상태
```
------
## 💕 Map & WeakMap
Object를 조금 개선한 자료구조

#### ✔ Map
key/value 뿐 아니라 관련 정보도 저장할 수 있음
```
    let wm = new WeakMap();
    let myfunc = function() {};
    
    // 이 함수가 몇번 실행됐는지 확인 할 때
    wm.set(myfunc, 0);
    console.log(wm);                // 0번째 돌아감
    
    for (let i = 0; i < 0; i++) {
        count = wm.get(myfunc);     // get value
        count++;
        wm.set(myfunc, count);
    }
    console.log(wm);                // 10번째 돌아감
    
    myfunc = null;
    console.log(wm.get(myfunc));    // undefined -> null로 없애버렸음
```


#### ✔ WeakMap
```
    let wm = new WeakMap();
    let myfunc = function(){};
```

활용 -> ★
```
    WeakMap 클래스 인스턴스 변수 보호하기
```
------
## 💕 Template
#### Template 처리
```
    const data = 'text';
    const template = `<div> ${data} </div>`;
```

#### ✔ Tagged Template literals
```
    function fn(tags, name, items) {
        console.log(tags);
        if(typeof items === "undefined") {
            items = "주문가능한 상품이 없습니다.";
        }
        return (tags)
    }
    const data = [{...}, {...}];
    data.forEach((v) => {
        const template = fn`<div> ${data.} </div>`;
        console.log(template);
    });
    
    const template = fn`<div> ${data.} </div>`
    console.log(template);
```
------
## 💕 function
#### ✔ Arrow function 
```
    // 함수를 () => {} 로 표현
    let newArr = [1,2,3,4,5].map(() => {
        return value * 2;
    });
    
    // return이 생략된 표현법
    let newArr = [1,2,3,4,5].map(() => value * 2 );
```
#### ✔ Arrow function의 this context
```
   const myObj = {
        runTimeOut_1() {
            setTimeOut(function(){      // 일반 callback 함수
                console.log(this === window);
            }.bind(this), 200);         // => this 객체는 window이기 때문에 함수를 bind 시켜줘야함
        },
        runTimeOut_2() {
            setTimeOut(() => {          // arrow 함수
                console.log(this === window);
                this.printData();       // arrow함수는 this를 포함하고있음
            }, 200);
        },
        printData() {
            console.log("hi codesquad!")
        }
   }
    
    myObj.runTimeout_1();       // true
    myObj.runTimeout_2();       // false, "hi codesquad!"
```
-------
#### ✔ function default parameters
default parameter -> 매개변수가 전달되지 않은 경우 자동으로 사용되는 변수
```
    function sum(value, size = 1) {     
        // size = size || 1;
        return value * size;
    }
    
    function sumObj(value, size{ value: 1 }) {
        return value * size;
    }
    
    console.log(sum(3));    // 3
    console.log(sumObj(3, { value: 3 }));  // 9
```
------
#### ✔ rest parameters
```
    // ES5
    function checkNum() {
        // argument는 Array가 아님 -> Array로 변경해주어야함
        const argArray = Array.prototype.slice.call(argumetns);
        console.log(toString.call(argArray));
        const result = argArray.every((v) => typeof v === "number")
        console.log(result);
    }
    
    // ES6
    function checkNum(...argArray) {   // argArray로 argument를 Array로 변경할 수 있음
        console.log(toString.call(argArray));
        const result = argArray.every((v) => typeof v === "number")
        console.log(result);
    }
    
    const result = checkNum(10,2,3,4,5,"55");       // false

```
------
## 💕 Object
#### ✔ ES6 Class
```
    // ES5 object
    function Health() {
        this.name = name;
    }
    
    Health.prototype.showHealth = function() {
        console.log(this.name + " 님 안녕하세요")
    }
    
    const h = new Health("crong");
    h.showHealth();             // "crong 님 안녕하세요"
```

```
    // ES6 class  -  내부적으로는 함수가 작용하는것(위 코드와 동일)
    class Health {
        constructor(name, lastTime) {
            this.name = name;
            this.lastname = lastTime;
        }
        
        showHealth() {
            console.log("안녕하세요" + this.name);
        }
    }
    const myHealth = new Health("crong")
    myHealth.showHealth();      // "crong 님 안녕하세요"
```

#### ✔ Object.assign() -> JS object 제작
```
    // ES5
    const healthObj = {
        showHealth : function() {
            console.log("오늘 운동시간" + this.healthTime);
        }
    }
    const myHealth = Object.create(healthObj);
    
    myHealth.healthTime = "11:20";
    myHealth.name = "crong";

    console.log(myHealth);      // Object {healthTime: "11:20", name: "crong"}
```
```
    // ES6
    const healthObj = {
        showHealth : function() {
            console.log("오늘 운동시간" + this.healthTime);
        }
    }
    const myHealth = Object.assign(Object.create(healthObj), {
        name : "crong",
        lastTime: "11:20"
    });
   
    console.log(myHealth);      // Object {lastTime: "11:20", name: "crong"}
```

##### ✔ Object.assign() - Immutable 객체 만들기
new가 필요없이 만들 수 있음
```
    const previousObj = {
        name: "crong",
        lastTime: "11:20"
    }
    const myHealth = Object.assign({}, previousObj, {   // previousObj 내용에서 변경사항을 적용
        "lastTime" : "12:30",
        "name": "honux",
        "age": 99
    });
    
    console.log(previousObj);      // Object {lastTime: "12:30", name: "honux", "age": 99}
    console.log(myHealth);      // Object {lastTime: "11:20", name: "crong"}
    // 둘은 다른값 => 참조X
```

#### ✔ setPrototypeOf()
프로토타입 지정
```
    const healthObj = {
        showHealth : function() {
            console.log("오늘 운동시간" + this.healthTime);
        },
        setHealth: function(time) {
            this.healthTime = newTime;
        }
    }
    
    // 특정객체에 healthObj를 프로토타입으로 지정
    // Object.__proto__ 로 사용해도 괜찮음 -> 권장하지는 않음
    const newObj = Object.setPrototypeOf({
        name: "crong",
        lastTime: "11:20"
    }, healthObj);     
    
    
    console.log(newObj);      
    // Object {lastTime: "11:20", name: "crong"} , -> prototype: showHealth(), setHealth()
```

prototype chain 활용

```
    // parent object (위와 동일)
    const healthObj = { ... }
    
    // child object
    const healthChildObj = {
        getAge: function() {
            return this.age;
        }
    }
    
    // chain 만들기!
    const lastHealthObj = Object.setPrototypeOf(healthChildObj, healthObj)
    
    const childObj = Object.setPrototypeOf({
        age: 22,
    }, healthChildObj);
    
    console.log(childObj);      
    // Object {age: 22} -> prototype: getAge() -> prototype: showHealth(), setHealth()
    
    childObj.setHealth("11:55");
    childObj.showHealth();
    // 오늘 운동시간 : 11:50
```

------
## 💕 Module
webpack, babel등을 이용하여 module 사용 가능

#### ✔ export
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
    
#### ✔ import
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

---------

## 💕 Proxy
오브젝트를 가로채서 다른작업을 추가로 할 수 있도록 해줌
```
    const myObj = {name: "crong"};
    const proxy = new Proxy( myObj, {} )       // 1. target object, 2. handler
    
    proxy.name;             // "crong"
    proxy.name = "jisu"     
    proxy.name;             // "jisu"
    
    toString.call(proxy)    // [object Object]
    proxy;                  // Proxy {name: "jisu"}
    myObj;                  // Object {name: "jisu"}
    proxy === myObj;        // false
    proxy.name === myObj.name   // true
```
```
    const myObj = {name: "crong", changedValue: 0};
    const proxy = new Proxy( myObj, {
        // target => {name: "crong"}
        get: function(target, property, receiver) {
            console.log('get value');
            return target[property];        // return Reflect.get() ... 검색하기 무슨말인지 모르겠음
        },
        set: function(target, property, value) {
            console.log("set value");
            target['changedValue']++;
            target[property] = value;
        }
    }); 
    
    proxy.name;                     // "get value" "crong"
    proxy.name = "codesquad";       // "set value" "codesquad"
    proxy.name;                     // "get value" "codesquad"
    myObj;                          // "get value"  Object {name: "codesquad", changedValue: 1}
```





