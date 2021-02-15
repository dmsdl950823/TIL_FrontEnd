# Typescript Handbook 번역
  
# 목차

1. [Typescript Interface](#Typescript Interface)
  * 1.1 [Interface](#Interface)
  * 1.2 [Optional Properties](#Optional Properties)
  * 1.3 [Readonly Properties](#Readonly Properties)
  * 1.4 [Excess Property Checks](#Excess Property Checks)

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





---------------------------------------------
---------------------------------------------
--------------------------------------------

Typescript에서 Function은 class, namespace, module들이 있긴 하지만, function은 여전히 무언가를 하는데 주요한 역할을 합니다. Typescript는 표준 Javascript function을 더 쉽게 사용, 동작할 수 있도록 하는 새로운 능력을 추가합니다.

Functions
Javascript 처럼, Typescript function은 named function이나 anonymous function 둘 다 생성될 수 있습니다. 이것은 여러분이 API에서 function 리스트를 작성하거나 하나의 function을 다른 하나의 function에 전달하는 등의 여러분의 애플리케이션을 위해 적절한 접근을 선택하도록 도와줍니다.

Functions Types
function add(x: number, y: number): number {
  return x + y
}

let myAdd = function (x: number, y: number): number {
  return x + y
}
각 parameter에 타입을 더해줄 수 있고, function 자신에게는 return type을 지정할 수 있습니다. Typescript는 return 조건을 확인하므로써 return type을 특정지을 수 있어서, 옵션으로 생략 할 수도 있습니다.

Writing the function type
이제 function 타입을 지정했으니, 각 function type을 살펴봄으로써 function의 모든 type을 작성해봅시다.

let myAdd: (x: number, y: number) =>
  number = function ( x: number, y: number ): number {
    return x + y;
  };
function의 타입은 공통된 투가지  arguments와 return type을 가집니다. 전체 function type을 작성할 때, 두가지 모두가 필요합니다. 우리는 parameter list 처럼 parameter types를 적고, 각 parameter에 name과 type을 지정해줍니다. 이 name은 읽을 수 있도록 도와주는 용도입니다. 하단과 같이 작성할 수 있습니다.

let myAdd: (baseValue: number, increment: number) =>
  number = function (x: number, y: number): number {
    return x + y;
  };
parameter type이 있으므로, function을 위한 적절한 type이 고려되고, name에 상관없이 parameter를 function type에 넘겨줍니다.

return type은 parameter과 return type 사이의 arrow (=>) 를 사용하여 return type을 정의합니다. 이전에 언급했던 바와 같이, 이것은 필요한 function type이므로, 만약 function이 value를 반환하지 않는다면, 그냥 놔두는 것 대신 void 를 사용해야합니다.

parameter과 return type은 function type을 만들어줍니다. 캡쳐된 변수는 type에 반영되지 않습니다. 캡쳐된 변수는 "숨겨진 상태"의 부분입니다.  In effect, captured variables are part of the “hidden state” of any function and do not make up its API.



Inferring the types
이미 눈치 채셨겠지만, Typescript 컴파일러는 비록 등호(=) 옆에 type을 가지고 있지만 해당 type을 찾을 수 있습니다.
이것은 "contextual typing"이라고 부르는 type interface의 형태입니다. 이것은 여러분의 프로그래밍 타이핑 노력과 시간을 줄여주는데 도움을 줍니다.

Optional and Default Parameters
Typescript에서, 모든 parameter는 function에 의해서 요구되어진다고 가정됩니다. 이것은 null이나 undefined로 주어질 수는 없다는 것을 의미하진 않습니다. function이 호출될 때, 컴파일러는 사용자가 각각 parameter에 값을 제공했다는 것을 체크합니다. 컴파일러는 또한 이 제공된 parameter는 function에 전달될 parameter들이라는 것을 가정합니다. 짧게 말해, function에 제공된 매개변수의 숫자는 function이 예상하는 parameter의 숫자에 일치해야합니다.

function buildName(firstName: string, lastName: string) {
  return firstName + '' + lastName
}

// Error! Expected 2 arguments..
let result1 = buildName('bob')
let result2 = buildName('bob', 'adams', 'Sr.')
Javascript에서, 모든 parameter는 옵션입니다.  parameter에 값이 없을 때는 undefined가 할당됩니다.
Typescript에선는 parameter의 끝에 ?를 더하여 해당 parameter는 옵션이라는 것을 알려줄 수 있습니다. 

function buildName(firstName: string, lastName?: string) {
  return firstName + '' + lastName
}

let result1 = buildName('bob', 'adams', 'Sr.') // Error! Expected 1-2 arguments..
let result2 = buildName('bob', 'adams')
let result3 = buildName('bob')

function buildName(firstName?: string, lastName: string) {
  return firstName + '' + lastName
}

let result1 = buildName('bob') // Error! Expected 2 arguments..
Typescript에서는, 만약 사용자가 parameter를 제공하지 않을 경우, 또는 undefined를 입력한 경우, 필요한 경우에 해당 부분에 설정될 값을 세팅해주어야 합니다.

optional paramete과 기본 parameter는 그들의 타입을 공유한다는 것을 의미하므로, 두가지 방법 모두 (사이트 function 두개 참고) (firstName: string, lastName?: string) => string   type을 공유합니다. 기본 lastName 값은 type에서 사라지고, parameter는 optional 이라는 사실만 남습니다.

일반 optional parameter과는 다르게 기본 생성된(default-initailized) parameters는 필수 parameter후에 일어날 필요는 없습니다ㅏ. 만약 default-initalized parameter가 ㅍ필수 parameter 앞에 올 경우, 사용자는 default initialized 값을 갖기 위하여 구체적으로 undefined를 넘겨주어야 합니다. 

function buildName(firstName = 'Will', lastName: string) {
  return firstName + ' ' + lastName
}

buildName('Bob', 'Jae')
buildName(undefined, 'Jae')


Rest Parameters
필요한, 옵션인, 그리고 기본 파라미터들은 모두 한번에 한 parameter 에 대해 보여준다는 공통점을 가지고있씁니다. 때때로, 여러분은 많은 parameters를 그룹으로 가지고있거나, 얼마나 많은 parameter들이 function에 들어올지 알 수 없는 경우가 있습니다. Javascript에서, 여러분은 모든 function 안에서 보여지는 arguments 변수를 직접적으로 사용할 수도 있습니다.

Typescript에서는, 여러분은 변수에 이 arguments들을 뭉쳐넣을 수 있습니다.

function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + '' + restOfName.join(' ')
}

let employeeName = buildName('A', 'B', 'C', 'D')
'Rest parameter'는 제한없는 optional parameters의 숫자를 다룹니다. 여러분은 arguments를 원하는 만큼 rest parameter에 넘겨줄 수 있습니다. (아무것도 넘기지 않아도 됩니다!) 컴파일러는 ( ... ) 뒤에 주어진 arguments의 배열을 빌드하여 여러분의 function에 사용할 수 있도록 해줄 것입니다.

ellipsis(...)는 rest parameter과 함께 function의 타입에서도 쓸 수 있습니다.

function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + '' + restOfName.join(' ')
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName


this
Typescript는 Javascript에서 파생되었기 때문에, Typescript 개발자들은 this를 사용하는 방법과, 언제 그것이 사용되지 않는지를 정확하게 찾는 방법을 배울 필요가 있습니다. 다행히도, Typescript는 여러분이 부적절하게 this를 사용하는지를 체크해줍니다. 만약 this를 Javascript에서 사용하는 방법을 알 필요성이 있다면, this에 관한 이해(링크) 를 참고하세요. 

this and arrow functions
Javascript에서, this 변수는 function이 호출될 때 설정되는 변수입니다. 이 변수는 아주 강력하고 유동적인 특징을 가지고있지만, function이 동작하는 context에 대해서 알아야할 필요성이 있습니다. 이것은 굉장히 헷갈리는데, 특히 function이나 function을 argument로 전달해줄 때 더욱이 그렇습니다.

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker()

alert("card: " + pickedCard.card + " of " + pickedCard.suit)
createCardPicker은 function을 리턴하는 function입니다. 만약 이 예제를 실행할경우, error를 반환합니다.  createCardPicker에 의해서 생성된 function에서 사용된 this가 deck object대신 window에 설정되기 때문입니다.
This is because/ the this (being used in the function created by createCardPicker) will be set to window instead of our deck object.
우리가 cardPicker()그 자신을 호출하기 때문입니다.

우리는 function을 리턴하기 전에 올바른 this를 연결해줌으로써 고칠 수 있습니다.이 방법은, 이것이 후에 사용되어짐과는 상관없이, 원본 deck object를 볼 수 있게합니다. 이렇게 하기위해서는, 우리는 function 표기법을 ES6 arrow function을 사용하여 변경할 수 있습니다. Arrow function은 호출된 곳이 아닌 function이 생성된 곳에 this를 캡쳐합니다.

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      // () => {} this
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit)
Typescript는 여러분이 nomplicitThis flag를 컴파일러에게 전달했을경우, 여러분에게 알림을 줍니다.  this.suits[pickedSuit]안에있는 this가 any 타입이라는 것을 알려줄 것입니다.

this parameters
this는 리터럴 object {...} 안에 있는 function으로부터 this가 생성될 경우(상단 예제 참고) 결과값의 type은 any입니다. 이것을 타입 체킹 하기 위해서, 명시적인 this parameter를 제공해야합니다. this parameter는 function의 paramter 리스트 안에서 제일 첫번째로 들어오는 가짜 parameter입니다.

function f(this: void) {
  // `this`가 이 단독 function에서 사용할 수 없게 하세요
}
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    let pickedCard = Math.floor(Math.random() * 52)
    let pickedSuit = Math.floor(pickedCard / 13)
    return () => {
      return { suit: this.suits[pickedSuit], card: pickedCard }
    }
  }
}
이제 Typescript가 createCardPicker가 Deck object에서 호출된다는 것을 예상하여, Deck type의 this는 이제, any가 아니므로 에러를 반환하지 않습니다.



this parameter in callbacks
function에 library(추후에 배울것입니다)를 전달해줄 때, callback에서 this를 사용할 때에도 에러를 만날 수 있습니다. callback을 호출하는 library는 일반적인 function과 똑같이 호출하는데, this는 undefined일 것입니다. this parameter를 사용하여 callback의 에러를 제어할 수 있습니다. 첫번째로, library 저작자는 this를 사용한 callback type을 부여할 수 있습니다.

interface UIElement {
  addClickListner(onclick: (this: void, e: Event) => void): void
}
this: void는 addClickEventListner가 onclick이 this type을 요구하지않는 function일 것이라 예상한다는 의미입니다. 두번째로, this를 사용하여 호출 코드를 부여하는 방법입니다.

????? 코드를 봐도 a뭔소린지 모르겠어 ㅠㅠ....

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // oops, used `this` here. using this callback would crash at runtime
    this.info = e.message;
  }
}

