# package.json 파일에 대해

출처 : https://docs.npmjs.com/files/package.json

### 설명
package.json 파일안에 무엇이 필요한지 알려드립니다.<br>
JSON 파일이긴 하지만, 그냥 javascript 오브젝트 문자인 것은 아닙니다.

<br><br>
이 문서에 설명되어있는 많은 실행문들은 config setting 에 영향을 받습니다. (npm-config 파일 참조)

### name & version
여러분들의 package를 퍼블리싱 하려는 계획을 가지고 있다면, package.json 에서 가장 중요한 것은 `name` 과 `version` 필드 입니다.
name과 version은 구분하기 위한 특별한 형식입니다. 만약 여러분이 package를 publish 하려는 계획이 아니라면, name과 version 필드는 사실 선택입니다.

<br><br>
> name은 규칙을 가집니다.
-  214 개의 char 보다 같거나 작아야 합니다. 이것은 scoped package를 위핸 scope를 포함하고있습니다.
- . 이나 _ 로는 시작 할 수 없습니다.
- UPPER_CASE 가 들어갈 수 없습니다.
- name은 URL의 부분으로 끝이 나야 합니다.

> 팁
- Node module과 같은 이름을 사용하지 마세요
- 'js' 나 'node' 라는 단어를 name에 입력하지마세요.
- `require()` 에 매개변수로 들어가게 될 수 있으므로, 짧게, 그러나 합리적으로 알 수 있게 작성하세요


### description
package에 대한 설명을 입력하세요. `npm search` 에 등록되어 사람들이 여러분의 패키지를 발견하는데 도움을 줄 것입니다. <br>

### keywords
keywords를 입력하세요. string으로 이루어진 array입니다. <br>
이것은  `npm search` 에 등록되어 사람들이 여러분의 패키지를 발견하는데 도움을 줄것입니다.

### homepage
project 홈페이지 url 입니다.
```
  "homepage": "https://github.com/owner/project#readme"
```

### bugs
project의 issue tracker를 위한 url 이나 문제를 보고할 수 있는 email 주소를 입력하세요. <br>
이것은 우연히 문제를 만나게 될 사람들에게 유용합니다.

```
{ "url" : "https://github.com/owner/project/issues",
  "email" : "project@hostname.com" }
```

### license
사람들이 그들이 이 package의 사용이 허용되었다는것을 알리기 위해, 제약을 걸어놓기 위해 여러분만의 package를 위한 라이센스를 입력해야합니다.
```
{ "license" : "SEE LICENSE IN <filename>" }
```

### people fields : author, contributors
authors 는 한 사람으로 이루어진 object이고, "contributors" 는 사람들의 배열입니다.
authors에는 name, email, url 등의 key, value를 정보를 입력하여 하나의 object를 생성해줍니다.


------


### files
선택적인 `files` 필드는 여러분의 package가 dependency로 설치될 때 포함되는 patters의 배열입니다.

### main
main 필드는 여러분의 프로그렘에 entry point가 되는  module Id 입니다.
여러분의 package 이름이 `foo` 일경우, 유저들이 install을 하면, 여러분의 메인 모듈의 export object가 리턴됩니다.
이것은 여러분의 package 폴더의 root에 연관된 module ID가 됩니다.

대부분의 moudles는, 가장

....

### repository
여러분의 code를 어디에 놓을것인지 명시합니다. 이것은 contribute를 원하는 사람들에게 유용합니다.
만약 git repo가 Github라면, `npm docs` 커맨드는 여러분을 찾을 수 있게 해줍니다.
```
"repository": {
  "type" : "git",
  "url" : "https://github.com/npm/cli.git"
}

"repository": {
  "type" : "svn",
  "url" : "https://v8.googlecode.com/svn/trunk/"
}
```

### scripts
"script" 프로퍼티는 여러분의 package의 lifecycle 안에서 다양한 시간에 작동하는 script 커맨드를 포함하는 사전입니다.
중요한것은 lifecycle 이벤트이고, 값은 그 순간에 실행하도록 명령하는 것입니다.
=> npm script 문서를 참조하세요

### config
"config" 오브젝트는 여러분의 package 안에서 사용되는 configuration 매개변수를 사용해 정의될 수 있습니다.

### dependancies   🌌
dependencies 는 package의 name과 version 범위를 나타낸 간단한 object 안에 구체화 되어있습니다.
version 범위는 string 으로 이루어져 있습니다.
dependencies는 또한 tarball이나 git URL로도 정의될 수 있습니다.

### dependencies로써의 Git URLs => 문서 참조
### Github URLs

...

### devDependencies
만약 누군가가 여러분의 module을 그들의 프로그램에 다운로드 및 사용한다면, 그들은 아마도 여러분이 사용한 외부 테스트나 documentation framework 까지 다운받고 싶진 않을겁니다.
이런 경우, 이런 추가적인 내용들은 `devDependencies` object에 연결을 하는게 좋습니다.
npm link 나 npm install 를 할 때, 이런 것들은 다운로드 되는데, 다른 npm configuration 파라미터로 관리될 수 있습니다.


