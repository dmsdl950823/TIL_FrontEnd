# Class Object - Index
- [1. Literal Types](#1-literal-types)
  - [1.1. String Literal Types](#11-string-literal-types)
  - [1.2. Numeric Literal Types](#12-numeric-literal-types)
  - [1.3. Boolean Literal Types](#13-boolean-literal-types)
- [2. Classes](#2-classes)
  - [2.1. Inheritance](#21-inheritance)
- [3. Public, private, and protected modifiers](#3-public-private-and-protected-modifiers)
  - [3.1. Public by default](#31-public-by-default)
  - [3.3. Understanding Typescript's private](#33-understanding-typescripts-private)
    - [** ECMAScript Private Fields](#-ecmascript-private-fields)
  - [3.4. Understanding protected](#34-understanding-protected)
- [4. Parameter properties](#4-parameter-properties)

<br>

-----------------------------------
<br>

# 1. Literal Types
TS에는 strings, numbers, booleans 세 가지의 리터럴 타입이 있습니다. 리터럴 타입을 이용하여 `string, number, boolean` 타입을 가지도록 값을 할당 할 수 있습니다.

## 1.1. String Literal Types

string 리터럴 타입은 `type`, `type guard`, `type alias`와 잘 조합됩니다. 여러분은 이 특징을 *enum과 같은 방식*으로 `string`과 함께 사용할 수 있습니다.

``` ts
  type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
  // 해당 세가지 외에는 사용할 수 없습니다.

  class Element {
    animate (dx: number, dy: number, easing: Easing) {
      if (easing === 'ease-in') { }
      else if (easing === 'ease-out') { }
      else if (easing === 'ease-in-out') { }
      else {
        // 정의된 'Easing' type이 아닐 때
      }
    }
  }

  let button = new Element()
  button.animate(0, 0, 'ease-in')
  button.animate(0, 0, 'uneasy') // Error! 'uneasy' is not assignable.
```

같은 방법으로 overload를 구별하는데 사용 가능합니다.

``` js
  function createElement(tagName: "img"): HTMLImageElement
  function createElement(tagName: "input"): HTMLInputElement
  // ... more overloads ...

  function createElement(tagName: string): Element {
    // ... 
  }
```

## 1.2. Numeric Literal Types

TS는 `string literal`과 유사한 `numeric` 리터럴 타입도 가집니다.

```js
  function rollDice (): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
  }
```
일반적인 사용 케이스는 config 값을 정의하기 위해서 많이 사용합니다.

```js
  interface MapConfig {
    lng: number,
    lat: number,
    tileSize: 8 | 16 | 32
  }

  // function setupMap이 있다고 가정합니다.
  setupMap({ lng: 5, lat: 4, titleSize: 16 })
```

## 1.3. Boolean Literal Types
TS는 boolean literal Type 값을 사용하여 **속성이 상호 연관된 개체 값을 제한**할 수 있습니다.

``` js
  interface Success {
    isValid: true
    reason: null
  }

  interface Failure {
    isValid: false
    reason: string
  }

  type Result = Success | Failure

```

<br>

------------------------
<br>

# 2. Classes

JS가 `function`과 `prototype` 기반 상속을 사용하기는 하지만, ECMAScript 2015(ES6)를 시작으로, *객체지향(object-oriented) 접근*을 사용하여 `class`를 정의할 수 있게 되었습니다. TS에서는, JS로 컴파일해서 모든 주요 브라우저와 플랫폼에서 사용할 수 있는 개발자들에게 이 기술을 사용하도록해주었고, JS의 다음버전을 기다릴 필요가 없도록 해주었습니다.

``` js
  class Greet {
    greeting: string;
    constructor (message: string) {
      this.greeting = message
    }

    greet () {
      return `Hello ${this.greeting}`
    }
  }

  let greeter = new Greet('world')
```

> 간단한 class 기반 예제를 살펴보면, class의 멤버중 하나를 `this`라는 방식으로 class에 참조한 것을 확인할 수 있습니다. 이것은 class 내부 **멤버**에 접근 한다는것을 나타냅니다.
<br>
코드에서, `Greeter class`를 `new` 생성자를 사용하여 생성했습니다. 이렇게 하면 이전에 정의했던 `constructor`를 호출하고, 새로운 `Greet` 오브젝트를 생성합니다.

 

## 2.1. Inheritance
TS에서는 일반적인 **객체지향(object-oriented) 패턴**을 사용합니다. class 기반 프로그래밍의 가장 기본 패턴은 새로운 객체를 생성하기 위해 상속을 사용하여 존재하는 class를 확장(extend)하는 방법 입니다.

``` js
  class Animal {
    move (distanceInMeters: number = 0) {
      console.log(`Animal moved ${distanceInMeters}`)
    }
  }

  class Dog extends Animal {
    bark () { console.log('Woof Woof!') }
  }

  const dog = new Dog()
  dog.move(10)
  dog.bark()
```

> class는 **프로퍼티와 메서드를 기본 class로부터 상속**합니다. 새로 생성된 Dog같은 Derived class는 `**subclass**`라고 부르고, base class는 `**superclass**`라고 부릅니다.


``` js
  class Animal {
    name: string
    constructor (theName: string) {
      this.name = theName
    }
    move (distanceInMeters: number = 0) {
      console.log(`Animal moved ${distanceInMeters}`)
    }
  }

  class Snake extends Animal {
    constructor (name: string) {
      super(name) // ***
    }
    move (distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters) // ***
    }
  }


  class Horse extends Animal {
    constructor (name: string) {
      super(name) // ***
    }
    move (distanceInMeters = 45) {
      console.log('Galloping...')
      super.move(distanceInMeters) // ***
    }
  }

  const sam = new Snake('Sammpy the Python')
  const tom = new Horse('Tommy the Palomino')

  sam.move()
  tom.move(34)

  // Slithering...
  // Sammy the Python moved 5m.
  // Galloping...
  // Tommy the Palomino moved 34m.
```
> 이 예제는 이전 예제와 다르게 derived 클래스의 `constructor` function이 base class의 `constructor`를 실행하는 `super()`를 호출해야만 합니다. 이것은 TS에서 강제하는 중요한 규칙인데, **constructor body에서 `this`에서 프로퍼티에 접근하기 전에, `super()`를 호출**해야 한다는 것 입니다. 
> 
> base class에 존재하는 methods를 subclass에 전문화된 메서드로 오버라이드(override)하는 방법도 나와있습니다. `Snake`와 `Horse` 둘다 `Animal` 의 `move()` 메서드를 오버라이드 하는 동일한 이름의 메서드를 가지는데, 각각의 클래스를 **구체화 **하도록 해줍니다. 

<br>

---------------------------------------

<br>



# 3. Public, private, and protected modifiers
## 3.1. Public by default

그동안은 어디서든 우리가 선언한 멤버들에게 자유롭게 접근할 수 있었습니다. TS에서는, 기본적으로 모든 멤버들은 `public`이 기본입니다. 명확하게 `public` 멤버들을 표시할 수는 있습니다.

``` js
  class Animal {
    public name: string
    
    public constructor (theName: string) {
      this.name = theName
    }
    
    public move (distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
  }
```

## 3.3. Understanding Typescript's private

TS는 `private`로 표시된 멤버를 선언할 수 있습니다. private 멤버를 포함한 클래스 밖에서는 해당 변수에 접근할 수 없습니다.

 
``` js
  class Animal {
    private name: string
    
    constructor (theName: string) {
      this.name = theName
    }
  }

  new Animal('Cat').name
  // Property 'name' is private and only accessible within class 'Animal'.​
```

😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒😒
TS는 구조 타입 시스템입니다. 어디서 오든지 상관없이 두개의 다른 타입들을 비교할 때 , 만약 모든 멤버들의 타입이 양립 가능하다면, 타입이 양립할 수 있다고 말합니다.

그러나, private과 protexted 멤버들을 가진 타입들을 피교할 때, 우리는 이 타입들은 다르게 취급합니다. 두개의 타입이 양립 가능하도록 고려하기 위해서, 만약 그중 하나가 private 멤버를 가진다면, 딜다른 하나는 같은곳에서 선언된 private 멤버를 가져야합니다. 비슷하게, protexted 멤버에 적용됩니다.

``` js
  class Animal {
    private name: string
    constructor (theName: string) {
      this.name = theName
    }
  }

  class Rhino extends Animal {
    constructor () {
      super('Rhino')
    }
  }

  class Employee {
    private name: string
    constructor (theName: string) {
      this.name = theName
    }
  }

  let animal = new Animal('Goat')
  let rhino = new Rhino()
  let employee = new Employee('Bob')

  animal = rhino
  animal = employee
  // Type 'Employee' is not assignable to type 'Animal'.
  // Types have separate declarations of a private property 'name'.
```

Employee는 Animal과 모양이 같은 class 입니다. 우리는 이 class의 인스턴스를 생성하고, 각각에게 어떤 일이 발생할지 확인합니다. Animal과 Rhino는 Animal의 'private name: string'이라는 동일한 선언에서 나온 그들의 모양의 private 면을 공유하기 때문에, 그들은 양립할 수 있다. 그러나, Employee의 경우에는 아닙니다. Employee로부터 Animal에게 할당할 때, 양립할 수 없다는 타입에러가 나옵니다. Employee는 name이라는 private 멤버를 가지고있지만, Animal에서 선언한 것이 아닙니다.


### ** ECMAScript Private Fields

TS는 `private` field를 위한 새로운 JS 문법을 도입했습니다.

``` js
  class Animal {
    #name: string
    constructor (theName: string) {
      this.#name = theName
    }
  }

  new Animal('Cat').#name
  // #name is not accesible because it has a private identifier
```

## 3.4. Understanding protected
protected 수식어는 멤버들이 확장된 class안에서 접근 가능한 [보호된] 상태로 선언되었단 점을 제외하고 private 수식어와 매우 유사합니다.
``` js
  class Person {
    protected name: string
    constructor (name: string) {
      this.name = name
    }
  }

  class Employee extends Person {
    private department: string

    constructor (name: string, department: string) {
      super(name)
      this.department = department
    }

    public getElevatorPitch () {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`
    }
  }

  let howard = new Employee('Howard', 'Sales')
  console.log(howard.getElevatorPitch())
  console.log(howard.name) // Howard
  // Error!! Property 'name' is protected and only accessible within class 'Person' and its subclasses.
 ``` 

우리가 Person의 밖에서 name을 사용하지 못하는동안, 우리가 Person에서부터 Employee를 확장했기 때문에 Employee 의 인스턴스 메서드 안에서 여전히 사용할 수 있는 것을 보세요.

constructor는 protected로 마킹될 수 있습니다. 즉, 클래스는 포함하는 클래스 외부에서 인스턴스화할 수 없지만 확장할 수 있습니다.
  ``` js
  class Person {
    protected name: string;
    protected constructor(theName: string) {
      this.name = theName;
    }
  }

  // Employee can extend Person
  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  let john = new Person("John");
  Constructor of class 'Person' is protected and only accessible within the class declaration.
```

# 4. Parameter properties

class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}

let dad = new Octopus("Man with the 8 strong legs");
console.log(dad.name);

아직 진행중...
