# XSS 공격 및 CORS - 해결방법

- [XSS 공격 및 CORS - 해결방법](#xss-공격-및-cors---해결방법)
  - [Cross Site scripting (XSS)](#cross-site-scripting-xss)
    - [XSS 의 위험성](#xss-의-위험성)
    - [XSS 동작 방식](#xss-동작-방식)
    - [XSS 공격을 막는 방법](#xss-공격을-막는-방법)
      - [1. HTTPS 연결 사용](#1-https-연결-사용)
      - [2. Content Security Policy (CSP) 실행](#2-content-security-policy-csp-실행)
      - [3. `innerHTML` 대신 `textContent` 사용](#3-innerhtml-대신-textcontent-사용)
      - [4. modern framework 사용](#4-modern-framework-사용)
  - [Cross Origin Resource Sharing (CORS)](#cross-origin-resource-sharing-cors)
    - [CORS 를 사용하는 경우](#cors-를-사용하는-경우)
    - [CORS 해결하기 (회피하기)](#cors-해결하기-회피하기)
      - [1. 서버, 클라이언트가 같은 도메인과 포트를 사용](#1-서버-클라이언트가-같은-도메인과-포트를-사용)
      - [2. cross-origin HTTP 요청 허가](#2-cross-origin-http-요청-허가)
      - [3. Jason with Padding (JSONP)](#3-jason-with-padding-jsonp)
      - [4. 기타](#4-기타)
- [결론](#결론)

참고자료 : [dev.to](https://dev.to/pragyes31/how-to-secure-your-website-against-cookies-theft-and-cross-site-scripting-1644), [velog.io@wlsdud2194](https://velog.io/@wlsdud2194/cors), [vvshinevv.tistory](https://vvshinevv.tistory.com/60)

개발자에게 있어서 사용자를 온라인 사기들로부터 지키는것이 중요해졌습니다. 하나의 보안 문제는 여러분의 웹사이트의 브랜드와 명성에 영향을 끼칠 수도 있기 때문입니다.

이 포스팅에서는 *CORS* 와 *Cross Site Scripting* (XSS) 에 대해서 배우고, 어떻게 이 공격들에 대항해서 보안을 유지할 것인지 알아봅니다.


## Cross Site scripting (XSS)

*Cross Site scripting* (XSS) 는 컴퓨터의 쿠키를 탈취할 수 있는 가장 일반적인 방법이며, 해커가 사용자의 브라우저에 악성 코드를 심을수 있는 웹 보안 취약성 입니다.

> **[동일 출처 정책 Same Origin Policy (SOP)](https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy)**
> 
> 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용하는 것(각각 다른 출처에서 가져온 리로스들을 함께 사용하는 것)을 제한하는 중요한 보안 방식입니다.
> 잠재적인 악성 문서를 분리하여, 공격 경로를 줄여줍니다.

**사용자가 input 영역을 작성할 때 악성코드를 주입하여 동일 출처 정책(Same Origin Policy) 을 우회**합니다. 일단 코드가 서버로 침투한후, 사용자에 의해 요청(request)된다면, 브라우저는 이 악성코드가 믿을 수 있는 웹 서버에서 들어오는것으로 간주합니다.

<small>웹 앱 보안을 담당하고있는 비영리 단체 - Open Web Appication Securty Project (OWASP) 에 따르면, XSS 는 인터넷에서 가장 심각한 공격 중 top 10 에 들어간다고 합니다..!</small>


### XSS 의 위험성

> **Cookie 🍪**
> 
> 사용자의 활동을 저장하는데 사용됩니다. 가장 자주 사용되는 경우는,
> 
> * 광고를 표시하기위해서 브라우저 방문 히스토리를 추적하는 데 사용합니다.
> * 로그인 검증을 유지하기 위해서 사용합니다.
> * e-commerce 사이트에서 장바구니에 담겨있는 물품들을 저장하는데 사용합니다.
> * 특별한 웹사이트 방문을 확인할 때 사용됩니다.

----

1. **쿠키 정보 및 세션 ID 탈취**
  > 만약 *세션 ID* 등을 쿠키에 포함하는 경우, XSS 공격을 통해서 페이지 사용자의 세션 ID를 획득해, 불법적으로 정상 사용자인 척 가장할 수 있습니다.

2. **시스템 관리자 권한 획득**
  > XSS 취약점이 있는 웹 서버에 다양한 악성 데이터를 포함시킨 후, 사용자의 브라우저가 악성 데이터를 실행하게 할 수도 있습니다.
  > 
  > 만약 회사 등 조직의 개인 PC가 해킹될 경우, 조직 내부로 악성코드가 이동해 내부의 중요 정보가 탈취될 수 있겠죠.
    
3. **악성코드 다운로드**
  > XSS 공격은 악성 스크립트 자체로 악성 프로그램을 다운로드 할 수는 없습니다.
  > 
  > 그러나 사용자가 악성 스크립트가 있는 URL을 클릭하도록 해 프로그램을 다운받는 사이트로 리다이렉트 하거나 트로이목마 프로그램을 다운로드 하도록 유도할 수도 있습니다.
    
4. **거짓 페이지 노출**
  > XSS 공격에 취약할 경우, `<script>` `<img>` 등 과 같은 태그를 사용해 페이지와는 전혀 상관 없는 페이지를 표시할 수 있습니다. 이를 통해 개인정보 유출 등의 위험도 있습니다.

### XSS 동작 방식

XSS 를 이해하기 위해 어떻게 동작하는지 확인해보겠습니다.

사용자가 특정 웹에서 리뷰를 남기고싶다고 가정합니다. 공격은 아래 과정처럼 진행됩니다.

``` html
    Pizza is <script>alert('you are hacked!')</script> delicious
```
1. 해커는 이런식으로 악성코드를 input text 영역에 살짝 끼워넣습니다.

``` js
    let latestReviews = document.getElementById('latest-review')
    latestReview.innerHTML = 'Pizza is <script>alert("you are hacked!")</script> delicious'
```
2. 서버는 이것이 단순한 리뷰라고 가정하고, database 에 저장하고 request 에 따라 수행합니다.
3. 또다른 사용자가 리뷰 페이지를 요청할 때, 웹 서버는 악성코드가 심어져있는 모든 리뷰들을 전송합니다. 이것은 `script` 태그 내부에 들어있는 코드를 작동시킬 것 입니다.
4. 코드가 활성화 되면, `script` 태그 내부를 기반으로 로그인 정보 쿠키를 탈취해갑니다.

일단 해커가 쿠키를 탈취해 가면, 이 쿠키들로 브라우저에서 로그인하여 사용자인척 나쁜 활동을 수행할 수 있습니다.


* HTML5 는 `innerHTML` 을 이용하여 입력된 `<script>` 태그를 허가하지 않습니다. 그러나 해커들은 우회하는 방법을 찾아냈는데, `innerHTML` 은 아래처럼 코드를 허가해주어, 데이터를 해킹할 수 있게 되었습니다.

  > ``` html
  >  <img src="wrongLocation.jpg" onError="alert('You're hacked!')" />
  > ```

### XSS 공격을 막는 방법

#### 1. HTTPS 연결 사용

사용자가 웹사이트를 열 때, 웹 연결은 [*사용자의 브라우저* - *웹 서버*] 사이에 연결이 생성됩니다. 연결이 열려있는 한 데이터는 계속적으로 서버와 연결됩니다.

> **패킷 스니핑** Packet Sniffing
> 
> Sniffing(냄새를 맡다) 은 네트워크 상에 지나다니는 패킷틀을 캡처하여 그 안에 있는 내용을 들여다보는 기술을 의미합니다. 이런 스니핑을 도와주는 도구는 스니퍼(sniffer) 라고 합니다.
> 
> [출처 - 스니핑 공격](https://m.blog.naver.com/PostView.nhn?blogId=wnrjsxo&logNo=221115871221&proxyReferer=https:%2F%2Fwww.google.com%2F)

데이터 전송을 위해서 `http` 커넥션을 사용하면 데이터가 탈취되기 쉽습니다. http 를 사용하기 때문에, 데이터는 일반 text 형식으로 전송됩니다. 해커가 데이터를 가로채면 데이터를 자유롭게 사용하고 읽겠죠. 이 가로채는 과정(intercepting)은 **패킷 스니핑**(packet sniffing) 이라고 합니다.

그러나, `https` 는 **안전한 http 커넥션 방식** 입니다. https 는 **데이터를 전송하기전에 암호화**합니다. 그래서 도중에 정보가 탈취되어도 해커는 이 정보를 해독하거나 이해할 수 없습니다.

#### 2. Content Security Policy (CSP) 실행

> **CSP(Content Security Policy)**
> 
> 특정 유형의 공격(XSS 및 데이터 주입 공격 포함) 을 탐지 및 완화하는 데 도움이 되는 추가 보안 계층입니다.

CSP 는 개발자에게 브라우저가 웹사이트를 제어할 수 있도록 정책 세트를 생성하게 해줍니다.
<small>ex) 스크립트를 특정한 위치에서 실행하도록 브라우저를 제어하는등의 작업이 가능합니다.</small>

이 작업은 **악의적인 의도를 가진 모든 스크립트를 차단**하고 **XSS 공격을 크게 완화**시킵니다.

개발자(서버 관리자) 는 웹사이트의 HTTP header 에 `Content Security Policy` 를 추가해야합니다.

이 규칙을 이해하기 위해서 몇 가지 예시를 들어보겠습니다.

```
    Content-Security-Policy: script-src 'self'
```
> * 모든 출처 웹사이트 (origin website) 의 script 를 허용합니다
  
```
    Content-Security-Policy: script-src 'self' https://trustedScript.com
```
> * 모든 출처 웹사이트 (origin website) 와 `trustedSite.com` 도메인 의 script 를 허용합니다

이미지를 로딩하기 위한 허가된 리소스, 또는 css stylesheet 들 개별적으로, `image-src` 나 `style-src` 같은 다른 디렉티브가 있을 수 있습니다.

CSP를 내부적으로 이해하기 위해서는, [해당 MDN 페이지](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 를 참고하세요.

#### 3. `innerHTML` 대신 `textContent` 사용 

아까 들었던 예시, 리뷰에 추가된 악성 코드(`innerHTML` 이 삽입된 코드)를 다시 확인해보겠습니다.

``` js
    let latestReview = document.getElementById('latest-review')
    latestReview.innerHTML = 'Pizza is <img src="wrongLocation" onError='alert("You're hacked")'> delicious!!'
```

일단 해커가 [리뷰 제출하기] 버튼을 클릭하면, 리뷰는 database 에 저장되고, 악성코드를 가진 새로운 리뷰가 스크린에 보여집니다.

그러나 `textContent` 을 사용해서 결과를 입력한다면, 사용자 input 은 HTML이 아닌 평범한 string 으로 파싱되어 업로드된 리뷰 내용에는 이렇게 추가될 것 입니다.

```
    'Pizza is <img src="wrongLocation" onError='alert("You're hacked")'> delicious!!'
```

이렇게 하면 웹사이트를 안전하게 보호할 수 있습니다!

#### 4. modern framework 사용

프레임워크를 사용하는것은 현재 개발과정에 있어서 중요한 부분입니다. 이것은 코드 유지 및 보수를 제공해주고, 앱 퍼포먼스를 향상시켜주며, 기능적으로 개선되고 있습니다.

그뿐만 아니라, 프론트엔드를 위한 모던 프레임워크는 (React, Angular 등) 또한 웹사이트를 악의적인 공격으로부터 **다양한 보안 방식을 제공**합니다.

XSS 공격을 추적하고, 데이터를 청소하는 등의 내부 메커니즘을 이용해서 빌드를 합니다. 보안은 프레임워크랑은 다르지만 잘 동작합니다.

이것이 개발 과정에서 잘 지원된 프레임워크를 사용하는것이 중요한 이유입니다. 그리고 **주기적으로 업데이트**해주세요. 이 프레임워크를 개발하는 팀들은 허점이나 구멍 등을 찾아 더 강력한 보안을 구축하기 위해서 패키지들을 주기적으로 업데이트합니다.

## Cross Origin Resource Sharing (CORS)

*Cross Origin Resource Sharing* (CORS) 는 **도메인, 포트가 다른 서버의 자원을 요청**하는 매커니즘을 말합니다.

위와 같은 요청을 할 때는 cross-origin HTTP 에 의해 요청됩니다.

그러나 동일 출처 정책 (Same Origin Policy) 때문에, CORS 같은 상황이 발생하면 **외부 서버에 요청한 데이터를 브라우저에서 보안 목적으로 차단**하여 정상적으로 데이터를 받을 수 없습니다.
웹 앱은 데이터가 자신의 출처(도메인, 프로토콜, 포트) 와 다를때 CORS HTTP 요청을 실행합니다.

<img src="https://user-images.githubusercontent.com/38432821/52930297-3853d680-338b-11e9-91c8-d240d36cb87e.PNG" width=500>

### CORS 를 사용하는 경우

1. `XMLHTTPRequest`와 `FetchAPI`를 호출할 경우
2. CSS 에서 `@font-face` 속성을 사용하여 Cross-Origin 폰트 리소스를 호출하는 경우
3. WebGL 에서 texture 사용시
4. canvas 의 `drawImage()`를 사용해 이미지/비디오 프레임을 그리는 경우
5. 이미지로부터 추출하는 CSS Shapes


### CORS 해결하기 (회피하기)

#### 1. 서버, 클라이언트가 같은 도메인과 포트를 사용

가장 쉬운 해결 방법입니다. 그냥 서버, 클라이언트가 같은 도메인과 포트를 사용하는 방법입니다. ~~방법이라고 하기도 뭐함~~

#### 2. cross-origin HTTP 요청 허가

SPA (Single Page Application) 을 이용하여 개발하는 환경에서는, 서버에서 cross-origin HTTP 요청을 허가해주면 좋습니다.

**허가 방법 👏**

1. Access-Control-Allow-Origin response 를 헤더에 추가
   
    이 방법은 간단하지만 일일히 추가하기는 힘듭니다.
``` js
    app.get('/data', (req, resp) => {
        // 모든 클라이언트에 요청에 대한 cross-origin HTTP 요청을 허가하는 header 추가
        resp.header('Access-Control-Allow-Origin', '*')
        resp.send(data)
    })
```

2. node.js 의 미들웨어 CORS 추가

    이미 만들어진 node.js 미들웨어 중, 이를 해결해주는 미들웨어 ([`cors`](https://www.npmjs.com/package/cors)) 를 사용하는 방법입니다.

``` js
    const express = require('express')
    const cors = require('cors')

    const app = express()

    app.use(cors()) // CORS 미들웨어 추가
```

#### 3. Jason with Padding (JSONP)

* 정의
  * CORS 가 활성화 되기 이전의 데이터 요청 방법으로, 다른 도메인으로부터 데이터를 가져오기 위해 사용하는 방법입니다.
  * HTML의 `<script>` 요소로부터 요청되는 호출에 보안상 정책이 적용 안되는 것을 이용한 방법입니다.
  * JSONP 는 CORS 를 우회하여 데이터 공유를 가능하게 합니다.
* 동작 방식
  * HTML 문서의 `<script>` 태크로 다른 도메인을 요청할 때, SOP 정책이 적용되지 않는 방식을 이용하여 동작합니다.
  * `script` 태그는 src 속성 값을 호출한 결과를 js 로 불러와서 즉시 실행시키는 기능입니다.
  
    > ``` json
    >     // http://server.example.com/post/1 에서 받아온 json
    >     {
    >         "title": "JSONP란?",
    >         "author": "jejung",
    >         "content": "AbCdEfG"
    >     }
    > ```
    > 
    > ``` html
    >     <!-- 이렇게 데이터를 호출하여 사용할 경우 오류가 발생합니다. -->
    >     <script src="http://server.example.com/post/1"></script>
    > ```
  * JSON 데이터가 객체 리터럴로 해석된다 하더라도 브라우저에서 실행중인 js 에서는 변수에 값을 저장하지 않으므로 접근이 불가능합니다. 
  * JSON 데이터를 사용하기 위해서는 `src` 속성 값에 `?callback=콜백함수명` 을 붙여 요청을 합니다. 그럼 이 요청의 결과로 callback 함수의 인자에 객체를 전달하여 실행시켜줍니다.

    > ``` html
    >     <script src="http://server.example.com/post/1"></script>
    >     <script>
    >         function callback (data) {
    >             // data 는 해당 json 에서 선언한 데이터가 반환됩니다.
    >         }
    >     </script>
    > ```
* jQuery에서는 ajax 사용시 type에 jsonp로 요청하면 됩니다.
* `GET` 방식에서만 사용 가능하다는 단점이 있습니다.

#### 4. 기타

* Proxy 서버를 두는 방법
* jquery 에서는 `jQuery.ajaxPrefilter()` 사용
  * [3번](#3-jason-with-padding-jsonp) 과 흡사하지만 ajax에는 json으로 설정해두고 통신시 prefilter에서 JSONP로 속여서 전송하는 방식

그러나 이러한 방법을 적용하면 모든 요청에 대해 허가를 하게되므로 보안적으로 취약해집니다. 

# 결론

XSS 공격은 사이트에 악성 코드를 주입하기 위해서 동일 출처 정책을 우회하는 주요 웹 보안 취약성입니다. 이 공격은 일반적으로 브라우저/컴퓨터 쿠키에 저장된 검증 상세와, 사용자의 개인정보애게 위험을 발생시킵니다. 

웹 보안은 매우 큰 작업이기 때문에 스스로 관리할 자신이 없다면 웹 사이트를 들어오는 공격으로부터 보호할 수 있는 좋은 웹 보안 도구에 투자하는 것이 좋습니다.
