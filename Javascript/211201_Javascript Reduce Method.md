# JavaScript Reduce Method Made Simple

`reduce()` 메서드는 가장 자주 사용되는 Array 메서드인 ES6(ECMAScript 2015) 에 추가된 JS 기능입니다. `reduce()` 의 역할은 제공된 reducer function 을 실행하여 주어진 **Array 를 한 개의 값으로 줄여나가는** 역할을 합니다. 결과적으로는 한 개의 값으로 줄여나가는 것 입니다.

``` js
// reduce() 문법
array.reduce(callback, initialValue)

const reducer = (accumulator, currentValue, index) => {
  // ...
}
```

# 사용법

reduce 메서드는 보통 전체 총합/평균/최소/최대 값을 구할 때 사용됩니다. 이 말은 다른데에도 사용할 수 있다는 의미입니다. 예를들어 Object 구조 변경이나 2차원 배열을 직렬화하는데도 사용할 수 있습니다.

### Array 값 모두 더하기

``` js
const numbers = [ 1, 3, 5, 7, 9, 11 ]

// 모두 더하기
const sum = numbers.reduce((accumulator, currentValue, index) => accumulator + currentValue, 0)

console.log(sum) // 36
```

### Array 의 평균 구하기

``` js
const numbers = [ 1, 3, 5, 7, 9, 11 ]

// 평균 값 구하기
const average = array.reduce((accumulator, currentValue, index, array) => {
  // 각 반복 안에서 curr 을 acc 와 더합니다
  accumulator += currentValue

  // curr 이 array 의 마지막 아이템인지 확인합니다
  if (index === array.length - 1) {
    // 마지막인경우, 축적된 값을 갯수로 나눕니다
    return accumulator / array.length
  } else {
    // 아니라면 계속 쌓기 위해 acc 를 반환합니다
    return accumulator
  }
})

console.log(average)  // 6
```

### Array 의 최소/최대 값 구하기

``` js
const numbers = [ 1, 3, 5, 7, 9, 11 ]

// 최소값 구하기
const min = numbers.reduce((accumulator, currentValue) => {
  return accumulator < currentValue ? accumulator : currentValue;
})

console.log(min)  // 6
```

``` js
const numbers = [ 1, 3, 5, 7, 9, 11 ]

// 최대값 구하기
const max = numbers.reduce((accumulator, currentValue) => {
  return accumulator > currentValue ? accumulator : currentValue;
})

console.log(max)  // 11
```

### Array 직렬화하기

``` js
const numbers = [ 1, [3, 5], [7, 9, 11], [13, 15, 17] ]

// 직렬화
const numbersFlattened = numbers.reduce((accumulator, currentValue) => {
  // acc 를 curr 와 연결합니다
  return accumulator.concat(currentValue)
}, [])

console.log(numbersFlattened) // [1,  3,  5,  7, 9, 11, 13, 15, 17]
```

### 배열 안의 갯수 세기

``` js
const fruit = [ 'apple', 'pear', 'lemon', 'avocado', 'apple', 'banana', 'pear', 'apple', 'pineapple' ];

// 갯수 세기
const occurrences = fruit.reduce((accumulator, currentItem) => {
  // acc Object 안에 존재하는지 확인
  if (currentItem in accumulator) {
    // 있다면 +1 하기
    accumulator[currentItem] = accumulator[currentItem] + 1
  } else {
    // 없다면 새로운 갯수 만들기
    accumulator[currentItem] = 1
  }

  return accumulator
}, {})

// Log the result:
console.log(occurrences)
/*
 {
   apple: 3,
   pear: 2,
   lemon: 1,
   avocado: 1,
   banana: 1,
   pineapple: 1
 }
 */
```

## Array 안의 Object 형태 변환하기

``` js
const records = [
  { name: 'Joe', grade: 'A' },
  { name: 'Tom', grade: 'B' },
  { name: 'Sandra', grade: 'B' },
  { name: 'Joel', grade: 'C' },
  { name: 'Victoria', grade: 'A' }
]

// 'record' 배열 내의 object 구조 변경하기
const updatedRecords = records.reduce((accumulator, currentItem) => {
  // 각 반복 중에서, 최근에 처리된 (curr) object 형태를 맞춤
  accumulator[currentItem.name] = {
    grade: currentItem.grade,
    passed: ['A', 'B'].includes(currentItem.grade)
  }

  // Return the modified object:
  return accumulator
}, {})

// Log the result:
console.log(updatedRecords)
/*
{
  Joe: { grade: 'A', passed: true },
  Tom: { grade: 'B', passed: true },
  Sandra: { grade: 'B', passed: true },
  Joel: { grade: 'C', passed: false },
  Victoria: { grade: 'A', passed: true }
}
*/
```

출처 : [DEV.io :: Javacript Reduce Method Made Simple](https://dev.to/alexdevero/javascript-reduce-method-made-simple-1hb3)