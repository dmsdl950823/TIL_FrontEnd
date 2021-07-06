# Quick Tip: Style Pseudo-elements with Javascript Using Custom Properties

JS 에서, element 를 선택하는 방법은 있지만 pseudo-element 를 직접적으로 선택할 수는 없습니다. 예를들어 아래와 같은 상황에선 `null` 을 반환합니다.

``` js
  document.querySelector('.my-element::after') // null
```

이런 경우에는 JS 로 스타일을 넣는것이 쉽지 않습니다. 만약 동적으로 요소의 높이를 입력해야 하는 경우, 아래와 같이 할 수 있습니다.

``` js
  const element = document.querySelector('.my-element')

  element.style.height = someFunctionToCalculateHeight()
```

pseudo-element 에는 CSS custom property 를 사용할 수 있습니다.

``` css
  .my-element::after {
    height: var(--height, 0);
  }
```

css 에서 기본적으로 `height` 가 `0` 값으로 제공되어있습니다. 
custom property 가 JS에 정의되어 있다면 기본값을 제공하는 것이 좋습니다(속성의 기본값이 아닌 다른 속성을 원하는 경우).

이렇게 하면 JS 에서 값을 지정할 수 있습니다.

``` js
  const element = document.querySelector('.my-element')

  element.style.setProperty('--height', someFunctionToCalculateHeight())
```

-------

출처: [CSS in Real Life](https://css-irl.info/quick-tip-style-pseudo-elements-with-javascript-using-custom-properties/)