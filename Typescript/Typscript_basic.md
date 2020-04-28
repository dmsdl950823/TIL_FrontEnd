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
```
  function greeter(person: number) {
      return "Hello, " + person;
  }
  let user = [0, 1, 2];
  document.body.textContent = greeter(user);
```

### Interface - 인터페이스
```
  interface Person {
      firstName: string;
      lastName: string;
  }

  function greeter(person: Person) {
      return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = { firstName: "Jane", lastName: "User" };
  document.body.textContent = greeter(user);
```

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
  document.body.textContent = greeter(user);

```
