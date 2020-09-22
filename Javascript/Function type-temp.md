## 재귀

재귀함수는 일반적으로 함수가 자기자신을 이름으로 호출하는 형태입니다.

```
  function factorial (num) {
    if (num <= 1) return 1
    else num * factorial(-1)
  }
  ```
  
이 예제는 재귀의 전형적 예제입니다. 이 코드는 잘 동작하지만 함수 다음에 아래 코드를 추가하면 동작하지 않습니다.

```
  const f2 = factorial;
  factorial = null;

  console.log(f2(3));   // error!
```

해당 코드에서 원래 함수(`factorial`)에 대한 참조는 `f2` 변수에 저장되었고, `factorial` 변수에 `null`을 한정했으므로 해당 참조를 가지고있는 `f2`를 함수로써 호출하려 하면 에러가 발생합니다. `argument.callee` 를 사용하면 이 문제를 예방할 수 있습니다.

`argument.callee` 는 현재 실행중인 함수를 가리키는 포인터이므로 다음과 같이 재귀 호출에 쓸 수 있습니다.

```
  function factorial (num) {
    if (num <= 1) return 1
    else return num * arguments.callee(num-1);
  }
```
해당 예제처럼 변경하면 함수를 어떻게 호출하든 올바르게 동작합니다. 재귀함수를 사용할 때는 항상 함수이름 대신 `arguments.callee`를 쓰길 권장합니다. 

스트릭트 모드에서는 `arguments.callee` 의 값에 접근할 수 없으며 그렇게 하면 에러가 발생합니다.
