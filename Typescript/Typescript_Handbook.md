# Typescript Handbook 요약

Typescript 기본 타입 사용법 및 정리
Boolean
let boolType: boolean = false
Number
let decimal: number = 6
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
let big: bigint = 100n
String
let color: string = 'blue'
color = 'red'
Array
let list_1: number[] = [1, 2, 3]
let list_2: Array<number> = [1, 2, 3]
Tuple
let x: [string, number] // declare tubple type
x = ['hello', 10] // Ok
x = [10, 'hello'] // Error!!

console.log(x[0].substring(1)) // ello
console.log(x[1].substring(1)) // 'substring' does not exist on type 'number'
x[3] = 'world' // x Tuple has 2 length - doesn't have index 3
Enum
enum 타입은 JavaScript에서 숫자 유형 집합에 유용합니다. 기본적으로, enum은 0 부터 시작하여 멤버들의 번호를 매깁니다. 멤버중 하나의 값이나 모든 값을 수동으로 설정 할 수 있습니다.

enum Color {
  Red = 1,
  Green,
  Blue
}

let c: Color = Color.Blue  // 2
enum 의 유용한 기능 중 하나는 해당 값을 사용해 enum 멤버의 이름을 알아낼 수 있다는 것 입니다. 예제에서 2 라는 값이 위의 어떤 Color enum 멤버와 매칭되는지 알 수 없을 때, 이에 일치하는 이름을 알아낼 수 있습니다.

Unknown
어떤 값이 넘어올지 알지 못하는 타입을 표현해야할 수도 있습니다. 이 값들은 사용자로부터 받은 데이터나 서드파티 라이브러리 같은 동적인 컨텐츠에서 올 수도 있습니다. 이 경우 컴파일러와 사용자에게 이 변수는 어떤것이든 들어올 수 있다 라는것을 의미하기 위해, unknown타입을 사용할 수 있습니다.

let notsure: unknown = 4
notsure = 'can use a string?'
notsure = false
unknown 타입의 변수를 갖고있을 경우, typeof 체킹, 비교, 또는 후에 나오는 자세한 타입 체크 방식 등을 통하여 더 구체화 할 수 있습니다.

declare let maybe: unknown
// maybe 는 string, object, boolean, undefined등 의 다른 타입도 가능합니다
const aNumber: number = maybe // Error!! unknown is not assignable to type 'number'
Any
특정한 상황에서, 모든 타입의 정보가 가능하지 않거나 또는 선언하는데 너무 많은 양의 노력이 걸릴 수 있습니다. 이것은 Typescript가 없거나 또는 서드파티 라이브러리를 이용해 작성된 코드에서 발생합니다. 이런경우, 선택적 체크가 필요하며, 이 값들을 any 타입을 이용하여 할당할 수 있습니다.

declare function getValue(key: string): any;
const str: string = getValue("myString"); // getValue is not declared
any 타입은 컴파일 도중에 타입을 점진적으로 체크하게 해주는 아주 강력한 방법입니다.
unknown 이랑은 다르게, any 타입 변수는 존재하지 않는 임의의 프로퍼티에도 접근할 수 있도록 해줍니다. 이 프로퍼티들은 function을 포함하고, Typescript는 그들의 존재나 타입을 체크하지 않을것입니다.

let looselyTyped: any = 4

looselyTyped.toFixed() // toFixed 메서드는 존재하지만 compiler에서는 체크하지 않습니다.
looselyTyped.ifItExists() // ifItExists 메서드는 runtime에서 존재하지않습니다.

let strictlyTyped: unknown = 4
strictlyTyped.toFixed() // Error! toFixed는 unknown 타입에 존재하지 않습니다.

any는 오브젝트를 통해 부모에서 자식으로 타고 계속 내려갑니다.

let looselyTyped: any = {};
looselyTyped.a.b.c.d;
Void
void는 비어있는 값을 가집니다. 값을 리턴하지않는 function을 종종 보실 수 있을것입니다.

function warnUser(): void {
  console.log("This is my warning message");
}

let unusable: void = undefined
unusable = null
Null and Undefined
Typescript 에서, undefined와 null은 사실상 그들의 undefined, null 타입을 각각 가지고있습니다.

let u: undefined = undefined
let n: null = null
Never
never 타입은 발생하지 않는 값의 타입을 반영합니다.

