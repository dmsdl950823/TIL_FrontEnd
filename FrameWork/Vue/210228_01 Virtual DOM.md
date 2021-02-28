# Vitual DOM - 가상 DOM

## DOM 이란?

Virtual DOM에 대해 들어가 보기 전에, DOM 이 무엇인지 살펴보도록 합시다.

DOM은 **Document Object Model**(문서객체모델) 이고, 기본적으로 HTML 마크업과 HTML 요소를 위한 객체로 구성되어 있습니다. 이 객체들은 tree 구조로 저장되어있는데, 브라우저는 이 구조를 웹 페이지를 로딩할 때 만들어내고, DOM은 우리에게 interaction(상호작용)과 HTML 요소(elements나 css 등)를 제작할 수 있도록 합니다. DOM을 이용하는것은 규모가 작은 웹 어플리케이션을 작업할때 아주 깔끔하지만, **앱이 커지면 커질수록, DOM을 직접 제작하는일은 느려지며, 비효율적입니다.** 이것이 Virtual DOM이 생겨나게 된 이유입니다.

## Virtual DOM
Virtual DOM은 기본적으로 커스텀 JS Object를 사용하는 DOM의 추상적인 개념입니다.

가벼운 DOM에 대해서 생각해 볼 수있는데, 무슨말이냐 하면, **Virtual DOM은 여전히 DOM을 브라우저에 렌더링하는데 사용되고있지만, 가능하면 적게, 그리고 효율적으로 사용**됩니다.

DOM을 이용해 직접적으로 작업하는것은 속도가 느리기 때문에, **Virtual DOM은 DOM 내부에서 무언가가 변화할때를 감지**하고, **DOM API가 사용 되는 횟수를 제한** 하면서, **진짜 DOM에서 업데이트 되어야 할 것이 무엇인지 정확하게 찾습니다**.

이것은 적절한 위치의 DOM이 업데이트 되게 하기위해 효과적인 알고리즘을을 사용함으로써 마무리됩니다.

~~*** document.crateElement('div') 를 계속 호출함~~

정리하자면 Virtual DOM은 DOM을 구축하기 위해 필요한 모든 상세 데이터들을 위하여 준비하는 기본적인 스케치라고 생각할 수 있습니다. **메모리 작업에서도 훨씬 빠릅니다.**

그래서 Virtual DOM은 DOM과 Vue instance 사이에서 JS data 구조 내부의 DOM을 대신합니다.

## Virtual DOM의 사용목적

* DOM 을 자주 변경하여 퍼포먼스를 하락시키는 것을 피하기 위함
* 가볍고 효과적으로 Virtual DOM과 DOM 사이의 차이를 계산하기 위해 사용하는것입니다.

차이를 관찰할 때, DOM의 요소가 변경될 때, 그리고 DOM에서 아무것도 변화할 필요가 없을때 등 에서 메모리를 최소화 하기 위해 패치가 적용됩니다.

## Virtual DOM이 동작하는 과정

![Virtual DOM Page](https://codingexplained.com/wp-content/uploads/2017/04/Virtual-DOM-Page-1-1.png)

한 요소가 DOM에 추가되었을 경우, Vue instance안에 데이터와 template 을 기반으로 Virtual DOM이 이 새로운 요소를 반영하기 위해 업데이트를 시작합니다. Virtual DOM은 실제 DOM의 '대변인'이라는것을 기억하여 과정을 정리하면,

1. 초기 Virtual DOM의 상태는 실제 DOM에 존재하던 요소들과 일치할 것입니다.
2. 변화가 일어날 경우, 그 두 상태의 차이를 비교합니다
3. 변경된 결과가 실제 DOM에 적용됩니다.
4. Virtual DOM이 실제 DOM과 비교하면서 업데이트 되었기 때문에, 전체 Object를 복사하지 않으면서, Virtual DOM은 실제 DOM의 가장 최신 상태를 보유하게 됩니다.

우리가 `template` 에 작성한 특정한 `directives`  와 `event` 는 Vue 내부적으로 사용되기 때문에, DOM에서 직접 수정하지 않습니다. 그러므로 실제 DOM에게 영향을 주지 않게 됩니다.

출처 [codingexplained - understanding virtual dom](https://codingexplained.com/coding/front-end/vue-js/understanding-virtual-dom)
