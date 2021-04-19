# Typescript Handbook 번역
  
# 목차

* [Typescript Interface](#typescript-interface)
  * [Interface](#interface)
  * [Optional Properties](#optional-properties)
  * [Readonly Properties](#readonly-properties)
  * [Excess Property Checks](#excess-property-checks)
* [Function Types](#function-types)
  * [Indexable Type](#indexable-type)
  * [Class Types](#indexable-type)
    * class의 instance 면과 static한 면사이의 차이
  * [Extending Interfaces](#extending-interfaces)
  * [Interfaces Extending Classes](#interfaces-extending-classes)


  -----------------------------------------------------------
  
# Typescript Interface

## Interface

TS의 핵심 원리는 그 값이 가지고있는 형태를 이용하여 <b>타입 체크</b>를 한다는 것입니다. 이것은 "duck typing" 이나 "structural subtyping" 이라고 불리웁니다. interface는 이 타입들의 역할을 정의합니다.

``` js
  function printing (obj: { label: string }) {
    console.log(obj.label)
  }

  let myObj1 = { size: 10, label: "Size 10 Object" }
  let myObj2 = { size: 10 }
  printing(myObj1)
  printing(myObj2) // Property 'label' is missing in type, required in type { label: string }
```

예제에서 `printing` 의 매개변수 `obj`에는 string 타입의 label 프로퍼티가 들어있는 object가 필요합니다. 해당 프로퍼티가 없을 경우 <b>에러를 반환</b>합니다. 해당 예제는 interface를 사용하여 하단 예제처럼 사용할 수 있습니다.

``` js
  interface LabeledValue { label: string }

  function printLabel (labeledObj: LabeledValue) {
    console.log(labeledObj.label)
  }

  let myObj1 = { size: 10, label: "Size 10 Object" }
  printLabel(myObj1)
  interface LabeledValue는 여전히 string 타입의 label 프로퍼티를 호출한다는 메세지를 담고있습니다. 
```

## Optional Properties

interface의 모든 프로퍼티가 필수인 것은 아닙니다. 몇몇은 특정한 조건에 의해 필요하거나, 정말 없을 수도 있습니다. 이러한 optional properties들은 여러개의 property들을 가진 object를 function에 전달해줄 때 유용합니다.

``` js
  interface SquareConfig {
    color?: string
    width?: number
  }

  function createSquare (config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 }
    if (config.color) newSquare.color = config.color
    if (config.width) config.width * config.width
    return newSquare
  }

  let mySquare = createSquare({ color: 'black'})
  console.log(mySquare) // { color: 'black', area: 100 }
  optional properties를 가진 interface들은 ? 를 선언할 프로퍼티 이름 뒤에 붙여 사용합니다.
```

## Readonly Properties

어떤 프로퍼티들은 object가 처음 생성될 때를 제외하고는 <b>편집이 불가능하도록 설정</b>해야할 수도 있습니다. 이럴땐 readonly를 프로퍼티 이름 앞에 붙여서 구체화시킵니다.

``` js
  interface Point {
    readonly x: number;
    readonly y: number;
  }

  let p1: Point = { x: 10, y: 20 };
  p1.x = 5 // Error! Cannot assign to 'x' because it is a read-only property
```
하단 예제처럼 `ReadonlyArray<T>`를 이용한 Typescript 타입은 `Array<T>` 와 비슷하며, 변경 가능한 메서드를 삭제한 상태로 - <b>생성된 array를 변경하지 못하도록 만듭니다.</b>

``` js
  let a: number[] = [1, 2, 3, 4]
  let ro: ReadonlyArray<number> = a

  ro[0] = 12   // Error! it only permits reading
  ro.push(3)   // Error! push does not exist on type 'readonly number'
  ro.length = 100   // Error! Cannot assign to 'length', it is read-only
  a = ro   // Error! 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
  a = ro as number[]
```

마지막 라인처럼 `ReadonlyArray`를 일반 array에 할당하는것은 불가능하지만, 할당시에 [type assertion](https://github.com/dmsdl950823/TIL/blob/master/Typescript/Typescript_Handbook_sum.md) 을 이용하여 오버라이딩 할 수 있습니다.

## Excess Property Checks
``` js
  interface SquareConfig {
    color?: string,
    width?: number
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
      color: config.color || 'red',
      area: config.width ? config.width * config.width : 20,
    };
  }

  let mySquare = createSquare({ colour: 'red', width: 100 })
  // Error! Argument of type '{ colour: string; ... } is not asssignable to parameter of type 
SquareConfig
// Did you mean to write 'color'?
```

예제와 같이 `SquareConfig` 인터페이스의 key값에 `colour` 라는 키값이 들어온다면, Typescript는 이 코드를 버그라고 생각합니다. 리터럴 형식 {} 의 Object는 다른 변수가 할당될때 체크를 과하게 하는 특별한 검사를 받습니다. 만약 리터럴 Object가 "target type"을 가지고있지 않은 프로퍼티를 가지고 있다면 에러를 가지게 됩니다.

``` js
  let square = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```
이 검사를 우회하는 방법은, 간단하게 type assertion을 사용하면 됩니다.

그러나, 만약 object가 추가적인 프로퍼티를 확실하게 가지고 있다면, 더 좋은 방법은 string index 싸인을 더하는 것 입니다.

```
  interface SquareConfig {
    color?: string
    width?: number
    [propName: string]: any
  }
```

여기서 `SquareConfig`는 여러개의 프로퍼티를 가질 수 있습니다. 그리고 명시된 프로퍼티가 (예제에선 color나 width) 아닌 한 그들의 타입은 상관없습니다.


## Function Types

interface는 function type도 정의할 수 있습니다. 정의를 위하여, interface에게 호출 신호 (call signiture)를 주어야 합니다. 각 파라미터는 name과 type을 `name: type` 형식으로 갖습니다. 또한 function의 return type 은 function이 반환하는 값을 체크합니다.

``` js
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch1: SearchFunc
  let mySearch2: SearchFunc

  mySearch1 = function (source: string, subString: string) {
    let result = source.search(subString)
    return result > -1
  }

  mySearch2 = function (src, sub) {
    let result = src.search(sub)
    return 'string'
  }
  // Error! 'string' is not assignable to type 'SearchFunc'
```

## Indexable Type

interface를 이용하여 `a[10]`, `ageMap["daniel"]` 과 같은 방식으로 인덱스 접근이 가능하도록 정의할 수도 있습니다. Indexable type은 return 타입에 일치하는 object안에 index를 사용할 수 있는 타입을 정의하는 index signature를 가지고있습니다. 

``` js
  interface StringArray {
    [index: number]: string
  }

  let myArray: StringArray
  myArray = ['Bob', 'Fred']

  let myStr: string = myArray[0]
```

예제에서, StringArray interface는 index signature (`[index: number]`) 를 가지고있습니다. 이 index signature는 StringArray가 number로 index가 붙여졌고, string을 리턴한다는 의미입니다.

반면에 string index signature는 '사전적' 패턴을 묘사하기에 가장 강력한 방법입니다. 모든 프로퍼티가 그들의 리턴타입과 일치하는지 강제로 확인합니다. 이것은 string index가 obj.property가 obj["property"]가 가능하도록 정의해주기 때문입니다. 

``` js
  interface NumberDictionary {
    [index: string]: number
    length: number
    name: string // Error! type of 'name' is not subtype of the indexer
  }
```

그러나 다른 타입의 프로퍼티는 index signature가 프로퍼티 타입의 집합이라면 접근 가능합니다.

``` js
  interface NumberDictionary {
    [index: string]: number | string
    length: number
    name: string
  }
  index signature를 readonly로 만들 수도 있습니다.

  interface ReadonlyStringArray {
    readonly [index: number]: string
  }

  let myArray: ReadonlyStringArray = ['Alice', 'Bob']
  myArray[2] = 'Mallory' // Error! index singature in type only permit reading
```

## Class Types

C#과 Java와 같은 언어에서 인터페이스의 가장 일반적인 사용 중 하나는 클래스가 특정 계약을 충족하도록 명시적으로 적용하는 것으로, TypeScript에서도 가능하며, interface에 메서드도 표현할 수도 있습니다.

``` js
  interface ClockInterface {
    currentTime: Date
    setTime(d: Date): void
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date()
    setTime(d: Date) {
      this.currentTime = d
    }
    constructor(h: number, m: number) {}
  }
```

interface는 class의 public과 private 면 동시에 보여주는 대신, public한 것만 묘사해줍니다. 이것은 class가 class instance의 private한 면의 특정한 타입을 가지고있는지 체크할 때 유용합니다.

#### class의 instance 면과 static한 면사이의 차이

class와 interface를 사용하여 작업할 때, class는 static, instance 두가지 타입을 가지고있다는 것을 알아두어야합니다. interface를 construct 생성자로 생성하고 이 interface를 실행 (implement) 할 경우, 이 error를 반환한다는것을 보실것입니다.

``` js
  interface ClockInterface {
    new (hour: number, minute: number)
  }

  // Error! : Class 'Clock' incorrectly implements interface 'ClockConstructor'.
  // Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
  class Clock implements ClockInterface {
    currentTime: Date = new Date()
    // 생략
  }
```

이것은 class가 interface를 실행할 때, class의 instance 면만 체크되기 때문입니다. constructor가 static 면에 고정되어있으므로, 이 체킹에 포함되지 않습니다.

대신에, static 면에 직접적으로 작업할 수 있습니다.

``` js
  interface ClockInterface {
    tick(): void
  }
  interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface
  }
  function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
  ): ClockInterface {
    return new ctor(hour, minute)
  }

  class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
      console.log("beep beep")
    }
  }

  class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
      console.log('tick tock')
    }
  }

  let digital = createClock(DigitalClock, 12, 17)
  let analog = createClock(AnalogClock, 7, 32)

```

이 예제에서, 두개의 interface를 정의하는데, ClockConstructor는 constructor를 위한것이고, ClockInterface는 instance methods 를 위한 것입니다. 그리고, 편리함을 위하여 우리는 createClock 생성자 함수를 정의하여 type을 전달해주었습니다.

## Extending Interfaces
class와 같이, interface는 각각 확장(extend)될 수 있습니다. interface의 멤버들을 복사하여 재사용 가능한 컴포넌트로 분리할 수 있습니다.

``` js
  interface Shape {
    color: string
  }

  interface PenStroke {
    penWidth: number
  }

  // extended interface
  interface Square extends Shape, PenStroke {
    sideLength: number
  }

  let square = {} as Square
  square.color = 'blue'
  square.sideLength = 10
  square.penWidth = 5.0
```

## Hybrid Types

이전에 언급했듯이, interface는 Javascript에서 풍부한 타입을 구현합니다. Javascript의 동적이고 유동적인 생태계 덕분에, 우리는 때때로 상단에 묘사된 몇몇 타입의 조합으로써 작업되는 object를 우연히 만날 수 있습니다. 🤔🤔🤔🤔

``` js
  interface Counter {
    (start: number): string
    interval: number
    reset(): void
  }

  function getCounter(): Counter {
    let counter = function (start: number) {} as Counter
    counter.interval = 123
    counter.reset = function () {}
    return counter
  }

  let c = getCounter()
  console.log(c(10)) // undefined
  console.log(c.reset()) // undefined
  console.log(c.interval = 5.0) // 5
 ```

## Interfaces Extending Classes
interface type이 class type을 상속할 때, class의 멤버들을 상속하지만, 그들의 implementation들은 상속하지 않습니다.
마치 interface가 모든 class 멤버들을 implementation 없이 선언한 것처럼 보입니다. Interface들은 심지어 private와 보호된(protected) 기본 class의 멤버들을 상속합니다. 이것은 여러분이 private또는 protected 된 멤버들을 가진 class를 상속한 interface를 생성할 때, interface type은 class 또는 subclass에의해 실행될 수 있다는 것을 의미합니다.

이것은 여러분이 큰 상속가능한 계층구조를 가질 때, 그러나 오직 확실한 프로퍼티를 가진 subclasses와만 사용이 가능한 여러분의 코드를 구체화 하고싶을 때 유용합니다. subclass는 기본 class로부터 상속되어 연결될 필요는 없습ㄴ디ㅏ.

``` js
  class Control {
    private state: any
  }

  interface SelectableControl extends Control {
    select(): void
  }

  class Button extends Control implements SelectableControl {
    select() {}
  }

  class TextBox extends Control {
    select() {}
  }

  // Error! Types have separate declarations of a private property 'state'
  class ImageControl implements SelectableControl {
    private state: any
    select() {}
  }
```

상단 예제에서,

SelectableControl은 private state 프로퍼티를 포함한 모든 Control 클래스의 멤버를 포함합니다. state가 private member 이므로 Control의 후손에게만 사용 가능합니다. 이것은 오직 Control의 후손이 private멤버를 위한 양립할 수 있는 요구사항인 선언에서 기원한 state private 멤버를 가질 것 이기 때문입니다. 

Control class안에서 SelectableControl의 인스턴스를 통하여 state private멤버들에게 접근 가능합니다. 효과적으로, SelectableControl은 select 메서드를 가지고있는 Control 같이 동작합니다. Button과 TextBox class는 SelectableControl의 subtype들입니다 (그 둘은 모두 Control을 상속하고있고 select 메서드를 가지고 있기 때문에) The ImageControl class는 그 자신만의 state private member를 가지고있으므로, (Control class를 상속하는 대신에) SelectableControl을 implement 할 수 없습니다.
