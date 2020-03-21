# SASS
Css, Sass, Scss 와 완벽호환되며, Ruby와 node에서 사용 할 수 있다. <br />
scss는 {}를 사용하지만, <br />
sass는 {} 대신 tab을 사용하며, 세미콜론(;)을 사용하지 않는다 - indented syntax사용

## @use
```
  /* scss */
  @use 'foundation/code';
  @use 'foundation/lists';
  
  /* sass */
  @use 'foundation/code'
  @use 'foundation/lists'
```

## @forward
@use로 스타일시트가 불러와졌을 때 Sass 스타일 시트를 불러와 mixins, functions, variable로 만들어준다.

## @import
```
  /* normal CSS */
  @import "themes/blackforest";
  @import "style.sass";
  
  /* Sass */
  @import themes/blackforest
  @import style.sass
```
## @extend
특정 클래스 상속
```
  .first_para {
    color: green
  }
  .sec_para {
    @extend .first_para;
    font-size: 20px;
  }
```

## @mixin & @include
```
  @mixin reset-list 
    margin: 0;
    padding: 0;
    list-style: none;
  
  p 
    @include reset-list;
```

## function
```
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

## @error
arguments를 받는 mixin/function를 작성할 때, arguments들이 type과 formats를 확인하여 받는지 확실해야 한다.
아니라면 error를 반환하게 멈추고 알림이 울리도록 해야한다.
```
  @mixin reflexive-position($property, $value) {
    @if $property != left and $property != right {
      @error "Property #{$property} must be either left or right.";
    }
  }
```
## @warn
@error와 비슷하지만 알림이 울리도록 함
```
  @mixin prefix($property, $value, $prefixes) {
    @each $prefix in $prefixes {
      @if not index($known-prefixes, $prefix) {
        @warn "Unknown prefix #{$prefix}.";
      }
    }
  }

```

## @debug
file이름과 line위치의 값을 표시한다.
```
  @mixin inset-divider-offset($offset, $padding) {
    $divider-offset: (2 * $padding) + $offset;
    @debug "divider offset: #{$divider-offset}";
  }
```
--------
# Data Type
Data type에는 <strong> Numbers, Booleans, Maps, Strings, Null, colors, Space and Comma </strong> 가 있다



## Maps
key/value로 이루어진 쌍 - 연결된 key로 value를 확인하기 쉽다.
pairs of keys and values, and make it easy to look up a value by its corresponding key

## Strings
문자의 집합 '', ""에 문자를 입력할 수 있다. <br />
사용시 #{} 안에 문자열 입력후 사용할 수 있다.
```
  $name: "tutorialspoint";
  p.#{name} {
    color: blue;
  }
```

---------
# Flow control

## @while
```
  @function scale-below($value, $base, $ratio: 1.618) {
    @while $value > $base {
      $value: $value / $ratio;
    }
    @return $value;
  }
```
## @if , @else
```
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
## @each

```
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

## @for
```
  $base-color: #036;

  @for $i from 1 through 3 {
    ul:nth-child(3n + #{$i}) {
      background-color: lighten($base-color, $i * 5%);
    }
  }
```
