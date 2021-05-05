# What is really the difference between Cookie, Session and Tokens that nobody is talking about ?

출처 : [Dev.to](https://dev.to/dev_emmy/what-is-really-the-difference-between-cookie-session-and-tokens-when-it-comes-to-authentication-4164)

cookie, session, token의 차이를 이해하려면 기초부터 이해해야합니다.
은행 계좌에 로그인 한다고 가정해봅시다.

1. id 와 pw 를 스크린에 입력하고, 확인 버튼을 입력하면 id 와 pw 는 은행 서버에 전송됩니다.
2. 서버는 어떤 아이디를 찾는지 확인 할 필요가 있으므로, 입력한  정보를 database 를 확인해서 찾아냅니다.
3. 서버가 정보를 찾아내면 서버는 계좌 정보를 리턴합니다. 
4. 이때, 로그인 이벤트와 함께 해당 계좌 정보의 database에 session 을 생성하고, session_id cookie정보 를 돌려줍니다. 다른말로, id 와 pw 를 이 session_id 정보를 담고있는 cookie와 교환합니다.   
5. 서버는 session 정보를 database 에 저장하고, 그동안에 (session_id 를 저장하고있는) cookie 는 컴퓨터에 저장됩니다.
   session_id는 임의로 지정되기 때문에 추측하기 어렵고, 로그아웃시에 서버사이드에 저장된 session은 삭제됩니다. 이 때 서버는 사용자의 브라우저에게 session_id 를 포함하고있는 cookie를 삭제하도록 알려줍니다.
6. 이후 로그인을 하고 페이지를 요청 할 때, 브라우저는 서버가 여전히 가능한 정보인지 확인할 수 있도록 자동으로 session_id 를 포함한 cookie 를 자동으로 보내줍니다. 사용자를 확인하기 위해 id 와 pw 가 더 이상 필요하지 않은지 확인하기 위해 반드시 필요합니다.
    > `membershipID` 와 기타 다른 정보를 가진 `Gym_membership_card` cookie 를 생각해보면, 접근시에 확인하고, 멤버십이 여전히 가능한지 확인하고 사용자 접근을 허용합니다.
    > 
    > session_id cookie도 특정 웹사이트에 동작합니다. 동일한 cookie 를 다른 사이트에서 사용할 수는 없습니다.
7. 은행 서버는 사용자가 서버와 상호작용을 하는한 계속 session 을 활성화 할것 입니다. 만약 새로운 페이지를 방문해서 비활성화 된 경우, 서버는 이 비활성화 기간을 감지하고 보안 방책에 따라 처리합니다. 

이러한 접근은 **쿠키 기반 검증** cookie-based authentication 이라고 합니다.

서버에서 session 울 사용하는 접근에 따라서, 검증을 핸들링합니다.
cookie 는 sessionID 를 전달하는 방법이고, 간단하기때문에 사용됩니다. **브라우저는 모든 request 에 항상 cookie 를 끼워 보닐 것 입니다.** 이 경우에는 은행은 session 정보를 서버사이드에 저장하고, 내용을 볼 수 없지만, 동시에 브라우저에서 클라이언트 사이드에 정보를 저장합니다. 이런 정보는 마지막으로 방문한 페이지나 사용자가 선호하는 덜 민감한 정보들을 저장할 수 있습니다.


## 왜 서버는 cookie 에 있는 많은 정보를 저장하지 않을까?

쿠키는 클라이언트로부터 오는지 확실할 수 없기 때문입니다. 이것이 서버가 이상적으로 타당한 정보가 존재하는 database 를 사용해서 작업하는 이유입니다.

만약 데이터가 조작된 경우 이것을 하는 한가지 방법은 JSON WEB TOKENTS를 사용하는 것입니다. 그러므로 기본적으로 쿠키 기반 검증은 몇년동안 잘 동작해왔지만 점점 뒤쳐지고있는 분위기입니다.

자금을 관리해주고 은행 계좌 소비 내역 정보를 저장하는 앱을 핸드폰에 설치한다고 가정합니다. 사용자가 은행에 관련되지 않은 정보 (id, pw) 를 이 앱에다 저장하지 않길 바랍니다. 이런 경우, 은행은 사용자에게 은행 계좌가 id 와 pw 정보를 사용할 수 있도록 물어볼 것입니다. 만약 사용자가 정보를 사용하도록 허가해준다면, 앱은 token 에 접근 할 수 있도록 허가하지만, 상호작용하는 것 만 볼수 있으므로 (일반적으로 계좌로 로그인 할 때 볼 수 있는 ) 다른 상세한 정보를 전달할 수는 없습니다.
이 token은 말하자면 임의로 생성된 비밀번호 같이 동작합니다. 예를 들자면 호텔에서 wifi 패스워드를 하루치 사용할 수 있도록 하는것과 비슷합니다. 이것에 접근하기 위해서 비슷한 절차를 본 적이 있을 것 입니다. (Facebook, Google, Microsoft 가 사용자의 프로필을 써드파티 웹사이트에 제공하도록 허가하는 등)

이러한 교환은 이름이나 비밀번호를 절대 교환하지 않습니다. 원한다면 은행 계좌에 접근해서 발행된 token을 비활성화 시켜 쉽게 취소할 수 있습니다. 이러한 시나리오를 위해서 일반적으로 사용되는 프로토콜중 하나는 JWT 뿐 아니라 openID Connect 를 사용할 수 있습니다.

## token 과 cookie 에 저장된 session 의 차이

차이점은 session 이 서버에 의해 필요하므로 수행되는 반면에, token 은 전형적으로 표준을 따릅니다.  추가적으로 token 은 서버에서 session 을 필요로 하지않지만 세션을 가질 수는 있습니다.

이러한 경우 session 정보를 포함하고있는 token 인 JWT 토큰은, 유저로서의 사용자에 대한 실제 데이터 를 포함합니다. token 을 사용할 경우, 전형적으로 믿거나, 믿을 수 없는 multiple party 에 대한 정보를 포함한다는 것을 이해해하는것이 필수적입니다. 사용자가 은행에 로그인 (id, pw) 을 할 때 이 앱스토어에서 찾을 수 있는 서드파티 앱을 믿을순 없겠지만 사용자는 은행을 믿어야합니다. 

또 다른 차이점은 token은 제한된 수명을 가지고, 새로운 token은 한번 만료되면 새로 생성될 필요가 있다는 것 입니다. 기술적 이름은 refreshed 된다 입니다.

토큰은 또한 사용자나 엔티티가 가지고있는 특별한 데이터의 서브넷에 대한 접근을 허용합니다. (다른 정보에 대해서는 접근허용이 불가능하지만 사용자의 상호작용에 대해서만 접근을 허용합니다)

대부분의 시간동안 token 은 cookie 가 아닌 HTTP headers 를 사용해서 보내졌습니다. 그 이유는 오늘날에는 휴대폰의 앱에서와 같이 브라우저로부터 많은 상호 작용이 발생하므로 쿠키를 사용하는 것이 이치에 맞지 않기 때문입니다.

"브라우저가 다른 headers 와는 다르게 핸들링 하므로 cookie 는 HTTP headers 로 보내져야합니다."





## CONCLUSION
So both session-based/cookie-based and token-based approaches are widespread and typically they are used in parallel for-example a session/cookie based approach is deployed when using the website but token-based approach is preferred when using the app from the same service. So it is essential to understand how both work.

I hope that was useful and now are able to differentiate between cookies, sessions and tokens.
