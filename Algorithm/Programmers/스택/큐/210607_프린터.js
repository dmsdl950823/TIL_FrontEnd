/**
 * @param priorities 현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities
 * @param location 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location (0, 1, 2, ...)
 * @returns 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지?
 */
 function solution(priorities, location) {
    var answer = 0

    const el = priorities[location]
    el

    while (priorities.length) {
    }

    priorities



    answer
    return answer + 1;
}


// const priorities = [2, 1, 3, 2]
const priorities = [2, 1, 3, 2, 5, 9]
const location = 2
// const priorities = [1, 1, 9, 1, 1, 1]
// const location = 0

const result = solution(priorities, location)
// console.log(result)