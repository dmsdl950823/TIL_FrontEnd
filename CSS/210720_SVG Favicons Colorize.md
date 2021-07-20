# SVG Favicons Colorize

이 포스팅에서는 SVG 형식의 favicon 을 직접 SVG 를 편집하여(SVG 파일에 작성하여) 사용하는방법을 알아볼 것 입니다.

SVG 는 vector 형식을 가지고 있으므로, 코드를 이용하여 더 쉽게 편집할 수 있습니다. 특히 요즘은 데스크탑이 Dark mode를 많이 지원하므로, favicon 의 색상도 자유롭게 변경할수 있어야 합니다.

<img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/06/s_70347B5F4EC6CBA3A5F8B66FD0DA0625DB16DF3A3CECB6F595B44300FB4B505B_1623320546163_blue-red.png?resize=255%2C260&ssl=1"> <img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/06/s_70347B5F4EC6CBA3A5F8B66FD0DA0625DB16DF3A3CECB6F595B44300FB4B505B_1624524473573_codepen-demo.png?resize=255%2C260&ssl=1">

# SVG favicon 생성방법

``` html
  <!-- darkmode 에서 색상을 변경해야 할때: fill -->
  <svg>
    <style>
      // Your dark styles here
      path { fill: black; }
      @media (prefers-color-scheme: dark) {
        path { fill: white; }
      }
    </style>

    <!-- more stuff -->

  </svg>
```

``` html
  <!-- darkmode 에서 밝은 컬러로 아이콘을 바꿔야할 때: filter: brighness() -->
  <svg>
    <style>
      @media (prefers-color-scheme: dark) {
        :root {
          filter: brightness(2);
        }
      }
    </style>

    <!-- more stuff -->
  </svg>
```

``` html
  <!-- darkmode 에서 반전이 필요한 경우: filter: invert() -->
  <svg>
    <style>
      @media (prefers-color-scheme: dark) {
        :root {
          filter: invert(100%);
        }
      }
    </style>

    <!-- more stuff -->

  </svg>
```

----

출처: [css-tricks.com](https://css-tricks.com/svg-favicons-in-action/)