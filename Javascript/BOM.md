# BOM
브라우저 객체모델(BOM)은 웹에서 사용하는 자바스크립트의 핵심입니다.

BOM은 웹 페이지 콘텐츠와 무관하게 브라우저 기능을 노출하는 객체 입니다. 제대로된 명세가 없는 기간이 길었기 때문에 브라우저 제조사들은 각 회사가 원하는 대로 BOM을 확장했고, 이는 문제를 많이 발생시켰습니다. 브라우저 사이의 공통점이 사실상의 표준이 되었고, 브라우저 개발 목적은 거의 상호작용성에 집중 되었습니다.

## Window 객체
BOM의 핵심에는 브라우저의 인스턴스인 window 객체가 있습니다.


이미지 출처: https://learn.javascript.ru/article/browser-environment/windowObjects.png

window 객체는 브라우저 창의 자바스크립트 인터페이스 구실을 하고 다른 한편으로는 ECMAScript global 객체로 기능합니다. 따라서 웹 페이지에서 정의한 모든 객체, 변수, 함수에서 window 가 global 객체 구실을 하며  window 에 정의된 parseInt() 등의 메서드를 이용합니다. 

## 전역 스코프
 window 객체가 ECMAScript의 global 객체 구실을 하므로 전역에서 선언한 변수와 함수는 모두  window 객체와 프로퍼티 및 메서드가 됩니다.

```
 var age = 29             // window 객체에 정의할 땐 var를 사용합니다
 function foo () {
   console.log(this.age)
 }

 console.log(window.age)  // 29
 foo()                    // 29
 window.foo()             // 29
```

변수 age와 함수  foo 는 전역스코프에서 정의되었으므로 자동으로  window 객체에 속합니다

전역변수가  window 객체의 프로퍼티가 되긴 하지만 전역 변수를 정의하는 것과  window 에 프로퍼티를 직접 정의하는 것은 조금 다릅니다. 전역변수는  delete 연산자로 제거할 수 없지만  window에 직접 정의한 프로퍼티는 가능합니다.

```
 var age = 29
 window.color = 'red'

 // under ie9 => error && other => false
 console.log(delete window.age)     // false

 // under ie9 => error && other => true
 console.log(delete window.color)   // true

 console.log(window.age) // 29
 console.log(age) // 29
 console.log(window.color)   // undefined
```
 var 연산자를 써서  window 에 추가한 프로퍼티는 [[Configurable]] 속성이 false로 지정되므로 delete 연산자를 통해 삭제할 수 없습니다.

IE 8 및 이전 버전은  window 객체window 프로퍼티가 생성된 방법을 가리지 않고 delete 연산자를 강제 적용하여 에러가 발생했습니다. IE 9 이후 버전에서는 에러가 발생하지 않습니다.

여기서 특이한 점은, 선언한적 없는 변수에 접근하려 하면 에러가 발생하지만 선언하지 않았을 가능성이 있는 변수의 존재 여부는  window 객체를 통해 확인 가능합니다.

```
 // error -> not defined
 // var newVal = oldVal

 // property searching
 var newVal = window.oldVal   // newVal = undefined
```
 location , navigator 등 자바스크립트에서 전역이라 생각하는 많은 객체가 사실 window 객체의 프로퍼티입니다.

## 창 사이의 관계와 Frame
페이지에 Frame이 있으면 프레임내부에는 독자적인 window 객체를 가지며 이 객체들은 frames 객체에 저장됩니다. frames 객체에서 각  window 객체 등은 인덱스(왼쪽 => 오른쪽, 오른쪽 끝 => 다음줄) 와 프레임 이름 두가지로 색인합니다. window 객체는 프레임의 name을 프로퍼티로 가집니다.

```
<html>
  <head>...</head>
  <frameset rows="160, 0">
    <frame src="frame.htm" name="frame_one">
    
    <frameset cols="50%, 50%">
      <frame src="frame1.htm" name="frame_two">
      <frame src="frame2.htm" name="frame_three">
    </frameset>
  </frameset>
</html>
```
상단 프레임은 window.frames[0] , window.frames['frame_one'] 두가지 방식으로 접근 가능합니다.

top 객체는 항상 최상위(가장 밖에있는) 프레임을 가리키는데, 이는 브라우저 창을 가리킵니다. top 객체를 참조하는 코드는 모두 브라우저 창이 아니라 프레임의 고유한 인스턴스를 가리킵니다. 

window 객체중에는 parent도 있습니다.  parent객체는 항상 현재 프레임의 상위 부모 프레임입니다.  parent와 top 이 같은 객체일 때도 있으며 프레임이 전혀 없을 때는  parent와 top 모두 window 와 일치합니다. (frame에 대한 자세한 사용방법은 외부 예제를 참조하세요)

self 라는 window 객체도 있습니다. 이 객체는 항상  window 를 가리킵니다. 사실  window 와  self 는 서로 바꿔서 써도 됩니다.  self 에 특별한 의미가 있는 건 아니지만 호환성 때문에 top 과  parent객체에 포함됩니다.이 객체는 모두 window 객체의 프로퍼티여서  window.parent ,  window.top 등으로 접근할 수있습니다.

프레임을 사용하면 브라우저에 global 객체가 여럿 존재하게 됩니다. 각 프레임에 정의된 전역 변수는 해당 프레임의  window 객체의 프로퍼티인 것으로 정의됩니다. 각  window 객체마다 네이티브타입 생성자가 존재하므로 프레임마다 제각기 생성자가 존재하는것이고 이들은 서로 일치하지 않습니다. 

## 창의 위치
브라우저 창의 위치를 가져오거나 설정하는 프로퍼티와 메서드도 다양합니다.


