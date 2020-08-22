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




