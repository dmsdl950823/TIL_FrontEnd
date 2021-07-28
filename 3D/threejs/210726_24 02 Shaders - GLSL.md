# GLSL

shader 에서 사용하는 언어는 GLSL 이라고 하며, OpenGL Shading Language 를 유지합니다. C 언어와 비슷합니다. 

## Logging

`console` 이 없으므로, 값을 확인할 수 있는 방법이 없습니다. 이것은 code 가 모든 꼭짓점과 모든 fragment 에 실행되기 때문입니다. 한 개의 값을 확인할 수 있는 방법이 없습니다.

## Indentation

text indentation 은 필수는 아닙니다. 원하는 만큼 넣어도 됩니다.

## Semicolon

세미콜론은 모든 문장에서 필수입니다. 1 개 라도 빠트릴경우, 컴파일 에러가 발생하며, 동작하지 않습니다.

## Variables

타입정의어이기 때문에, 변수의 타입을 지정해주어야 하며, 다른 타입은 지정할 수 없습니다.

variable 을 지정하기 위해서는, type 을 지정하고 변수명을 지정합니다.

``` c
  float fooBar = 0.123;
```