예를들어, never은 값을 리턴합니다. never 은 항상 예외(exception)을 throw하거나 return을 하지 않는 일반 function 이나 arrow function 표현식을 위한 타입입니다. 변수는 절대로 true가 될 수 없는 어떤 타입에 의해 never 타입을 얻습니다. (?)

// never를 리턴하는 함수는 접근 가능한 end point를 가지면 안됩니다.
function error (message: string): never {
  throw new Error(message)
}

// 함축된 return 타입은 never 입니다
function fail () {
  return error('someting failed')
}

// never를 리턴하는 함수는 접근 가능한 end point를 가지면 안됩니다.
function infiniteLoop (): never {
  while (true) {}
}
Object
object는 원시 타입이 아닙니다. - number, string, boolean, bigint, symbol, null, undefined가 아님.
object 타입으로는, Object.create 같은 API는 더 좋게 표현될 수 있습니다.

Type assertions - 타입 확인
가끔 여러분이 Typescript보다 값을 더 잘알 수 있는 상황이 있습니다. 

Type assertion은 compiler에게 "나도 내가 뭐하고있는지 안다고!" 라고 말해주는 방법입니다. Type assertion은 특별한 체크나 데이터를 재구성 하는 행동을 하지 않습니다. runtime 영향을 갖지 않고 compiler에 의해서 순수하게 사용됩니다. Typescript는 프로그래머에게 그들이 필요한 특별한 체크 방식을 수행한다고 가정합니다.

Type assertion은 두 가지 형식이 있습니다.

// as-syntax
let someValue1: unknown = "this is a string"
let strLength1: number = (someValue1 as string).length

// angle-bracket syntax
let someValue2: unknown = 'this is a string'
let strLength2: number = (<string>someValue2).length
  
  
  -----------------------------------------------------------
  
  -----------------------------------------------------------
  
  -----------------------------------------------------------
  
  Typescript Interface
Interface
Typescript의 핵심 원리는 그 값이 가지고있는 형태를 중심으로 타입 체크를 한다는 것입니다. 이것은 "duck typing" 이나 "structural subtyping" 이라고 불리웁니다. interface는 이 타입들의 역할을 채우며, 여러분의 코드를 정의하는 강력한 방법입니다.

function printing (obj: { label: string }) {
  console.log(obj.label)
}

let myObj1 = { size: 10, label: "Size 10 Object" }
let myObj2 = { size: 10 }
printing(myObj1)
printing(myObj2) // Property 'label' is missing in type, required in type { label: string }
예제에서 printing 의 매개변수 obj에는 string 타입의 label 프로퍼티가 들어있는 object가 필요합니다. 해당 프로퍼티가 없을 경우 에러를 반환합니다. 해당 예제는 interface를 사용하여 하단 예제처럼 사용할 수 있습니다.

interface LabeledValue { label: string }

function printLabel (labeledObj: LabeledValue) {
  console.log(labeledObj.label)
}

let myObj1 = { size: 10, label: "Size 10 Object" }
printLabel(myObj1)
interface LabeledValue는 여전히 string 타입의 label 프로퍼티를 호출한다는 메세지를 담고있습니다. 

Optional Properties
interface의 모든 프로퍼티가 필수인 것은 아닙니다. 몇몇은특정한 조건이나 정말 없을 수도 있습니다. 이러한 optional properties들은 여러분이 여러개의 property들을 가진 object를 function에 전달해줄 때 유용합니다.

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

Readonly Properties
어떤 프로퍼티들은 object가 처음 생성될 때를 제외하고는 편집이 불가능하도록 설정해야할 수도 있습니다. 이럴땐 readonly를 프로퍼티이름 앞에 붙여서 구체화시킵니다.

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5 // Error! Cannot assign to 'x' because it is a read-only property
 ReadonlyArray<T>를 이용한 Typescript 타입은 Array<T> 와 비슷하며, 변경 가능한 메서드를 지운 상태로, 생성된 array를 변경하지 못하도록 만듭니다.

let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

ro[0] = 12   // Error! it only permits reading
ro.push(3)   // Error! push does not exist on type 'readonly number'
ro.length = 100   // Error! Cannot assign to 'length', it is read-only
a = ro   // Error! 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
a = ro as number[]
마지막 라인처럼 ReadonlyArray를 일반 array에 할당하는것은 불가능하지만, 할당시에 type assertion을 이용하여 오버라이딩 할 수 있습니다.
