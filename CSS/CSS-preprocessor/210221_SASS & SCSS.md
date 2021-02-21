- [SASS](#sass)
    - [특징](#특징)
  - [variable : `$`](#variable--)
  - [`@use`](#use)
  - [`@forward`](#forward)
  - [`@import`](#import)
  - [`@extend`](#extend)
  - [`@mixin` & `@include`](#mixin--include)
  - [`@function`](#function)
  - [`@error`](#error)
  - [`@warn`](#warn)
  - [`@debug`](#debug)
  - [`@at-root`](#at-root)
- [Data Type](#data-type)
  - [Maps](#maps)
  - [Strings](#strings)
- [Flow control](#flow-control)
  - [`@while`](#while)
  - [`@if` , `@else`](#if--else)
  - [`@each`](#each)
  - [`@for`](#for)

# SASS
Css, Sass, Scss 와 완벽호환되며, Ruby와 node에서 사용 할 수 있다.

### 특징
** `scss`는 `{ }`를 사용하지만, `sass`는 `{ }` 대신 tab을 사용하며, 세미콜론(;)을 사용하지 않는다(indented syntax 사용)


## variable : `$`

sass의 변수는 이미 변수에 값이 할당되었을 경우 재할당될 수 없음

<strong>`!default`</strong>를 변수와 함께 할당할 경우 해당값이 변수에 기본으로 할당됨

``` scss
  $myval1: null;
  $myval1: "Sass was developed" !default;
  
  p:after {
    content: $myval1;   // content: "Sass was developed"
  }
```


## `@use`

``` scss
  /* scss */
  @use 'foundation/code';
  @use 'foundation/lists';
  
  /* sass */
  @use 'foundation/code'
  @use 'foundation/lists'
```

## `@forward`
`@use`로 스타일시트가 불러와졌을 때 sass 스타일 시트를 불러와 `mixins`, `functions`, `variable`로 만들어준다.

## `@import`
``` scss
  /* normal CSS */
  @import "themes/blackforest";
  @import "style.sass";
  
  /* Sass */
  @import themes/blackforest
  @import style.sass
```
## `@extend`
특정 클래스 상속

``` scss
  .first_para {
    color: green
  }
  .sec_para {
    @extend .first_para;
    font-size: 20px;
  }
```

## `@mixin` & `@include`

``` scss
  @mixin reset-list 
    margin: 0;
    padding: 0;
    list-style: none;
  
  p 
    @include reset-list;
```

## `@function`

``` scss
  @function pow($base, $exponent) {
    $result: 1;
    @for $_ from 1 through $exponent {
      $result: $result * $base;
    }
    @return $result;
  }
  
  .sidebar {
    float: left;
    margin-left: pow(4, 3) * 1px;
  }
```

## `@error`
arguments를 받는 `mixin` / `function`를 작성할 때, arguments들이 type과 formats를 확인하여 받는지 확실해야 한다.
그렇지 않다면 error를 반환하게 멈추고 알림이 울린다.

``` scss
  @mixin reflexive-position($property, $value) {
    @if $property != left and $property != right {
      @error "Property #{$property} must be either left or right.";
    }
  }
```
## `@warn`
`@error`와 비슷하지만 알림이 울리도록 함

``` scss
  @mixin prefix($property, $value, $prefixes) {
    @each $prefix in $prefixes {
      @if not index($known-prefixes, $prefix) {
        @warn "Unknown prefix #{$prefix}.";
      }
    }
  }

```

## `@debug`
file 이름과 line 위치의 값을 표시한다.

``` scss
  @mixin inset-divider-offset($offset, $padding) {
    $divider-offset: (2 * $padding) + $offset;
    @debug "divider offset: #{$divider-offset}";
  }
```

## `@at-root`
상속된 규칙의 모음 - 스타일 블럭을 문서의 가장 루트노드에 만들 수 있다.

``` scss
  @media print {
    .style {
      height: 8px;
      @at root (without: media) {
        color: #808000;
      }
    }
  }
  
  // result => 
  // @media print {
  //    .style {
  //      height: 8px
  //    }
  // }
  // .style {
  //    color: #808000;
  // }

```

--------
# Data Type
Data type에는 <strong> `Numbers`, `Booleans`, `Maps`, `Strings`, `Null`, `colors`, Space and Comma </strong> 가 있다


## Maps
key/value로 이루어진 쌍 - 일치하는 key로 value를 확인하기 쉽다.

## Strings
문자의 집합 `''`, `""`에 문자를 입력할 수 있다. <br />
사용시 `#{ }` 안에 문자열 입력후 사용할 수 있다.

``` scss
  $name: "tutorialspoint";
  p.#{name} {
    color: blue;
  }
```

------------------

# Flow control

## `@while`

``` scss
  @function scale-below($value, $base, $ratio: 1.618) {
    @while $value > $base {
      $value: $value / $ratio;
    }
    @return $value;
  }
```
## `@if` , `@else`

``` scss
  @mixin theme-colors($light-theme: true) {
    @if $light-theme {
      background-color: $light-background;
      color: $light-text;
    } @else {
      background-color: $dark-background;
      color: $dark-text;
    }
  }
```
## `@each`

``` scss
  $sizes: 40px, 50px, 80px;
  @each $size in $sizes {
    .icon-#{$size} {
      font-size: $size;
      height: $size;
      width: $size;
    }
  }
  
  // result => .icon-40px {...} .icon-50px {...} .icon-80px {...}
```

## `@for`
``` scss
  $base-color: #036;

  @for $i from 1 through 3 {
    ul:nth-child(3n + #{$i}) {
      background-color: lighten($base-color, $i * 5%);
    }
  }
```
