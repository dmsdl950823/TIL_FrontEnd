# 프로토타입이란?

...

### 프로토타입이 동작하는 방식

함수가 생성될 때마다 prototype 프로퍼티 역시 특정 규칙에 따라 생성됩니다.

기본적으로 모든 프로퍼티 타입은 자동으로 constructor 프로퍼티를 갖는데, 이 프로퍼티는 해당 프로토타입이 프로퍼티로서 소속된 함수를 가리킵니다.
다음에는 생성자에 따라 각종 프로퍼티와 메서드가 프로토타입에 추가됩니다.
New 를 이용하여 생성자 객체를 정의하면 해당 프로토타입은 단지 constructor 프로퍼티만 가지며 기본적인 다른 메서드들은 Object에서 상속합니다. 생성자를 호출해서 인스턴스를 생성 할 때마다 해당 인스턴스 내부에는 생성자 객체의 프로토타입을 가리키는 포인터가 생성됩니다. ECMA-262 5판에서는 이 포인터를 [[Prototype]] 이라고 부릅니다. 스크립트에서 [[Prototype]]에 접근할 방법이 전혀 없습니다. 인스턴스와 직접 연결되는 것은 생성자의 프로토타입이지 생성자 자체가 아님을 이해해야합니다. 프로토타입은 constructor 프로퍼티를 갖고 기타 추가된 프로퍼티들도 가집니다. ?

[[Prototype]] 은 구현 환경에 따라 접근 불가능 할 수도 있지만 객체 사이에 프로토타입 연결이 존재하는 지는 isPrototype() 메서드를 통해 알 수 있습니다. IsPrototypeOF()는 다음과 같이 [[Prototype]]이 자신을 호출하는 프로토타입을 가리킬 때 true 를 반환합니다.
```
  console.log(Person.prototype.isPrototypeOf(person1)) // true
  console.log(Person.prototype.isPrototypeOf(person2)) // true
```
두 인스턴스는 모두 Person.prototype에 연결되므로 isPrototypeOf 메서드는 true를 반환합니다.

[[Prototype]] 의 값을 반환하는 Object.getPrototypeOf() 라는 메서드가 있습니다.

```
console.log(Object.getPrototypeOf(person1) === Person.prototype) // true
console.log(Object.getPrototypeOf(person1).name) // "JJD"
```

코드의 첫 줄은 단순히 Object.getPrototypeOf()에서 반환한 객체가 해당 객체의 프로토타입이 맞는지만 확인합니다.
두번째 줄은 프로토타입의 name 프로퍼티값인 "jjd"를 가져옵니다. 

검색에는 순서가 있습니다.
1. 객체에서 프로퍼티를 읽으려 할 때마다 해당 프로퍼티 이름으로 찾으려고 검색 합니다.
검색은 객체 인스턴스 자체에서 시작합니다.
인스턴스에서 프로퍼티 이름을 찾으면 그 값을 반환합니다.
2. 프로퍼티를 찾지 못하면 포인터를 프로토타입으로 올려서 검색을 계속합니다.


1. JS 엔진은 객체의 프로퍼티 안에 해당 프로퍼티가 있는지 확인합니다.
2. 있다면 해당 프로퍼티를 반환하지만, 없다면 프로토타입 내부에 있는지 확인합니다.
3. 프로토타입에도 없다면 undefined를 반환합니다.

프로토타입은 이런 식으로 여러 객체 인스턴스에서 프로퍼티와 메서드를 공유합니다.

객체 인스턴스에서 프로토타입에 있는 값을 읽을 수는 있지만 수정은 불가능 합니다. 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 해당 프로퍼티는 인스턴스에 추가되며 프로토타입까지 올라가지 않습니다.

일단 객체 인스턴스에 프로퍼티를 추가하면 해당 프로퍼티는 프로토타입에 존재하는 같은 이름의 프로퍼티를 가립니다. 다시말해 인스턴스에 프로퍼티가 있으면 프로토타입에 존재하는 같은 이름의 프로퍼티에 대한 접근은 차단됩니다. 하지만 delete 연산자는 인스턴스 프로퍼티를 완전히 삭제하며, 프로퍼티에 가려졌던 prototype 프로퍼티에 다시 접근 할 수 있습니다.

HasOwnProperty() 메서드는 프로퍼티가 인스턴스에 존재하는지 프로토타입에 존재하는지 확인합니다. 이 메서드는 object로부터 상속한 것인데, 다음과 같이 해당 프로퍼티가 객체 인스턴스에 존재할 때만 true를 반환합니다.

