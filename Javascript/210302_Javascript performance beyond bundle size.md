- [Javascript Performance Beyond bundle size](#javascript-performance-beyond-bundle-size)
- [Bundle Size](#bundle-size)
  - [Bundler 관련 Plugins](#bundler-관련-plugins)
    - [Bundlephobia](#bundlephobia)
    - [Webpack Bundle Analyzer](#webpack-bundle-analyzer)
    - [Rollup Plugin Analyzer](#rollup-plugin-analyzer)
    - [그 외의 bundle size tool 들](#그-외의-bundle-size-tool-들)
- [Beyond the bundle](#beyond-the-bundle)
  - [Runtime CPU cost](#runtime-cpu-cost)
    - [안전한 속도 측정 방법](#안전한-속도-측정-방법)
  - [Power usage](#power-usage)
  

[출처 nolanlawson 번역](https://nolanlawson.com/2021/02/23/javascript-performance-beyond-bundle-size/)

# Javascript Performance Beyond bundle size

bundle size를 가장 먼저 체크하는 이유는, 가장 빠르게 확인할 수 있기 때문입니다. 그러나 이와 비슷한 중요 다른 metrics들도 있습니다.

```
  * 파싱/컴파일링 시간 - Parse/compile time
  * 실행 시간 - Execution time
  * Power 사용량 - Power usage
  * Memory 사용량 - Memory usage
  * Disk 사용량 - Disk usage
```
JS dependency는 이 모든 matrics들에게 영향을 줄 수 있습니다. 이 포스팅에서는, bundle size에 접근하는 방법과, 다른 metrics에 접근하는 방법을 알아보겠습니다.

# Bundle Size
JS code의 size 는 **압축된 size 와 압축되지 않은 size에는 큰 차이가 있습니다.** 

압축된 size는 전달하는 속도에만 영향을 끼치지만, 압축되지 않은 size는 파싱하는데, compile 하는데, JS를 실행하는데 영향을 끼칩니다. 

## Bundler 관련 Plugins
### Bundlephobia

[Bundlephobia](https://bundlephobia.com/)는 bundle size 분석에서 만능이라고 할 수 있습니다. npm으로 설치된 dependency를 살펴보고, 압축된 size의 크기(browser가 파싱하고 실행한 결과)를 확인할 수 도 있습니다.

Bundlephobia를 사용하는데 몇가지 주의사항이 있습니다.

1. tree-shaken 된 내용을 알려주지는 않습니다. module의 일부분만 삽입하여 계산할 경우, 다른부분은 tree-shaken 되지 않고 계산됩니다.
2. subdirectory dependency를 알려주지 않습니다. 🍚
3. polyfill이 있는경우(Node의 `Buffer` API, 또는  `Object.assign()` API를 위한 polyfill이 삽입되어있는 bundler 등), 이 결과를 볼 필요는 없습니다.


### Webpack Bundle Analyzer

[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 는 Webpack의 모든 chunk뿐 아니라 해당 **chunk의 module들을 시각화**한 결과를 보여줍니다.

![webpack-bundler-visualization](https://nolanwlawson.files.wordpress.com/2021/02/screenshot-from-2021-02-20-09-45-39.png?w=768&h=306)

보여지는 size에 관하여 가장 유용한 것 들은 (기본적으로)**"파싱된 parsed" 그리고 "Gzipped"된 것 들입니다.** 파싱된 것은 "축소되었다"는 의미인데, bundler를 실행하면서 더 정확한 사이즈를 측정할 수 있습니다.

### Rollup Plugin Analyzer

[Rollup - module Bundler](https://rollupjs.org/guide/en/)
Rollup 번들러를 분석하는 방법은, [Rollup Plugin Analyzer](https://github.com/doesdev/rollup-plugin-analyzer) 를 이용하는 방법입니다. 해당 플러그인은 build 하면서 모듈 사이즈를 console에 보여줍니다.

그러나 그저 사이즈만 알려줄 뿐이고, 축소되거나 Gzip 된 사이즈를 돌려주지는 않습니다. 완벽하진 않지만 사용할 만 합니다.


### 그 외의 bundle size tool 들
* [bundlesize](https://github.com/siddharthkp/bundlesize)
* [Bundle Buddy](https://www.bundle-buddy.com/webpack)
* [Sourcemap Explorer](https://github.com/danvk/source-map-explorer)
* [Webpack Analyse](http://webpack.github.io/analyse/)


# Beyond the bundle

Javascript bundle size가 전부는 아닙니다 - 측정하기 쉽기 때문에 다른 metrics가 페이지의 퍼포먼스에 영향을 줄 수도 있기 때문입니다.

## Runtime CPU cost
가장 중요한 것은 runtime cost 입니다. 아래 세 가지로 나눌 수 있습니다.

* Parsing
* Compilation
* Exacution

이 세가지 속도들은 기본적으로 `require("some-dependency")`나 `import "some-dependecy"`를 호출함으로써 발생하는 비용입니다. 이것은 bundle size와 관련이 있을 수 있지만, 1:1로 정확히 일치하지는 않습니다.

``` js
  const start = Date.now()
  while (Date.now() - start < 5000) {}
```

이 예제는 주요 스레드를 망치는 library에서 찾을 수 있습니다. DOM의 모든 element를 지나서, Localstorage의 큰 배열을 반복하고, pi 숫자를 계산하는 등의 행동을 합니다. **모든 dependency를 직접 검사하지 않는 한, 뒤에서 무엇이 동작하는지 알 수 없습니다.**

파싱parse 이나 컴파일링compile 은 둘다 측정하기 어렵습니다. 브라우저는 [bytecode caching](https://v8.dev/blog/code-caching-for-devs)을 통해 최적화를 하기때문에 코드 실행이 빠르다고 속기(fool) 쉽습니다. 브라우저가 미리 캐싱을 해놓기 때문에 module 이 파싱/컴파일링이 쉽게 된다고 생각할 수도 있습니다.

### 안전한 속도 측정 방법

1. **browser cache를 모두 지우고 첫 번째 페이지 로딩에서 측정해야 안전하게 측정**할 수 있습니다.
2. **페이지 로드 시간에 영향을 줄 수 있는 browser 확장 프로그램을 disabled 시켜두는것도 좋습니다**.(private mode를 사용하면 좋습니다.)
3. Chrome의 CPU throttling 을 `4x` 나 `6x`로 세팅해두는 방법도 있습니다.
  > `4x` : mobile 장치, `6x` : 속도를 추적하기 좋은 매우 크고 느린 기기
  > 
  > 두개 다 개발자의 PC보다, 실제 사용자의 사용감을 재현시켜줍니다.
4. network 스피드가 걱정된다면 network throttling을 설정해둡니다.
  > `Fast 3G`는 실제 사용하는 속도와 유사하고, "컴퓨터에 소리지를 정도로 너무 느리지는 않은" 정도의 속도를 가지고 있습니다.


모두 조합하여 정리하자면,

1. private/guest 브라우저 윈도우로 열어 사용합니다.
2. 필요하다면 `about:blank` 로 이동합니다.
3. Chrome의 DevTools을 엽니다.
4. Performance tab을 엽니다.
5. settings에서 CPU throttling과 network throttling을 켭니다.
6. Record button을 클릭하여 기록을 시작합니다.
7. URL을 입력하고 목표 페이지로 접근합니다.
8. page가 로드 된 후 기록을 중지합니다.

![performance record](https://nolanwlawson.files.wordpress.com/2021/02/screenshot-from-2021-02-20-14-58-18.png?w=768&h=436)

이제 JS의 parse/compile/execution 시간을 기록할 수 있는 performance trace (timeline 또는 profile 이라고도 불립니다.)를 확인할 수 있습니다. 

여기서는 웹 애플리케이션을 확인하기 위한 [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)(performace mark & measures 라고도 불립니다)를 사용합니다.
production 모드에서 이 APU의 비용에 대해서 걱정한다면 해당 API의 일부 - ex. `performance.mark` / `performance.meausre` 등을 떼어서 사용할 수 도 있습니다. *작자는* build된 production을 분석하고 싶을 때, user timing이 production 모드에서 쉽게 켜질 수 있게 하기 위해서 query string parameter를 기준으로 해당 API를 사용하는것을 좋아합니다.

각각의 dependency의 runtime cost를 볼 수 있도록, 작성된 module을 자동으로  mark/measure 호출 안에 감싸주는 Webpack plugin인 `mark-loader` 라는 tool도 매우 유용합니다. 

**어떤 Dependency가 얼마나 시간을 소모하는지 알아야하는 이유는 무엇일까요?**

![without user timing](https://nolanwlawson.files.wordpress.com/2021/02/screenshot-from-2021-02-22-22-02-23.png?w=768&h=375)
> 모두 `annonymous`로 표시되므로 User Timing 없이는 언제, 얼마나 소모되었는지 알 수 없습니다.

한 가지 알아야할 점은, runtime performance는 **압축된/압축되지 않은 코드사이에서 소비되는 시간 차이는 큽니다.**
사용되지 않은 functions는 제거되고, code는 더 작아지고 최적화되며, library는 production mode에서 실행하지 않는 `process.env.NODE_ENV === 'development'` 코드 블럭을 자동으로 정의합니다.

이 상황에서 *작자의* 개인적인 방법은 압축된, production build된 파일들을 직접 다루는 방법이며, 이해할 수 있도록 확인 및 측정 하는 것 입니다.  언급했다시피, `performance.mark` 와 `performance.measure` 는 적은 비용을 가지고 있으므므로 query string parameters로 toggle(껐다 켰다)할 수도 있습니다.

## Power usage
사용률 압축(minimizing power use)이 중요하다는 생가을 가질 필요는 없습니다. 우리는 점차적으로 원격으로 웹에 접근할 수 있는 기기들을 사용하는 시대에 살고있으므로, 잘못된 행동을 하고있는 website 만을 찾아내면 됩니다.

*작자는* CPU 사용의 부분집합으로 power use 를 생각하고는 합니다. website가 지나친 power를 소비하고있다면, [예외](https://hpbn.co/mobile-networks/#radio-resource-controller-rrc)가 있을 수 있지만, 대부분은 메인 스레드에서 지나친 CPU를 소비하고있기 때문입니다.

위에 설명했던 JS parse/compile/execute 시간을 향상시킬 수 있는 방법은 power 소비량도 줄일 수 있습니다. 그러나 특히 지속적 web application  power는 첫번째 페이지를 로드한 직후에 power가 소모됩니다. 이것은 사용자가 웹 페이지를 보기만 했을 뿐인데 갑자기 노트북 fan이 돌아간다거나, 전자기기에 발열을 느끼게 되는 시점입니다.

이런 상황에서, 특히 상단과 비슷한 상황에서 사용해야할 툴은 Chrome DevTools Performance 탭입니다. 반복되는 CPU 사용량을을 확인해야 하는데, 보통 **timers나 animations** 때문에 그렇습니다.

![poorly-behaved JS widget](https://nolanwlawson.files.wordpress.com/2021/02/screenshot-from-2021-02-20-15-19-13.png?w=768&h=302)
> 짧고 작은 JS 사용량은 느린 페이지와 지속적인 CPU 사용량을 보여줍니다.

이러한 불필요한 power 소비는 CSS animation을 비최적화 시키기도 합니다.(JS가 필요 없는데도 말이죠) 장기적으로 작동하는 CSS animation 을 위해서는, [GPU가속화::GPU-accelarated](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)된 CSS property들을 사용하는게 더 좋습니다.

