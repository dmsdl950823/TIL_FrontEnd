- [axios 사용법 정리](#axios-사용법-정리)
  - [axios API](#axios-api)
      - [GET](#get)
      - [POST](#post)
  - [Instance methods](#instance-methods)
  - [Global axios 기본값 설정](#global-axios-기본값-설정)
  - [Interceptors](#interceptors)
  - [Cancellation](#cancellation)

# axios 사용법 정리

## axios API

1. axios(config)

2. default

You can specify config defaults that will be applied to every request.


#### GET

``` js
  axios.get('/user?ID=12345')
    .then((res) => {
      console.log(res)
     }) ...
  
  // 위와 같은 구문
  axios.get('/user', { params: { ID: 12345 } })
    .then( ... )
```

#### POST

``` js
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

## Instance methods

| methods 종류                       |
| ---------------------------------- |
| axios#request(config)              |
| axios#get(url[, config])           |
| axios#delete(url[, config])        |
| axios#head(url[, config])          |
| axios#options(url[, config])       |
| axios#post(url[, data[, config]])  |
| axios#put(url[, data[, config]])   |
| axios#patch(url[, data[, config]]) |
| axios#getUri([config])             |


## Global axios 기본값 설정

모든 요청에 적용될 기본 설정을 지정 할 수 있습니다.

* 기본 url지정, 토큰을 header에 전달

``` js
  axios.defaults.baseURL = 'https://api.example.com';
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.create({ baseURL: 'https://api.example.com' });
  axios.defaults.timeout = 2500;
```

## Interceptors

Interceptor 는 ```then```, ```catch```하기 전, `request`나 `responses` 중에 끼어들어 작업할 수 있습니다.

> `request`/`resp`를 하면 interceptor를 한다고 함

``` js
  axios.interceptors.request.use((config) => {
    // request가 보내지기 전에 무언가를 함
    return config;
  }, function (error) {
    // request 에러와 함께 무슨일을 함
    return Promise.reject(error);
  });
```


## Cancellation
token을 취소함으로써 request를 취소할 수 있음
