## Improve the quality of your code

여러분이 javascript로 작업을 한다면, 항상 좋게만 동작하지는 않는다는것을 알고있을겁니다. 그러나 다행스럽게도, troubleshooting은 보통 가능합니다.


### Developer tools in modern web browsers

모든 최신 브라우저는 코드를 debug 할 수 있도록 해주는 tools를 가지고있습니다. 그중 가장 쉬운방법 세가지는,

1. `alert()` 메세지 띄우기
2. `console.log()` 띄우기
3. `debugger` 실행하기

#### Chrome developer tools

Chrome developer tools 는 javascript code를 빠르게 디버깅 하도록 해줍니다.

이 산업에서 가장 최고이고, 많은 개발자들이 디버깅을 위해 이 툴을 사용합니다. Chrome Developer Tools는 표준 Javascript console을 포함하며, network를 위한 툴과 performance monitoring, 그리고 security features를 위한 툴도 가지고 있습니다.
Javascript debugging 의 대부분은 Console, Network 영역 탭에서 이루어집니다.

#### React developer tools for Chrome

여러분이 Js와 함께 React를 사용하고 있다면, React Developer Tools라고 불리는 익스텐션도 있습니다. 이 툴은 React tabd을 여러분의 dev tools window에 추가해줍니다.

React tools 는 여러분에게 components의 컨텐츠를 확인할 수 있도록 해줍니다. 그들의 properties와 state를 수정해 불 수도 있습니다. 이 툴은 선택된 컴포넌트를 확인할 수도 있습니다.

여러분이 Chrome을 여러분의 메인 개발 브라우저로 사용한다면, 그리고 Rreact 로 개발한다면, 이 extension이 여러분의 React debug를 더욱 쉽게 해줄 것입니다.


#### Firefox developer tools

Firefox 사용자들은 과거에 Firebug라는 것에 의존했는데, Firefox 사용자들이 많이 사용한 extension 입니다.

최신 버전의 Firefox에 포함된 Firefox Developer Tools는 Firebug의 기능적인 것을 흡수하였습니다. 이것은 Firefox browser과 내부 tool에 Google Chrome과 잘 맞습니다?

Firefox Developer Tools 를 찾으려면, Web Developer메뉴의 Tools 메뉴를 찾아보세요.


#### Safari Develop Menu

Safari 유저들은 Safari Develop Menu를 Safari 안에 내장되어있는 developer tools를 사용할 수 있습니다.

- Safari tab에서 Preference 클릭
- Advanced 클릭
- 메뉴바에서 Show Develop menu 옵션 활성화

이렇게 개발자도구를 꺼내면 toolbar가 나오는데, Develop menu에서, Javascript Console, debugger, network traffic monitor, 페이지 요소의 inspector 등을 확인 할 수 있습니다.

Safari Dev Tools 는 Chrome에게서 제공된 Javascript debugging tools 와 비교될 수 있습니다.


#### Opera Chromium dev tools

이전에, Opera의 내장된 개발자 도구는 Dragonfly 였습니다. 한때 그것은 독립형 프로젝트였지만, Opera의 한 부분이 되었습니다. 그리고 표준 devtools 요소를 포함하게 되었죠.
그것은 Opera의 또다른 원격 debugging 인스턴스에서 아주 유용했습니다. Opera 12 이후에, Opera는 Chrominum Dev Tools를 출시했는데요, Chrome Dev Tools와 비슷하게 운영되고 있습니다.

#### Edge Developer Tools

Microsoft Edge는 이전의 많은 부정적이었던 IE로부터 떨어져나온 표준 브라우저입니다. 결과적으로, Microsoft Edge는 완벽한 devtools 패키지를 포함하고, 다른 옵션들과 같은 단축키로 접근될 수 있습니다.
이 툴은 Javascript console, network, performance, memory tab을 포함하고 있습니다. 기타등등 다른 정보는 [여기](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide)에서 확인 할 수 있습니다.


### The hackable debug tool - debugger

Firefox dev tools 팀은 Firefox나 Chrome에서 디버깅하는 데 사용할 수 있고  필요에 따라 이 도구들 사이를 전환하여 응용 프로그램이 두 도구 모두에서 올바르게 작동하는지 확인할 수 있는 "디버거"라는 독립 실행형 도구를 제공했다.


### Node.js Inspector for debugging requests to Node apps

