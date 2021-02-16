# Document 타입

JS는 문서 노드를 Document 타입으로 표현합니다. 브라우저에서 전체 HTML 페이지를 표현하는 문서 객체를 HTMLDocumenet 의 인스턴스이며 HTML Document는 Document를 상속합니다.

document객체는 window의 프로퍼티이므로 전역에서 접근할 수 있습니다. Document 노드에는 다음 특징이 있습니다.

* nodeType 은 9입니다.
* nodeValue 는 '#document' 입니다.
* parentNode는 null 입니다.
* ownerDoucment 는 null 입니다.

자식노드로 DocumentType(최대 1개) Element(최대 1개), Processing Instruction, Comment를 가질 수 있습니다.

HTMLDocument의 인스턴스인 Document 타입은 HTML 페이지 또는 XML 기반 문서를 표현하며 document 객체를 통해 페이지에 대한 정보 습득 및 조작이 가능합니다.

## Document의 자식 노드

DOM 명세에서는 Document 노드가 가질 수 있는 자식노드의 단축 표기도 있습니다.

documentElement 프로퍼티는 항상 HTML 페이지의 <html> 요소를 가리킵니다. 이 프로퍼티는 해당 요소(<html>)에 더 빨리, 직접적으로 접근합니다.
  
``` html
  <html>
    <body></body>
  <html>
```

브라우저가 이 페이지를 파싱하면 문서의 자식 노드는 <html> 요소 하나 뿐입니다. 이 요소는 다음과 같이 `documentElement` , `childNodes` 목록 두 가지 방법으로 접근할 수 있습니다. 
  
``` js
  const html = document.documentElement         // html 에 대한 참조
  console.log(html === document.childNodes[0])  // true
  console.log(html === document.firstChild)     // true
```

이 예제는 값이 모두 <html> 요소를 가리킵니다.

document 객체는 HTMLDocument의 인스턴스이므로 <body> 요소를 직접적으로 가리키는 body 프로퍼티를 갖습니다. `document.body` 는 매우 자주 사용됩니다.

``` js
  const body = document.body // <body>에 대한 참조
```

주요 브라우저는 모두 `document.documentElement` 와 `document.body` 둘 다 지원합니다.

Document가 가질 수 있는 또다른 자식 노드는 DocumentType 입니다. <!DOCTYPE> 태그는 문서의 다른부분과는 별도의 엔티티로 간주하며 포함된 정보는 `document.doctype` 프로퍼티를 통해 접근할 수 있습니다.

``` js
  const doctype = document.doctype // <!DOCTYPE> 에 대한 정보를 얻음
```

브라우저마다 `document.doctype` 을 달리 지원하므로 유용하게 쓰기는 어렵습니다. 

``` html
  <!-- first comment -->
  <html>
    <body></body>
  </html>
  <!-- second comment -->
```
<html> 요소 밖에 있는 주석은 기술적으로는 문서의 자식노드입니다. 이것 또한 브라우저 지원은 각자 달라서 이런 주석을 인식하고 적절히 표현할지는 브라우저에 따라 다릅니다.

문서타입은 읽기 전용이고 요소 자식 노드는 하나만 가질 수 있고,  document에 이미 <html>요소가 존재하므로 `appendChild()` 나 `replaceChild()` ,  `removeChild()` 메서드를 document에서 호출하는 일은 거의 없습니다.

## 문서 정보
 document객체는 HTMLDocument의 인스턴스이므로 표준 Document 객체에는 존재하지 않는 프로퍼티를 여럿 가집니다. 이들 프로퍼티는 현재 불러들인 웹 페이지에 대한 정보입니다. 

``` js
  // 문서 <title>
  const originalTitle = document.title
  document.title = "New page title"

  // 이 정보는 모두 요청의 HTTP 헤더에 들어있습니다.
  // https://www.abc.com/page1
  const url = document.URL
  const domain = document.domain // www.abc.com
  const referrer = document.referrer
```

* `title` :: 브라우저 창 또는 탭의 제목인 <title> 요소 텍스트. 현재 페이지의 제목 읽기 및 설정 가능. 값을 바꿔도 <title> 요소는 변함이 없음
* `URL` :: 페이지의 완전한 URL(주소 표시줄에 있는 URL) 포함
* `domain` :: 페이지의 도메인 이름
* `referrer` :: 이 페이지를 링크한 페이지의 URL. 해당 페이지가 없을경우 referrer 프로퍼티에는 빈 문자열이 저장


