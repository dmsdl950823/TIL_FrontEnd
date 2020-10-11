# Javascript Debugging 팁

### 더 빠르게 debugging 하기

Javascript는 디버깅 하기 어렵다는 말이 있지만, 몇가지 트릭을 이용하면 debugging 시간을 줄일 수 있습니다.

-------------

### `debugger` 이용하기

`console.log()` 후에, `debugger`를 사용하는 것은 가장 간단한 디버깅 툴입니다.
`debugger`를 코드에 입력하면, Chrome은 자동으로 동작을 멈춥니다.

조건문을 이용하여 필요할 경우에만 `debugger`를 사용할 수ㄷ도 있습니다.
```
  if (thisThing) {    
    debugger;
  }
```

### Display objects as a table - 오브젝트를 테이블 형식으로 입력하세요

종종 코드를 작성하면서 복잡한 오브젝트 구조의 데이터를 가지게 될 수 도 있습니다.

이럴땐 `console.log()` 보다 , `console.table()` 해서 정리된 형태로 확인할 수 도 있습니다.

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e7897970a9af238fc01_5eaa4c24076841924ce3f5f4_Debugging-2b.png">


### 모든 size를 사용하기

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8b70e96f765748cb45_5eaa4c85fbbd830a55c31d4c_Debugging-1.png" >

다양한 디바이스들이 모든 페이지에 적합하진 않을 수 있습니다.
그럼 viewport를 리사이징 해보는 것은 어떨까요?

Chrome의 기능중 device 크기를 조절할 수 있는 도구를 이용하여 media query가 적용된 모습을 확인할 수 있습니다.


### DOM Element를 빠르게 찾는 방법

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8b5a7f828daf39838c_5eaa4ccfb688d30326ad49a6_Debugging-2.png" >
DOM 요소를 '마크'하고 console에서 사용해보세요. Chrome Inspector는 마지막 다섯개의 요소를 표시해줍니다.

그렇게 되면 여러분은 consol e에서 요소를 확인해 볼 수 있습니다.

### Benchmark loop using `console.time()` and `console.timeEnd()`
어떤 구문이 실행될 때 얼마나 많은 시간이 걸리는지 아는 것은 아주 유용한데, 특히 느린 루프에서 디버깅 할 때 유용합니다.

여러분은 메서드에 라벨(`console.time()`)을 할당하므로써  여러개의 timer를 설정할 수 있습니다.

```
  console.time('Timer!!');
 
  var items = [];

  for(var i = 0; i < 100000; i++){
     items.push({index: i});
  }

  console.timeEnd('Time!!'); // 상단에 세팅된 이름과 같아야합니다
```

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8b780ab4213fe3718f_5eaa4d949ab962f8ea740e53_Debugging-3.png" >


### Get the stack trace for a function

Javascript framework가 아주 빠르게 코드를 생성할 수 있다는건 모두 잘 압니다.

많은 이벤트를 트리거시키고 많은 views를 가지고 있을텐데, 결국에 어디서 그 function이 실행되었는지 알기를 바랄것 입니다.

Javascript가 아주 구조화된 언어가 아니기 때문에, 어디서, 언제 호출되었는지 이해하기 가끔은 어려울 때가 있습니다. 

이럴 때 `console.trace()` 가 javascript에서 쉽게 디버깅을 할 수  있도록 도와줍니다.

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8bb28a6cc3a46c5958_5eaa4e0728b2be06967be396_Debugging-4.png">

### Unminify code as an easy way to debug Javascript

때때로 당신은 생산에 문제가 있을 수 있고, 당신의 소스 맵이 서버에 제대로 전달되지 않아 min.js처럼 압축 되어있는 경우가 있습니다.

Chrome이 여러분의 javascript 파일들을 더 읽기 좋도록 만들어줄 수 있습니다. 여러분의 진짜 코드처럼 도움이 될 수 있을진 모르지만, 무슨일이 일어나고있는지 확인은 할 수 있습니다.

하단의 `{}` Pretty Print 버튼을 클릭해 inspector에서 소스를 확인하세요

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8cb58c9e63be1a9173_5eaa4f824c1f30155edb9a12_Debugging-5.png >


### debug 할 function 빠르게 찾기
여러분이 function에 break point를 걸고싶다고 생각해보세요. 가장 일반적인 방법은 두가지인데,

- 여러분의 inspector에서 라인을 찾고, breakpoint를 거는것
- script에서 debugger를 거는것

이 두 해결방안에서는, 여러분들은 수동으로 여러분의 파일에서 디버깅을 원하는 곳을 찾아야합니다.

아마 덜 알려진 방법은 console을 사용하는 것인데, console에서 `debug(funcName)`를 사용하면, 스크립트는 여러분이 지나려고 하는 function에 도달 할 때 멈출것입니다.

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8c52a9cf1a3b242494_5eaa50a14c1f30709fdba0e1_Debugging-6.png" >


### Black box script that are not relevant
요즘 우리는 꽤 많은 library나 frameworks 들을 사용하고있습니다. 대부분은 테스트되었고 상대적으로 bug-free 하지만, debugger는 여전히 타당하지 않은 파일들을 탐색하곤 합니다.

해결책은 디버깅할 필요가 없는 스크립트를 '블랙박스 black box'하는 것입니다.

