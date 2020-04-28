# Proxy

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile4.uf.tistory.com%2Fimage%2F99A33F365C420BF01267C6" width="400"/>

server의 위치가 어딘지에 따라 Proxy인지 Reverse Proxy인지 판단할 수 있다. <br>
<strong>Frontend 에 밀접하면 Proxy, Backend에 밀접하면 Reverse Proxy </strong>

전통적으로 proxy 서버는 front-end 와 가깝게 구성되어있다.<br>
일반적으로 proxy server라 하면 forwarding proxy - client와 가까운 서버를 일컷는다.

### Proxy 서버 사용의 장점
1. 인터넷 사용을 컨트롤 할 수 있다.
2. 대역폭을 줄일 수 있고, 속도를 향상시킬 수 있다.
3. 프라이버시에 이익이 있음
4. security 를 향상시켜준다.
5. 차단된 자원에 접근할 수 있다.

### Proxy 서버의 종류
* Transparent Proxy
  > 기본적인 proxy서버로 proxy 서버 ip를 이용하여 사용자의 데이터를 외부 서버로 전달해주는 역할을 함
* Annonymous Proxy
  > Proxy를 익명으로 사용한다. 외부에 사용자를 공개하지않고 외부 서비스를 이용할 수 있게 한다.<br>
dfdfdf

-------

### Reverse Proxy
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile26.uf.tistory.com%2Fimage%2F995E59495C42AAF022C685" width="400"/>

하나 이상의 서버에서 클라이언트 앱으로 데이터를 받아올 수 있는 타입입니다.<br>
Reverse Proxy는 사설 네트워크 상에서 Firewall 뒤에 존재함.
자원은 서버에서 원래 서버에서 클라이언트 사이드로 돌아오게 됩니다.

### Reverse Proxy 역할

1. Load balancing
  > 웹 서버의 앞 단에 위치하고 있기 때문에 Network Traffic을 제어한다. <br>
  사용자의 요청 및 웹 서버 상테에 맞게 Network Traffic을 분산한다.
2. Web acceleration
  > 내부적으로 cache를 사용, 데이터를 압축하여 network의 속도 향상
3. security and anonymity
  > 웹 서버로부터 데이터를 수정하여 웹 서버를 숨기거나 악성사용자로부터의 공격을 막는다.


~~역 프록시 사용 예시~~

~~* 많은 서버에서 들어오는 요청들에서 load를 분산시킬 수 있습니다. ~~
~~* 웹서버에 접근할 기본 HTTP 인증을 더할 수 있습니다.~~
~~* 압축해서 최적화하여 로딩 시간을 줄일 수 있습니다.~~
~~* 정적인 컨텐츠를 캐싱하여 로드 시간을 줄일 수 있습니다.~~

--------