이미지 출처 https://o7planning.org/en/12397/javascript-window-tutorial
screenLeft ,  screenTop 또는  screenX , screenY (Firefox, Safari, Chrome 전용 :: 오페라 역시 이 프로퍼티를 지원하지만 이 값은 screenLeft/screenTop과 다르므로 오페라에서는 screenX/screenY를 쓰지말아야 합니다) 프로퍼티는 화면을 기준으로 창이 왼쪽 위에서 각각 얼마나 떨어졌는지를 나타냅니다. 

이 값에는 다소 혼란스러운 점이 있습니다. 모든 브라우저에서 반환하는 값이 다르기 때문에 브라우저 창의 좌표를 정확히, 브라우저에 무관하게 일관적으로 구할 방법은 없습니다.

하지만 moveTo() , moveBy() 메서드로 정확한 위치로 옮기는 일은 가능합니다. 각 메서드는 매개변수를 두 개 받습니다.

window.moveTo(0, 0)      // 현재 위치에서 (0px, 0px) 로 이동

window.moveBy(10, -100)  // 현재 위치에서 (10px, -100px) 만큼 이동
IE7 이상과 크롬, 오페라에서는 기본적으로 비활성화 되어있으며, 이 메서드 중 프레임에서 동작하는 것은 없습니다.

## 창 크기
창 크기를 알아내는 방법은 어느 브라우저든 상당히 복잡합니다. 모든 브라우저에서 InnerWidth ,  InnerHeight , outerWidth ,  outerHeight 를 지원합니다. 

Ie9, safari, firefox, chrome 에서 outerWidth ,  outerHeight 는 최상위 창 or 프레임에서 호출하면 브라우저 창 크기를 반환합니다. 오페라에서 이 값은 페이지 viewport 크기입니다.  InnerWidth ,  InnerHeight 프로퍼티는 브라우저 창 내부의 페이지 viewport 크기를 나타냅니다. 테두리와 툴바는 포함되지 않습니다.

`IE 8 이전버전에서는 브라우저 창의 현재 크기를 알아낼 방법이 없지만 DOM을 통해 페이지의 '가시영역viewable area에 대한 정보를 알 수는 있습니다.`


이미지 출처 https://www.quirksmode.org/mobile/viewports.html  ::  Measuring the viewport

모든 브라우저에서 document.documentElement.clientWidth 와 document.documentElement.clientHeight 프로퍼티는 각각 페이지 viewport의 너비와 높이를 나타냅니다. IE6은 표준모드에서만 이들 프로퍼티를 지원하며 쿽스모드에서는  document.body.clientWidth 와  document.body.clientHeight 프로퍼티가 해당 정보를 제공합니다. 크롬이 쿽스모드로 동작할 때는 네가지 프로퍼티 모두 viewport 크기를 나타냅니다.

결국 브라우저 창 크기를 정확히 알아낼 방법은 없지만 페이지 viewport 크기는 알 수 있습니다.

```
 let pageW = window.innerWidth
 let pageH = window.innerHeight

 if (typeof pageW !== 'number') {
   if (document.compatMode === 'CSS1Compat') {
     const docElement = document.documentElement
     pageW = docElement.clientWidth
     pageH = docElement.clientHeight
   } else {
     pageW = document.body.clientWidth
     pageH = document.body.clientHeight
   }
 }
 ```
 
모바일 장치에서는 window.innerWidth ,  window.innerHeight 가 viewport 크기이며 이 크기는 화면에 보이는 페이지 크기와 일치합니다. 모바일 IE는 이 프로퍼티를 지원하지 않지만  document.documentElement.clientWidth 와 document.documentElement.clientHeight 를 지원합니다. 이 값은 페이지를 확대/축소할 때 변화합니다.

다른 모바일 브라우저에서는 document.documentElement 에서 레이아웃 뷰포트 :: 렌더링된 페이지의 크기를 알 수 있습니다. - 레이아웃 뷰포트는 페이지 전체를 의미하므로 장치 화면에 보이는 영역과는 다른 뜻입니다. 이 값은 페이지를 확대/축소해도 변화하지 않습니다.  모바일 IE는 이 정보를 document.body.clientWidth/document.body.clientHeight 에 저장합니다. 

모바일 브라우저는 데스크톱 브라우저와 다르므로 창 크기를 판단할 때 어떤 방법을 쓸지 정하려면 우선 사용자가 모바일 장치로 접속했는지부터 알아야 합니다. - 모바일 뷰포트는 다양한 예외와 함정이 있어 매우 복잡합니다. 관련문서를 확인해보세요.(추가 예정)

브라우저 창 크기를 조절할 때는 resizeTo() 와  resizeBy() 메서드를 사용합니다. 각 메서드는 매개변수를 두 개 받습니다.  resizeTo() 는 최종 너비/높이를 받고resizeBy() 는 너비/높이를 얼만큼 바꿀지 받습니다. 

```
window.resizeTo(100, 100)
window.resizeBy(100, 50)
```
창을 움직이는 메서드와 마찬가지로, 크기를 바꾸는 메서드 역시 IE7 이상, 크롬, 오페라에서는 기본적으로 금지되어있습니다. 최상위 window 객체에만 적용되는점도 마찬가지입니다.

## 네비게이션과 열기
window.open() 메서드는 url로 이동한 후 브라우저 창을 새로 엽니다. 매개변수는, 1. 이동할 url 2. 대상 창(_self, _parent, _top, _blank) 3. 기능을 나타내는 문자열 4. 새 페이지가 브라우저 히스토리에서 현재 페이지를 대체할지 나타내는 불리언값(옵션) - 새 창을 열 때는 적용되지 않습니다.

window.open() 두 번째 매개변수가 이미 존재하는 창이나 프레임 이름이라면 주어진 url은 해당 이름의 창이나 프레임에서 열립니다. 