## Element 타입

웹 프로그래밍 에서 Document 타입 다음으로 자주 쓰는 타입은 Element 타입입니다. Element 타입은 XML/HTML 요소를 표현하며 이를 통해 태그 이름이나 자식, 속성같은 정보에 접근가능합니다. Element 노드에는 특징이 있습니다.

* `nodeType` 은 1입니다.
* `nodeName` 은 요소의 태그 이름입니다.
* `nodeValue` 는 null 입니다.
* `parentNode`는 Document 또는 Element 입니다.
* `ownerDoucment` 는 null 입니다.
* 자식노드로 Element나 Text, Comment, ProcessingIntsruction, CDATA Section, EntityReference를 가질 수 있습니다.

요소의 태그 이름은 `nodeName` 프로퍼티나 `tagName` 프로퍼티로 얻을 수 있습니다.

``` js
  // <div id="myDiv"></div>
  const div = document.getElementById('myDiv')
  console.log(div.tagName)  // DIV  :: HTML에서는 항상 대문자 반환
  console.log(div.tagName === div.nodeName) // true
```

## HTML 요소

HTML 요소는 모두 HTMLElement타입을 통해 표현됩니다. HTMLElement는 Element를 직접적으로 상속하며 몇 가지 프로퍼티가 추가됩니다. 각 프로퍼티는 모든 HTML 요소에서 사용가능한 표준 속성중 하나를 나타냅니다.

id - 요소의 고유한 식별자
title - 요소에 대한 추가 정보이며 일반적으로 마우스를 가져가면 툴팁으로 표현됩니다.
lang - 요소 콘텐츠의 언어 코드인데 거의 쓰이지 않습니다.
dir - 언어의 표기 방향. 'ltr' 왼쪽 -> 오른쪽, 'rtl' 오른쪽 -> 왼쪽으로 쓰는 언어 의미
className - 요소의 CSS 클래스인 class 속성 의미. class는 ECMAScript의 Class 때문에 className 으로 사용됨.
각 프로퍼티는 속성 값을 읽기 및 설정하는 용도로 사용합니다.

// <div id="myDiv" class="ab cd" title="Body Text" lang="en" dir="ltr"></div>
const div = document.getElementById('myDiv')

console.log(div.id = 'divId') // divId
console.log(div.className = 'ef gh') // ef gh
console.log(div.title = 'texting') // texting
console.log(div.lang = 'fr') // fr
console.log(div.dir = 'rtl') // rtl
프로퍼티를 변경해도 페이지에 바로 반영되지 않는 경우도 있으므로 사용자는 알 수 없으며 title 프로퍼티의 경우는 요소 위에 마우스를 가져가야 바뀐 것을 알 수 있습니다.

속성 (attribute) 얻기

각 요소(element) 는 속성을 가질 수 있으며 속성에는 일반적으로 해당 요소나 콘텐츠에 대한 정보가 들어있습니다. 속성에 대한 DOM 메서드는 getAttribute(), setAttribute(), removeAttribute() 입니다. 이들 메서드는 HTMLElement 타입에 정의된 프로퍼티를 포함해 모든 속성을 다룰 수 있도록 만들어졌습니다. 속성 이름은 대소문자를 구분하지 않습니다.

// <div id="myDiv" class="ab cd" my_attribute="hello" onClick="console.log(1)"></div>
console.log(div.getAttribute('class')) // ab cd
console.log(div.getAttribute('my_attribute')) // hello
console.log(div.getAttribute('MY_AtTrIbUte')) // hello

console.log(div.id) // myDiv
console.log(div.my_attribute) // undefined

console.log(div.style) // [ object CSSStyleDelcaration ]

