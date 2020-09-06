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

### 함수명은 함수가 무엇을 하는지 알 수 있어야 합니다.
```
  // bad example
  function AddToDate(date, month) {
    ...
  }
  const date = new Date();
  AddToDate(date, 1) // 뭘 추가하는지 이름만 보고 알 수 없습니다.
  
  // good example
  function AddMonthToDate(date, month) {
    // ...
  }
  const date = new Date();
  AddMonthToDate(date, 1);
```

### 함수는 단일 행동을 추상화 해야 합니다.
추상화된 이름이 여러 의미를 내포하고 있다면 그 함수는 너무 많은 일을 하게끔 설계된 것입니다. 함수들을 나누어서 재사용 가능하고 테스트하기 쉽게 만드세요.

### 중복된 코드를 작성하지 마세요
중복된 코드를 작성하지 않기 위해 최선을 다하세요. 중복된 코드가 있다는 것은 어떤 로직을 수정해야 할 일이 생겼을 때 수정해야할 코드가 한 곳이상이른 것을 뜻합니다.

만약 당신이 레스토랑을 운영하면서 토마토나 양파, 마늘, 고추같은 것들의 재고 관리를 해야한다고 생각해보세요. 재고가 적혀있는 종이가 여러장 있다면 토마토나 양파의 재고가 변동되었을 때 재고가 적혀있는 모든 종이를 수정해야합니다. 재고를 관리하는 종이가 한장이었다면 한 장의 재고 목록만 수정하면 됐겠죠.

종종 코드를 살펴보면 사소한 몇몇의 차이점 때문에 중복된 코드를 작성한 경우가 있고 이런 차이점들은 대부분 똑같은 일을 하는 분리된 함수들을 갖도록 강요합니다. 즉 중복코드를 제거한다는 것은 함수/모듈/클래스를 사용하여 이 여러가지 사소한 차이점을 처리 할 수 있는 추상화를 만드는 것을 의미합니다.

그리고 추상화 할 부분이 남아있는 것은 위험하기 때문에 '클래스' 섹션에 제시된 여러 원칙들을 따라야합니다. 잘 추상화 하지 못한 코드는 중복된 코드보다 나쁠 수 있으므로 조심하세요. 즉 추상화를 잘 할 수 있다면 그렇게 하라는 말입니다. 코드의 중복을 피한다면 여러분이 원할 때 언제든 한 곳만 수정해도 다른 모든 코드에 반영되게 할 수 있습니다.

### Object.assign 을 사용해 기본 객체를 만드세요.
```
  // bad example
  const menuConfig = {
    title: null,
    body: 'Bar',
    buttonText: null,
    cancellable: true
  }
  
  function createMenu (config) {
    config.title = config.title || 'Foo';
    config.body = config.body || 'Bar';
    config.buttonText = config.buttonText || 'Baz';
    config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
  }
  
  // good example
  const menuConfig = {
    title: 'Order',
    // 유저가 'body' key의 value를 정하지 않았습니다.
    buttonText: 'Send',
    cancellable: true
  }
  
  function createMenu(config) {
    config = Object.assign({
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellabel: true
    }, config);
  }
  // config는 이제 다음과 동일합니다: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true
  createMenu(menuConfig);
```

### 매개변수로 플래그를 사용하지 마세요
플래그를 사용하는 것 자체가 그 함수가 한가지 이상의 역할을 하고있다는 것을 뜻합니다. <strong>boolean 기반으로 함수가 실행되는 코드가 나뉜다면 함수를 분리</strong>하세요.

```
  // bad example
  function createFile(name, temp) {
    if (temp) {
      fs.create(`./temp/${name}`);
    } else {
      fs.create(name);
    }
  }
  
  // good example
  function createFile(name) {
    fs.create(name);
  }
  
  function createTempFile(name) {
    createFile(`./temp/${name}`);
  }
```

### 사이드 이펙트를 피하세요 1
함수는 값을 받아서 어떤 일을 하거나 값을 리턴할 때 사이드 이펙트를 만들어냅니다. 사이드 이펙트는 파일에 쓰여질 수 도 있고, 전역 변수를 수정할 수도 있으며, 실수로 모든 돈을 다른 사람에게 보낼 수도 있습니다.

