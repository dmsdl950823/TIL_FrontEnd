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
