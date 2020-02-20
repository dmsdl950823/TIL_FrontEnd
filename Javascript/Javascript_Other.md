# JS Other

### localStorage

* 데이터를 서버에 저장하지 않고, 브라우저에 저장하는것
* HTML5 부터 사용
* cookie는 4kb 최고 용량이지만 < localstorage는 2.5 ~ 5 mb 까지 가능하며, 서버로 전송하지는 않음.
* localStorage 의 storage 이름은 아무거나 사용 가능 (setItem, contactData.. 등)


```
    // Store 값 지정
    localStorage.setItem("lastname", "Smith");   
    // Retreive
    document.getElementById("result").innerHTML = localStorage.getItem("lastname");
```

* localStorage는 string밖에 저장하지 않는다.
  > JS 객체로 저장시에는 ```JSON.stringify()``` 이용 - String 형식 저장 필요<br />
 json 저장시에는 ```JSON.parse()```


```
    localStorage.clear()
    // 저장된 값 모두 삭제
```

