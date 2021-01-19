DOM
문서 객체 모델 (DOM) 은 HTML 과 XML 문서에 대한 애플리케이션 프로그래밍 인터페이스 (API) 입니다. DOM은 문서를 노드의 계층 구조 트리로 표현하며 개발자는 이를 통해 페이지 각 부분을 추가, 제거, 수정 합니다. 넷스케이프 & MiocroSoft 에서 초기에 사용하던 동적 HTML(DHTML)을 계승한 DOM은 이제 진정으로 플랫폼과 언어에 독립적인 페이지 표현 및 조작 방법입니다.

DOM level 1 은 1998년 10월에 W3C 권고가 되었으며 기본적인 문서 구조와 쿼리 인터페이스를 제공합니다.

노드의 계층 구조
HTML과 XML 문서는 모두 DOM을 통해 노드의 계층 구조로 표현 가능합니다. 노드 타입에는 여러가지가 있으며 각 타입은 문서에서 서로 다른 정보나 마크업을 표현합니다. 각 노드 타입은 서로 다른 특징, 데이터, 메서드를 가지며 각 노드는 다른 노드와 관계가 있을 수 있습니다.  이러한 관계가 계층 구조를 생성하고 마크업은 이 관계를 통해 특정 노드에 뿌리root를 둔 트리 구조로 표현됩니다.

<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>
문서 노드는 각 문서를 루트root 로 표현합니다. 여기서 문서 노드(Document)의 자식은 <html > 요소 하나 뿐인데, 이를 '문서 요소' 라고 부릅니다. 문서 요소는 문서의 최상위 요소이며 다른 요소는 모두 이 안에 존재합니다. 문서 하나에 문서 요소 하나만 있을 수 있습니다. HTML 페이지에서 문서 요소는 항상 <html> 요소입니다. XML에서는 미리 지정된 문서 요소가 없으면 어떤 요소든 문서 요소가 될 수 있습니다.

각 마크업은 트리에서 노드로 표현됩니다. HTML 요소들은 요소 노드로, 속성은 속성노드로, 문서 타입은 문서 타입 노드로, 주석은 주석 노드로 표현됩니다. 총 12가지 노드 타입이 있으며 모든 노드는 기반base 타입을 상속합니다.

노드 타입 - Node Type
DOM level 1 에서는 Node

라는 인터페이스가 있는데, DOM에 존재하는 노드 타입은 모두 이 인터페이스를 구현합니다. Node 인터페이스는 자바스크립트에서 Node 타입으로 구현되며 IE를 제외한 모든 브라우저에서 Node 타입에 접근할 수 있습니다. JS의 노드 타입은 모두 Node를 상속하므로 모든 노드 타입에서 같은 기본 프로퍼티와 메서드를 공유합니다. 

모든 노드는 타입을 나타내는 nodeType 프로퍼티가 있습니다. 노드 타입은 다음 12가지 숫자형 상수중 하나입니다.

... 생략

프로퍼티	nodeType 숫자
Node.ELEMENT_NODE	1
// <h1 id="header">HELLO!</h1>
const h1 = document.getElementById('header')
const elementNode = Node.ELEMENT_NODE

console.log(h1.nodeType === elementNode) // true
nodeType 상수와 비교해보면 노드타입을 알 수 있습니다. 웹 브라우저에서 모든 노드 타입을 지원하진 않습니다. 개발자가 가장 자주 다루는 노드는 요소노드(ELEMENT_NODE)와 텍스트 노드(TEXT_NODE) 입니다.

nodeName, nodeValue 프로퍼티

두 프로퍼티는 nodeName - 노드의 태그 이름, nodeValue - null 같은 해당 노드 정보를 제공합니다. 프로퍼티 값은 노드 타입에 따라 완전히 다릅니다. 이 값을 사용하기 전에 항상 노드 타입을 테스트하길 권합니다.

if (h1.nodeType === 1) {
  console.log(h1.nodeName) // H1
}
노드 사이의 관계

모든 노드는 다른 노드와 관계가 있습니다. 이런 관계는 문서 트리를 가족 계보 처럼 생각해서 가족 관계로 설명하곤 합니다. HTML 에서 <body> 요소는 <html> 요소의 자식이며 <html> 요소는 <body> 요소의 부모입니다. <head> 요소는 <body>요소의 형제로 간주하는데, 두 요소가 같은 <html> 요소를 부모로 공유하기 때문입니다.