```
// === <a href="http://www.abcabc.com" target="topFrame" />
window.open("http://www.abcabc.com", "topFrame")
```

## 팝업창
두 번째 매개변수가 기존의 창/프레임이 아니라면 세 번째 매개변수에 지정한 문자열로 새 창이나 탭을 생성합니다. 세 번째 매개변수가 없다면 새 브라우저 창 (브라우저 설정에 따라서는 탭)이 열리고 기본 브라우저창 설정 (툴바, 주소표시줄, 상태 바 등)이 적용됩니다. 세 번째 매개변수는 새 창을 열 때에만 적용됩니다.

```
const abcWindow = window.open("http://www.abcabc.com/", "_blank", "height=400,width=400,top=10,left=10,resizable=yes")


// 크기조절
abcWindow.resizeTo(500, 500)

// 이동
abcWindow.moveTo(100, 100)
```

세 번째 매개변수는 새 창의 설정 정보를 나타내는, 쉼표로 구분된 문자열입니다. 하단 옵션을 참고해주세요

옵션	값	설명

|옵션|값|설명|
|------|---|---|
|fullscreen|String - yes / no|브라우저 창을 최대 크기로 생성할 것인지(IE 전용)|
|height|Number|새 창의 높이, 최솟값 100|
|width|Number|새 창의 너비, 최솟값 100|
|left|Number|새 창의 x 좌표, 음수 불가능|
|top|Number|새 창의 y 좌표, 음수 불가능|
|location|String - yes / no|주소 표시줄을 표시할지 여부 설정 기본 값은 브라우저에 따라 다름. no 설정시 브라우저에 따라 주소 표시줄을 숨기거나 비활성화|
|menubar|String - yes / no|메뉴바를 표시할지 나타냅니다. 기본값 no|
|resizable|String - yes / no|새 창 콘텐츠가 뷰포트를 넘칠 때 스크롤을 허용할지 나타냅니다. 기본값 no|
|scrollbars|String - yes / no|새 창 콘텐츠가 뷰포트를 넘칠 때 스크롤을 허용할지 나타냄. 기본값 no|
|status|String - yes / no|상태 바를 표시할지 나타냄. 기본 값은 브라우저에 따라 다릅니다.|
|toolbar|String - yes / no|툴바를 표시할지 나타냄. 기본값 no|
		
		
다음과 같이 window.close() 메서드를 사용하여 새 창을 닫을 수 있습니다.

```
 abcWindow.close()

 console.log(abcWindow.closed)  // true
 ```
이 메서드는 window.open() 으로 생성한 팝업창에서만 동작합니다. 주요 브라우저 창은 반드시 사용자 확인을 거쳐야만 닫을 수 있습니다. 새 창을 닫아도 창에대한 참조는 여전히 존재하지만, closed 프로퍼티를 확인 하는 용도 이외에는 사용할 수 없습니다.

```
 var abc = window.open('http://www.abc.com/', ...)
 console.log(abc.opener === window)  // true
```

팝업창에는 자신을 연 창에 대한 포인터가 존재하지만, 자신이 연 팝업을 추적하지 않으므로 필요하다면 직접해야합니다. IE8 이상이나 구글 크롬같은 일부 브라우저는 브라우저 탭을 분리된 프로세스에서 실행하려 합니다. 탭에서 다른 탭을 열면 window 객체끼리는 통신해야하므로 각 탭을 분리된 프로세스에서 실행할 수는 없습니다. 크롬에서는 새 탭을 생성할 때 다음 예제처럼 opener 를  null 로 설정하여 프로세스를 분리할 수 있습니다.

`
abcWindow.opener = null
`
 opener 를  null 로 설정하면 브라우저는 새로 생성된 탭이 원래 탭과 통신할 필요가 없는 것으로 간주하고 분리된 프로세스에서 실행할 수 있습니다. 일단 프로세스를 분리하면 다시 연결할 수 없습니다.

## 보안 제한
온라인 광고사들은 오랫동안 팝업창을 남용해왔습니다. 팝업을 시스템 대화상자와 혼동하게 만들어 사용자가 광고를 클릭하도록 유도한 경우도 많았습니다. 이런 팝업은 시스템 대화상자처럼 보이게 만들어졌으므로 사용자는 대화상자가 안전한 것인지 판단하기 어려웠습니다. 브라우저 제조사들은 팝업창 설정을 제한하여 사용자가 혼동하는 일을 줄이려했습니다.

윈도 xp 서비스팩 2의 인터넷 익스플로러 6은 팝업 창에 여러 가지 보안기능을 구현했는데 팝업창을 화면 밖에 생성하거나 밖으로 이동할 수 없도록했고, 상태 바를 끌 수 없게 하는 등이 이에 속합니다. Ie7 부터는 팝업창에서 주소 표시줄도 끌 수 없게 했고, 기본적으로 이동/크기조절도 금지했습니다.

Firefox는 버전 1부터 팝업 창의 상태 바를 감출 수 없게 만들었으므로  window.open() 의 세 번째 매개변수에 무엇을 넘겼든 상태 바를 표시합니다.Firefox3 부터는 팝업 창에서 주소 표시줄을 숨길 수 없습니다.

오페라는 팝업창을 주요 브라우저 창 안에서만 열 수 있으며 시스템 대화상자와 혼동되는 위치에 놓을 수 없게 막습니다.

또한 브라우저들은 팝업창을 사용자의 행동에 의해서만 열 수 있게 합니다. 예를들어 페이지를 아직 불러오는 중일 때 window.open() 을 호출하면 실행되지 않고, 사용자에게 에러가 표시될 수도 있습니다. 팝업 창은 마우스를 클릭하거나 키를 누르는 등 사용자 행동이 있어야만 열립니다.

