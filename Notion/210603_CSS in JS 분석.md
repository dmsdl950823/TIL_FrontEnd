---
  * title: unnecessary
---

# CSS-in-JS 에 대한 분석

## 일반적인 CSS-in-JS 특징

### Scoped CSS

모든 CSS-in-JS 라이브러리들은 CSS moudles 로 - 특별한 CSS className 을 생성합니다. 모든 스타일들은 각각의 컴포넌트안에 scoped 되어있으며, 다른 컴포넌트들의 스타일들에게 영향을 주지않고 캡슐화를 진행합니다.

이 특징 덕분에, CSS className 이 중복, 우선순위 등의 염려는 하지않아도 됩니다.

이 특징은 component-based 개발에는 매우 유용합니다.

### SSR (Server Side Rendering)

HTTP 서버가 빈 제일 처음 HTML 만을 내려주고 모든 렌더링은 브라우저에서 하는 SPAs(Single Page Apps)에는 SSR 에는 아주 유용하지는 않습니다. 그러나 검색 엔진에 의해 정렬되고 파싱될 필요가 있는 웹사이트나 어플리케이션은 SSR 페이지를 필요로합니다. 그리고 styles 또한 서버에서 생성되어야 합니다.

미리 생성된 CSS 코드와 함께 가는 SSG(Static Site Generators) 에도 같은원리가 적용됩니다.

좋은 소식은 아래에서 테스트할 모든 SSR 을 지원하는 라이브러리들은 그 어떤 프로젝트들도 다 가능합니다.


## 차별화된 특징

거의 모든 라이브러리가 강력하고 특별한 특징들을 제공합니다.

### Styles/Component co-location (동일위치)

컴포넌트 내부에 스타일을 적용하는것은 앞뒤로 다른 파일을 두고 옮겨갈 필요가 없으므로 아주 간편한 특징입니다. (`.css`, `.less/.scss`)

[React Native StyleSheets](), [Vue.js SFCs](), or [Angular Components]() 는 styl의 co-location 을 기본적으로 제공합니다. 

### Styles definition syntax

스타일은 두 가지 방법으로 정의할 수 있습니다. 몇몇 라이브러리는 한개의 methods 만 가지지만, 아닌것들은 꽤 유연하고 둘다 지원합니다.

#### Tagged Templates syntax
[Tagged Templates syntax] 는 스타일을 ES Template Literal 에 일반 CSS code 로 정의할 수 있습니다.

``` js
    // consider "css" being the API of a generic CSS-in-JS library
    const heading = css`
        font-size: 2em;
        color: ${myTheme.color};
    `;
```


출처 : [a-thorough-analysis-of-css-in-js](https://css-tricks.com/a-thorough-analysis-of-css-in-js/)