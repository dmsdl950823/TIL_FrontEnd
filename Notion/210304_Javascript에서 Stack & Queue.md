# Javascript에서 Stack & Queue

- [Queue](#queue)
  - [Queue 란 무엇일까요?](#queue-란-무엇일까요)
  - [Operations](#operations)
  - [Big O](#big-o)
  - [실행 - Implentation](#실행---implentation)

# Queue

출처 번역: [Javascript in Plain English](https://javascript.plainenglish.io/how-to-use-queues-33370a0c8f3b)

[stack에]()에 이어, Queue에 대한 내용에 대해 정의합니다. 사용과 실행 방식이 다르지만,
큐와 스택은 종종 함께 따라갑니다. 큐에 대한 기본 개념과 어떻게 사용되는지에 대해 설명합니다.

## Queue 란 무엇일까요?

![후입선출법](https://miro.medium.com/max/561/0*LJrHu4WEoqzAeRxp.jpg)

stack 과 같이, queue는 요소의 긴 리스트를 포함하는 **직렬 추상자료형**(ADT, abstract data type) 입니다. 그러나 queue는 완전히 다르게 구조화 되어있습니다. **요소들은 queue의 맨 앞에서부터 삭제될 수 있고, 요소들은 queue의 맨끝에서 부터 삽입될 수 있습니다.** 후입 선출법 (LIFO, a last in first out) 데이터 구조인데, 이것이 stack과 중요한 차이점입니다.

마트에서 계산대 줄을 서는것과 비슷하게 생각할 수 있는데, 구매자들이 계산을 하기위해서 온 순서대로 기다리고, 맨 앞 계산대에 있는 사람은 계산을 하고 계산대를 나갑니다. 

## Operations

queue와 stack이 함께 묶여있는 다른 이유는, 비슷한 functions을 가지고 있기 때문입니다. 우리는 요소를 더하거나 뺄 수 있습니다.

* `enqueue()` function을 이용하여 queue의 맨 뒤에 요소를 더합니다. (JS의 `push()` 메서드와 비슷하게 동작합니다). 
* `dequeue()` function을 이용하여 queue의 맨 앞에 요소를 뺍니다. (JS의 `shift()` 메서드와 비슷하게 동작합니다)

## Big O

* 요소의 삽입과 삭제를 위한 시간 복잡성은 `O(1)` 시간, 상수 시간이 걸립니다.
* 요소에 검색과 접근하는데는 `O(n)` 시간, 선형 시간이 걸립니다.

## 실행 - Implentation

stack과 유사하게, queue는 연결된 리스트나 배열을 사용하여 실행됩니다. 마지막에 제공된 자원은 배열 및 연결된 목록의 대기열을 작성하는 방법에 대해 자세히 설명합니다. 배열 implementation을 사용할 것 입니다.

*In the LeetCode problem I go over, we use an array implementation.*
