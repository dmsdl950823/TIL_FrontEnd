# 🚛 Ajax
AJAX란, JavaScript의 라이브러리중 하나이며 Asynchronous Javascript And Xml(비동기식 자바스크립트와 xml)의 약자이다. <br />
브라우저가 가지고있는 XMLHttpRequest 객체를 이용해서 전체 페이지를 새로 고치지 않고도 페이지의 일부만을 위한 데이터를 로드하는 기법 이며 JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술이다.
<br />
<strong> 즉, 쉽게 말하자면 자바스크립트를 통해서 서버에 데이터를 요청하는 것이다. </strong>

### 비동기 방식이란
비동기 방식은 웹페이지를 리로드하지 않고 데이터를 불러오는 방식이며 Ajax를 통해서 서버에 요청을 한 후 멈추어 있는 것이 아니라 그 프로그램은 계속 돌아간다는 의미를 내포히고 있음
<br />
페이지 리로드의 경우 전체 리소스를 다시 불러와야하므로, 이미지, 스크립트 , 기타 코드등을 모두 재요청할 경우 불필요한 리소스 낭비가 발생하게 되지만 비동기식 방식을 이용할 경우 필요한 부분만 불러와 사용할 수 있으므로 매우 큰 장점

### Ajax 를 사용하는 이유
단순하게 WEB화면에서 무언가 부르거나 데이터를 조회하고 싶을 경우, 페이지 전체를 새로고침하지 않기 위해 사용한다고 볼 수 있다.
<br />
AJAX는 자원낭비를 줄이고 HTML 페이지 전체가 아닌 일부분만 갱신할 수 있도록 XMLHttpRequest객체를 통해 서버에 request한다.<br />
이 경우, JSON이나 XML형태로 필요한 데이터만 받아 갱신하기 때문에 그만큼의 자원과 시간을 아낄 수 있다.

#### AJAX를 사용 가능하게 만드는 것들
* HTML
* DOM
* JavaScript
* XMLHttpRequest
* Etc

### 웹 서버 
AJAX는 웹 서버가 있어야만 동작하므로, 요청을 받고 응답을 보낼 서버가 준비되어야 한다.

#### Ajax의 진행 과정

1. XMLHttpRequest Object를 만든다.
> request를 보낼 준비를 브라우저에게 시키는 과정  - <br />
이것을 위해서 필요한 method를 갖춘 object가 필요함

2. callback 함수를 만든다.
> 서버에서 response가 왔을 때 실행시키는 함수 - <br />
HTML 페이지를 업데이트 함

3. Open a request
> 서버에서 response가 왔을 때 실행시키는 함수

4. HTML 페이지를 업데이트 함
> send the request

---------
# 사용 예시

1. XMLHttpRequest 사용시


2. Jquery 사용시
```
  $.ajax ({
      // URL은 필수 요소이므로 반드시 구현해야 하는 Property입니다.
      url	: "url",           // 요청이 전송될 URL 주소
      type	: "GET",         // http 요청 방식 (default: ‘GET’)
      async : true,          // 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
      cache : true,          // 캐시 여부
      timeout : 3000,        // 요청 제한 시간 안에 완료되지 않으면 요청을 취소하거나 error 콜백을 호출.(단위: ms)
      data  : {key : value}, // 요청 시 포함되어질 데이터
      processData : true,    // 데이터를 컨텐트 타입에 맞게 변환 여부
      contentType : "application/json", // 요청 컨텐트 타입 
      dataType    : "json",   // 응답 데이터 형식 (명시하지 않을 경우 자동으로 추측)
      beforeSend  : function () {
            // XHR Header를 포함해서 HTTP Request를 하기전에 호출됩니다.
      },
      success : function(data, status, xhr) {
            // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
            // 이 콜백 함수의 파라미터에서는 응답 바디, 응답 코드 그리고 XHR 헤더를 확인할 수 있습니다.
      },
      error	: function(xhr, status, error) {
            // 응답을 받지 못하였다거나 정상적인 응답이지만 데이터 형식을 확인할 수 없기 때문에 
            // error 콜백이 호출될 수 있습니다.
            // 예를 들어, dataType을 지정해서 응답 받을 데이터 형식을 지정하였지만,
            // 서버에서는 다른 데이터형식으로 응답하면  error 콜백이 호출되게 됩니다.
      },
      complete : function(xhr, status) {
            // success와 error 콜백이 호출된 후에 반드시 호출됩니다.
            // try - catch - finally의 finally 구문과 동일합니다.
      }
    });

```