let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
this 할당을 통해, 여러분은 onClickBad가 Handler의 instance에서 호출되어야만 한다는것을 명시적으로 표현할 수 있습니다. 그리고 Typescript는 addClickListner가 this:void를 가진 function을 필요로 한다는 것을 찾을 수 있습니다. 에러를 고치기 위해서는 this의 type을 고쳐야합니다.

class Handler {
  info: string;
  onClickGood(this: void, e: Event) {
    // can't use `this` here because it's of type void!
    console.log("clicked!");
  }
}

let h = new Handler();
uiElement.addClickListener(h.onClickGood);
onClickGood가 this type을 void로 설정해두었기 때문에, addClickListener를 전달하는것이 가능합니다. 물론, this.info를 사용할 수 없다는것을 의미하기도 합니다. 둘다 원한다면, arrow function을 사용하면 됩니다.

class Handler {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}
arraw function은 this 밖에서 사용하기 때문에 동작하므로, 항상 this:void를 예상하는 무언가를 넘겨주어야 합니다. 하단에는 arrow function이 Handler type의 object를 생성합니다. Methods는 반면에, 한번만 생성하며 Handler의 프로토타입에 붙어있습니다. 모든 Handler타입의 object사이에서 공유됩니다.



Overloads
Javascript는 아주 동적인 언어입니다. 하나의 Javascript function이 전달된 arguments의 모양을 기초로 각각 전혀 다른 타입의 object를 리턴하는 것은 흔하지 않습니다.