각 노드에는 childNodes 프로퍼티가 있는데 이 프로퍼티에는 NodeList가 저장됩니다. NodeList는 배열 비슷한 객체인데 노드를 순서있는 목록으로 저장하여 위치 기반으로 접근 할 수 있습니다. NodeList에 length 프로퍼티가 있고 저장된 데이터를 대괄호 표기법으로 접근할 수 있지만 NodeList는 Array의 인스턴스가 아닙니다. NodeList는 사실 DOM구조에 대한 쿼리 겨ㄹ과이며 문서가 바뀌면 NodeList 객체에도 자동으로 반영된다는 점이 독특합니다. NodeList는 처음 호출했을 때 얻은 결과를 저장하고 있는 것이 아니라 계속 바뀌므로 '살아있는' 객체 라고 부르기도합니다.

다음 예제는 NodeList에 저장된 노드를 1. 대괄호 표기법으로 접근하는 법, 2. Item() 메서드로 접근하는 법입니다.

const firstChild = someNode.childNodes[0]
const secondChild = someNode.childNodes.item[1]
const count = someNode.childNodes.length
NodeList가 배열과 비슷하므로 개발자 대부분이 대괄호 표기법을 선호하긴 하지만, item() 메서드나 대괄호 표기법이나 마찬가지이며 어느쪽을 더 권장하지는 않습니다. Length 프로퍼티는 '호출당시' NodeList에 담긴 노드 숫자임을 기억해야 합니다. Length 프로퍼티는 '호출 당시' NodeList에 담긴 노드 숫자임을 기억해야 합니다. Arguments 객체에서 설명 했떤 대로 Array.prototype.slice()를 사용해 NodeList객체를 배열로 바꿀 수 있습니다. 다음 예제를 생각해 보십시오.

const arrayOftenNodes = Array.prototype.slice.all(someNode.childNodes, 0)
이 방법은 인터넷 익스플로러 0 및 이전 버전을 제외한 모든 브라우저에서 동작합니다. IE 8 및 이전 버전에서는 에러가 발생하는데 NodeList객체가 COM 객체로 구현되어있으므로 JScript 객체가 필요한 곳에서 사용할 수 없기 때문입니다. IE 에서 JScript를 배열로 바꾸려면 멤버 전체를 직접 순회하며 작업 해야합니다. 다음 함수는 모든 브라우저에서 동작합니다.

function convertToArray (nodes) {
  const array = null
  try {
    array = Array.prototype.slice.call(nodes, 0) // IE ㅇㅗㅣ, IE 9+
  } catch (ex) {
    array = new Array()
    len = nodes.length
    for (var i = 0; i < len; i++) {
      array.push(nodes[i])
    }
  }
  return array
}
해당 함수는 배열을 생성하는 쉬운 방법부터 시작하여, 에러가 생기면(IE 이하) try-catch 블록에서 에러를 받아 배열을 직접 생성합니다. 이 함수도 쿽스 탐지의 한 가지 형태입니다.

각 노드에는 문서 트리에서 부모를 가리키는 parentNode 프로퍼티가 있습니다. ChildNodes 목록에 포함된 노드는 모두 부모가 같으므로 각각의 parentNode 프로퍼티는 같은 노드를 가리킵니다. 또한 childNodes 목록의 각 노드는 형제 관계입니다. 같은 목록에 있는 노드 사이를 previousSibling 및 nextSibling 프로퍼티로 이동할 수 있습니다. 다음 예제와 같이 목록의 첫 번째 노드에서 previousSibling 프로퍼티 값은 null 이며 마지막 노드에서 nextSibling 프로퍼티 값은 null 입니다.

if (someNode.nextSibling === null) {
  alert("Last node in the parent's childNodes list.")
} else if (someNode.previousSibling === null) {
  alert("First node in the parent's childNodes list.")
}
자식 노드가 하나 뿐이라면 해당 노드의 nextSibling와 previousSibling 은 모두 null 입니다.

부모 노드와 첫 번째, 마지막 자식 노드 관계를 가리키는 다른 관계도 존재합니다. firstChild와 lastChild 프로퍼티는 각각 childNodes 목록에서 첫 번째와 마지막 노드를 가리킵니다. someNode. 자식 노드가 하나 뿐이라면 firstChild와 lastChild는 같은 노드를 가리킵니다. 자식 노드가 없다면 firstChild와 lastChild는 모두 null 입니다. 이런 관계를 통해 쉽게 노드 사이를 이동할 수 있습니다.