console.log(div.getAttribute('onclick')) // console.log(1)
console.log(div.onClick) // function onclick(event) { console.log(1) }
style 속성은 CSS 텍스트를 반환하지만 프로퍼티는 객체를 반환합니다. style 프로퍼티는 style 속성과 직접 연결되지는 않습니다.
onclick 같은 이벤트 핸들러 속성은 JS 코드이며 getAttribute()는 해당 코드 문자열을 반환하지만 onclick 프로퍼티는 함수 자체를 반환하고 해당 속성이 없을 경우 null을 반환합니다. 이는 onclick을 비롯한 이벤트 처리 프로퍼티가 자신에게 할당된 함수에 접근할 수 있기 때문입니다.

이러한 차이 때문에 개발자들은 JS로 DOM을 다룰 때 객체 프로퍼티를 주로 사용하며, getAttribute()는 커스텀 속성의 값을 가져올 때 사용합니다.

속성 설정

div.setAttribute('id', 'sample')

div.id = 'new sample'
setAttribute()는 1. 속성 이름과 2. 설정할 값 두가지를 매개변수로 받습니다. 속성은 모두 프로퍼티이므로 프로퍼티에 직접 할당하는 것은 속성 값을 설정하는것과 마찬가지 입니다.

div.mycolor = 'red'
alert(div.getAttribute('mycolor')) // null
그러나 DOM 요소에 커스텀 프로퍼티를 추가해도 요소에 자동으로 속성이 추가되지는 않습니다. 

요소에서 속성을 제거하는 removeAttrebute()는 속성의 값뿐 아니라 요소에서 속성을 완전히 제거합니다.

div.removeAttrivute('class')
attributes 프로퍼티

Element 타입은 DOM 노드 타입중 attribute프로퍼티를 갖는 유일한 타입입니다. attribute에서는 NameNodeMap이 저장됩니다. 요소의 속성은 모두 Attr 노드로 표현되며 각 Attr 노드는 NameNodeMap 객체에 저장됩니다.

NameNodeMap 객체는 다음 메서드가 있습니다. (그러나 잘 사용하지는 않습니다.)

- getName(name) :: nodeName 프로퍼티가 name인 노드를 반환합니다.
- removeNamed(name) :: nodeName 프로퍼티가 name인 노드를 목록에서 제거합니다
- setNamedItem(node) :: node를 목록에 추가하고 nodeName 프로퍼티에 따라 색인합니다
- item(pos) :: 인덱스가 pos인 노드를 반환합니다.

attribute 프로퍼티 안의 각 노드는 nodeName이 속성이름이며 nodeValue는 속성 값입니다. 

// divㄴㅡㄴ nodeType === 1 (Element ㅌㅏㅇㅣㅂ)
const attrs = div.attributes
console.log(attrs)  // [object NamedNodeMap]

console.log(attrs.getNamedItem('id').nodeValue) // div
console.log(attrs['id'].nodeValue)  // div

attrs['id'].nodeValue = 'new_id'

attrs.removeNamedItem('id') // ㅈㅜㅇㅓㅈㅣㄴ ㅇㅣㄹㅡㅁㅇㅡㅣ ㅅㅗㄱㅅㅓㅇ ㅈㅔㄱㅓ
attribute가 유용한 경우는 요소의 속성을 대상으로 루프가 필요할 때 입니다. DOM구조를 XML이나 HTML 문자열로 직렬화 할 때가 그런 경우입니다.

function outputAttributes (element) {
  const pairs = []
  const attrs = element.attributes
  
  for (let i = 0; i < attrs.length; i++) {
    const attrName = attrs[i].nodeName
    const attrValue = attrs[i]nodeValue

    pairs.push(`${attrName}='${attrValue}'`)
  }
  
  return pairs.join(' ')
}
해당 함수는 이름-값 쌍 순으로 이루어진 배열을 만든 다음 name='value' name='value' 형태의 문자열로 만듭니다.(직렬화 할때 주로 사용) 여기서 눈여겨볼 점은 브라우저에 따라 attribute 객체의 속성을 반환하는순서가 다릅니다.

요소의 자식

요소는 자식 요소나 자손 요소를 가질 수 있으며 숫자 제한이 없습니다. ChildNodes 프로퍼티에는 요소의 자식 요소가 모두 담기는데, 다른 요소나 텍스트노드, 주석, 처리 지침(processing instruction)이 모두 포함됩니다.