때때로 프로그램에서 사이드 이펙트를 만들어야 할 때가 있습니다. 아까 들었던 예들 중 하나인 파일 작성을 할 때와 같이 말이죠. 이 때 여러분이 해야할 일은 파일 작성을 하는 한 개의 함수를 만드는 일입니다. 파일을 작성하는 함수나 클래스가 여러개 존재하면 안됩니다. 반드시 하나만 있어야 합니다.

즉, 어떠한 구조체도 없이 객체 사이의 상태를 공유하거나, 무엇이든 쓸 수 있는 변경 가능한 데이터 유형을 사용하거나, 같은 사이드 이펙트를 만들어내는 것을 여러개 만들거나 하면 안됩니다. 여러분들이 이러한 것들을 지키며 코드를 작성한다면 대부분의 다른 개발자들보다 행복할 수 있습니다.

```
  // bad example
  let name = 'Ryan McDermott`;
  
  function splitIntoFirstAndLastName() {
    name = name.split(' ');
  }
  
  splitIntoFirstAndLastName();
  console.log(name);  // ['Ryan', 'McDermott'];
  
  
  // good example
  function splitIntoFirstAndLastName(name) {
    return name.split(' ');
  }
  
  const name = 'Ryan McDermott';
  const newName = splitIntoFirstAndLastName(name);
  
  console.log(name);    // Ryan McDermott'
  console.log(newName); // ['Ryan', McDermott]
```

### 사이드 이펙트를 피하세요 2
자바스크립트에서는 기본타입 자료형은 값을 전달하고 객체와 배열은 참조를 전달합니다. 객체와 배열인 경우를 봅시다. 우리가 만든 함수는 장바구니 배열에 변화를 주며 이 변화는 구매 목록에 어떤 상품을 추가하는 기능 같은 것을 말합니다. 만약 `장바구니` 배열을 사용하는 어느 다른 함수가 있다면 이러한 추가에 영향을 받습니다. 이것은 좋을 수도있지만, 안좋을 수도 있습니다. 안좋은 예를 한번 살펴봅시다.

유저가 구매하기 버튼을 눌러 구매 함수를 호출합니다. 이는 네트워크 요청을 생성하고 서버에 장바구니 배열을 보냅니다. 하지만 네트워크 연결이 좋지않아서 구매 함수는 다시한번 네트워크 요청을 보내야 하는 상황이 생겼습니다. 이때, 사용자가 네트워크 요청이 시작되기 전에 실수로 원하지 않는 상품의 "장바구니에 추가" 버튼을 실수로 클릭하면 어떻게될까요? 실수가 있고난 뒤, 네트워크 요청이 시작되면 장바구니에 추가 함수 때문에 실수로 변경된 장바구니 배열을 서버에 보내게 됩니다.

가장 좋은 방법은 장바구니에 추가는 항상 장바구니 배열을 <strong>복제</strong>하여 수정하고 제본을 반환하는 것입니다. 이렇게하면 장바구니 참조를 보유하고있는 다른 함수가 다른 변경 사항의 영향을 받지 않게됩니다.

이 접근법에대해 말하고 싶은 것이 두가지 있습니다.

1. 실제로 입력된 객체를 수정하고 싶은 경우가 있을 수 있지만 이러한 예제를 생각해보고 적용해보면 그런 경우는 거의 없다는 것을 깨달을 수 있습니다. 그리고 대부분의 것들이 사이드 이펙트 없이 리팩토링 될 수 있습니다.

2. 큰 객체를 복제하는 것은 성능 측면에서 값이 매우 비쌉니다. 운좋게도 이런게 큰 문제가 되지는 않습니다. 왜냐하면 이러한 프로그래밍 접근법을 가능하게해줄 좋은 라이브러리가 있기 때문입니다. 이는 객체와 배열을 수동으로 복제하는 것처럼 메모리 집약적이지 않게 해주고 빠르게 복제해줍니다.

```
  // bad example
  const addItemToCart = (cart, item) => {
    cart.push({ item, date: Date.now() });
  }
  
  // good example
  const addItemToCart = (cart, item) => {
    return [...cart, { item, date: Date.now() }] 
  }