크롬은 사용자 행동이 없는 상태에서 팝업 창을 호출하면 다른 접근법을 취합니다. 팝업창을 차단하는 대신 브라우저 창의 오른쪽 하단에 팝업창의 제목만 표시합니다.

## 팝업차단
대부분의 브라우저는 팝업 차단 소프트웨어를 내장하고 있습니다. 없는 경우는 팝업차단 기능이 있는 유틸리티를 설치하면 됩니다. 이를 이용하면 예기치 못한 팝업을 대부분 차단할 수 있습니다.

1. 브라우저에 내장된 팝업차단기가 동작했다면  window.open() 이 null을 반환하므로 팝업이 차단되었는지 확인할 수 있습니다.

```
 const abcWindow = window.open("http://abcabc.com", "_blank")
 if (abcWindow === null) {
   alert("The popup was blocked!")
 }
```
2. 브라우저 외부 프로그램이 팝업을 차단한 경우라면  window.open() 은 일반적으로 에러를 반환하므로, 반환값 체크와 동시에  window.open() 호출을 try-catch문으로 감싸야합니다.

```
 let blocked = false 

 try {
   const abcWindow = window.open("http://www.abcabc.com", "_blank")
   if (abcWindow === null) {
     blocked = true
   }
 } catch (err) {
   blocked = true
 }

 if (blocked) alert('The popup was blocked!')
```
------

## 인터벌과 타임아웃
브라우저에서 자바스크립트는 단일 스레드로 실행되지만 타임아웃과 인터벌을 통해 코드가 특정 시간에 실행되게끔 조절 할 수 있습니다. 타임아웃은 일정 시간 뒤에 코드를 실행하는 것이고, 인터벌은 일정 시간마다 코드를 반복 실행하는 것 입니다.

타임아웃은  window 의  setTimeout()  메서드로 설정합니다.
이 메서드는 매개변수 1. 실행할 코드(Function)이고, 2. 코드를 실행할 때 까지 기다리는 시간 입니다.

두 번째 매개변수인 대기 시간은 엄밀히 말해 코드가 실행될 때 까지의 시간은 아닙니다. JS 는 단일 스레드이므로 한 번에 한가지 코드만 실행 가능합니다. 자바스크립트는 큐(Queue)를 이용해 각 코드(작업)의 실행을 관리합니다. 각 작업은 큐에 추가된 순서대로 실행됩니다.  setTimeout() 의 두 번째 매개변수는 자바스크립트 엔진이 해당 ms만큼 기다린 다음 작업을 큐에 추가하도록 합니다. 큐가 빈 상태였다면 코드는 즉시 실행되지만 큐가 비어있지 않다면 코드는 차례를 기다려야합니다.

 setTimeout() 을 호출하면 해당 타임아웃의 숫자형 id를 반환하는데, 타임아웃 id 는 코드의 고유 식별자이며 타임아웃을 취소할 때 사용합니다. 대기중인 타임아웃을 취소하려면 clearTimeOut()  메서드에서 타임아웃 id를 넘깁니다. 

```
 const timeout = setTimeout(() => {
   console.log('Hello World')
 })

 clearTimeout(timeout)
```
정해진 시간이 되기 전에  clearTimeout() 을 호출하기만 하면 타임아웃은 완전히 취소됩니다. 코드가 실행된 뒤에는 clearTimeout() 을 호출해도 아무효과도 없습니다. 타임아웃으로 실행하는 코드는 항상 전역 스코프에서 실행되므로 함수의 this 값은 스트릭트 모드에서는 항상 undefined 입니다.(예제필요)

인터벌은 타임아웃과 비슷하지만 페이지가 종료되거나 인터벌을 취소하기 전에는 일정한 시간마다 코드를 반복 실행한다는 점이 다릅니다.  setInterval() 메서드로 인터벌을 설정하며 이 메서드는 setTimeout() 과 같은 매개변수를 갖습니다. 

 setInterval()  메서드 역시 인터벌 ID를 반환하여 나중에 인터벌을 취소할 때 쓸 수 있습니다.  clearInterval() 메서드는 이 id를 매개변수로 받아 해당 인터벌을 취소합니다. 인터벌을 취소하지 않으면 페이지가 떠 있는 동안은 계속 실행되므로 인터벌 취소는 타임아웃 취소보다 매우 중요합니다.

```
 const num = 0
 const max = 10
 const intervalId = null;

 function increment () {
   num++

   // 최댓값애 도달하면 대기중인 작업을 전부 취소
   if (num === 10) {
     clearInterval(intervalId)
     alert('Done!!')
   }
 }

 intervalId = setInterval(increment(), 500)
```
변수 num은 매 0.5초마다 증가하여 최댓값에 도달할 때 까지 반복하고, 최댓값에 도달하면 인터벌을취소합니다. 이 패턴은 타임아웃을 이용해서도 구현 가능합니다.

```
 const num = 0
 const max = 10

 function increment () {
   if () {
    setTimeout(increment(), 500)
   } else alert('Done!!')
 }
 ```

setTimeout(increment, 500)
타임아웃을 사용할 때는 다른 타임 아웃이 필요할 때만 설정되므로 취소를 위해 타임아웃 id를 추적할 필요는 없습니다. 사실 이 패턴은 인터벌 없이 인터벌을 설정하는 모범사례로 간주됩니다. 인터벌 사이의 시간을 정확히 보정하기 어렵고 이따금 일부 인터벌을 건너뛰기도 하기 때문입니다. 타임아웃을 사용하면 그런일은 일어나지 않습니다. 일반적으로 말해 인터벌은 쓰지 않는편이 좋습니다.