for (let i = o, i < element.childNodes.length; i++) {
  if (element.childNodes[i].nodeType === 1) {
    // ㅊㅓㄹㅣ
  }
}
childNodes 는 모든 요소를 포함하므로, nodeType을 확인하여 원하는 요소들을 확인하여 사용할 수 있습니다.



Text 타입
Text 노드는 Text 타입으로 표현됩니다. 이 노드에는 평범한 텍스트가 포함되고, 이스케이프된 HTML 문자는 포함할 수 있지만 HTML 코드는 포함 할 수 없습니다. Text 노드에는 다음과 같은 특징이 있습니다.

- nodeType 은 3입니다.
- nodeName 은 '#text' 입니다.
- nodeValue 는 노드에 포함퇸 텍스트입니다.
- parentNode 는 Element 입니다.
- 자식 노드를 가질 수없습니다.

Text 노드에 포함된 텍스트는 nodeValue 프로퍼티나 data 프로퍼티로 가져올 수 있습니다.  둘 중 하나를 바꾸면 노드에 반영됩니다. 다음은 노드의 텍스트를 조작하는 메서드입니다.

- appendData(text) - 노드 마지막에 text를 추가합니다
- deleteData(offset, count) - offset 부터 count 만큼 삭제합니다.
- insertData(offset, text) - offset 위치에 text를 삽입합니다.
- replaceData(offset, count, text) - offset부터 (offset + count) 까지의 텍스트를 text로 교체합니다.
- splitText(offset) - offset 위치를 기준으로 텍스트 노드를 둘로 나눕니다.
- substringData(offset, count) - offset 위치부터 (offset + count) 까지의 텍스트를 꺼냅니다.
- length - 노드의 글자 개수를 반환합니다.

<!-- 콘텐츠가 없으므로 텍스트 노드도 없음 -->
<div></div>

<!-- 공백 텍스트 노드가 하나 있음 -->
<div> </div>

<!-- 텍스트 노드가 있음 -->
<div> Hello World! </div>
기본적으로 콘텐츠를 가질 수 있는 요소는 모두 최대 하나의 텍스트 노드를 가질 수 있습니다. 다음 코드로 테스트 노드에 접근 가능합니다. 텍스트 노드의 값을 바꿀 때 문서 타입에 따라 HTML 또는 XML에 맞게 인코드 됩니다. 즉 >, <, " 등이 이스케이프 됩니다.

const textNode = div.firstChild // div.childNode[0]도 가능

div.firstchild.nodeValue = "Some other message" // 텍스트 노드 수정

// "Some &lt;strong&gt;other&lt;/string&gt; message"
div.firstChild.nodeValue = "Some <strong>other</strong> message"
텍스트 노드 생성
새 텍스트 노드를 생성할 때는 document.createTextNode() 메서드를 사용합니다. 이 메서드는 매개변수로 삽입할 텍스트를 받습니다. 이미 존재하는 텍스트 노드의 값을 바꿀 때와 마찬가지로 이 메서드 역시 주어진 문자열을 HTML이나 XML에 맞게 인코드 합니다. 

const textNode = document.createTextNode('<strong>Hello</strong> world!')
새 텍스트 노드를 생성하면 ownerDocument 프로퍼티가 설정되지만 문서 트리에 삽입하기 전에는 브라우저 창에 표시되지 않습니다.

 Comment 타입
주석은 DOM 에서 Comment 타입으로 표현됩니다. Comment 노드에는 다음 특징이 있습니다.

- nodeType은 8 입니다
- nodeName은 '#comment'
- nodeValue는 주석 콘텐츠 입니다.
- parentNode는 Document 또는 Element 입니다.
- 자식 노드는 가질 수 없습니다.

Comment 타입은 Text 타입과 같은 원형을 상속하므로 Text 타입에 있는 문자열 메서드를 (splitText() 제외) 대부분 갖고있습니다.  Text 타입과 마찬가지로 nodeValue나 data 프로퍼티로 주석의 콘텐츠를 가져 올 수 있습니다.

// <div id="myDiv"><!-- 주석 --></div>

const comment = div.firstChild.data
console.log(comment)  // 주석
CDATASection 타입
CDATA 섹션은 XML 기반 문서 전용이며 CDATASection 타입으로 표현됩니다. Comment와 마찬가지로 CDATASection 타입 역시 Text 타입과 같은 원형을 상속하므로 splitText()를 제외한 문자열 메서드를 모두 가집니다. CDATASection 노드에는 다음 특징이 있습니다.

