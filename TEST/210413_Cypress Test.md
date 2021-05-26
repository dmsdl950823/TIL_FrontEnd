---
title: 'Cypress 사용법'
---

- [Cypress 사용법](#cypress-사용법)
  - [Test 파일 구성](#test-파일-구성)
- [인터페이스](#인터페이스)
  - [테스트 코드 작성](#테스트-코드-작성)
    - [요소 선택](#요소-선택)
    - [페이지 방문](#페이지-방문)
    - [로그인](#로그인)
- [프로젝트 선택 / 자원 추가](#프로젝트-선택--자원-추가)

# Cypress 사용법

일반적인 프로젝트의 Cypress 는 `package.json` dependencies 내부에 `@vue-plugin-e2e-cypress` 로 정의되어있으며, 하단 스크립트로 실행 할 수 있습니다.
~~_`--mode` 는, 개발기 `dev`, 배포용 `prod` 으로 변경할 수 있습니다._~~

```json
    "scripts": {
        "test:e2e": "vue-cli-service test:e2e --mode prod",
        "cypress:run": "cypress run"
    },
    "devDependencies": {
        "@vue/cli-plugin-e2e-cypress": "^4.5.12"
    }
```

```bash
    $ npm run test:e2e
    # 또는 npm run cypress:run -> UI 없이 백그라운드에서 테스트 진행
```

## Test 파일 구성

모든 테스트 코드를 깔끔하게 `/tests` 디렉터리에 집어넣는 방법을 주로 사용하며, 작성된 테스트 코드의 종류(단위 테스트 / 통합 테스트)를 고려해야합니다. 현재 CMP 프로젝트의 `/tests` 파일 구성은 아래와 같습니다.

```bash
    ㄴ tests
      ㄴ e2e # e2e 테스트 파일이 포함됩니다
      ㄴ unit # 단위 테스트 파일이 포함됩니다
      ㄴ integration # 통합 테스트 파일이 포함됩니다
```

# 인터페이스

<img src="https://docs.cypress.io/_nuxt/img/gui-diagram.dd71ece.png" />

1. **The Status Menu** : 얼마나 많은 테스트들이 통과/실패되었는지, 얼마나 빠른시간안에 테스트를 실행했는지를 알려줍니다.
2. **Url Preview** : 앱이 테스트 되는 url 입니다. test 도중 루트를 옮기는 경우 눈으로 확인할 수 있습니다.
3. **Viewport Sizing** : 반응형 레이아웃을 테스트 하기위해서 앱의 뷰포트 사이즈를 조절할 수 있습니다.
4. Command Log : 모든 실행하는 로그를 저장합니다. hover 시 동작했던 요소에 하이라이트가 표시되며, 클릭시 console 정보를 확인할 수 있습니다.
5. **App preview** : 앱이 동작하는것을 real-time 으로 확인할 수 있습니다. `debug()` 시 chrome devtool 을 이용하여 로그를 확인할 수 있습니다.

백그라운드에서 실행할 경우, 아래와 같이 진행 상태를 캡쳐한 `screenshots` 폴더가 생성됩니다.

<img src="./images/03cypress.png" >

## 테스트 코드 작성

테스트 코드 작성에 대해서는 [Cypress 테스트 코드 작성 예제](https://ui.toast.com/fe-guide/ko_TEST#cypress-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1)를 참고하세요.

### 요소 선택

Cypress는 Jquery와 비슷하기 때문에, 먼저 테스트를 동작시킬 요소를 selector를 이용하여 선택 해야합니다.

1. 타겟 버튼을 클릭합니다.
2. 원하는 요소를 클릭합니다.
3. 상단 타겟 정보를 클릭하면 해당 요소가 자동으로 복사됩니다.

<img src="./images/05cypress.png" width=400>

### 페이지 방문

먼저 타겟 페이지를 방문하여, CONSOLE 페이지를 클릭합니다.

```js
it('페이지 방문 및 CONSOLE 메뉴 클릭', () => {
  cy.setCookie('CMPLang', 'ko') // 언어 선택

  // 페이지 방문
  cy.visit('http://localhost:8081/') // user

  // CONSOLE 상단 메뉴 클릭
  cy.get('.-console > .nav-link').contains('CONSOLE').click()
})
```

방문해야할 사이트를 일일이 지정해주지 않고 `cypress.config.js` 파일을 변경하여 기본 설정을 변경할 수 있습니다.
[config 문서](https://docs.cypress.io/guides/references/configuration#cypress-json)를 참고하세요

```json
// cypress.config.js
{
  "baseUrl": "http://myURL:1234"
}
```

### 로그인

```js
it('로그인', () => {
  // 로그인 - id / pw 입력
  cy.get(':nth-child(1) > .login-input > .el-input__inner')
    .type('e2eTest', { force: true })
    .get(':nth-child(2) > .login-input > .el-input__inner')
    .type('비밀번호', { force: true })
    .get('.el-checkbox__inner')
    .click()
    .get('.button')
    .click()

  cy.setCookie('CMPLang', 'ko')
  // ...
})
```

# 프로젝트 선택 / 자원 추가

```js
it('프로젝트 선택 및 [자원추가] 버튼 클릭', () => {
  cy.setCookie('CMPLang', 'ko') // 페이지가 이동할때 쿠키가 삭제됩니다 ㅠ

  // 프로젝트 선택
  cy.get(
    ':nth-child(3) > .project-component > .select-project-label > .project-label'
  )
    .click()
    .get('.list-group > :nth-child(21)')
    .click()

  cy.get(
    ':nth-child(2) > :nth-child(1) > .item-label-icon > .icon-wrap > .icon-sample'
  )
    .click()
    .get(':nth-child(2) > .node-item-child > :nth-child(1) > .node-item-label')
    .click()

  // [자원 추가] 버튼 클릭 및 자원 추가 설정
  cy.get('.button').click({ force: true })
})
```

---

출처

> - Jest 파일 구성 - [Organizing Tests in Jest](https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850)
