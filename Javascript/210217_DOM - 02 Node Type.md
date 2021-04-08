
* [Document 타입](#document-타입)
  * [Document의-자식-노드](#document의-자식-노드)
  * [문서 정보](#문서-정보)
* [Element 타입](#element-타입)
  * [HTML 요소](#html-요소)
  * [속성 (attr) 설정](#속성-att-설정)
    * [attributes 프로퍼티](#attributes-프로퍼티)
  * [요소의 자식](#요소의-자식)
* [Text 타입](#text-타입)
  * [Text 노드 생성](#text-노드-생성)
* [Comment 타입](#comment-타입)
* [DocumentType 타입](#documenttype-타입)
  * [DocumentFragment](#documentfragment)
* [Attr 타입](#attr-타입)

# Document 타입

JS는 문서 노드를 Document 타입으로 표현합니다. 브라우저에서 전체 HTML 페이지를 표현하는 문서 객체를 HTMLDocumenet 의 인스턴스이며 HTML Document는 Document를 상속합니다.

document객체는 `window`의 프로퍼티이므로 전역에서 접근할 수 있습니다. Document 노드에는 다음 특징이 있습니다.

```
  * nodeType 은 9입니다.
  * nodeValue 는 '#document' 입니다.
  * parentNode는 null 입니다.
  * ownerDoucment 는 null 입니다.
```

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

* `title` :: 브라우저 창 또는 탭의 제목인 `<title>` 요소 텍스트. 현재 페이지의 제목 읽기 및 설정 가능. 값을 바꿔도 `<title>` 요소는 변함이 없음
* `URL` :: 페이지의 완전한 URL(주소 표시줄에 있는 URL) 포함
* `domain` :: 페이지의 도메인 이름
* `referrer` :: 이 페이지를 링크한 페이지의 URL. 해당 페이지가 없을경우 referrer 프로퍼티에는 빈 문자열이 저장


# Element 타입

웹 프로그래밍 에서 Document 타입 다음으로 자주 쓰는 타입은 Element 타입입니다. Element 타입은 XML/HTML 요소를 표현하며 이를 통해 태그 이름이나 자식, 속성같은 정보에 접근가능합니다. Element 노드에는 특징이 있습니다.

```
  * nodeType 은 1입니다.
  * nodeName 은 요소의 태그 이름입니다.
  * nodeValue 는 null 입니다.
  * parentNode는 Document 또는 Element 입니다.
  * ownerDoucment 는 null 입니다.
  * 자식노드로 Element나 Text, Comment, ProcessingIntsruction, CDATA Section, EntityReference를 가질 수 있습니다.
```

요소의 태그 이름은 `nodeName` 프로퍼티나 `tagName` 프로퍼티로 얻을 수 있습니다.

``` js
  // <div id="myDiv"></div>
  const div = document.getElementById('myDiv')
  console.log(div.tagName)  // DIV  :: HTML에서는 항상 대문자 반환
  console.log(div.tagName === div.nodeName) // true
```

## HTML 요소

HTML 요소는 모두 HTMLElement타입을 통해 표현됩니다. `HTMLElement`는 Element를 직접적으로 상속하며 몇 가지 프로퍼티가 추가됩니다. 각 프로퍼티는 모든 HTML 요소에서 사용가능한 표준 속성중 하나를 나타냅니다.

* `id` :: 요소의 고유한 식별자
* `title` :: 요소에 대한 추가 정보이며 일반적으로 마우스를 가져가면 툴팁으로 표현됩니다.
* `lang` :: 요소 콘텐츠의 언어 코드인데 거의 쓰이지 않습니다.
* `dir` :: 언어의 표기 방향. 'ltr' 왼쪽 -> 오른쪽, 'rtl' 오른쪽 -> 왼쪽으로 쓰는 언어 의미
* `className` :: 요소의 CSS 클래스인 class 속성 의미. class는 ECMAScript의 Class 때문에 className 으로 사용됨.

각 프로퍼티는 속성 값을 *읽기 및 설정*하는 용도로 사용합니다.

``` js
  // <div id="myDiv" class="ab cd" title="Body Text" lang="en" dir="ltr"></div>
  const div = document.getElementById('myDiv')

  div.id = 'divId' // divId
  div.className = 'ef gh' // ef gh
  div.title = 'texting' // texting
  div.lang = 'fr' // fr
  div.dir = 'rtl' // rtl
```

프로퍼티를 변경해도 페이지에 바로 반영되지 않는 경우도 있으므로 사용자는 알 수 없으며 `title` 프로퍼티의 경우는 요소 위에 마우스를 가져가야 바뀐 것을 알 수 있습니다.

## 속성 (attr) 설정

각 요소(element) 는 속성을 가질 수 있으며 속성에는 일반적으로 해당 요소나 콘텐츠에 대한 정보가 들어있습니다. 속성에 대한 DOM 메서드는 `getAttribute()`, `setAttribute()`, `removeAttribute()` 입니다. 이들 메서드는 **HTMLElement 타입에 정의된 프로퍼티를 포함해 모든 속성을 다룰 수 있도록** 만들어졌습니다.

``` js
  // <div id="myDiv" class="ab cd" my_attribute="hello" onClick="console.log(1)"></div>
  div.getAttribute('class') // ab cd
  div.getAttribute('my_attribute') // hello
  div.getAttribute('MY_AtTrIbUte') // hello

  div.id // myDiv
  div.my_attribute // undefined

  div.style // [ object CSSStyleDelcaration ]

  div.getAttribute('onclick') // console.log(1)
  div.onClick // function onclick(event) { console.log(1) }
```

> style 속성(`attr`)은 CSS 텍스트를 반환하지만 프로퍼티는 객체를 반환합니다. style 프로퍼티는 style 속성과 직접 연결되지는 않습니다.
<br>
`onclick` 같은 이벤트 핸들러 속성은 JS 코드이며 `getAttribute()`는 해당 코드 문자열을 반환하지만 `onclick` 프로퍼티는 **함수 자체를 반환**하고 해당 속성이 없을 경우 `null`을 반환합니다. 이는 **onclick을 비롯한 이벤트 처리 프로퍼티가 자신에게 할당된 함수에 접근할 수 있기 때문**입니다.
<br>이러한 차이 때문에 개발자들은 JS로 DOM을 다룰 때 객체 프로퍼티를 주로 사용하며, getAttribute()는 커스텀 속성의 값을 가져올 때 사용합니다.

``` js
div.setAttribute('id', 'sample')

div.id = 'new sample'

div.mycolor = 'red'
alert(div.getAttribute('mycolor')) // null
```
`setAttribute()`는 1. 속성 이름과 2. 설정할 값 두가지를 매개변수로 받습니다. 속성은 모두 프로퍼티이므로 프로퍼티에 직접 할당하는 것은 속성 값을 설정하는것과 마찬가지 입니다.

그러나 DOM 요소에 커스텀 프로퍼티를 추가해도 요소에 자동으로 속성이 추가되지는 않습니다. 

요소에서 속성을 제거하는 `removeAttrebute()`는 속성의 값뿐 아니라 요소에서 속성을 완전히 제거합니다.

### `attributes` 프로퍼티

Element 타입은 DOM 노드 타입중 `attribute` 프로퍼티를 갖는 유일한 타입입니다. attribute에서는 `NameNodeMap`이 저장됩니다. 요소의 속성은 모두 Attr 노드로 표현되며 각 Attr 노드는 NameNodeMap 객체에 저장됩니다.

`NameNodeMap` 객체는 다음 메서드가 있습니다. (그러나 잘 사용하지는 않습니다.)

- `getName(name)` :: nodeName 프로퍼티가 name인 노드를 반환합니다.
- `removeNamed(name)` :: nodeName 프로퍼티가 name인 노드를 목록에서 제거합니다
- `setNamedItem(node)` :: node를 목록에 추가하고 nodeName 프로퍼티에 따라 색인합니다
- `item(pos)` :: 인덱스가 pos인 노드를 반환합니다.

`attribute` 프로퍼티 안의 각 노드는 `nodeName`이 속성이름이며 `nodeValue`는 속성 값입니다. 

``` js
  // di는 nodeType === 1 (Element 타입)
  const attrs = div.attributes
  console.log(attrs)  // [object NamedNodeMap]

  console.log(attrs.getNamedItem('id').nodeValue) // div
  console.log(attrs['id'].nodeValue)  // div

  attrs['id'].nodeValue = 'new_id'

  attrs.removeNamedItem('id') // 주어진 이름의 속성 제거
```

attribute가 유용한 경우는 요소의 **속성을 루프할 때** 입니다. DOM구조를 XML이나 HTML 문자열로 *직렬화 할 때*가 그런 경우입니다.

``` js
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
```
> 해당 함수는 `이름-값` 쌍 순으로 이루어진 배열을 만든 다음 `name='value' name='value'` 형태의 문자열로 만듭니다.(직렬화 할때 주로 사용) 브라우저에 따라 `attribute` 객체의 속성을 반환하는순서가 다릅니다.

## 요소의 자식

요소는 자식 요소나 자손 요소를 가질 수 있으며 숫자 제한이 없습니다. `childNodes` 프로퍼티에는 요소의 자식 요소가 모두 담기는데, *다른 요소나 텍스트노드, 주석, 처리 지침(processing instruction)이 모두 포함*됩니다.

``` js
  for (let i = o, i < element.childNodes.length; i++) {
    if (element.childNodes[i].nodeType === 1) {
      // ...
    }
  }
```
`childNodes` 는 모든 요소를 포함하므로, nodeType을 확인하여 원하는 요소들을 확인하여 사용할 수 있습니다.

# Text 타입
Text 노드는 Text 타입으로 표현됩니다. 이 노드에는 텍스트가 포함되고, 이스케이프된 HTML 문자는 포함할 수 있지만 HTML 코드는 포함 할 수 없습니다. Text 노드에는 다음과 같은 특징이 있습니다.

```
  * nodeType 은 3입니다.
  * nodeName 은 '#text' 입니다.
  * nodeValue 는 노드에 포함퇸 텍스트입니다.
  * parentNode 는 Element 입니다.
  * 자식 노드를 가질 수 없습니다.
```

Text 노드에 포함된 텍스트는 `nodeValue` 프로퍼티나 `data` 프로퍼티로 가져올 수 있습니다.  둘 중 하나를 바꾸면 노드에 반영됩니다. 다음은 노드의 텍스트를 조작하는 메서드입니다.

- `appendData(text)` :: 노드 마지막에 text를 추가합니다
- `deleteData(offset, count)` :: offset 부터 count 만큼 삭제합니다.
- `insertData(offset, text)` :: offset 위치에 text를 삽입합니다.
- `replaceData(offset, count, text)` :: offset부터 (offset + count) 까지의 텍스트를 text로 교체합니다.
- `splitText(offset)` :: offset 위치를 기준으로 텍스트 노드를 둘로 나눕니다.
- `substringData(offset, count)` - offset 위치부터 (offset + count) 까지의 텍스트를 꺼냅니다.
- `length` - 노드의 글자 개수를 반환합니다.

``` html
  <!-- 콘텐츠가 없으므로 텍스트 노드도 없음 -->
  <div></div>

  <!-- 공백 텍스트 노드가 하나 있음 -->
  <div> </div>

  <!-- 텍스트 노드가 있음 -->
  <div> Hello World! </div>
```

기본적으로 콘텐츠를 가질 수 있는 요소는 모두 최대 하나의 텍스트 노드를 가질 수 있습니다. 다음 코드로 텍스트 노드에 접근 가능합니다. 텍스트 노드의 값을 바꿀 때 문서 타입에 따라 HTML 또는 XML에 맞게 인코드 됩니다. 즉 `>, <, "` 등이 이스케이프 됩니다.

``` js
  const textNode = div.firstChild // div.childNode[0]도 가능

  div.firstchild.nodeValue = "Some other message" // 텍스트 노드 수정

  // "Some &lt;strong&gt;other&lt;/string&gt; message"
  div.firstChild.nodeValue = "Some <strong>other</strong> message"
```

## Text 노드 생성

```js
  const textNode = document.createTextNode('<strong>Hello</strong> world!')
```

Text 노드를 생성할 때는 `document.createTextNode('삽입할 텍스트')` 메서드를 사용합니다. 주어진 문자열을 HTML이나 XML에 맞게 인코드 합니다. 

새 Text 노드를 생성하면 `ownerDocument` 프로퍼티가 설정되지만 문서 트리에 삽입하기 전에는 브라우저 창에 표시되지 않습니다.



# Comment 타입
주석은 DOM 에서 Comment 타입으로 표현됩니다. Comment 노드에는 다음 특징이 있습니다.

```
  * nodeType은 8 입니다
  * nodeName은 '#comment'
  * nodeValue는 주석 콘텐츠 입니다.
  * parentNode는 Document 또는 Element 입니다.
  * 자식 노드는 가질 수 없습니다.
```

Comment 타입은 Text 타입과 같은 원형을 상속하므로 Text 타입에 있는 문자열 메서드를 (`splitText()` 제외) 대부분 갖고있습니다.  Text 타입과 마찬가지로 `nodeValue`나 `data` 프로퍼티로 주석의 콘텐츠를 가져 올 수 있습니다.

``` js
  // <div id="myDiv"><!-- 주석 --></div>

  const comment = div.firstChild.data
  console.log(comment)  // 주석
```

# CDATASection 타입
CDATA 섹션은 XML 기반 문서 전용이며 CDATASection 타입으로 표현됩니다. Comment와 마찬가지로 CDATASection 타입 역시 Text 타입과 같은 원형을 상속하므로 문자열 메서드를 모두 가집니다(`splitText()`를 제외). CDATASection 노드에는 다음 특징이 있습니다.

```
  * nodeType은 4 입니다
  * nodeName은 '#cdata-section' 입니다
  * nodeValue는 CDATA 섹션의 콘텐츠입니다.
  * parentNode는 Document 또는 Element 입니다
  * 자식 노드는 가질 수 없습니다.
```

CDATA 섹션은 XML 문서에만 유효하므로 대부분 브라우저에서 CDATA 섹션을 부정확한 Comment나 Element 로 잘못 파싱합니다.

``` html
  <div id="div"> <![CDATA[ This is some content ]]> </div>
```
CDATASection 노드는 `<div>`의 첫 번째 자식이어야 하지만 주요 브라우저 중에서 이렇게 파싱하는 브라우저는 하나도 없습니다. 유효한 XHTML 페이지에서조차 포함된 CDATA 섹션을 제대로 지원하지 않습니다. 

# DocumentType 타입

DocumentType 타입은 자주 사용하지 않습니다. (FireFox, Safari, Opera)

```
  * nodeType은 10입니다.
  * nodeValue는 독타입 이름입니다.
  * nodeValue는 null 입니다
  * parentNode는 Document 입니다.
  * 자식 노드는 가질 수 없습니다.
```

DOM 레벨 1 에선 `DocumentType` 객체를 동적으로 생성할 수 없으며 문서 코드를 파싱하는 동안에만 생성됩니다. 지원하는 브라우저는 `DocumentType` 객체를 `document.doctype`에 저장합니다.

* `name` :: 독타입 이름
* `entities` :: 독타입이 정의하는 엔티티의 NamedNodeMap
* `notations` :: 독타입이 정의하는 표기법의 NamedNodeMap

브라우저에서 불러오는 문서는 일반적으로 HTML이나 XHTML 이므로 `entities`와 `notations`는 보통 빈 목록입니다. `name` 프로퍼티에 저장되는 독타입 이름은 `<!DOCTYPE`  바로 뒤에 있는 텍스트입니다.

``` html
<!-- 이 독타입의 name 프로퍼티 결과는 "HTML" -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
```

## DocumentFragment

``` js
  <ul id="myList"></ul>
```
이 `ul` 요소에 `li` 요소를 세 개 추가하려합니다. 각 요소를 직접적으로 추가하면 **브라우저가 그 때마다 페이지에 새 정보를 반영하고 다시 렌더링** 해야합니다. 다음 코드처럼 문서 버퍼를 생성하고 `li` 요소를 동시에 추가하는 편이 좋습니다.

``` js
  const fragment = document.createDocumentFragment()
  const ul = document.getElementById('myList')
  const li = null

  for (let i = 0; i < 3; i++) {
    li = document.createElement('li')
    li.appendChild(document.createTextNode(`Item ${i + 1}`)
    fragment.appendChild(li)
  }

  ul.appendChild(fragment)
```

# Attr 타입
요소의 속성은 DOM 에서 Attr 타입으로 표현됩니다. 기술적으로 속성은 요소의 attribute 프로퍼티 안에 존재하는 노드입니다. Attribute 노드에는 다음 특징이 있습니다.

```
  * nodeType은 11 입니다.
  * nodeName은 속성 이름 입니다.
  * nodeValue는 속성 값입니다.
  * parentNode는 null 입니다.
  * HTML 에서는 자식 노드를 가질 수 없습니다.
  * XML 에서는 자식 노드로 Text, EntityReference를 가질 수 있습니다.
```

속성 역시 노드지만 DOM 문서 트리의 일부분으로 간주되지는 않습니다. Attribute 노드를 직접 참조하는 경우는 드물며 개발자들은 보통 `getAttribute()`, `setAttribute()`, `removeAttribute()`를 더 선호합니다. 