- nodeType은 4 입니다
- nodeName은 '#cdata-section' 입니다
- nodeValue는 CDATA 섹션의 콘텐츠입니다.
- parentNode는 Document 또는 Element 입니다
- 자식 노드는 가질 수 없습니다.

CDATA 섹션은 XML 문서에만 유효하므로 대부분 브라우저에서 CDATA 섹션을 부정확한 Comment나 Element 로 잘못 파싱합니다.

<div id="div"> <![CDATA[ This is some content ]]> </div>
CDATASection 노드는 <div>의 첫 번째 자식이어야 하지만 주요 브라우저 중에서 이렇게 파싱하는 브라우저는 하나도 없습니다. 유효한 XHTML 페이지에서조차 포함된 CDATA 섹션을 제대로 지원하지 않습니다. 

DocumentType 타입
DocumentType 타입은 자주 사용하지 않습니다. (FireFox, Safari, Opera)

- nodeType은 10입니다.
- nodeValue는 독타입 이름입니다.
- nodeValue는 null 입니다
- parentNode는 Document 입니다.
- 자식 노드는 가질 수 없습니다.

DOM 레벨 1 에선 DocumentType 객체를 동적으로 생성할 수 없으며 문서 코드를 파싱하는 동안에만 생성됩니다. 지원하는 브라우저는 DocumentType 객체를 document.doctype에 저장합니다. 프로퍼티는 name (독타입 이름), entities )(독타입이 정의하는 엔티티의 NamedNodeMap), notations (독타입이 정의하는 표기법의 NamedNodeMap)을 지원합니다. 브라우에서 불러오는 문서는 일반적으로 HTML이나 XHTML 이므로 entities와 notations는 보통 빈 목록입니다. name 프로퍼티에 저장되는 독타입 이름은 <!DOCTYPE  바로 뒤에 있는 텍스트입니다.

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
이 독타입의 name 프로퍼티 결과는 "HTML" 입니다.

DocumentFragment








<ul id="myList"></ul>
이 ul 요소에 li 요소를 세 개 추가하려합니다. 각 요소를 직접적으로 추가하면 브라우저가 그 때마다 페이지에 새 정보를 반영하고 다시 렌더링 해야합니다. 다음 코드처럼 문서 버퍼를 생성하고 <li> 요소를 동시에 추가하는 편이 좋습니다.

const fragment = document.createDocumentFragment()
const ul = document.getElementById('myList')
const li = null