```

### 전역 함수를 사용하지 마세요.
전역 환경을 사용하는 것은 JS 에서 나쁜 관행입니다. 왜냐하면 다른 라이브러리들과 충돌이 일어날 수 있고, 당신의 API를 쓰는 유저들은 운영환경에서 예외가 발생하기 전까지는 문제를 인지하지 못할 것이기 때문입니다. 

JS의 Native Array 메소드를 확장하여 두 배열간의 차이를 보여줄 수 있는 `diff` 메소드를 이용하려면 어떻게 해야할까요? 새로운 함수를 `Array.prototype`에 사용할 수도 있지만, 똑같은 일을 시도한 다른 라이브러리와 충돌할 수도 있습니다. 다른 라이브러리가 `diff` 메소드를 사용하여 첫번째 요소와 마지막 요소의 차이점을 찾으면 어떻게 될까요? 이것이 그냥 ES2015/ES6 classes를 사용해서 `Array`를 상속해버리는 것이 훨씬 더 나은 이유입니다.

```
  // bad example
  Array.prototype.diff = function diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  }
  
  // good example
  class SuperArray extends Array {
    diff (comparisonArray) {
      const hash = new Set(comparisonArray);
      return this.filter(elem => !hash.has(elem);
    }
  }
```

### 명령형 프로그래밍보다 함수형 프로그래밍을 지향하세요.
JS는 Hackell 처럼 함수형 프로그래밍 언어는 아니지만 함수형 프로그래밍처럼 작성할 수 있습니다. 함수형 언어는 더 깔끔하고 테스트하기 쉽습니다. 가능하면 이 방식을 사용하도록 해보세요.
```
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

// bad example
let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}

// good example
const totalOutput = programmerOutput
  .map(programmer => programmer.linesOfCode)
  .reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE);
```

### 조건문을 캡슐화 하세요.
```
  // bad example
  if (fsm.state === 'fetching' && isEmpty(listNode)) {
    // ...
  }
  
  // good example
  function shouldShowSpinner(fsm, listNode) {
    return fsm.state === 'fetching' && isEmpty(listNode);
  }
  if (shoudShowSpinner(fsmInstance, listNodeInstance)) {
    // ...
  }
```

### 부정 조건문을 사용하지 마세요.
```
  // bad example
  function isDOMNodeNotPresent (node) {
    // ...
  }
  
  if (!isDOMNodeNotPresent(node)) {
    // ...
  }
  
  // good example
  function isDOMNodePresent(node) {
    // ...
  }

  if (isDOMNodePresent(node)) {
    // ...
  }