Node.js에서 여러분의 app의 backend를 디버깅하는것은 꽤 어렵습니다. [Node.js Inspector](https://nodejs.org/en/docs/inspector/)를 이용하여 이러한 문제를 해결할 수있습니다.

[Node Debug library for Node Inspector](https://github.com/nodejs/node-inspect) 는 Node Inspector를 실행시켜 도움을 주는 여러분의 프로젝트에 포함될 수 있는 라이브러리입니다.

[Node.js V8 Inspector Manager](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj) 는 Node Inspector tools를 사용할 수 있는 Chrome extension입니다.

Visual Studio Code 에디터도 여러분에게 내장되어있는 Node Inspector 사용을 쉽게 해줍니다.

- Click the Debug tab at the top
- Choose Open Configurations
- If none are set already, choose Node.js to start with
- If you already have settings in the launch.json, you can hit Add Configuration to add the Node.js configuration

[여기](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) 에서 VSCode의 Node.js를 디버깅 할 수 있는 방법이 있습니다.


### Postman for debugging requests and responses
..


### ESLint

[ESLint](https://eslint.org/) 는 Javascript 를 위한것인데, Linters는 쓰여진 code를 분석하고 문법적 문제를 확인합니다.

ESLint의 사용은 error를 잡도록 도와주고 사소한 문제들을 해결해줍니다. ESLint는 Node package에서 사용가능합니다. 이것은 또한 많은 코드 에디터들(Sublime text, VS Code등..)을 위한 플러그인으로 세팅될 수 있고, error를 바로 여러븐의 editor 에 표시할 수 있습니다.


### JS Bin

JS Bin은 JS 디버깅 최고의 디버깅 툴중 하나입니다. 여러분들에게 test할 수 있도록 해주고, script를 다른 사람들 사이에서 디버깅해줍니다. 

Javascript를 실행하고, debug 콘솔을 보며, scripts의 결과를 확인할 수 있습니다. 또한 library나 dependencies를 추가할 수도 있습니다.

Pro 계정은 그들의 code를 private하게 만들 수도있고, 소득을 창출할 수 도 있습니다. JS Bin을 사용해야할 가장 큰 이유중 하나는 간단함 입니다.

JS Bin에서, 기능적으로 작은 독립된 기능을 테스트 해볼 수 있습니다.


### JSON Formatter and Validator

JSON에서 문법에러나 부적절한 값들을 가진 키들을 찾아내는것은 어렵습니다. 여러분이 압축돈 JSON 오브젝트를 가지고 있다면, 읽기도 어려울 것입니다.

이 문제를 해결하기 위해서는, object를 확장하고, 포매팅 해야합니다. [JSON Formatter & Validator](https://jsonformatter.curiousconcept.com/) 를 이용할 수 있습니다.

Postman은 자동으로 object를 포매팅 시켜주고 쉽게 json 문법을 validate 시켜줍니다. 여러분은 JSON을 간단하게 붙여넣고, 정확하게 formatted version을 내부냅니다. 


### Webpack

Webpack은 모든 사이트와 애플리케이션을 위한 bundling tool 입니다. 여러분이 Webpack을 여러분의 번들링에 사용한다면, 툴로부터 가능한 데이터를 사용할 수 있을것입니다.

이 데이터는 module 컨텐츠로부터 logs, erros, 모듈사에이 존재하는 관계, 그리고 등등을 나열합니다.
만약 여러분이 Webpack을 사용한다면, 놀랍도록 유용합니다. Webpack으로부터 여러분이 생성한 stats를 확인하기 위해서 [여기](https://github.com/webpack/analyse)에서 pre-build 툴을 사용할 수 있습니다 


### Session Stack

[SessionStack](https://www.sessionstack.com/)은 monitoring tools의 세트를 제공하는 software를 모니터링 합니다.

이 툴들은 client-side data를 수집하고 여러분의 client가 여러분의 website에서 무엇을 하는지에 대해서 여러분들을 도와줍니다.

문제가발생한 지점에서, 정확하게 무슨일이 있었고, 얼만큼 치명적인지 추적할 수 있습니다.

SessionStack은 개발자에게 사용자의 문제와 error 조건을 복사하여 비디오로 replay 해줍니다.

* Tip: If you use both SessionStack and Raygun, you can [attach SessionStack video replays to Raygun reports.](https://docs.sessionstack.com/docs/raygun)


### Raygun Error Monitoring

...
