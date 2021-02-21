- [Webpack](#webpack)
  - [Configuration 의 사용 - `webpack.config.js`](#configuration-의-사용---webpackconfigjs)
  - [NPM Script](#npm-script)

# Webpack
Webpack은 Javascript 모듈들을 컴파일하는데 사용됩니다.
일단 설치를 하면, CLI나 API 둘중 하나로부터 웹팩과 연결할 수 있습니다.

## Configuration 의 사용 - `webpack.config.js`

4 버전 이후로부터, webpack은 어떤 configuration도 요구하지 않지만, 대부분의 프로젝트는 더 복잡한 setup을 필요로 할것입니다. 그래서 webpack은 <b>configuration file</b>을 지원합니다. 이것은 터미널에서 수동적으로 많은 커맨드를 작성하는것 보다 더 효과적입니다.

``` js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

이제부터 새로운 configuration 파일을 이용하여 build를 하면 됩니다.

## NPM Script

... 진행중