그 외에 편리한 메서드로 hasChildNodes()가 있는데 이 메서드는 노드에 자식 노드가 있다면 true를 반환하며 매번 childNodes 목록에서 length를 호출하는 것 보다 효과적입니다.

마지막 관계는 모든 노드에서 공통입니다. ownerDocument 프로퍼티는 전체 문서를 표현하는 문서 노드에 대한 포인터 입니다. 한 노드가 여러문서에 동시에 존재할 수는 없으니 각 문서는 자기 내부에 있는 노드를 소유하는 것으로 간주합니다. 이 프로퍼티를 이용하면 노드 계층 구조를 따라 위로 거슬러 올라갈 필요없이 문서 노드에 빠르게 접근 가능합니다. 

노드 타입이 모두 Node 를 상속하긴 하지만 노드 타입이 모두 자식 노드를 가질 수 있는건 아닙니다.

노드 조작

노드 사이의 관계 포인터는 모두 읽기 전용이므로 노드를 조작하는 메서드는 appendChild(),... 입니다. 이 메서드는 childNodes 목록에 노드를 추가합니다. 이 메서드를 실행하면 새로 추가한 노드, 부모 노드, childNodes 목록에 포함된 이전의 마지막 자식 노드에서 모든관계 포인터가 업데이트 됩니다. 업데이트가 완료되면 appendChild()는 새로 추가한 노드를 반환합니다.

const returnedNode = someNode.appendChild(newNode)
console.log(returnedNode === newNode)  // true
console.log(someNode.lastChild === newBode)  // true
AppendChild()에 넘긴 노드가 이미 문서에 존재하고 있었다면 해당 노드는 이전의 위치를 벗어나 새 위치로 이동합니다. DOM 트리가 수많은 포인터로 연결되어있긴 하지만 문서에서 두 위치에 동시에 존재할 수 있는 DOM 노드는 없습니다. 따라서 다음 예제처름 appendChild()를 호출하면서 첫 번째 자식을 넘면 해당 요소는 결국 마지막 자식이 됩니다.

// someNodeㅇㅡㅣ ㅇㅕㄹㅓ ㅈㅏㅅㅣㄱ ㄴㅗㄷㅡㅇㅔ ㅈㅓㅂㄱㅡㄴ
const returnedNode = someNode.appendChild(someNode.firstChild)
console.log(returnedNode == someNode.firstChild) // false
console.log(retunredNode == someNode.lastChild) // true
한 노드를 childNodes 목록 마지막이 아니라 특정 위치로 옮겨야 할 때는 insertBefore()메서드를 사용합니다. InsertBefore() 메서드는 삽입할 노드와 기준 노드 두 가지를 매개변수로 받습니다. 삽입한 노드는 기준 노드의 이전 형제가 되며 이동이 끝나면 메서드는 삽입한 노드를 반환합니다. 기준 노드가 null 이라면 insertBefore() 는 다음과 같이 appendChild()와 똑같이 동작합니다.

// ㅁㅏㅈㅣㅁㅏㄱ ㅈㅏㅅㅣㄱㅇㅡㄹㅗ ㅅㅏㅂㅇㅣㅂ
returnedNode = someNode.insertBefore(newNode, null)
console.log(newNode == someNode.lastChild) // true

// ㅊㅓㅅ ㅈㅏㅅㅣㄱㅇㅡㄹㅗ ㅅㅏㅂㅇㅣㅂ
returnedNode = someNode.insertBefore(newNode, someNode.firstChild)
console.log(returnedNode == newNode) // true
console.log(newNode == someNode.firstChild) // true

// ㅁㅏㅈㅣㅁㅏㄱ ㅈㅏㅅㅣㄱ ㅇㅏㅍㅇㅔ ㅅㅏㅍㅇㅣㅂ
retunredNode = someNode.insertBefore(newNode, someNode.lastChild)
alert(newNode == someNode.childNodes[someNode.childNodes.length - 2]) // true
 

 

ㅁappendChild()와 insertBefore()는 모두 기존의 노드를 제거하는 일 없이 삽입하기만 합니다. 반면 replaceChild() 메서드는 기존 노드를 교체합니다. replaceChild()메서드는 매개변수로 삽입할 노드(A) 교체할 노드(B) 두 개를 받아서 B를 문서 트리에서 제거해 반환하며 B가 있던 자리에 A를 대신 삽입합니다.

