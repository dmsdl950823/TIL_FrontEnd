# Object

premitive 타입의 변수는 한 변수당 하나의 데이터만 저장할 수 있습니다. <br> 이럴 경우 관리하기 힘들어지게 됩니다. 
```
  const name = 'jenny';
  const age = 4;
```

## Defining Object
object has key, value.
```
  const obj1 = {};           // Object literal - 리터럴 방식
  const obj2 = new Object(); // Object constructor - 생성자 방식
```

## computed properties - 계산된 프로퍼티
```
  console.log(jenny.name);    
  console.log(jenny['name']); // 계산된 프로퍼티
```

## propery value shorthand
```
  const person1 = { name: 'bob', age: 2 };
  const person2 = { name: 'steve', age: 3 };
  const person3 = { name: 'dave', age: 4 };
  const person4 = makePerson('ellie', 30);    // { name: 'ellie', age: 30 }
  
  function makePerson(name, age) {
    return {
      name, // object의 key = value의 name이 같을 경우 
      age
    };
  } 
```

## In operator
```
  console.log('name' in person);   // true
  console.log('age' in person);    // true
  console.log('random' in person); // false
  console.log(person.random);      // undefined
```

## for ... in vs for ... of
```
  for (key in person) {
    console.log(key);
  }
  // name, age
```
```
  // for (value of iterable)
  const array = [1, 2, 4, 5];
  for (value of array) {
    console.log(value);
  }
  // 1, 2, 4, 5
```

## cloning
```
  const user = { name: 'Jenny', age: 20 };
  const user2 = user;
  console.log(user === user2) // true
  
  user2.name = 'coder';
  console.log(user);      // { name: "coder", age: 20 }
```
```
  // cloning
  const user4 = {}
  Object.assign(user4, user);
  console.log(user4);
  console.log(user === user4) // false
```