```
  function Person () { }

  Person.prototype.name = 'JJD'

  const person1 = new Person()

  alert(person1.hasOwnProperty('name'))  // false

  person1.name = 'GGB'

  alert(person1.hasOwnProperty('name'))  // true

  delete person1.name

  alert(person1.hasOwnProperty('name'))  // false
```

hasOwnProperty()를 추가함으로써 인스턴스의 프로퍼티에 접근하는지 프로토타입의 프로퍼티에 접근하는지를 명확히 알 수 있습니다.

프로토타입과 in 연산자

In 연산자에는 두 가지 쓰임이 있습니다. 하나는 그 자체로서 사용하는 경우이고 다른 하나는 for-in 루프에서 사용하는 경우입니다. 그 자체로서 사용하는 경우 in 연산자는 주어진 이름의 프로퍼티를 객체에서 접근할 수 있을 때, 다시 말해 해당 프로퍼티가 인스턴스에 존재하든 프로토타입에 존재하든 모두 true를 반환합니다.

```
  function Person () { }

  Person.prototype.name = 'JJD'

  const person1 = new Person()

  console.log(person1.hasOwnProperty('name'))  // false - from Instance
  console.log('name' in person1)  // true - from prototype

  person1.name = 'BBT'

  console.log(person1.hasOwnProperty('name'))  // true - from Instance
  console.log('name' in person1)  // true - from prototype
```

Name 프로퍼티는 객체에서, 프로퍼티에서 모두 접근 가능합니다. 따라서 'name' in person1은 프로퍼티가 인스턴스에 존재하지 않아도 true를 반환합니다. 객체 프로퍼티가 프로토타입에 존재하는지 여부를 확인하기 위해서는 hasOwnProperty()와 in 연산자를 조합하여 알 수 있습니다.

For in 루프를 사용할 때는 객체에서 접근할 수 있고 나열(enumerable) 가능한 프로퍼티를 모두 반환하는데, 여기에는 인스턴스 프로퍼티와 프로토타입 프로퍼티가 모두 포함됩니다. 인스턴스 프로퍼티 중 나열 불가능한 prototype 프로퍼티 ([[Enumerable]] 이 false로 지정된 프로퍼티) 를 가리고 있는 프로퍼티 역시 for - in 루프에서 반환되는데, 개발자가 지정한 프로퍼티는 항상 나열 가능하도록 한 규칙 때문입니다.

```
  const o = {
    toString: function () {
      return "My Object"
    }
  }

  for (const props in o) {
    if (prop === 'toString') {
      alert('Found String!')  // ie ㅇㅔㅅㅓㄴㅡㄴ ㅍㅛㅅㅣㄷㅗㅣㅈㅣ ㅇㅏㄴㅎㅇㅡㅁ
    }
  }
```
해당 예제에서는 기본적인 메서드 toString을 개발자가 같은 이름으로 만든 메서드로 덮어 씌웠습니다. Ie 에서는 프로토타입의 toString() 메서드에 지정된 [[Enumerable]] 속싱이 false이기 때문에, 알림창이 뜨지 않습니다. 기본적으로 나열 불가능하도록 지정된 프로퍼티와 메서드 - hasOwnProperty(), prototypeIsEnumerable(), toLocaleString(), toString(), valueOf()에 적용됩니다.

ECMAScript 5판의 Object.keys() 메서드를 통해 객체 인스턴스에서 나열 가능한 프로퍼티의 전체 목록을 얻을 수 있습니다. Object.keys() 메서드는 객체를 매개변수로 받은 다음 나열 가능한 프로퍼티 이름을 문자열 형태로 포함하는 배열을 반환합니다.


```
  function Person () { }

  Person.prototype.name = 'JJD'
  Person.prototype.age = 26
  Person.prototype.sayName = function () {
    console.log(this.name)
  }

  const keys = Object.keys(Person.prototype)
  console.log(keys)  // ['name', 'age', 'sayName']

  const p1 = new Person()
  p1.name = 'BBD'
  p1.age = 31
  const p1_keys = Object.keys(p1)
  console.log(p1_keys)  // ['name', 'age']
```

나열 가능 여부와 관계 없이 인스턴스 프로퍼티 전체 목록을 얻으려면 Object.getOwnPropertyNames() 메서드를 같은 방법으로 사용합니다. 

const keys = Object.getOwnPropertyNames(Person.prototype)
console.log(keys) // ['constructor', 'name', 'age', 'sayName']
나열 불가능한 constructor 프로퍼티가 결과 배열에 있습니다. Object.keys()와 Object.getOwnPropertyNames() 모두 for-in 대신 사용할 수 있습니다.