인터벌 / 타임아웃 실행에 관한 간단한 추가 정보는 여기 에서 추가로 확인할 수 있습니다.

------

## 시스템 대화상자
브라우저는  alert() ,  confirm() ,  prompt()  메서드를 통해 사용자에게 시스템 대화상자를 표시합니다. 이 대화상자는 현재 브라우저에 표시된 웹 페이지와는 무관하며 html 이 들어있지도 않습니다. 대화상자의 외관은 css가 아니라 운영체제/브라우저 설정에 따라 다릅니다. 또한 이들 대화상자는 동기적이고 모달modal 성질이 있어서 대화상자가 떠 있을 때는 코드 실행이 중지되고 대화상자를 닫아야 재개됩니다.

이런 시스템 대화상자는 사용자에게 정보를 제공하고 결정하도록 하는데 유용합니다. 시스템 대화상자에는 HTML, CSS, JS등이 없으므로 빠르고 쉽게 웹 애플리케이션에 사용할 수 있습니다.

크롬과 오페라에는 이들 시스템 대화상자에 관한 특별한 기능이 있습니다. 실행중인 스크립트가 시스템 대화상자를 두개 이상 생성될 경우 첫 번째 대화상자 다음부터는 사용자가 이들 대화상자를 차단할 수 있도록 하는 체크박스를 제공합니다. 체크박스를 체크하고 대화상자를 닫으면 이후 해당 페이지의 시스템 대화상자는 모두 차단됩니다.

크롬에서는 대화상자를 차단했는지 여부를 개발자가 알 수 없습니다. 대화 상자 카운터는 브라우저가 대기상태가 될 때마다 리셋되므로 두 가지 행동이 각각 대화상자를 표시한다면 체크박스는 어느 쪽에도 표시되지 않으며, 단 하나의 행동(이벤트) 에서 대화상자를 두 개 생성한다면 두 번째 대화상자에 있는 체크박스가 표시됩니다.

자바스크립트를 이용해 find, print 두 가지 대화상자를 더 표시할 수 있습니다. 두 대화상자는 모두 비동기적으로 표시되며 즉시 스크립트에 컨트롤을 반환합니다. 두 대화상자는 사용자가 브라우저의 인쇄, 찾기 메뉴를 이용할 때와 같은 대화상자입니다. 

```
// 인쇄 대화상자 표시
window.print()
// 찾기 대화상자 표시
window.find()  // 안됨!
```

-------------------

## location 객체
location 은 BOM에서 가장 유용한 객체중 하나입니다. location 객체는 현재 창에 불러온 문서 정보와 함께 일반적인 내비게이션 기능을 제공합니다. location 객체는 window 프로퍼티인 동시에 document 의 프로퍼티입니다. ( window.location 과 document.location 은 같은 객체를 가리킵니다.)  location 은 현재 문서에 대한 정보를 갖고있으며 URL을 파싱해서 몇 가지 조각으로 분리해 각각을 프로퍼티에 저장합니다.

|프로퍼티 이름|예제|설명|
|------|---|---|
|hash|"#contents"|#기호 다음에 문자가 오는 형태의 URL 해시.  URL에 해시가 없다면 빈 문자열입니다.|
|host|"www.wrox.com:80"|서버 이름과 포트 번호(있다면)입니다.|
|hostname|"www.wrox.com"|포트 번호를 제외한 서버 이름입니다.|
|href|"http://www.abcabc.com"|현재 페이지의 완전한 URL 입니다. location의 toString() 메서드는 이 값을 반환합니다.|
|pathname|"/WileyCDA/"|URL에 포함된 디렉터리 및 파일 이름입니다.|
|port|"8080"|URL의 요청포트(존재한다면)입니다. URL에 포트가 없으면 이 프로퍼티는 빈 문자열을 반환합니다.|
|protocol|	"http"|페이지에서 사용하는 프로토콜입니다. 일반적으로 "http:"나 "https:" 둘중 하나입니다. 프로토콜을 스키마 라고 부르기도 합니다.|
|search|"?q=javascript"|URL 의 쿼리스트링 부분입니다. 물음표 기호로 시작하는 문자열을 반환합니다.|

			
## 쿼리스트링 확장
location 에 들어있는 정보는 대부분 이들 프로퍼티를 통해 쉽게 접근할 수 있습니다. URL 정보중 쿼리스트링은 다루기 쉬운 형태로 제공되지는 않습니다. location.search  프로퍼티가 URL 물음표 다음을 반환하긴 하지만, 쿼리스트링 매개변수를 하나씩 분리해서 제공하지는 않습니다. 다음 함수는 쿼리스트링을 파싱해서 각 매개변수를 프로퍼티로 갖는 객체를 반환합니다. 

```
 function getQueryStringArgs () {
   // 물음표 뒤의 쿼리스트링을 가져옵니다.
   const location = window.location
   const qs = location.search.length > 0 ? location.search.subString(1) : "",
         args = {},
         items = qs.length ? qs.split('&') : []  // params

   let name = null,
       value = null

   for (let i = 0; i < items.length; i++) {
     item = items[i].split('=')
     name = decodeURIComponent(item[0])
     value = decodeURIComponent(item[1])

     if (name.length) args[name] = value
   }
 }
```

이 함수는 우선 쿼리스트링 맨 앞의 물음표를 제거합니다. 이 작업은 location search가 한 개 이상의 문자를 반환할 때만 이루어집니다. 다음에는 args 객체를 리터럴 형식으로 생성하고 매개변수를 저장합니다. 쿼리스트링을 앰퍼샌드(&) 문자로 분리하여 name = value 형식의 문자열로 이루어진 배열을 얻습니다. for 루프로 이 배열을 순회하며 각 문자열을 = 기호로 나눕니다. 반환된 배열의 첫 번째 데이터가 매개변수 이름이며 두 번째 데이터는 값입니다. 쿼리스트링 매개변수는 대개 인코드 되어있으므로 decodeComponent()로 디코드 하여 name, value 에 저장합니다. 마지막으로 name을 args 객체의 프로퍼티로 할당하고 value를 지정합니다.

