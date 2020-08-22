# Clean Code

## 변수 (Variables)
### 의미있고 발음하기 쉬운 변수 이름을 사용하세요
```
  // bad example
  const yyyymmdstr = moment().format('YYYY/MM/DD');
  
  // good example
  const currentDate = moment().format(YYYY/MM/DD');
```

### 동일한 유형의 변수에 동일한 어휘를 사용하세요
```
  // bad example
  getUserInfo();
  getClientData();
  getCustomerRecord();
  
  // good example
  getUser();
```

### 검색가능한 이름을 사용하세요

우리는 작성할 코드가 읽을 코드가 더 많기 때문에 코드를 읽기 쉽고 검색 가능하게 작성해야합니다. 그렇지 않으면 협업에서 다른사람들이 읽기 불편하기 때문입니다.
검색 가능한 이름으로 만드세요. `buddy.js`와 `ESLint`와 같은 도구들이 이름이 정해져있지 않은 상수들을 발견하고 고칠 수 있게 도와줍니다.

```
  // bad example
  // 86400000에 대한 정보가 부족하므로 무엇에 대한 데이터인지 알 수 없습니다.
  setTimeout(blastOff, 86400000);
  
  // good example
  const MILLISECONDS_IN_A_DAY = 86400000;
  setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

### 의도를 나타내는 변수를 사용하세요
```
  // bad example
  const address = 'One Infinite Loop, Cupertino 95014'
  const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
  saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2])
  
  // good example
  const address = 'One Infinite Loop, Cupertino 95014';
  const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
  const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
  saveCityZipCode(city, zipCode);
```

### 자신만 알아볼 수 있는 작명을 피하세요

명시적인 것이 암시적인 것 보다 좋습니다.

```
  // bad example
  const locations = ['서울', '인천', '수원'];
  locations.forEach(l => {
    // ...
    dispatch(l);
    // `l`이 무엇인지 헷갈릴 것입니다.
  });
  
  // good example
  const locations = ['서울', '인천', '수원'];
  locations.forEach(location => {
    // ...
    dispatch(location);
  });
```

### 문맥상 필요없는 것들을 쓰지 마세요
```
  // bad example
  const Car = {
    carMake: 'BMW',
    carModel: 'M3',
    carColor: 'blue'
  }
  
  function paintCar(car) {
    car.carColor = 'red';
  }

  // good example
  const Car = {
    make: 'BMW',
    model: 'M3',
    color: 'blue'
  }
  
  function paintCar(car) {
    car.color = 'red';
  }
```


### 기본으로 매개변수가 short circulating 트릭이나 조건문 보다 깔끔합니다

기본 매개변수는 종종 short circuiting 트릭(a || b 로 변수에 기본값을 입력하는 방식) 보다 깔끔합니다. 기본 매개변수는 매개변수가 `undefined` 일 때만 적용됩니다. `' '`, `""`, `false`, `null`, `0`, `NaN` 같은 `falsy` 한 값들은 기본 매개변수가 적용되지 않습니다.
```
  // bad example
  function createMicrobrewery(name) {
    const breweryName = name || 'Hipster Brew Co.';
    // ...
  }

  // good example
  function createMicrobrewery(name = 'Hipster Brew Co.') {
    // ...
  }
```

------------

## 함수 (function)

### 함수 인자는 2개 이하가 이상적입니다

매개변수의 개수를 제한하는 것은 함수 테스팅을 쉽게 만들어주기 때문에 중요합니다. 
만약 매개변수가 3개 이상일 경우엔 테스트 해야하는 경우의 수가 많아지고 각기 다른 인수들로 여러 사례들을 테스트 해야합니다.

1개나 2개의 인자를 가지고 있는 것이 가장 이상적인 케이스입니다. 그리고 3개의 인자는 가능한 피해야 합니다.
만약 그 이상이라면 통합되어야 합니다. 만약 여러분이 2개 이상의 인자를 가진 함수를 사용한다면 그 함수에게 너무 많은 역할을 하게 만든 것입니다. 그렇지 않은 경우라면 대부분의 경우 상위 객체는 1개의 인자만으로 충분합니다.

Javascript를 사용할 때 많은 보일러 플레이트 없이 바로 객체를 만들 수 있습니다. 그러므로 여러분이 만약 많은 인자들을 사용한다면 <strong>객체를 사용할 수 있습니다.</strong>

함수가 기대하는 속성을 좀 더 명확히 하기 위해서 ES6의 비구조화(destructing) 구문을 이용할 수 있고, 이 구문에는 몇가지 장점이 있습니다.

1. 어떤 사람이 그 함수의 시그니쳐 - 인자의 타입, 반환되는 값의 타입 등 을 볼 때 어떤 속성이 사용되는지 즉시 알 수 있습니다.
2. 또한 비구조화는 함수에 전달된 인수 객체의 지정된 기본타입 값을 복제하며 이는 사이드 이펙트가 일어나는 것을 방지 할 수 있습니다. 참고로 인수객체로부터 비구조화된 객체와 배열은 복제되지 않습니다.
3. Linter를 사용하면 사용하지 않는 인자에대해 경고해주거나 비구조화 없이 코드를 짤 수 없게 할 수 있습니다.

```
  // bad example
  function createMenu(title, body, buttonText, cancellable) {
    // ...
  }
  
  // good example
   function createMenu({ title, body, buttonText, cancellable }) {
    // ...
  }

  createMenu({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  });
```

### 함수는 하나의 행동만 해야 합니다

이것은 Software Engineering에서 가장 중요한 규칙입니다. 함수가 1개 이상의 행동을 한다면 작성하는 것도, 테스트 하는것도, 이해하는 것도 어려워집니다. 하나의 함수에 하나의 행동을 정의하는 것이 가능해진다면, 함수는 좀 더 고치기 쉬워지고 코드들은 읽기 쉬워질 것입니다. 많은 원칙들 중 이것만 알아간다 해도 여러분들은 많은 개발자들을 앞설 수 있습니다.
```
  // bad example
  function emailClients(clients) {
    clients.forEach(client => {
      const clientRecord = database.lookup(client);
      if (clientRecord.isActive()) {
        email(client);
      }
    });
  }

  // good example
  function emailClients(clients) {
    clients
      .filter(isClientActive)
      .forEach(email);
  }

  function isClientActive(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive();
  }
```


출처 : https://github.com/qkraudghgh/clean-code-javascript-ko#%EB%B3%80%EC%88%98variables
