이런 경우는 같은 function을 위해 overloads의 리스트로써 여러개의 function type 을 제공합니다. 이 리스트는 컴파일러가 function 호출을 수행하기 위해서 사용할 것입니다. 어떤 argument를 받아 어떤것을 return 할지 결정하는 overload 리스트를 만들어봅시다.

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
이러한 변화로, overloads는 우리에게 type 체크가 된 호출을 pickCard function에 전달해줍니다.

컴파일러가 올바른 type check를 하기 위해서는, 비슷한 기본 Javascript와 비슷한 접근을 따라야합니다. overload list와 첫 번째 overfload는 제공된 parameter과함께 function을 호출하는 시도를 합니다? It looks at the overload list and, proceeding with the first overload, attempts to call the function with the provided parameters.
만약 이게 맞는다면, 이 overload를 올바른 overload로서 선택합니다. 구체적으로 커스터마이즈 할 수 있습니다.

function pickCard(x): any는 overload list가 아니라는것을 염두해두세요 : 오직 두개의 overload만이 있습니다.

한개는 object고 하나는 number를 받습니다. any type의 paramter를 가지고 pickCard를 호출하면 에러를 반환합니다.


------------------------------------
-----------------------------------
-------------------------------------------


리터럴은 집합적인 타입의 구체적인 서브 타입입니다. 이는 타입 시스템 내부에서 "Hello World"는 string이지만, string은 "Hello World"가 아닌것을 의미합니다.

