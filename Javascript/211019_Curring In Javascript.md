# Javascript 에서 Currying 이란?

Currying 은 함수를 이용한 방법중 가장 발전된 방법이라고 할 수 있습니다.

## Currying 이란?

먼저, Currying 은 많은 Javascript 외에 다른 언어에서도 존재합니다. Currying 은 **과정** 입니다.
특정한 매개변수의 숫자를 가진 함수를 연속된 nested 된 함수로 변환하는 과정입니다.

각각의 연속적인 함수들은 오직 한개의 return 만 가지고, 한개의 매개변수를 전달합니다.

``` js
  // Curried 함수:
  function curriedFn (a) {
    return function (b) {
      return function (c) {
        return a + b + c
      }
    }
  }

  // 일반 함수:
  function fn (a, b, c) {
    return a + b + c
  }
```

두번째는 어떻게 curried 된 함수를 호출하고 사용하는지에 대한 것 입니다. 일반적으로, 모든 요구되는 매개변수를 전달해주어야 합니다. curried 된 함수를 이용할 때는, 각각의 매개변수를 분리된 세트의 부모에게 전달해주어야합니다.

``` js
  // 위에 선언된 Curried 함수 호출
  curriedFn(11)(22)(33)
  // Output:: 66

  // 일반 함수 호출
  fn(11, 22, 33)
```

# Currying 이 동작하는 방식

## 값 (values), 매개변수 (arguments), 클로저 (closure)

Currying 을 이해하는데에는 클로저 함수에 대한 개념을 얼마나 잘 알고있는지에 따라 달라집니다. 클로저 덕분에 currying 이 동작하기 때문입니다. 예시에서 보았던것 처럼, 각각의 함수는 **한 개의 매개변수** 로만 동작했습니다.

`return` 을 이용해 각각의 함수가 호출되었고, 각각의 값은 매개변수에게 전달되었습니다. 그 값은 여전히 함수 내부의 범위(scope) 애서 존재합니다. 가장 중요한 것은, 어떤 범위 내부에 있는 함수가 이 값에 접근할 수 있다는 것입니다.

이 모든 값은 존재하면서, 동시에 접근 가능한 값입니다. 이 범위는 마지막 함수와 그 값이 `return` 함으로써 제거됩니다.  마지막 함수(가장 안쪽에 있는함수)가 동작되는 경우에도 이 모든 값은 존재합니다.

```js
  function curriedFn(a) {
    // Argument "a" exists here
    return function(b) {
      // Argument "a" and "b" exist here
      return function(c) {
        // Argument "a", "b" and "c" exist here
        return a + b + c
      }
    }
  }
```

## Parentheses(삽입어구) 에 관하여

가장 안쪽에있는 함수가 모든 이전의 값을 `return` 할 수 있는 것은 클로저 덕분이라고 말했습니다. 아래의 경우는 어떨까요? 이 **Parentheses(삽입어구)** 는 두 개의 중요한 목적을 다루고 있는데,

하나는 **모든 특정 매개변수를 특정한 함수에게 전달해준다는 것 입니다.**
Parentheses 는  curried 함수안에서 정의된 매개변수 안에서 결정됩니다.

두번째는 **이 각각의 추가적인 Parentheses 는 사실 새로운 함수를 호출하는 것 입니다**.
이 말은, 예제에서 세 개의 Parentheses 각각이 사실 새로은 함수를 호출한다는 것 입니다.

이 각각의 호출은 순서에 맞는 각각의 함수들을 호출합니다.

``` js
  // Create curried function:
  function curriedFn(a) {
    return function(b) {
      return function(c) {
        return a + b + c
      }
    }
  }

  // Calling curried function:
  curriedFn(11)(22)(33)

  // can be visualized as:
  outermostFn(11) // curriedFn(a) { ... }
  middleFn(22) // function(b) { ... }
  innermostFn(33) // function(c) { ... }
```