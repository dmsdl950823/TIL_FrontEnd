- [Type Conversion (형식 변환)](#type-conversion-형식-변환)
- [String conversion (문자열 변환)](#string-conversion-문자열-변환)
    - [Number to String](#number-to-string)
    - [Boolean to String](#boolean-to-string)
    - [Array to String](#array-to-string)
    - [Object to String](#object-to-string)
  - [Boolean type conversion (불린 변환)](#boolean-type-conversion-불린-변환)
    - [String to Boolean](#string-to-boolean)
    - [Number to Boolean](#number-to-boolean)
    - [Undefined to Boolean](#undefined-to-boolean)
    - [Null to Boolean](#null-to-boolean)
    - [Object to Boolean](#object-to-boolean)
    - [Array to Boolean](#array-to-boolean)
- [Number type Conversion (숫자 변환)](#number-type-conversion-숫자-변환)
    - [String to Number](#string-to-number)
    - [Boolean to Number](#boolean-to-number)
    - [Null to Number](#null-to-number)
    - [Null to Number](#null-to-number-1)
    - [Array to Number](#array-to-number)
- [Null type Conversion (Null 변환)](#null-type-conversion-null-변환)
- [Undefined type conversion (Undefined 변환)](#undefined-type-conversion-undefined-변환)

    출처: [Dev.to](https://dev.to/danielkrupnyy/javascript-basic-type-conversion-cheat-sheet-1gg4#string-conversion)


# Type Conversion (형식 변환)

* Type Conversion 은 명시적이거나 암시적입니다.

``` js
    value = Number('23') // 명시적
    value = 5 + '25'     // 암시적
```

* 값 타입 체킹

``` js
    console.log(type of value)
```

# String conversion (문자열 변환)

### Number to String
``` js
    value = String(10)           // '10'
    value = String(10 + 40)      // '50'
    value = (10 + 40).toString   // '50'
    value = new String(10 + 20)  // '30'
```

### Boolean to String

``` js
    value = String(true)    // 'true'
    value = String(false)   // 'false'
```

### Array to String

``` js
    value = String([ 1, 2, 3 ])  // '1, 2, 3'
    value = String([ ])        // ''
```

### Object to String

``` js
    value = String({ name: 'Daniel' })  // '[object Object]'
```

Conversion to string occurs when any data type is concatenated with a string (implicit conversion):

``` js
    value = 30 + ' ' + 30         // '30 30' -> Space is considered a symbol
    value = 30 + '' + undefined   // '30undefined'
```

Mathematical operations convert Empty String to zero:

``` js
    value = 30 - ''       // 30
    value = 30 - 'text'   // NaN -> If the string is not empty, then we will get NaN - calculation error.
    value = 30 - '5'      // 25 -> If we write a number in a string, we will get a number type
```

## Boolean type conversion (불린 변환)

수학적인 계산에서, `true` 는 `1` 이며, `false` 는 `0` 으로 변환됩니다.

``` js
    value = true + 5   // 6
    value = false + 5  // 5
```

### String to Boolean

``` js
    value = Boolean('hello')  // true -> Any non-empty string will be considered true.
    value = Boolean(' ')      // true
    value = Boolean('')       // false -> An empty string will be considered false.
```

### Number to Boolean

``` js
    value = Boolean(-123)     // true -> Any number, both positive and negative, will be considered true.
    value = Boolean(123)      // true
    value = Boolean(0)        // true
```

### Undefined to Boolean

``` js
    value = Boolean(undefined) // false
``` 

### Null to Boolean

``` js
    value = Boolean(null) // false
```

### Object to Boolean

``` js
    value = Boolean({ })  // true -> An empty object is considered true.
```

### Array to Boolean

``` js
    value = Boolean([ ])  // true -> An empty array is considered true.
```


# Number type Conversion (숫자 변환)

### String to Number

``` js
    value = Number('23')   // 23
    value = Number('string ... LaLALa~')   // NaN
    value = parseInt(' 203px')    // 203 -> The parseInt function reads a number from a string and removes all characters after it, but if there are characters before the number (except for a space), then it will output NaN. Serves for whole numbers.
    value = parseInt('203.212px') // 203 -> Works the same as parseInt, but for fractional numbers.
```

### Boolean to Number

``` js
    value = Number(true)   // 1
    value = Number(false)  // 0
```

### Null to Number

``` js
    value = Number(null)   // 0
```

### Null to Number

``` js
    value = Number(null)   // 0
```

### Array to Number

``` js
    value = Number([ 1, 2, 3 ]) // NaN ->  NaN refers to numbers
```


# Null type Conversion (Null 변환)

수학적인 계산을 이용해서 `0`  으로 변환됩니다.

``` js
    value = null + 5  // 5
```

# Undefined type conversion (Undefined 변환)

``` js
    value = false + undefined  // NaN
```