// 첫 번째 자식을 교체
const retunredNode = someNode.replaceChild(newNode, someNode.firstChild)

// 마지막 자식을 교체
const retunredNode = someNode.replaceChild(newNode, someNode.lastChild)
replaceChild() 로 노드를 삽입하면 B의 관계 포인터를 모두 A에 복사합니다. B는 아직 같은 문서 소유이긴 하지만 문서에서 위치를 지정받지는 못한 채 붕 떠있는 상태입니다.

노드를 제거할 때는 removeChild() 메서드를 사용합니다. 이 메서드는 제거할 노드 하나만 매개변수로 받습니다. 제거된 노드는 다음 예제처럼 함수 값으로 반환됩니다.

// 첫 번째 자식 제거
const formerFirstChild = someNode.removeChild(someNode.firstChild)

// 마지막 자식 제거
const formerLastChild = someNode.removeChild(someNode.lastChild)
replaceChild()와 마찬가지로 removeChild로 제거한 노드 역시 아직 해당 문서 소유이긴 하지만 문서에서 위치를 지정받진 못했습니다. 이 모든 메서드는 모두 특정 특정 노드의 자식에서만 동작하므로 parentNode 프로퍼티에 해당하는 부모 노드를 정확히 알아야합니다. 자식을 가질 수 없는 노드 타입도 있으며 이런 노드에서 이들 메서드를 호출하면 에러가 발생합니다.

기타 메서드

다른 두 메서드는 모든 노드 타입에서 공통입니다. cloneNode() 메서드는 자신을 호출한 노드의 복제본을 생성합니다. cloneNode() 메서드는 매개변수를 하나 받는데 이는 자손 노드까지 복제할지 나타내는 불리언입니다. 매개변수로 true를 넘기면 자손 노드 전체를 복제하며 false를 넘기면 해당 노드 하나만 복제합니다. 복제된 노드를 반환하는데 이는 여전히 문서 소유지만 부모 노드가 할당되지 않았습니다. 따라서 복제된 노드는 고아 노드이며 appendChild()나 insertBefore(), replaceChild()를 통해 문서에 추가하기 전에는 트리 안에 존재하지 않습니다. 

<ul>
  <li>list 1</li>
  <li>list 2</li>
  <li>list 3</li>
<ul>
const myList = document.querySelector('ul')

const deepList = myList.cloneNode(true)
console.log(deepList.childNodes.length)  // 3 (IE < 9) 또는 7 (그 외 브라우저)

const shallowList = myList.cloneNode(false)
console.log(shallowList.childNodes.length)  // 0
여기서 deepList는 myList를 자손 노드까지 전부 복제한 것입니다.(true) 즉 deepList에는 <li> 요소가 셋 포함되며 각각은 텍스트를 포함합니다. 변수 shallow List는 myList의 <ul> 요소 하나만 복제한 것 이므로 자식 노드가 없습니다.(false) deepList.childNodes.length 가 두 가지 있는 것은 IE 8 및 이전 버전이 다른 브라우저와는 다른 방법으로 공백 문자를 처리하기 때문입니다. IE 9 이전 버전에서는 공백 문자에 대해 텍스트 노드를 생성하지 않았습니다.

cloneNoce() 메서드는 이벤트 핸들러처럼 DOM 노드에 추가한 자바스크립트 프로퍼티는 복사하지 않습니다. 이 메서드는 속성과 자식 노드만 복사하며 다른 것은 모두 사라집니다. IE 에서는 이벤트 핸들러까지 복제하는 버그가ㅏ 있으므로 복제하기 전에 이벤트 핸들러를 모두 제거하길 권합니다.

다른 메서드는 normalize() 입니다. 이 메서드가 하는 일은 문서 서브트리에 존재하는 텍스트 노드를 다루는 것 뿐입니다. 파서의 구현 방식이나 DOM 조작 결과로 텍스트 없는 텍스트 노드가 생기거나 택스트 노드끼리 형제 노드가 될 가능성이 있습니다. normalize()를 호출하면 노드의 자손에서 이 두가지 상황이 생기지 않았는지 검색합니다. 빈 텍스트 노드를 찾으면 제거하고 텍스트 노드끼리 형제인 경우를 발견하면 두 노드를 하나로 합칩니다.
