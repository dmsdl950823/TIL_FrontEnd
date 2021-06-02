// 조건
// 1. 진도가 100%일 때 서비스에 반영
// 2. 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고
//    뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포

/**
 * @param progresses 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses
 * @param speeds 각 작업의 개발 속도가 적힌 정수 배열 speeds
 * 구해야하는 결과 :: 각 배포마다 몇 개의 기능이 배포되는지?
 */

 function solution(progresses, speeds) {
    const days = []
    progresses.forEach((progress, idx) => {
        const day = Math.ceil((100 - progress) / speeds[idx]) // 7, 3, 9
        days.push(day)
    })

    let idx = 0
    var answer = []

    while (days.length > idx) {
        const day = days[idx]     // 루프를 돌 때마다 0 번째 값을 가져옵니다.
        let count = days.findIndex(nextDay => day < nextDay)
        
        if (count !== -1) { // 마지막 스택까지 확인했다는 의미
            answer.push(count)
            days.splice(0, count)
            
        // count 의 수가 있는 경우 :: 확인할 개발 날짜가 있다는 것 (스택에 값이 존재한다는 것)
        // 현재 개발 날짜 > 다음 개발 날짜 :: 더 큰 숫자가 나타날때까지 대기
        // 현재 개발 날짜 < 다음 개발 날짜 :: 바로 배포
        } else {
            answer.push(days.length)
            days.splice(0, days.length)
        }
    }

    // [2, 1]
    return answer
}

// const progress = [93, 30, 55]
// const speeds = [1, 30, 5]
const progress = [95, 90, 99, 99, 80, 99]
const speeds = [1, 1, 1, 1, 1, 1]

solution(progress, speeds)

// ======= 다른사람의 풀이

function solution(progresses, speeds) {
    let answer = [0]
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]))
    let maxDay = days[0]

    for(let i = 0, j = 0; i< days.length; i++){
        if(days[i] <= maxDay) {
            answer[j] += 1
        } else {
            maxDay = days[i]
            answer[++j] = 1
        }
    }

    return answer
}