for (let i = 0; i < 3; i++) {
  li = document.createElement('li')
  li.appendChild(document.createTextNode(`Item ${i + 1}`)
  fragment.appendChild(li)
}

ul.appendChild(fragment)
Attr 타입
요소의 속성은 DOM 에서 Attr 타입으로 표현됩니다. 기술적으로 속성은 요소의 attribute 프로퍼티 안에 존재하는 노드입니다. Attribute 노드에는 다음 특징이 있습니다.

- nodeType은 11 입니다.
- nodeName은 속성 이름 입니다.
- nodeValue는 속성 값입니다.
- parentNode는 null 입니다.
- HTML 에서는 자식 노드를 가질 수 없습니다.
- XML 에서는 자식 노드로 Text, EntityReference를 가질 수 있습니다.

속성 역시 노드지만 DOM 문서 트리의 일부분으로 간주되지는 않습니다. Attribute 노드를 직접 참조하는 경우는 드물며 개발자들은 보통 getAttribute(), setAttribute(), removeAttribute()를 더 선호합니다. 



DOM 다루기
DOM 조작은 대개 매우 단순하며 자바스크립트를 쓸 때도 일반적인 HTML 코드와 마찬가지로 하면 됩니다. 하지만 이따금은 DOM 조작이 눈에 보이는 것 만큼 단순하진 않을 때도 있습니다. 브라우저는 버그와 비일고나성이 많아서 DOM 코딩을 다른 코딩보다 어렵게 만듭니다.

동적 스크립트
<script> 요소는 자바스크립트 코드를 페이지에 삽입하는데 src 속성으로 외부 파일을 불러오거나 요소 안에 직접 스크립트 텍스트를 쓸 수 있습니다. 동적 스크립트란 페이지를 불러오는 시점에서는 존재하지 않았지만 DOM을 통해 이후 추가한 <script> 입니다. 동적 스크립트에는 1. 외부 파일을 불러오거나 2. 텍스트를 직접 삽입하는 두 가지 방법이 있습니다.

const script = document.crateElement('script')
script.type = 'text/javascript'
script.src = 'client.js'
document.body.appendChild(script)
이 코드에서 주의할점은, 마지막 줄에서 <script>요소를 문서 트리에 삽입한 뒤에만 스크립트를 내려받기 시작한다는 점입니다. 한 가지 문제점은, 동적으로 스크립트를 불러올 때 완료 시점을 정확히 알 수 없다는 것 입니다. 이를 정확히 처리할 수 있는 표준 방법이 존재하지 않습니다. 

자바스크립트 코드를 삽입하는 다른 방법은 인라인 스크립트 입니다.

<script type="text/javascript">
  function sayHi () {
    console.log('Hi')
  }
</script>


const script = document.createElement('script')
script.type = 'text/javascript'
script.text = 'function sayHi() { console.log("Hi") }'
try {
  script.appendChild(document.createTextNode('code') // 그 외 브라우저
} catch (err) {
  script.text = 'code' // safari 초기버전 지원
}

document.body.appendChild(script)
이런식으로 불러온 코드는 전역 스코프에서 실행되며 스크립트가 실행된 직후 사용 가능합니다. 사실 이는 전역 스코프에서 같은 문자열을 eval()에 넘긴것과 마찬가지입니다.





동적 스타일
CSS 스타일을 HTML 페이지에 삽입하는 요소는 두 가지 입니다. <link> 요소는 외부 CSS파일을 불러올 때 사용하고 <style> 요소는 인라인 스타일에 사용합니다. 동적 스크립트와 마찬가지로 동적 스타일 역시 페이지를 처음 불러왔을 때는 존재하지 않다가 나중에 추가한 스타일입니다.

// <link rel = 'stylesheet' type="text/css" href="styles.css">

const link = document.createElement('link')
link.rel = 'stylesheet'
link.type = 'text/css'
link.href = 'styles.css'
const head = document.getElementByTagName('head')[0]
head.appendChild(link)
외부 파일에서 스타일을 불러오는 과정은 비동기적으로 이루어 지므로 자바스크립트 코드 실행 순서와는 무관하게 로드합니다. 일반적으로 스타일이 완전히 로드된 시점을 알 필요는 없지만 이벤트 등 몇가지 테크닉으로 알 수 있습니다.

const css = 'body { background: red }'
const style = document.createElement('style')
style.tyle = 'text/css'
try {
  style.appendChild(document.createTextNode(css)
} catch (ex) {
  style.styleSheet.cssText = css
}

const head = document.getElementByTagName('head')[0]
head.appendChild(style)
이런 방식으로 명시한 스타일을 페이지에 즉시 추가되며 즉시 반영됩니다. 

노드 리스트 사용

NodeList 객체와 이와 관련된 NamedNodeMap, HTMLCollecton을 이해하면 DOM을 전체적으로 이해하는데 큰 도음이 됩니다. 각 컬렉션은 모두 '살아있는' 것으로 간주되는데, 이 말은 문서 구조가 바뀔 때마다 컬렉션도 업데이트 되므로 항상 정확한 정보를 반환한다는 것 입니다. 달리 말하면 NodeList 객체는 해당 객체에 접근할 때마다 수행되는 쿼리 입니다.

NodeList를 순회해야 할 때는 항상 새 변수에 컬렉션 길이를 저장하여 사용하거나 배열로 변경하여 사용해야합니다.

const divs = document.getElementByTagName('div')

for (let i = 0; i < div.length; i++) {
  div = document.createElement('div')
  document.body.appendChild(div)
}
일반적으로 말해 NodeList 자체에 접근하는 일은 컬렉션에 접근할 때마다 다시 쿼리하므로 NodeList에서 자주 사용하는 겂은 변수에 저장하여 사용하세요.
