# Redux_lecture.md

## Redux?
컴포넌트들끼리 데이터교류, state변경을 자유롭게하는것

## Basic definition
  ```MVC ->  Action - Controller -> Model <=> View```
  > 작은 플랫폼에서는 괜찮지만 큰 프로젝트에선 버그 발생
  
  ```FLUX ->  Action - Dispatcher -> Store -> View -> Dispatcher ...```
  > Flux로의 카툰안내서 참고

### 3가지 원칙
1. Redux: state를 위해 한개의 store 사용<br/>
Flux: 여러개의 store 사용 (store구조는 개발자 나름)

2. state는 읽기 전용 -> state를 직접 변경할 수 없음.<br/>
state를 변경하기 위핸 무조건 action이 dispatch되어야 함

3. action객체를 처리하는 함수를 reducer라고 부름<br/>
reducer는 순수함수로 작성 (비동기X-데이터베이스/인수변경/네트워크 접근 X ), API 사용X

------------------------------------

* 똑똑한 컴포넌트(Smart component)
  > 액션을 핸들링(뺀질이 컴포넌트같은데..?)
* 멍청한 컴포넌트(Dumb component)
  > 단순히 함수만 호출. DOM을 관리.
<br />

* 뷰 레이어 바인딩 (view layer binding)
> 기술적 세부사항을 처리하여 세부사항을 신경쓰지 않고 관리 가능 - 루트 컴포넌트 (root component)

* 리덕스의 총괄
