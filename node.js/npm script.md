# npm script
출처 https://docs.npmjs.com/misc/scripts

### "script" 필드를 다루는 방법

npm은 `package.json` 파일로 아래와 같은 "script" 프로퍼티를 지원합니다.

-  : 
| script | 설명 | 
|--------|------|
| `prepublish` | package가 packed / published 되기 전에, `npm install` 때 실행합니다. |
| `prepare` | package가 packed / published 되기 전에, `npm install` 때, git dependencies를 설치할 때  실행합니다. `prepublish`된 후에 이루어지지만 `prepublishOnly` 전에 이루어집니다. |
| `prepublishOnly` | package가 packed / published 되기 전에 실행합니다. npm publish 때만 이루어집니다. |
| `prepack` | tarball이 packed 되기 전에(`npm pack`, `npm publish`, git dependenties 설치시) 실행합니다. |
| `postpack` | tarball이 생성되고 마지막 목적지로 이동한 후에 실행합니다 |
| `publish`, `postpublish` | package가 publish 된 후에 실행합니다 |
| `preinstall` | package가 설치 되기 전에 실행합니다. |
| `install`, `postinstall` | package가 install 된 후에 실행합니다. |
| `preuninstall`, 'uninstall' | package가 삭제되기 직전에 실행합니다. |
| `preversion` | package version이 충돌(bump) 전에 실행합니다. |
| `version` | commit 전에, package version이 충돌 후에 실행합니다. |
| `postversion` | commit 후에, package version이 충돌 후에 실행합니다. |
| `pretest`, `test`, `posttest` | `npm test` command에 의해 실행됩니다. |
| `prestop`, `stop`, `poststop` | `npm stop` 명령에 의해 실행됩니다 |
| `prestart`, `start`, `poststart` | `npm start` 명령에 의해 실행됩니다 |
| `prerestart`, `restart`, `postrestart` | `npm restart` 명령에 의해 실행됩니다. <br> `npm restart`는 멈추고 만약 `restart` 스크립트가 제공될 경우 scripts 를 시작할 것입니다.
| `preshrinkwrap`, `shrinkwrap`, `postshrinkwrap` | `npm shrinkwrap` 명령에 의해 실행됩니다. | 

### Prepublish 그리고 Prepare

#### 기본값
npm은 package 컨텐츠를 기반으로 몇몇 script 값을 기본으로 사용합니다.

- `"start" : "node server js"`
  | 만약 여러분의 패키지중 루트에 `server.js` 라는 파일이 있다면, npm은 `start` 커맨드를 기본값으로 `node server.js` 라고 지정할 것입니다.
  
- `"install" : "node-gyp rebuild"`
  | 만약 `building.gyp` 라는 파일이 있고, 여러분이 여러분만의 `install` 또는 `preinstall` script를 정의하지 않은 경우, npm은 `install` 커맨드를 node-gyp를 컴파일하는데 기본값으로 사용할 것입니다.


#### USER
만약 npm이 root 에 의해 호출된 경우, npm은 uid를 user account나, 원래는 기본값이 `nobody`인 `user` config로 정의된 uid로 변경할 것입니다.
script를 루트 권한으로 사용하기 위해 `unsafe-perm` flag를 설정하세요

## 
