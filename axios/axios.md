# axios 사용법

### axios API

1. axios(config)


2. default
You can specify config defaults that will be applied to every request.


------------

#### ```GET```request 수행

```
  axios.get('/user?ID=12345')
    .then((res) => {
      console.log(res)
     }) ...
  
  // 위와 같은 구문
  axios.get('/user', {
    params: {
      ID: 12345
    })
    .then( ... )
```

#### ```POST```request 수행
```
  axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
```

### Instance methods

|메소드 종류|
|------|
|axios#request(config)|
|axios#get(url[, config])|
|axios#delete(url[, config])|
|axios#head(url[, config])|
|axios#options(url[, config])|
|axios#post(url[, data[, config]])|
|axios#put(url[, data[, config]])|
|axios#patch(url[, data[, config]])|
|axios#getUri([config])|

------------

## Global axios 기본값 설정
모든 요청에 적용될 기본 설정을 지정 할 수 있음 <br>
기본 url지정, 토큰을 header에 전달, 
```
  axios.defaults.baseURL = 'https://api.example.com';
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.create({ baseURL: 'https://api.example.com' });
  axios.defaults.timeout = 2500;
```

-----------------

## Interceptors
```then```, ```catch```하기 전, request나 responses 중에 끼어들 수 있음
```
axios.interceptors.request.use((config) => {
    // request가 보내지기 전에 무언가를 함
    return config;
  }, function (error) {
    // request 에러와 함께 무슨일을 함
    return Promise.reject(error);
  });
```

request/resp를 하면 interceptor를 한다고 함


## Cancellation
token을 취소함으로써 request를 취소할 수 있음