TS에는 strings, numbers, booleans 세 가지의 리터럴 타입이 있습니다. 리터럴 타입을 이용하여 여러분은 정확한 string, number, boolean 값을 가지도록 정확한 값을 할당 할 수 있습니다.

String Literal Types
string 리터럴 타입은 type, type guard, type alias와 잘 조합됩니다. 여러분은 이 특징을 enum 같은 방식으로 string과 함께 사용할 수 있습니다.

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
// 해당 세가지 외에는 사용할 수 없습니다.

class UIElement {
  animate (dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') { }
    else if (easing === 'ease-out') { }
    else if (easing === 'ease-in-out') { }
    else {
      // 여러분의 type을 무시함으로써 여기에 도달 할 수 있습니다.
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // Error! 'uneasy' is not assignable.
string 리터럴 타입은 같은 방법으로 overload를 구별하는데 사용 가능합니다.

function createElement(tagName: "img"): HTMLImageElement
function createElement(tagName: "input"): HTMLInputElement
// ... more overloads ...

function createElement(tagName: string): Element {
  // ... 
}
Numeric Literal Types
TS는 string literal과 유사한 numeric 리터럴 타입을 가집니다.

function rollDice (): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
}
일반적인 사용 케이스는 config 값을 정의하기 위해서 많이 사용합니다.

interface MapConfig {
  lng: number,
  lat: number,
  tileSize: 8 | 16 | 32
}

// function setupMap이 있다고 가정합니다.
setupMap({ lng: 5, lat: 4, titleSize: 16 })
 Boolean Literal Types
TS는 boolean literal Type도 가지고 있습니다. 이러한 값을 사용하여 속성이 상호 연관된 개체 값을 제한할 수 있습니다.

interface ValidationSuccess {
  isValid: true
  reason: null
}

interface ValidationFailure {
  isValid: false
  reason: string
}

type ValidationResult = ValidationSuccess | ValidationFailure



------------------------
----------------------------
---------------------


전통 JS는 재사용 가능한 컴포넌트를 만들기 위한 function과 prototype 기반 상속을 사용하였지만, class가 함수를 상속받고 classe로부터 object가 만들어지는 object-oriented에 익숙한 프로그래머들에게는 약간 어색합니다. ECMAScript 2015(ES6)를 시작으로, JS 프로그래머들은 그들의 앱을 이 객체지향(object-oriented) 접근을 사용하여 그들의 앱을 만들 수 있게 되었습니다. TS에서는, JS로 컴파일해서 모든 주요 브라우저와 플랫폼에서 사용할 수 있는 개발자들에게 이 기술을 사용하도록해주었고, JS의 다음버전을 기다릴 필요가 없도록 해주었습니다.

Classes
class Greeter {
  greeting: string;
  constructor (message: string) {
    this.greeting = message
  }

  greet () {
    return `Hello ${this.greeting}`
  }
}

let greeter = new Greeter('world')
간단한 class 기반 예제를 살펴보면, class의 멤버중 하나를 this라는 방식으로 class에 참조한 것을 확인할 수 있습니다. 이것이 member 접근을 한다는것을 나타냅니다.

이 마지막줄에서, 우리는 Greeter class를 new 생성자를 사용하여 생성했습니다. 이것은 우리가 이전에 정의했던 constructor를 호출하고, Greeter shape를 이용하여 새로운 오브젝트를 생성하고, constructor를 호출하여 초기화합니다

 

Inheritance
TS에서, 우리는 일반적인 object-oriented 패턴을 사용합니다. class 기반 프로그래밍의 가장 기초 패턴은 존재하는 class를 새로운 것을 생성하기 위해 상속을 사용하여 존재하는 class를 확장할 수 있도록 해주는 것 입니다.

class Animal {
  move (distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}`)
  }
}

class Dog extends Animal {
  bark () {
    console.log('Woof Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
dog.bark()
이예제는 가장 기초적인 상속 특징을 보여줍니다 - class는 프로퍼티와 메서드를 기본 class로부터 상속합니다. 새로 생성된 Dog같은 Derived class는 subclass라고 부르고, 기본 class는 superclass라고 부릅니다.

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
    super(name)
  }
  move (distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters)
  }
}


class Horse extends Animal {
  constructor (name: string) {
    super(name)
  }
  move (distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
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
이 예제는 이전 예제와 다르게 derived 클래스의 constructor function이 base class의 constructor를 실행하는 super()를 호출해야만 한다는 것 입니다.  constructor body에서 this에서 property에 접근하기 전에, 우리는 super()를 호출해야만 합니다. 이것은 TS에서 강제하는 중요한 규칙입니다.

base class에 존재하는 methods를 subclass에 전문화된 메서드로 override하는 방법도 나와있습니다. Sname와 Horse 둘다 Animal 의 move 메서드를 override 하는 move 메서드를 가지는데, 각각의 클래스를 구체화하도록 해줍니다. 


-------------------------------------
-------------------------------------
---------------------------------------



Public, private, and protected modifiers
Public by default
그동안은 우리 프로그램 전체에 우리가 선언한 멤버들에 자유롭게 접근할 수 있었습니다. 만약 우리가 다른 언어에서 class 개념과 익숙하다면, 우리는 위 예제들은 public 이라는 단어를 사용하지 않았다는것을 알 수 있습니다. TS에서는, 기본적으로 모든 멤버들은 public이 기본입니다.

우리는 명확하게 public 멤버들을 여전히 마킹할 수는 있습니다.

class Animal {
  public name: string
  
  public constructor (theName: string) {
    this.name = theName
  }
  
  public move (distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}
ECMAScript Private Fields
TS는 private field를 위한 새로운 JS 문법을 도입했습니다.

class Animal {
  #name: string
  constructor (theName: string) {
    this.#name = theName
  }
}

new Animal('Cat').#name
// #name is not accesible because it has a private identifier
Understanding Typescript's private
TS는 private로 마크된 멤버를 선언할 수 있습니다. private 멤버를 포함한 클래스 밖에서는 해당 변수에 접근할 수 없습니다.

 

class Animal {
  private name: string
  
  constructor (theName: string) {
    this.name = theName
  }
}

new Animal('Cat').name
// Property 'name' is private and only accessible within class 'Animal'.​
TS는 구조 타입 시스템입니다. 어디서 오든지 상관없이 두개의 다른 타입들을 비교할 때 , 만약 모든 멤버들의 타입이 양립 가능하다면, 타입이 양립할 수 있다고 말합니다.

그러나, private과 protexted 멤버들을 가진 타입들을 피교할 때, 우리는 이 타입들은 다르게 취급합니다. 두개의 타입이 양립 가능하도록 고려하기 위해서, 만약 그중 하나가 private 멤버를 가진다면, 딜다른 하나는 같은곳에서 선언된 private 멤버를 가져야합니다. 비슷하게, protexted 멤버에 적용됩니다.

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
Employee는 Animal과 모양이 같은 class 입니다. 우리는 이 class의 인스턴스를 생성하고, 각각에게 어떤 일이 발생할지 확인합니다. Animal과 Rhino는 Animal의 'private name: string'이라는 동일한 선언에서 나온 그들의 모양의 private 면을 공유하기 때문에, 그들은 양립할 수 있다. 그러나, Employee의 경우에는 아닙니다. Employee로부터 Animal에게 할당할 때, 양립할 수 없다는 타입에러가 나옵니다. Employee는 name이라는 private 멤버를 가지고있지만, Animal에서 선언한 것이 아닙니다.

Understanding protected
protected 수식어는 멤버들이 확장된 class안에서 접근 가능한 [보호된] 상태로 선언되었단 점을 제외하고 private 수식어와 매우 유사합니다.

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
 

우리가 Person의 밖에서 name을 사용하지 못하는동안, 우리가 Person에서부터 Employee를 확장했기 때문에 Employee 의 인스턴스 메서드 안에서 여전히 사용할 수 있는 것을 보세요.

constructor는 protected로 마킹될 수 있습니다. 즉, 클래스는 포함하는 클래스 외부에서 인스턴스화할 수 없지만 확장할 수 있습니다.

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
Parameter properties
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}

let dad = new Octopus("Man with the 8 strong legs");
console.log(dad.name);