```
 // 쿼리 스트링이 ?q=javascript&num=10 이라고 가정합니다.
 const args = getQureryStringArgs();

 console.log(args["q"]);   // "javascript"
 console.log(args["num"])  // "10"
```
쿼리스트링의 각 매개변수는 반환 객체의 프로퍼티이므로 각 매개변수에 쉽게 접근 가능합니다.


## location 조작
다양한 방법으로 location 객체를 조작해서 페이지를 이동할 수 있습니다. 가장 자주 쓰이는 assign() 메서드는 다음 예제처럼 사용합니다.

```
 location.assign("http://www.wrox.com")
```
이렇게 하면 즉시 새 URL로 이동하며 브라우저의 히스토리 스택에 기록이 추가됩니다. location.href 이나 window.location 에 URL을 지정하면 그 값으로 assign() 메서드를 호출합니다. 예를 들어 다음 코드는  assign() 을 명시적으로 호출한 것과 같습니다.

```
window.location = "http://www.wrox.com"
location.href = "http://www.wrox.com"
```

페이지를 이동하는 이 세 가지 방법 중에서 location.href 를 설정하는 방법이 가장 자주 쓰입니다.

 location 객체의 프로퍼티를 변경하면 현재 페이지에도 영향이 있습니다. 다음과 같이 hash ,  search ,  hostname ,  pathname ,  port 프로퍼티를 변경하면 현재 URL에 새 값이 반영됩니다.

```
 // 현재 http://www.wrox.com/WileyCDA/ 에 있다고 가정합니다.

 // http://www.wrox.com/WileyCDA/#search1 로 변경
 location.hash = "#section1"

 // http://www.wrox.com/WileyCDA/?q=javascript 로 변경
 location.search = "?q=javascript"

 // http://www.yahoo.com/WileyCDA/로 변경
 location.hostname = "www.yahoo.com"

 // http://www.yahoo.com/WileyCDA/mydir 로 변경
 location.pathname = "mydir"
```

location  객체의 프로퍼티를 바꿀 때마다 새 URL로 페이지를 다시 읽는데,  hash 프로퍼티를 바꿀때는 예외입니다. 

IE8+, firefox, safari 2+, opera9+ chrome에서는 hash 값을 바꾸면 브라우저 히스토리에 새 기록이 추가됩니다.
앞에서 언급한 방법으로 URL을 수정하면 브라우저의 히스토리 스택에 기록이 남아서 사용자가 뒤로가기 버튼을 클릭해 이전 페이지로 돌아갈 수 있습니다.

replace() 메서드를 쓰면 뒤로가기 버튼을 클릭해 이전 페이지로 돌아갈 수 없습니다. 이 메서드는 매개변수로 URL을 받아서 이동하지만 히스토리 스택에는 기록을 남기지 않습니다. 일단 이동하면 뒤로가기 버튼은 비활성화되므로 예제 페이지로 돌아가려면  URL을 다시 입력해야합니다.

reload()  메서드는 현재 페이지를 다시 불러옵니다. 매개변수 없이 호출하면 페이지를 가능한 한 가장 효과적인 방법으로 다시 읽습니다. 말하자면 마지막 요청 이후에 페이지가 바뀌지 않았다면 브라우저 캐시에서 읽어옵니다. 서버에서 읽어오도록 강제하려면 다음과 같이  true 를 매개변수로 넘깁니다.

```
 location.reload()   // 가능하면 캐시에서
 location.reload(true)   // 항상 서버에서
```

reload()  호출 이후에 있는 코드는 네트워크 지연이나 시스템 자원 같은 요인에따라 실행될 수도 있고 아닐 수도 있습니다. 따라서 reload() 는 코드 마지막에 두는 편이 최선입니다.

-------------------

## navigator 객체
navigator 객체는 원래 넷스케이브 내비게이터 2에서 도입했고, 이후 클라이언트에서 브라우저를 구별하는 방법의 표준으로 사용했습니다. 일부 브라우저에서 다른 방법을 통해 비슷한 정보를 제공하긴 했지만 JS를 지원하는 웹 브라우저는 모두  navigator 객체를 지원합니다. 다른 BOM 객체와 마찬가지로 브라우저에 따라 navigator 객체에서 지원하는 프로퍼티가 다릅니다.