[여기](https://raygun.com/blog/javascript-debugging-with-black-box/) 를 참고하세요


### 복잡한 debugging 내역 에서 중요한 것을 찾으세요.

너무많은 console 로그(`console.log`, `console.debug`, `console.warn`, `console.info`, `console.error` ... )가 있을 경우 중요한 로그를 찾기 힘듭니다.

여러분은 특별한 스타일을 콘솔 메세지에 입력 할 수도 있습니다.

```
console.todo = function(msg) {
  console.log(‘ % c % s % s % s‘, ‘color: yellow; background - color: black;’, ‘–‘, msg, ‘–‘);
}
 
console.important = function(msg) {
   console.log(‘ % c % s % s % s’, ‘color: brown; font - weight: bold; text - decoration: underline;’, ‘–‘, msg, ‘–‘);
}
 
console.todo(“This is something that’ s need to be fixed”);
console.important(‘This is an important message’);
```

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f32220687db60118434aaa9_image13.png" >

`&s` 는 string, `%i`는 integer(정수), `%c`는 custom style 입니다.

기타 다른 스타일도 여러분이 규칙을 정하는 등 유용하게 만들 수 있습니다.


### 특정 function 호출과 arguments 관찰

Chrome 콘솔에서는, 특정 function을 확인할 수 있습니다. function이 호출될 때마다, 어떤 매개변수가 입력되었는지 확인해 볼 수 있어서 매우 유용합니다.

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8cd55d186b1c6cdb99_5eab735e58f6c673d762e275_Debugging-8.png" >


### 빠르게 console 에서 요소에 접근하는방법
console에서 querySelector을 더 빠르게 사용하는 방법은 dollar sign($)을 이용하는 것입니다.

$('css-selector') 은 첫번째 일치하는 CSS Selector를 반환할것입니다.

$$('css-selector') 은 모든 요소들을 반환할 것입니다. 만약 요소를 한개 이상 사용할 경우, variable로 저장하는것이 편할 것입니다.

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8cab1b003c7a8dc12d_5eab73f78b32320be04ec35d_Debugging-10.png" >


### Postman 최고! - 그렇지만 Firefox는 더 빠릅니다.

많은 개발자들이 Ajax 통신을 위하여 Postman을 사용하는데, Postman이 좋긴 하지만 짜증날 때가 가끔 있어요(새로운 browser 윈도우를 열거나, 새로운 request 오브젝트 생성, 테스트 등)

그래서 때로는 여러분의 브라우저를 사용하는것이 훨씬 더 쉽습니다. password-secure 페이지에 전송한다면 authentication cookies를 걱정할 필요도 없어요.

여러분이 firefox에서 편집하고 request를 재전송할 수 있는 방법입니다. Inspector를 열고 Network 탭에 가세요. desired-request에서 우클릭을 하고, Edit 을 선택하여 Resend 하세요.

이제 여러분은 여러분이 수정하고 싶은 내역을 수정할 수 있습니다. header과 여러분의 parameter 를 수정하고 resend 버튼을 누르세요!


### Break on node change

DOM은 정말 재미있는데, 때때로 변화가 있지만 여러분은 왜인지 모릅니다. 그러나, javascript를 디버깅 해야할 경우, Chrome은 DOM 요소가 변화할 때 일시정지 하도록 도와줍니다.

여러분은 그 요소의 attributes를 확인할 수도 있습니다. Chrome Inspector 에서, 요소위에서 우클릭 - `Break on...` 을 이용해 사용하세요

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8cf3a112611007ad01_5eab74ddbaab8647146433e8_Debugging-14.png" >


### page speed service를 이용하세요

여러분의 페이지에 있는 javascript를 관찰할 수 있는, 그리고 느린 요소와 문제를 찾을 수 있도록 도와주는  많은 서비스와 툴들이 있습니다.

그중 하나는 Raygun Real User Monitoring(https://raygun.com/platform/real-user-monitoring) 입니다.

이 툴은 javascript 문제를 넘어선 다른 이유들에서 아주 유용합니다. -외부 스크립트의 느린 loading, 불필요한 css, oversized images 등등이요.

이 툴은 여러분에게 의도치 않게 오랜 loading 시간을 걸리게 해주는 문제나, 부적절하게 실행되어 실패하는 javascript 문제들을 알수 있도록 도와줍니다.

javascript 퍼포먼스와 그들을 추적할 수 있도록 향상할 수 있도로 ㄱ도와줍니다.

### Breakpoints everywhere

마지막으로, breakpoint를 다른 상황에서, 다르게 사용해보세요.

<img src="https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8de285f545c263f952_5eab75508b3232166d4ecf99_breakpoints.png" >

 여러분은 요소를 클릭해서 breakpoint를 걸고, 특정 요소가 변경될 때 실행을 멈출 수 있습니다.
 
 또한 Developer 툴의 Debugger 탭이나 Source 탭에서도 접근할 수 있으며, 어떤 특별한 Ajax 요청에서 멈출 수 있도록 하는 XHR breakpoints를 걸 수 있습니다.

여러분은 버그를 찾기 위한 최대한의 기회들을 위해 이 다양한 종류의 breakpoints를 여러분의 브라우저 툴에서 사용할 수 있습니다.


#### [더 자세한 디버깅팁을 알고싶다면?](https://raygun.com/learn/javascript-debugging-tools)


출처 :: https://raygun.com/learn/javascript-debugging-tips?utm_medium=newsletter&utm_source=javascriptweekly&utm_campaign=cooperpress&utm_content=article
