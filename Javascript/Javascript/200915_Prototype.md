- [프로토타입](#프로토타입)
  - [정의](#정의)
  - [프로토타입이 동작하는 방식](#프로토타입이-동작하는-방식)
  - [프로토타입과 `in` 연산자](#프로토타입과-in-연산자)
  - [프로토타입의 대체 문법 - 리터럴](#프로토타입의-대체-문법---리터럴)
  - [프로토타입의 동적 성질](#프로토타입의-동적-성질)
  - [Native 객체 프로토타입](#native-객체-프로토타입)
  - [프로토타입의 문제점](#프로토타입의-문제점)

# 프로토타입

## 정의
모든 객체(함수 포함)는 `prototype` 프로퍼티를 가집니다.
이 프로퍼티는 **참조 타입의 인스턴스가 가지고 있는 모든 프로퍼티와 메서드들을 가지고있는 객체**입니다. `prototype` 의 프로퍼티와 메서드는 **객체 인스턴스 전체에서 공유**된다는 점이 프로토타입의 장점입니다.

자바스크립트 객체는 생성 시점에 이 프로퍼티에 `null` 이 아닌 값이 할당됩니다.

`prototype` 프로퍼티의 값은 다음과 같이 직접적으로 할당 할 수 있습니다.

``` js
  function Person () { }

  Person.prototype.name = "JJD"
  Person.prototype.sayName = function () {
    console.log(this.name)
  }

  const p1 = new Person()
  const p2 = new Person()

  console.log(p1.sayName === p2.sayName) // true
```
이 예제에서 프로퍼티들과 `sayName()` 메서드는 비어있는 함수 `Person` 의  `prototype` 프로퍼티에 직접 추가되었습니다.  `Person` 생성자 함수가 비워져있지만  `Person` 함수를 호출해 만든 객체에도 프로퍼티와 메서드가 존재합니다.  `Person` 함수의 프로퍼티와 메서드를  `Person` 으로 생성된 모든 인스턴스에서 공유하므로 `p1` 과 `p2` 는 같은 프로퍼티 집합에 접근하며 같은 `sayName()` 함수를 공유합니다. 

## 프로토타입이 동작하는 방식

객체나 함수가 생성될 때마다  `prototype` 프로퍼티 역시 특정 규칙에 따라 생성됩니다.

1. 기본적으로 모든 프로퍼티 타입은 자동으로  `constructor` 프로퍼티를 가지며, 해당  `prototype` 이 프로퍼티로 소속되어있는 객체(함수)를 가리킵니다.
- `new` 를 이용하여 생성자 객체를 정의하면 해당 `prototype` 은 단지 `constructor`프로퍼티만 보유합니다.

2. 그 외 각종 프로퍼티와 메서드가 프로토타입에 추가됩니다.
- 기본적인 메서드들은 `Object`에서 상속합니다.

생성자를 호출하여 객체를 생성 할 때마다 내부에는 생성자 객체의 프로토타입을 가리키는 포인터 *[[ Prototype ]]* 가 생성됩니다. 객체와 직접 연결되는 것은 생성자의 프로토타입이지 생성자 자체가 아니라는 것을 이해해야합니다.

FireFox, Safri, Chrome 은 *[[ Prototype ]]* 포인터에 접근할 수 있는 `__proto__` 라는 프로퍼티를 지원합니다. 또는 `isPrototypeOf()`  메서드를 통해 객체 사이에 프로토타입 연결이 존재하는지에 대해서 확인이 가능합니다. 해당 메서드는 포인터가 자신을 호출하는 프로토타입을 가리킬 경우 `true` 를 반환합니다.

``` js
  Person.prototype.isPrototypeOf(person1) // true
  Person.prototype.isPrototypeOf(person2) // true
```
두 객체는 모두 `Person.prototype` 에 연결되므로 `isPrototypeOf()`  메서드는  `true` 를 반환합니다.

*[[ Prototype ]]* 포인터 의 값을 반환하는 `Object.getPrototypeOf()` 라는 메서드도 있습니다.

``` js
  Object.getPrototypeOf(person1) === Person.prototype   // true
  Object.getPrototypeOf(person1).name   // "JJD"
```

코드의 첫 줄은 단순히 `Object.getPrototypeOf()` 에서 반환한 객체가 해당 객체의 prototype 이 맞는지만 확인합니다.
두번째 줄은 프로토타입의 `name`  프로퍼티값인  "JJD" 를 가져옵니다. 

객체의 내부 프로퍼티 검색에는 **순서**가 존재합니다.

1. 검색은 객체의 프로퍼티 안에 해당 프로퍼티가 있는지 제일 먼저 확인합니다.
2. 인스턴스에서 프로퍼티 이름을 찾으면 그 값을 반환합니다. ( `return` )
3. 프로퍼티를 찾지 못하면 포인터를 프로토타입으로 올려서 검색을 계속합니다.
4. 프로토타입에서 찾을 경우 그 값을 반환합니다. ( `return` )
5. 프로토타입에도 없다면 `undefined`를 반환합니다.

객체에 프로토타입에 지정되어있는, 같은 이름의 프로퍼티를 설정하면, 해당하는 프로토타입 프로퍼티를 덮어쓰며 접근을 차단합니다. 프로퍼티를 `null`로 지정해도, 가려진 프로토타입 프로퍼티에 다시 연결되지는 않습니다. 그러나 `delete` 연산자는 객체 프로퍼티를 완전히 삭제하여 프로퍼티에 가려졌던 `prototype` 프로퍼티에 다시 접근 할 수 있습니다.

`hasOwnProperty()` 메서드는 프로퍼티가 인스턴스에 존재하는지 프로토타입에 존재하는지 확인합니다.
이 메서드는 Object 로부터 상속되며 다음과 같이 해당 프로퍼티가 객체 인스턴스에 존재할 때만 `true`를 반환합니다.

``` js
  function Person () { }

  Person.prototype.name = 'JJD'

  const person1 = new Person()
  console.log(person1.hasOwnProperty('name'))  // false

  person1.name = 'GGB'
  console.log(person1.hasOwnProperty('name'))  // true

  delete person1.name
  console.log(person1.hasOwnProperty('name'))  // false
 ```
 
`hasOwnProperty()` 를 추가함으로써 인스턴스의 프로퍼티에 접근하는지 vs  `prototype`  의 프로퍼티에 접근하는지를 알 수 있습니다.

## 프로토타입과 `in` 연산자

`in` 연산자에는 두 가지 쓰임이 있습니다. 하나는 그 자체로서 사용하는 경우이고 다른 하나는 for-in 루프에서 사용하는 경우입니다.

1. 그 자체로서 사용하는 경우, `in` 연산자는 해당 프로퍼티가 객체에 존재하든 프로토타입에 존재하든 모두 true 를 반환합니다.

``` js
  function Person () { }

  Person.prototype.name = 'JJD'

  const p1 = new Person()

  console.log(p1.hasOwnProperty('name'))  // false - from Instance
  console.log('name' in p1)  // true - from prototype

  person1.name = 'BBT'

  console.log(p1.hasOwnProperty('name'))  // true - from Instance
  console.log('name' in p1)  // true - from prototype
  ```
  
`name` 프로퍼티는 객체에서, 프로퍼티에서 모두 접근 가능합니다. 따라서 `'name' in p1` 은 프로퍼티가 인스턴스에 존재하지 않아도 `true`를 반환합니다. 객체 프로퍼티가 프로토타입에 존재하는지 여부를 확인하기 위해서는 `hasOwnProperty()` 와 in 연산자를 조합하여 알 수 있습니다.

2. `for-in` 루프를 사용할 때는 객체에서 접근할 수 있고 나열(`enumerable`) 가능한 프로퍼티를 모두 반환하는데, 여기에는 인스턴스 프로퍼티와 프로토타입 프로퍼티가 모두 포함됩니다. 개발자가 지정한 프로퍼티는 항상 나열 가능하도록 만든 규칙이 있기 때문에 인스턴스 프로퍼티 중 의도적으로 *[[ Enumerable ]]* 이 `true`로 지정된 프로퍼티 역시 `for-in`  루프에서 반환됩니다.

``` js
  const o = {
    toString: function () {
      return "My Object"
    }
  }

  for (const props in o) {
    if (prop === 'toString') {
      alert('Found String!')  // ie 에서는 표시되지 않음
    }
  }
```

해당 예제에서는 기본적인 메서드 `toString`을 개발자가 같은 이름으로 만든 메서드로 덮어 씌웠습니다. Internet Explorer 에서는 프로토타입의  `toString()`  메서드에 지정된 *[[Enumerable]]* 속성이 `false`이기 때문에, 알림창이 뜨지 않습니다. 기본적으로 나열 불가능하도록 지정된 프로퍼티와 메서드 -  `hasOwnProperty()` ,  `prototypeIsEnumerable()` ,  `toLocaleString()` ,  `toString()` ,  `valueOf()` 에 적용됩니다.

`Object.keys()`  메서드를 통해 객체 인스턴스에서 나열 가능한 프로퍼티( prototype 포함)의 전체 목록을 얻을 수 있습니다. 나열 가능 여부와 관계 없이 인스턴스 프로퍼티 전체 목록을 얻으려면 `Object.getOwnPropertyNames()` 메서드를 같은 방법으로 사용합니다. 

``` js
  const keys = Object.getOwnPropertyNames(Person.prototype)
  console.log(keys) // ['constructor', 'name', 'age', 'sayName']
```
나열 불가능한 `constructor` 프로퍼티가 결과 배열에 있습니다. `Object.keys()`  와 `Object.getOwnPropertyNames()`   모두 `for-in`  대신 사용할 수 있습니다.

## 프로토타입의 대체 문법 - 리터럴

다음과 같이 모든 프로토타입의 프로퍼티, 메서드를 담은 객체 리터럴 {} 로 반복을 줄이고 더 가독성 있게 캡슐화 하는 방법도 있습니다.

``` js
  Person.prototype = {
    name: "JJD",
    age: 28,
    job: "Software Engineer",
    sayName: function () {
      alert(this.name)
    }
  }
```  

이 예제는 `Person.prototype` 프로퍼티에 객체 리터럴로 생성한 객체를 할당했습니다. `constructor` 프로퍼티가 `Person`을 가리키지 않는다는 점을 제외하고 결과는 완전히 같습니다. 

함수가 생성되면 prototype 객체가 생성되고 `constructor` 는 자동으로 `Object` 로 할당됩니다.  `instanceOf` 연산자는 여전히 올바르게 동작하지만  `constructor` 가 객체의 타입을 정확히 나타낼 수 없게 됩니다.

``` js
  const friend = new Person()
  console.log(friend instanceof Object)       // true
  console.log(friend instanceof Person)       // true
  console.log(friend.constructor === Person)  // false
  console.log(friend.constructor === Object)  // true
  constructor 의 값이 중요하다면 적절한 값을 직접 지정할 수 있습니다.

  Person.prototype = {
    constructor: Person,
    name: "JJD"
    ...
  }
```

이런 방식으로  `constructor` 생성자를 재설정하면 프로퍼티의 [[ Enumerable ]] 속성이 `true` 로 지정됩니다. 네이티브 `constructor` 프로퍼티는 기본적으로 나열 불가능한 프로퍼티이므로  `Object.defineProperty()`  를 쓰는 편이 좋습니다.

``` js
  function Person () { }

  Person.prototype = {
    name: "JJD",
    age: 29,
    job: "Software Engineer",
    sayName: function () {
      console.log(this.name)
    }
  }
  Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
  })
  ```

## 프로토타입의 동적 성질

프로토타입에서 값을 찾는 작업은 Runtime 검색이므로 프로토타입이 바뀌면 그 내용이 즉시 인스턴스에도 반영됩니다. 심지어는 프로토타입이 바뀌기 전에 빠져나온 인스턴스도 바뀐 내용을 반영합니다. 다음 예제를 보세요...

``` js
  const friend = new Person()

  Person.prototype.sayHi = function () {
    alert("Hi")
  }

  friend.sayHi()  // "Hi"
```
  
이 예제는 `sayHi()` 라는 메서드를  `Person.prototype` 에 추가합니다. friend 인스턴스는  `sayHi()` 가 추가되기 전에 만들어졌지만 인스턴스와 프로토타입 사이의 느슨한 연결 덕분에 이 메서드에 접근할 수 있습니다.

 `friend.sayHi()` 를 호출하면 먼저 인스턴스에서 sayHi 라는 프로퍼티를 검색하는데, 찾을 수 없으므로 범위를 프로토타입으로 옮겨 검색합니다. 인스턴스와 프로토타입은 포인터를 통해 연결되었을 뿐 인스턴스를 생성할 때 sayHi 없는 프로토타입을 복사한 것이 아니므로, 프로토타입에서 sayHi 프로퍼티를 찾아 저장된 함수를 반환합니다.

프로퍼티와 메서드를 언제든 프로토타입에 추가할 수 있고 이들을 즉시 객체 인스턴스에서 사용할 수 있긴 하지만, 전체 프로토타입을 덮어썼을때는 다르게 동작할 수 있습니다.

*[[ Prototype ]]* 포인터는 생성자가 호출될 때 할당되므로 프로토타입을 다른 객체로 바꾸면 생성자와 원래 프로토타입 사이의 연결이 끊어집니다. 인스턴스는 프로토타입을 가리키는 포인터를 가질 뿐 생성자와 연결된 것이 아닙니다.

``` js
  function Person() { }

  const friend = new Person();

  Person.prototype = {
    constructor: Person, // custroctor !== friend 
    name: "JJD",
    age: 29,
    sayName: function () {
      alert(this.name)
    }
  }

  friend.sayName();  // error
```
위 예제는 프로토타입 객체를 덮어 쓰기 전에 Person 의 인스턴스를 생성했습니다.  `friend.sayName()` 을 호출하면 에러가 발생하는데 friend 가 가리키는 프로토타입에는 그러한 프로퍼티가 존재하지 않기 때문입니다.

생성자의 프로토타입을 바꾸면 그 이후에 생성한 인스턴스는 새로운 프로토타입을 참조하지만, 그 이전에 생성한 인스턴스는 바꾸기 전의 프로토타입을 참조합니다.

## Native 객체 프로토타입

프로토타입 패턴은 Custom 참조 타입 뿐 아니라 Native 참조 타입 또한 프로토타입 패턴으로 구현되어있으므로 중요합니다. 네이티브 참조 타입(`Object` , `Array` , `String` 등) 의 메서드 역시 기본적으로 생성자의 프로토타입에 정의되어 있습니다.
예를들어 `sort()` 메서드는  `Array.prototype` 에 존재하고,  `substring()` 메서드는 `String.prototype` 에 정의되어있습니다.

Native 객체의 프로토타입을 통해 기본 메서드를 참조할 수 있고 새 메서드를 정의할 수도 있습니다. 네이티브 객체의 프로토타입도 커스텀 객체의 프로토타입과 마찬가지로 수정할 수 있고 메서드도 언제든지 추가할 수 있습니다.

그러나 배포하는 코드에서는 Native 객체의 프로토타입을 수정하는 것은 가급적 피하길 바랍니다. Native 객체 프로토타입을 수정하면 혼란스럽기도 하고, 동일한 이름의 메서드가 브라우저마다 지원 방식이 다르기 때문에 특정 상황에서는 에러나 충돌이 발생할 수 있습니다. 자칫하면 네이티브 메서드를 실수로 덮어쓸 수도 있기 때문에 위험합니다.

## 프로토타입의 문제점

프로토타입 패턴은 모든 객체가 기본적으로 같은 프로퍼티 값을 갖게 합니다. 그로 인해 가장 큰 문제는 "공유"한다는 성질입니다.

``` js
  function Person () { }

  Person.prototype = {
    constructor: Person,
    name: 'JJD',
    friends: ['PSJ', 'KSW']
  }

  const p1 = new Person();
  const p2 = new Person();

  p1.friends.push('BTD');

  console.log(p1.friends);  // 'PSJ, 'KSW', 'BTD'
  console.log(p2.friends);  // 'PSJ, 'KSW', 'BTD'
  console.log(p2.friends === person2.friends)  // true
```

여기서 `person.prototype` 객체에는 `friends`라는 프로퍼티가 있고 이 프로퍼티에는 문자열로 구성된 배열이 있습니다. `Person`의 인스턴스를 두개 만들고 `person.friends` 배열에 문자열을 추가했습니다. `friends` 배열이 person1이 아니라 Person.prototype에 존재하므로, friends 배열을 수정하면 해당 배열을 가리키는 person2.friends에도 즉시 그 변화가 반영됩니다.

배열을 모든 인스턴스에서 공유할 의도였다면 이 결과는 합리적이지만, 일반적으로 인스턴스 프로퍼티는 해당 인스턴스만의 특징으로 쓰기 마련입니다. 이 때문에 프로토타입 패턴을 있는 그대로만 사용하는 경우는 드뭅니다.
