# Typescript_basic

### Type annotation - 타입 표기
```
  const message: string = 'hello world';
  console.log(message);
  
  const numbers: number[] = [1, 2, 3];    // 숫자 배열
  const messages: string[] = ['hello', 'world'];  // 문자열 배열
  messages.push(1);   // 숫자를 입력하려고 하면 에러
  
  let mightBeUndefined: string | undefined = undefined; // string 일수도 있고 undefined 일수도 있음
  let nullableNumber: number | null = null; // number 일수도 있고 null 일수도 있음
  
  let color: 'red' | 'orange' | 'yellow' = 'red'; // red, orange, yellow 중 하나임
  color = 'yellow';
  color = 'green'; // 에러 발생!
```

#### Define function type
```
  function greeter(person: number) {
      return "Hello, " + person;
  }
  let user = [0, 1, 2];
  greeter(user);
  
  function sum(x: number, y: number): number {
    return x + y;
  }
  sum(1, 2);
  
  function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0);
  }

  const total = sumArray([1, 2, 3, 4, 5]);
```

* 아무것도 반환하지 않아야 할 경우 `: void` 설정
```
  function returnNothing(): void {
    console.log('I am just saying hello world');
  }
```


---------


### Interface - 인터페이스
우리가 클래스를 만들 때, 특정 조건을 준수해야 함을 명시하고 싶을 때 interface 를 사용하여 클래스가 가지고 있어야 할 요구사항을 설정합니다. 그리고 클래스를 선언 할 때 implements 키워드를 사용하여 해당 클래스가 특정 interace의 요구사항을 구현한다는 것을 명시합니다.

```
  interface Person {
      firstName: string;
      lastName: string;
  }

  function greeter(person: Person) {
      return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = { firstName: "Jane", lastName: "User" };
  greeter(user);
```

```
  // Shape 라는 interface 를 선언합니다.
  interface Shape {
    getArea(): number; // Shape interface 에는 getArea 라는 함수가 꼭 있어야 하며 해당 함수의 반환값은 숫자입니다.
  }

  class Circle implements Shape {
    // `implements` 키워드를 사용하여 해당 클래스가 Shape interface 의 조건을 충족하겠다는 것을 명시합니다.

    radius: number; // 멤버 변수 radius 값을 설정합니다.

    constructor(radius: number) {
      this.radius = radius;
    }

    // 너비를 가져오는 함수를 구현합니다.
    getArea() {
      return this.radius * this.radius * Math.PI;
    }
  }

  class Rectangle implements Shape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    getArea() {
      return this.width * this.height;
    }
  }

  const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)];

  shapes.forEach(shape => {
    console.log(shape.getArea());
  });
```

---------

### Class - 클래스

```
  class Student {
      fullName: string;
      constructor(public firstName: string, public middleInitial: string, public lastName: string) {
          this.fullName = firstName + " " + middleInitial + " " + lastName;
      }
  }

  interface Person {
      firstName: string;
      lastName: string;
  }

  function greeter(person: Person) {
      return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = new Student("Jane", "M.", "User");
  greeter(user);

```
