# lodash

### underscore vs loadash 
> underscore ? 자바스크립트의 함수형 프로그래밍에 초점을 맞춘 유틸리티성 라이브러리 <br>
> lodash ? underscore의 superset의 형태로 함수, 문서, 유닛 테스트, 성능이 더 뛰어남

### Array method

|method|설명|
|------|---|
|```_.compact(array)```|```false```, `null`, `0`, `""`, ùndefined, `NaN`을 제거한 배열을 생성합니다.|
|`_.difference(array, [values])`|제공된 array의 모든 [value]를 제외하고 새로운 배열을 생성한다.|
|`_.findIndex(array, [callback=identity], [thisArg])`| 콜백을 돌려주는 첫번째 요소의 인덱스를 제외하고는 `_.find()`와 비슷함|
|`_.findLastIndex(array, [callback=identity], [thisArg])`|`_.findIndex()`와 비슷함||
|`_.first(array, [callback], [thisArg])`|array의 첫번째 요소를 가져옴, callback 이 있을 경우 true를 반환하는 것만 배열에 넣음|
|`_.flatten(array, [isShallow=false], [callback=identity], [thisArg])`||
|`_.indexOf(array, value, [fromIndex=0])`|value의 인덱스 반환|
|`_.initial(array, [callback=1], [thisArg])`||
|`_.intersection([array])`|주어진 모든 배열에 공통적으로 있는 값을 포함한 array를 생성한다|
|`_.intersectionBy([arrays], [iteratee=_.identity])`||
|`_.intersectionWith([arrays], [comparator])`||