프로퍼티 / 메서드	설명
- appCodeName	브라우저 이름. Mozilla 브라우저가 아니어도 일반적으로 "Mozilla"
- appMinorVersion	추가적인 버전 정보
- appName	완전한 브라우저 이름
- appVersion	브라우저 버전. 일반적으로 브라우저 실제 버전과는 다름
- build	브라우저의 빌드 번호
- cookieEnabled	쿠키가 활성화 되어있는지 나타냄
- cpuClass	클라이언트 컴퓨터의 CPU 타입입니다. x86, 68K, Alpha, PPC, Other 이 존재.
- javaEnabled()	브라우저에 자바가 활성화되어있는지 나타냄.
- language	브라우저의 우선적 언어를 나타냄.
- mimeType	브라우저에 등록된 마임타입을 나열한 배열
- onLine	브라우저가 인터넷에 연결되어있는지 나타냄
- opsProfile	거의 사용하지 않으며 문서 존재 X
- oscpu	브라우저가 실행중인 운영체제와  CPU를 나타냄.
- platform	브라우저가 실행중인 시스템 운영체제
- plugins	브라우저에 설치된 플러그인을 나열한 배열. IE 에서는 페이지의 <embed> 요소를 나열한 배열
- preference()	사용자 선호사항을 설정. 특권모드에서만 접근 가능
- product	브라우저 이름. 일반적으로 Gecko
- productSub	브라우저에대한 추가정보, 일반적으로 Gecko 버전 정보
- registerContentHandler()	웹사이트를 특정 마임 타입 처리기로 등록
- registerProtocolHandler()	웹사이트를 특정 프로토콜 처리기로 등록
- securityPolicy	보안정책 이름이지만 폐기됨. 넷스케이프 내비게이터 4와의 하위 호환성 때문에 유지
- systemLanguage	운영체제의 언어
- taintEnabled()	변수 테인트taint 가 활성화 되어있는지 나타내지만 폐기됨. 넷스케이프 내비게이터 3과의 하위 호환성 때문에 유지
- userAgent	브라우저 문자열user-agent-string
- userLanguage	운영체제의 기본 언어
- userProfile	사용자 프로필 정보에 접근할 때 사용하는 객체
- vender	브라우저 제조사 이름
- venderSub	제조사에 대한 추가 정보
- navigator 객체의 프로퍼티는 일반적으로 웹 페이지를 실행중인 브라우저 타입을 판단하는데 사용합니다. (추후 추가 예정)

## 플러그인 감지
스크립트로 가장 많이 탐지하는 것 중 하나는 브라우저에 특정 플러그인이 설치되어있는지 입니다. IE 이외의 브라우저에서는 navigator 객체의 plugins 배열에서 이 정보를 얻을 수 있습니다. 이 배열의 각 데이터는

-  name :: 플러그인 이름
-  description :: 플러그인 설명
-  filename :: 플러그인의 파일 이름
-  length :: 플러그인이 처리하는 마임타입 숫자

 네가지 프로퍼티를 가집니다.

일반적으로  name  만 있으면 플러그인을 식별하기 충분하지만 항상 옳지만은 않기 때문에 플러그인 탐지는 보통 다음과 같이 루프를 돌면서 원하는 이름과  name 을 대조하는 방식을 사용합니다.

```
 // plugin 탐지 - IE에서는 동작하지 않습니다.
 function hasPlugin (name) {
   name = name.toLowerCase()
   for (let i = 0; i < navigator.plugins.length; i++) {
     if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
       return true
     }
   }
   return false
 }

 // 플래시를 찾는경우
 console.log(hasPlugin("Flash"))

 // 퀵타임을 찾는 경우
 console.log(hasPlugin("QuickTime"))
```

예제는 원하는 플러그인 이름을 매개변수로 받고, 간단히 비교하기 위해 첫 번째 단계에서 주어진 이름을 소문자로 바꿨습니다. 다음에는  plugins  배열을 순회하면서 name  프로퍼티마다 indexOf() 를 써서 주어진 이름이 문장 속에 있는지 체크합니다. 에러를 방지하기 위해 전부 소문자로 비교합니다. 

각  plugins  객체는  mimeType 객체의 배열이기도 하며 대괄호 표기법으로 접근 가능합니다. 각  mimeType 객체에는 프로퍼티가 네 개 있습니다. 마임 타입 설명인  description ,  plugin 객체를 가리키는 포인터인  enabledPlugin , 마임 타입의 파일 확장자를 쉼표로 구분한 문자열인  suffixes , 마지막으로 완전한 마임 타입 문자열인  type 입니다.

IE 지원에 대한 정보 -

IE는 넷스케이프 스타일 객체를 지원하지 않으므로 플러그인 탐지가 어렵습니다. IE에서 플러그인을 탐지하는 유일한 방법은 전용 타입인  ActiveXObject 를 사용해서 플러그인을 인스턴스 화 해보는 것입니다. IE는 플러그인을 COM객체로 구현했고 이들은 고유한 문자열로 식별됩니다. 따라서 특정 플러그인을 체크하려면 해당 플러그인의 COM 식별자를 알아야합니다. 예를들어 플래시의 COM 식별자는 "ShockwaveFlash.ShockwaveFlash" 입니다. 이 정보가 있으면 다음과 같이 IE에서 플러그인이 설치되어있는지 판단하는 함수를 만들 수 있습니다.

```
 // IE용 플러그인 탐지
 function hasIEPlugin(name) {
   try {
    new ActiveXObject(name)
     return true
   } catch (ex) return false
 }

 // 플래시를 찾는경우
 console.log(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"))

 // 퀵타임을 찾음
 console.log(hasIEPlugin("QuickTime.QuickTime"))
```
이 예제에서 함수는 COM 식별자를 매개변수로 받습니다. 함수는 새 ActiveXObject 인스턴스 생성을 시도합니다. 미확인 COM 객체 생성을 시도하면 에러가 생기므로 try-catch 문을 사용했습니다. 따라서 시도가 성공하면 함수는 true를 반환합니다. 예제에서는 이 함수를 이용해 플래시가 설치되어있는지, 퀵타임이 설치되어있는지 체크했습니다. 

plugins 컬랙션에는 refresh() 라는 메서드가 있는데, 이 메서드는 새로 설치된 플러그인이 반영 되도록 plugins를 갱신합니다. 이 메서드는 매개변수로 페이지를 새로고침해야하는지 나타내는 불리언 값을 받습니다. true를 넘기면 페이지를 새로고침하여 그렇지 않응면 plugins 컬렉션은 업데이트 하되 페이지를 새로고침하지는 않습니다.