```

### 조건문 작성을 피하세요.
조건문 작성을 피하라는 것은 매우 불가능한 일로 보입니다. 그러나 다형성을 이용하면 동일한 작업을 수행할 수 있습니다. 함수는 단 하나의 일만 수행하여야 합니다. 당신이 함수나 클래스에 if 문을 쓴다면 그것은 그 함수나 클래스가 한가지 이상의 일을 수행하고 있다고 말하는 것과 같습니다.

```
  // bad example
  class Airplane {
    // ...
    getCruisingAltitude() {
      switch (this.type) {
        case '777':
          return this.getMaxAltitude() - this.getPassengerCount();
        case 'Air Force One':
          return this.getMaxAltitude();
        case 'Cessna':
          return this.getMaxAltitude() - this.getFuelExpenditure();
      }
    }
  }
  
  // good example
  class Airplane {
    // ...
  }

  class Boeing777 extends Airplane {
    // ...
    getCruisingAltitude() {
      return this.getMaxAltitude() - this.getPassengerCount();
    }
  }

  class AirForceOne extends Airplane {
    // ...
    getCruisingAltitude() {
      return this.getMaxAltitude();
    }
  }

  class Cessna extends Airplane {
    // ...
    getCruisingAltitude() {
      return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
```

### 타입 - 체킹을 피하세요 1
JavaScript는 타입이 정해져있지 않습니다. 이는 당신의 함수가 어떤 타입의 인자든 받을 수 있다는 것을 의미합니다. 이런 JavaScript의 자유로움 때문에 여러 버그가 발생했었고 이 때문에 당신의 함수에 타입-체킹을 시도 할 수도 있습니다. 하지만 타입-체킹 말고도 이러한 화를 피할 많은 방법들이 존재합니다. 첫번째 방법은 일관성 있는 API를 사용하는 것입니다.

```
  // bad example
  function travelToTexas(vehicle) {
    if (vehicle instanceof Bicycle) {
      vehicle.pedal(this.currentLocation, new Location('texas'));
    } else if (vehicle instanceof Car) {
      vehicle.drive(this.currentLocation, new Location('texas'));
    }
  }
  
  // good example
  function travelToTexas(vehicle) {
    vehicle.move(this.currentLocation, new Location('texas'));
  }
```

### 타입 - 체킹을 피하세요 2
당신이 문자열, 정수, 배열등 기본 자료형을 사용하고 다형성을 사용할 수 없을 때 여전히 타입-체킹이 필요하다고 느껴진다면 TypeScript를 도입하는 것을 고려해보는 것이 좋습니다. TypeScript는 표준 JavaScript 구문에 정적 타입을 제공하므로 일반 JavaScript의 대안으로 사용하기에 좋습니다. JavaScript에서 타입-체킹을 할 때 문제점은 가짜 type-safety 를 얻기위해 작성된 코드를 설명하기 위해서 많은 주석을 달아야한다는 점입니다. JavaScript로 코드를 작성할땐 깔끔하게 코드를 작성하고, 좋은 테스트 코드를 짜야하며 좋은 코드 리뷰를 해야합니다. 그러기 싫다면 그냥 TypeScript(이건 제가 말했듯이, 좋은 대체재입니다!)를 쓰세요.

```
  // bad example
  function combine(val1, val2) {
    if (typeof val1 === 'number' && typeof val2 === 'number' ||
        typeof val1 === 'string' && typeof val2 === 'string') {
      return val1 + val2;
    }

    throw new Error('Must be of type String or Number');
  }
  
  // good example
   function combine(val1, val2) {
    return val1 + val2;
  }
```

### 과도한 최적화를 지양하세요

최신 브라우저들은 런타임에 많은 최적화 작업을 수행합니다. 대부분 당신이 코드를 최적화 하는 것은 시간낭비일 가능성이 많습니다. 최적화가 부족한 곳이 어딘지를 알려주는 좋은 자료가 여기 있습니다. 이것을 참조하여 최신 브라우저들이 최적화 해주지 않는 부분만 최적화를 해주는 것이 좋습니다.

- 좋은 자료 :: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

### 죽은 코드를 지우세요.
죽은 코드(사용하지 않는 코드 )는 중복된 코드 만큼이나 좋지 않습니다. 죽은 코드는 당신의 코드에 남아있을 어떠한 이유도 없습니다. 호출되지 않는 코드가 있다면 그 코드는 지우세요! 그 코드가 여전히 필요해도 그 코드는 버전 히스토리에 안전하게 남아있을 것입니다.


## 객체와 자료 구조 (Objects and Data Structures);

### getter와 setter를 사용하세요.
JS는 인터페이스와 타입을 가지고 있지 않고 이러한 패턴을 적용하기가 힘듭니다. 왜냐하면 `public`이나 `private` 같은 키워드가 없기 때문이죠. 그렇기 때문에 getter 및 setter를 사용하여 객체의 데이터에 접근하는 것이 객체의 속성을 찾는 것보다 훨씬 낫습니다. 
* 객체의 속성을 얻는 것 이상의 많은 것을 하고싶을 때, 코드에서 모든 접근자를 찾아 바꾸고 할 필요가 없습니다.
* `set` 할때 검증 로직을 추가하는 것이 코드를 더 간단하게 만듭니다.
* 내부용 API를 캡슐화 할 수 있습니다.
* 서버에서 객체 속성을 받아올 때 lazy load 할 수 있습니다.

```
  // bad example
  function makeBankAccount () {
    // ...
    return {
      // .. 
      balance: 0
    }
  }
  const account = makeBankAccount();
  account.balance = 100;
  
  // good example
  function makeBankAccount() {
    // private으로 선언된 변수
    let balance = 0;

    // 아래 return을 통해 public으로 선언된 "getter"
    function getBalance() {
      return balance;
    }

    // 아래 return을 통해 public으로 선언된 "setter"
    function setBalance(amount) {
      // ... balance를 업데이트하기 전 검증로직
      balance = amount;
    }

    return {
      // ...
      getBalance,
      setBalance
    };
  }

  const account = makeBankAccount();
  account.setBalance(100);
```

### 객체에 비공개 멤버를 만드세요
클로져를 이용하면 가능합니다.
```
  // bad example
  const Employee = function (name) {
    this.name = name;
  }
  
  Employee.prototye.getName = fuction getName() {
    return this.name;
  }
  
  const employee = new Employee('John Doe');
  console.log(`Employee name: ${employee.getName()}`); // 'John Doe'
  delete employee.name;
  console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined
  
  // good example
  function makeEmployee(name) {
    return {
      getName () {
        return name;
      }
    }
  }
  
  const employee = makeEmployee('John Doe');
  console.log(`Employee name: ${employee.getName()}`) // 'John Doe'
  delete employee.name;
  console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
```

------------------------------------

## 클래스 Class

### ES5의 함수보다 ES2015/ES6의 클래스를 사용하세요.
기존 ES5의 클래스에서 이해하기 쉬운 상속, 구성 및 메소드 정의를 하는 건 매우 어렵습니다. 매번 그런것은 아니지만 상속이 필요한 경우라면 클래스를 사용하는 것이 좋습니다. 하지만 크고 복잡한 객체가 필요한 것이 아니라면 클래스보다 작은 함수를 사용하세요.

### 메소드 체이닝을 사용하세요
JS에서 메소드 체이닝은 매우 유용한 패턴이며 jQuery나 Lodash같은 많은 라이브러리에서 이 패턴을 찾아볼 수 있습니다. 이는 코드를 간결하고 이해하기 쉽게 만들어줍니다. 이런 이유들로 메소드 체이닝을 쓰는 것을 권하고, 사용해 본 뒤 얼마나 코드가 깔끔해졌는지 꼭 확인해 보길 바랍니다. 클래스 함수에서 단순히 모든 함수에 `this`를 리턴해주는것으로 메소드를 추가로 연결 할 수 있습니다.

```
  // good example
  class Car {
  constructor() {
    this.make = 'Honda';
    this.model = 'Accord';
    this.color = 'white';
  }

  setMake(make) {
    this.make = make;
    // 메모: 체이닝을 위해 this를 리턴합니다.
    return this;
  }

  setModel(model) {
    this.model = model;
    // 메모: 체이닝을 위해 this를 리턴합니다.
    return this;
  }

  setColor(color) {
    this.color = color;
    // 메모: 체이닝을 위해 this를 리턴합니다.
    return this;
  }

  save() {
    console.log(this.make, this.model, this.color);
    // 메모: 체이닝을 위해 this를 리턴합니다.
    return this;
  }
}

const car = new Car()
  .setColor('pink')
  .setMake('Ford')
  .setModel('F-150')
  .save();
```

### 상속보단 조합(composition)을 사용하세요.

상속을 사용했을 때 얻을 수 있는 이득보다 조합을 사용했을 때 얻을 수 있는 이득이 많기 때문입니다. 이 원칙의 요점은 당신이 계속 상속을 사용해서 코드를 사용작성하고자 할 때, 만약 조합을 이용하면 더 코드를 잘 짤 수있지 않을 까 생각해보라는 것에 있습니다.

"그럼 대체 상속을 언제 사용해야하는 건가요?" 라고 물어본다면, 문제 상황에 따라 달려있습니다.

1. 상속관계가 "has-a" 관계가 아니라 "is-a" 관계일 때 (사람 -> 동물 / 유저 -> 유저 정보)
2. 기반 클래스의 코드를 다시 사용할 수 있을 때 (인간은 모든 동물처럼 움직일 수 있습니다.)
3. 기반 클래스를 수정하여 파생된 클래스 모두를 수정하고 싶을 때 (이동시 모든 동물이 소비하는 칼로리를 변경하고 싶을 때)

```
  // bad example
  class Employee {
    constructor (name, email) {
      this.name = name;
      this.email = email;
    }
  }
  
  // 이 코드가 안좋은 이유는 Employees가 tax data를 가지고 있기 때문입니다.
  // EmployeeTaxData는 Employee 타입이 아닙니다.
  class EmployeeTaxData extends Employee {
    constructor (ssn, salary) {
      super();
      this.ssn = ssn;
      this.salary = salary;
    }
  }
  
  // good employee
  class EmployeeTaxData {
    constructor (ssn, salary) {
      this.ssn = ssn;
      this.salary = salary;
    }
  }
  
  class Employee {
    constructor (name, email) {
      this.name = name;
      this.email = email;
    }
    
    setTaxData (ssn, salary) {
      this.taxData = new EmployeeTaxData(ssn, salary);
    }
  }
```

## SOLID

### 단일 책임 원칙(Single Resonsibility Principle, SRP)

Clean Code 에서는 "클래스를 수정할 때는 수정해야하는 이유가 2개 이상 있으면 안됩니다." 이것은 하나의 클래스에 많은 기능을 쑤셔넣는 것이나 다름 없습니다. 비행기를 탈 때 가방을 한개만 가지고 탈 수 있을 때 처럼말이죠. 이 문제는 당신의 클래스가 개념적으로 응집되어있지 않다는 것이고, 클래스를 바꿔야할 많은 이유가 됩니다. 클래스를 수정하는데 들이는 시간을 줄이는 것은 중요합니다. 왜냐면 하나의 클래스에 너무 많은 기능들이있고 당신이 이 작은 기능들을 수정할 때 이 코드가 다른 모듈들에 어떠한 영향을 끼치는지 이해하기 어려울 수 있습니다.

```
  // bad example
  class UserSettings {
    constructor () {
      this.user = user;
    }
    
    changeSettings(settings) {
      if (this.verifyCredentials()) {
        // ...
      }
    }
    
    verifyCredentials() {
      // ...
    }
  }

  // good example
  class UserAuth {
    constructor (user) {
      this.user = user;
    }
    
    verifyCredentials() {
      // ...
    }
  }
  
  class UserSettings {
    constructor (user) {
      this.user = user;
      this.auth = new UserAuth(user);
    }
    
    changeSettings (settings) {
      if (this.auth.verifyCredentials()) {
        // ...
      }
    }
  }
```

### 개방 / 폐쇄 원칙 (Open/Closed Principle, OCP)

"소프트웨어 개체(클래스, 모듈, 함수 등) 는 확장을 위해 개방적이어야 하며 수정시엔 폐쇄적이어야 합니다." - 이 원리는 기본적으로 사용자가 `.js` 소스 코드파일을 열어 수동으로 조작하지 않고 모듈의 기능을 확장하도록 허용해야 한다고 말합니다.

```
  // bad example
  class AjaxAdapter expends Adapter {
    constructor () {
      super();
      this.name = 'ajaxAdaptor';
    }
  }
  
  class NodeAdaptor extends Adaptor {
    constructor () {
      super();
      this.name = 'nodeAdaptor';
    }
  }
  
  class HttpRequester {
    constructor(adapter) {
      this.adapter = adapter
    }
    
    fetch(url) {
      if (this.adapter.name === 'ajaxAdaptor') {
        return makAjaxCall(url).then((response) => {
          // transform response and return
        });
      } else if (this.adapter.name === 'httpNodeAdapter') {
        return makeHttpCall(url).then((response) => {
          // transform response and return
        });
      }
    }
  }
  
  function makeAjaxCall(url) { ... }
  function makeHttpCall(url) { ... }
  
  // good example\
  class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }

  request(url) {
    // request and return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }

  request(url) {
    // request and return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // transform response and return
    });
  }
}
```

### 리스코프 치환 원칙 (Liskov Substitution principle, LSP)

리스코프 원칙이란 자료형 S가 자료형 T의 하위형이라면, 프로그램이 갖추어야 할 속성들 (정확성, 수행되는 작업 등) 의 변경사항 없이, 자료형 T의 객체를 자료형 S의 객체로 교치(치환) 할 수 있어야 한다는 원칙입니다.

이 원칙을 예로들면, 당신이 부모 클래스와 자식 클래스를 가지고 있을 때 베이스 클래스와 하위 클래스를 잘못된 결과 없이 서로 교환하여 사용할 수 있습니다.  ...?? 이해가 잘 안됨


### 인터페이스 분리 원칙 (Interface Segregation Principle, ISP)

Javascript는 인터페이스가 없기 때문에 다른 원칙들 처럼 딱 맞게 적용할 수는 없습니다. 그러나, Javascript에 타입 시스템이 없다 하더라도 중요하고 관계있는 원칙입니다.

ISP에 의하면 "클라이언트는 사용하지 않는 인터페이스에 의존하도록 강요 받으면 안됩니다." 덕 타이핑 때문에 인터페이스는 Javascript에서는 암시적인 계약일 뿐입니다.

Javascript에서 이것을 보여주는 가장 좋은 예는 방대한 양의 설정 객체가 필요한 클래스입니다. 클라이언트가 방대한 양의 옵션을 설정하지 않는 것이 좋습니다. 왜냐하면 대부분의 경우 설정들이 전부 다 필요한 것은 아니기 때문입니다. 설정을 선택적으로 할 수 있다면 "무거운 인터페이스(fat interface)"를 만드는 것을 방지할 수 있습니다.

### 의존성 역전 원칙 (Dependency Inversion Principle, DIP)

이 원칙은 두가지 중요한 요소를 가지고 있습니다.

1. 상위 모듈은 하위 모듈에 종속되어서는 안됩니다. 둘 다 추상화에 의존해야 합니다.
2. 추상화는 세부사항에 의존하지 않습니다. 세부사항은 추상화에 의해 달라져야합니다.

처음에는 이것을 이해하는데 어려울 수 있습니다. 하지만 만약 Angular.js로 작업을 해본적이 있다면 의존성 주입(Dependency Injection) 형태로 이 원리를 구현한 것을 보았을 것입니다. DIP는 동일한 개념은 아니지만 상위 모듈이 하위 모듈의 세부사항을 알지 못하게 합니다. 이는 의존성 주입을 통해 달성할 수 있습니다. DI의 장점은 모듈간의 의존성을 감소시키는 데에 있습니다. 모듈간의 의존성이 높을 수록 코드를 리팩토링하는데 어려워지고 이것은 매우 나쁜 개발 패턴중 하나입니다.

앞 에서 설명한 것 처럼 JS에는 인터페이스가 없으므로 추상화에 의존하는 것은 암시적인 약속입니다. 이 말인 즉슨, 다른 객체느 클래스에 노출되는 메소드와 속성이 바로 암시적인 약속(추상화)가 된다는 것이죠. 


-------------------------------------

## 테스트 (Testing)

테스트는 배포하는 것 보다 중요합니다. 테스트 없이 배포한다는 것은 당신이 짜놓은 코드가 언제든 오작동해도 이상하지 않다는 얘기와 같습니다. 테스트에 얼마나 시간을 투자할지는 당신이 함께 일하는 팀에 달려있지만 Coverage가 100%라는 것은 개발자들에게 높은 자신감과 안도감을 줍니다. 이 말은 훌륭한 테스트 도구를 보유해야하는 것 뿐만 아니라 훌륭한 Coverage 도구를 사용해야한다는 것을 의미합니다.

테스트코드를 작성하지 않는다는 것은 그 무엇도 변명이 될 수 없습니다. 매우 훌륭하고 많은 Javascript테스트 프레임워크들이 있습니다. 당신의 팀의 기호에 맞는 프레임 워크를 고르기만하면 됩니다. 테스트 프레임워크를 골랐다면 이제부터는 팀의 목표를 모든 새로운 기능 / 모듈을 짤 때 테스트 코드를 작성하는 것으로 하세요. 만약 테스트 주도 개발 방법론(Test Driven Development, TDD)이 당신에게 맞는 방법이라면 그건 훌륭한 개발 방법이 될 수 있습니다. 그러나 중요한 것은 당신이 어떠한 기능을 개발하거나 코드를 리팩토링 할 때 당신이 정한 Coverage 목표를 달성하는데 있습니다.

```
  // bad example
  const assert = require('assert');
  
  describe('MakeMomentJSGreatAgain), () => {
    it ('handles date boundaries', () => {
      let date;
      
      date = new MakeMomentJSGreatAgain('1/1/2015');
      date.addDays(30);
      assert.equal(`1/31/2015', date);
      
      date = new MakeMomentJSGreatAgain('1/1/2016);
      date.addDays(28);
      assert.equal(`2/29/2016', date);
      
      date = new MakeMomentJSGreatAgain('1/1/2015');
      date.addDays(28);
      assert.equal(`3/1/2015', date);
    });)
  })
  
  // good example
  const assert = require('assert');
  
  describe('MakeMomentJSGreatAgain), () => {
    it ('handles 30-dday months', () => {
      const date = new MakeMomentJSGreatAgain('1/1/2015');
      date.addDays(30);
      assert.equal(`1/31/2015', date);
    });
      
    it ('handles leap year', () => {
      const date = new MakeMomentJSGreatAgain('1/1/2016);
      date.addDays(28);
      assert.equal(`2/29/2016', date);
    });
      
    it ('handles non-leap year', () => {
      const date = new MakeMomentJSGreatAgain('1/1/2015');
      date.addDays(28);
      assert.equal(`3/1/2015', date);
    });
    )
  })

```

-----------------------------

## 동시성(Concurrency)

### callback 대신 Promise를 사용하세요.

callback은 깔끔하지 않습니다. 그리고 엄청나게 많은 중괄호 중첩을 만들어냅니다. ES2015/ES6에서는 Promise가 내장되어있습니다. 사용하세요!

```
  // bad example
  require('request').get('https//...', (requestErr, response) => {
    if (requestErr) {
      console.error(requestErr);
    } else {
      require('fs').wrhiteFile('article.html', response.body, (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
        } else {
          console.log('File written');
        }
      })
    }
  })
  
  // good example
  require('request-promise').get('https:// ... ')
    .then((response) => {
      return require('fs-promise').writeFile('article.html', response);
    })
    .then(() => {
      console.log('File written')
    })
    .catch((err) => {
      console.error(err)
    })
```

### Async/Await는 Promise 보다 더 깔끔합니다.
Promise도 Callback에 비해 정말 깔끔하지만 ES2017/ES8 에선 async / await가 있습니다. 이들은 callback에 대한 더욱 깔끔한 해결책을 줍니다 오직 필요한 것은 함수 앞에 async를 붙이는 것 뿐입니다. 그러면 함수를 논리적으로 연결하기 위해 더이상 `then`을 쓰지 않아도 됩니다. ES2017/ES8을 사용할 수 있다면 사용하세요

```
  // bad example
  require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then(response => {
    return require('fs-promise').writeFile('article.html', response);
  })
  .then(() => {
    console.log('File written');
  })
  .catch(err => {
    console.error(err);
  })
  
  // good example
  async function getCleanCodeArticle() {
    try {
      const response = await require('requestpromise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
      await require('fs-promise').writeFile('article.html', response);
      console.log('File written');
    } catch (err) {
      console.error(err);
    }
  }
```

## 에러 처리 (Error Handling)
에러를 뱉는다는 것은 좋은 것입니다! 즉, 프로그램에서 무언가가 잘못되었을 때 런타임에서 성공적으로 확인되면 현재 스택에서 함수 실행을 중단하고 (노드에서) 프로세스를 종료하고 스택 추적으로 콘솔에서 사용자에게 그 이유를 알려줍니다.

### 단순히 에러를 확인만 하지 마세요.

단순히 에러를 확인하는 것만으로 그 에러가 해결되거나 대응 할 수 있게 되는 것은 아닙니다. console.log를 통해 콘솔에 로그를 기록하는 것은 에러 로그를 잃어버리기 쉽기 때문에 좋은 방법이 아닙니다. 만약에 try/catch로 어떤 코드를 감쌌다면 그건 당신이 그 코드에 어떤 에러가 날지도 모르기 때문에 감싼 것이므로 그에대한 계획이 있거나 어떠한 장치를 해야합니다.

```
  // bad example
  try {
    functionThatMightThrow();
  } catch (err) {
    console.log(err);
  }
  
  // good example
  try {
    functionTantMightThrow();
  } catch (error) {
    // 1. console.error() 를 이용 하여 에러 로그라는 것을 보여줍니다.
    console.error(error);
    // 2. 유저에게 알리는 방법입니다.
    notifyUserIfError(error);
    // ...
  }
```

### Promise가 실패된 것을 무시하지 마세요.
```
  // good example
  getData()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    // 1. console.error() 를 이용 하여 에러 로그라는 것을 보여줍니다.
    console.error(error);
    // 2. 유저에게 알리는 방법입니다.
    notifyUserIfError(error);
    // ...
  })
```

### 포맷팅(Formatting)

포맷팅은 주관적입니다. 

출처 : https://github.com/qkraudghgh/clean-code-javascript-ko#%EB%B3%80%EC%88%98variables




















