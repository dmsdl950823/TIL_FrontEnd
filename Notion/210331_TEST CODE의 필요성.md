- [TEST Code 의 필요성](#test-code-의-필요성)
- [Test 종류](#test-종류)
- [테스트 더블](#테스트-더블)
- [테스트 코드 구조](#테스트-코드-구조)

# TEST Code 의 필요성

개발시 새로운 수정사항을 반영할 경우, 기존 코드에 대한 검증 및 사이드 이펙트에 대한 검증이 필요하다. 이러한 문제들을 해결할 수 있는 것이 테스트 코드. 탄탄한 테스트 코드는 새로운 변화에 유동적으로 대응할 수 있으며 해당 코드에 대한 확신을 가질 수 있도록 해준다.

# Test 종류

테스트에는 **단위테스트**, **통합테스트**, 그리고 **E2E** 테스트로 나눌 수 있다.

* **단위 테스트 ( unit Test )**
  * 개발자의 관점에서 테스트를 하는 경우 사용
  * 가장 최소단위의 테스트로, 일반적으로 모듈 단위로 테스트

* **통합 테스트 ( Integration Test )**
  * 개발자의 관점에서 테스트를 하는 경우 사용
  * 단위 테스트 보다 넓은 범위의 테스트로, 2개 이상의 모듈을 연결하여 진행하는 테스트
  * 서비스 로직을 실행했을 때, 알맞은 데이터를 제공하는지, 올바른 로직을 수행하는지 등을 테스트 함

* **E2E Test ( End to End Test )** 
  * 사용자의 관점에서 테스트를 하는 경우 사용
  * 사용자가 움직일 거라 예상하는 시나리오를 script 를 이용하여 매크로처럼 브라우저 내에서 자동으로 실행하는 방식
  * 실제 사용자가 사용하는 상황에서 발생하는 에러를 사전에 확인 가능
  * 대표 Tool : <small>Selenium WebDriver, Cypress, TestCafe ...</small>

# 테스트 더블

단위 테스트 패턴으로, 테스트하기 곤란한 **컴포넌트를 대체하여 테스트**하는 것.

특정한 동작을 흉내만 낼 뿐이지만 테스트 하기에는 적합함. 다음 가지를 통칭하여 테스트 더블이라고 칭함

* **더미 (dummy)** :: 파라미터로 사용되며 실제 사용되진 않음
* **스텁 (sturb)** :: 더미를 개선하여 실제 동작하게끔 만든 것. 리턴 값을 하드 코딩함
* **스파이 (spy)** :: 스텁과 유사. 내부적으로 기록을 남기는 추가 기능. 특정 메서드가 호출되었는지 등의 상황 감시
* **페이크 (fake)** :: 스텁에서 발전한 실제 코드. 운영에서는 사용 불가
* **목 (mock)** :: 더미, 스텁, 스파이를 혼합한 형태


# 테스트 코드 구조

개인적으로 아래와 같은 형태로 테스트를 구성하는 것을 선호한다 jasmine과 동일하게 구성 가능하며 it 메서드 대신 test를 사용해도 된다.

기본 테스트 파일명: `*.test.js`

| method       | desc                                                                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `describe()` | `test()` 코드를 하나의 테스트 작업 단위로 묶어주는 API.<br>하나의 테스트 케이스를 `test()` 라고 한다면 `describe()` 는 여러개의 테스트 케이스를 하나의 그룹으로 묶어줌 |
| `it()`       | 테스트 코드를 돌리기 위한 API. 하나의 테스트 케이스를 의미                                                                                                             |
| `test()`     | JEST API? - 테스트 코드를 돌리기 위한 API. 하나의 테스트 케이스를 의미 (`it()` 과 동일)                                                                                                           |
| `expect()`   | JEST API? - 테스트를 할 대상을 넣는 API. 주로 테스트 입력값 또는 기대 값 입력                                                                                                      |
| `toBe()`     | JEST API? - 테스트의 결과를 확인하는 API                                                                                                                                           |




```js 
    describe('A_module 테스트', () => {
        beforeEach(() => {
            // 각 테스트 전에 실행
        })

        afterEach(() => {
            // 각 테스트 이후에 실행
        })

        describe(('A_module.a_method 테스트', () => {
            it('a_method 테스트 1', () => {
                // ...
            })

            test('a_method 테스트 2', () => {
                // ...
                expect(/* ... */).toBe(/* ... */)
            })
        }))
    })
```

-------------
출처
[GOGO Tistory](https://gogomalibu.tistory.com/138) , 
[kijungsong.github](https://kijungsong.github.io/2020/04/15/javascript-test-jasmine/), 
[cypress 환경 구축하기](https://class101.dev/ko/blog/2020/06/24/han/),
[jest puppetter](https://www.loginradius.com/blog/async/e2e-testing-with-jest-puppeteer/),
[Cracking Vue.js](https://joshua1988.github.io/vue-camp/testing/jest-testing.html#jest-api),
[Toast UI](https://ui.toast.com/fe-guide/ko_TEST#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC)