## 처리기 등록
Firefox 2는 navigator 객체에 registerContentHandler() 와  registerProtocolHandler() 메서드를 도입했습니다. 이 메서드는 웹사이트가 특정한 타입의 정보를 처리할 수 있음을 나타냅니다. 온라인 RSS 리더와 온라인 이메일 애플리케이션은 이 메서드를 써서 파일 확장자에 데스크톱 애플리케이션을 연결하듯 자신을 마임타입 핸들러로 등록합니다.

registerContentHandler()  메서드는 1. 처리할 마임 타입, 2. 해당 마임타입을 처리할 URL, 3. 애플리케이션 이름 세가지 매개변수를 받습니다. 예를들어 어떤 사이트를 RSS 피드 처리기로 등록하려면 다음과 같은 코드를 사용합니다.

```
 navigator.registerContentHandler(
   'application/rss+xml',
   'http://www.somereader.com?feed%s',
   'Some reader'
 )
```

첫 번째 매개변수는 해당 RSS 피드의 마임타입 입니다. 두 번째 매개변수는 RSS 피드의 URL을 넘겨받아 처리할 URL입니다. 두 번째 매개변수의 %s 는 RSS 피드의 URL 인데 브라우저가 자동으로 삽입합니다. 이를 실행한 다음 부터는 RSS 피드에 대한 요청을 보내면 지정한 URL로 이동하고 웹 애플리케이션에서 적절한 방법으로 요청을 처리합니다.

Firefox 4 까지는  registerContentHandler() 에 "application/rss+xml" ,  "application/atom+xml"  ,  "application/vnd.mozilla.maybe.feed" 세 가지 마임 타입만 허용합니다. 세 가지중 무엇을 쓰든, 모든 RSS 및 이름 피드에 대한 처리기를 등록합니다.

프로토콜도 비슷한 방법으로 등록합니다.  registerProtocolHandler() 는 1. 처리할 프로토콜, 2. 프로토콜을 처리할 페이지 URL, 3. 애플리케이션 이름 을 매개변수로 받습니다. 예를들어 웹 애플리케이션을 기본 이메일 클라이언트로 등록하는 코드는 다음과 같습니다.

```
 navigator.regisetrProtocolHandler(
   'mailto',
   'http://www.somemailclient.com?cmd=%s',
   'Some Mail Client'
 )
```

이 예제애서는 malito 프로토콜 처리기에 웹 기반 이메일 클라이언트를 등록했습니다. 두 번째 매개변수는 요청을 처리할 URL 이며 %s는 실제 요청입니다.

-----------------

## screen 객체
screen 객체 역시 window 프로퍼티인데, 프로그램 관련 용도가 거의 없는 몇 안되는 JS 객체중 하나입니다. 이 객체에는 px 너비와 높이 등 클라이언트 화면에 관한 정보가 들어있습니다. 브라우저별로 screen 객체에서 지원하는 프로퍼티가 다릅니다.

클라이언트 정보를 측정하는 사이트 추적도구에서 이런 정보를 수집하기는 하지만 일반적으로 이에따라 제공하는 기능이 달라지는 일은 없습니다. 이 정보를 이용해 브라우저창을 화면에 꽉 차게 만들수도 있습니다..

`
 window.resizeTo(screen.availWidth, screen,availHeight)
`
이미 언급했든 많은 브라우저에서 이 기능을 제한하므로 이 코드는 동작하지 않을 때가 많습니다.

모바일 장치는 화면 크기에서 조금 다르게 동작합니다. iOS 장치는 항상 세로모드 크기(1024 * 768)을 반환합니다. 반면 안드로이드 장치는 장치 방향이 바뀔 때마다 screen.width 와  screen.height 값을 업데이트 합니다.

---------

## history 객체
history 객체는 창을 연 이후의 사용자의 내비게이션 히스토리를 보관합니다. history 는 window의 프로퍼티이므로 브라우저 창, 탭, 프레임은 각각 자신의  window 객체에 속한 history 객체를 가집니다.

페이지의 URL 이 바뀔 때마다 히스토리 스택에 새 기록이 추가되며, URL hash 포함하는 경우 브라우저에서  location.hash 를 설정하면 히스토리 스택에 새 기록이 추가됩니다.

보안 문제로 사용자가 방문했던 URL을 알 수는 없지만, 정확한 URL을 몰라도 사용자가 방문했던 목록을 통해 뒤로 가기, 앞으로 가기 등의 동작은 가능합니다.

go() 메서드는 사용자의 히스토리에서 매개변수로 받은 이동할 페이지 수(Int) 만큼 이동 합니다. 음수를 받으면 뒤로이동, 양수를 받으면 앞으로 이동 입니다.

```
 // 한 페이지 뒤로
 history.go(-1)

 // 한 페이지 앞으로
 history.go(1)
```

go()  메서드는 매개변수로 문자열도 받을 수 있는데, 이 경우 브라우저는 히스토리에서 해당 문자열을 포함한 첫 번째 위치로 이동합니다. 가장 가까운 위치를 찾을 때 방향을 고려하지는 않습니다. 

go() 메서드 대신 단축 메서드인 back() 과 forward()  메서드를 사용할 수도 있습니다.

history 객체의 length 프로퍼티는 history 스택에 기록이 얼마나 많이 있는지 나타냅니다.  창이나 탭, 프레임에서 연 첫 번째 페이지에서 history.length 는 0입니다. 이 값을 확인해서 페이지가 사용자가 처음 연 페이지 인지 알 수도 있습니다.

```
if (history.length == 0) {
  // ...
}
```

자주 사용하지는 않지만 history 객체는 일반적으로 뒤로/앞으로 가기를 담당하는 커스텀 버튼을 생성하고 현재 페이지가 사용자의 히스토리에 있는 첫 번째 페이지인지 알아내는 용도로 쓰입니다. HTML5는 history  객체의 기능을 더 확장했습니다. (추가 예정)
