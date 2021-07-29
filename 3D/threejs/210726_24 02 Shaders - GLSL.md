- [GLSL](#glsl)
  - [Logging](#logging)
  - [Indentation](#indentation)
  - [Semicolon](#semicolon)
  - [Variables](#variables)
  - [Float](#float)
  - [Integer](#integer)
  - [Boolean](#boolean)
  - [Vector 2](#vector-2)
  - [Vector 3](#vector-3)
  - [Vector 4](#vector-4)

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

## Float

항상 `.` 를 사용하여 소수 형태로 만들어주어야 합니다.

``` c
  float foo = - 0.123;
  float bar = 1.0;

  
  // + - * /  연산자를 사용할 수도 있습니다.
  float a = 1.0;
  float b = 2.0;
  float c = a / b;
```

## Integer

``` c
  int foo = 123;
  int bar = - 1;

  // + - * /  연산자를 사용할 수도 있습니다.
  float a = 1.0;
  float b = 2.0;
  float c = a / b;
```

그러나 `float` 와 `int` 를 혼합하여 사용할 수는 없습니다.

``` c
  float a = 1.0;
  int b = 2;
  float c = a * b; // error!

  // 변환해 주면 됩니다.
  float a = 1.0;
  int b = 2;
  float c = a * float(b);
```

## Boolean

``` c
  bool foo = true;
  bool bar = false;
```

## Vector 2

`x`, `y` 프로퍼티를 가진 값을 저장하고싶다면, `vec2` 를 사용할 수 있습니다.

``` c
  vec2 foo = vec2(1.0, 2.0);
```

빈 vec2 는 에러를 반환합니다.
먼저 `vec2` 를 선언한 후에, 프로퍼티들을 변경하면 됩니다.

``` c
  // error!
  vec2 foo = vec2();

  // O
  vec2 foo = vec2(0.0);
  foo.x = 1.0;
  foo.y = 2.0;
```

`float` 를 이용하여  `vec2` 에 연산하는 경우, `x`, `y` 프로퍼티를 둘다 연산합니다.

``` c
  vec2 foo = vec2(1.0, 2.0);
  foo *= 2.0;
  // 1.0 * 2.0  | 2.0 * 2.0
```

## Vector 3

`vec3` 는 `vec2` 와 비슷하지만, `z` 프로퍼티를 가집니다. 3D 형태를 만들어내는데 필요합니다.

``` c
  vec3 foo = vec3(0.0);
  vec3 bar = vec3(1.0, 2.0, 3.0);
  bar.z = 4.0;
```

`x, y, z` 프로퍼티를 사용하는 대신에, `r, g, b` 값으로 대신할 수 있습니다. 이것은 *syntax sugar* 이기 때문에 결과는 동일합니다. `vec3` 를 사용하여 컬러를 설정할 때 매우 효과적입니다.

``` c
  vec3 purpleColor = vec3(0.0);
  purpleColor.r = 0.5;
  purpleColor.b = 1.0;
```

`vec3` 는 `vec2` 로 생성되어질 수 도 있습니다.

``` c
  vec2 foo = vec2(1.0, 2.0);
  vec3 bar = vec3(foo, 3.0);
```

`vec3` 을 이용하여 `vec2` 를 생성할 수도 있습니다.

``` c
  vec3 foo = vec3(1.0, 2.0, 3.0);
  vec2 bar = foo.xy;
  // bar 는 vec2(1.0, 2.0) 을 값을 가집니다
```

다음 코드에서 `bar` 는 `1.0`, `2.0` 의 값을 가질것입니다. 이것을 `swizzle` 이라고 하며, 순서에 상관없이 대입시킬 수 있습니다.

``` c
  vec3 foo = vec3(1.0, 2.0, 3.0);
  vec2 bar = foo.yx;
  // === vec2 bar = foo.xy;
```

## Vector 4

마지막으로, `vec4` 는 `w`와 `a` (alpha) 의 이름을 가진 총 4개의 프로퍼티를 가집니다.

``` c
  vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
  vec4 bar = vec4(foo.zw, vec2(5.0, 6.0));
```

`mat2`, `mat3`, `mat4`, `sampler3D` 같은 다른 타입의 변수도 있지만 나중에 살펴볼 것 입니다.
