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
        let count = days.findIndex(nextDay => {
            // 현재 값 (제일 먼저 개발중인 일수) < 다음 값 (값이 더 큰 개발일수) 의 인덱스
            // console.log([day, nextDay])
            return day < nextDay // (5, 10), (10, 20), 없음 => 마지막 스택까지 확인 (-1)
        })

        // count // 1, 3, -1 ===> (1, 3) 번째 인덱스 마다 배포, -1 은 나머지 모두 배포
        
        // count > -1 :: 함께 배포할 날짜가 존재 (스택에 값이 존재한다는 것)
        if (count !== -1) {
            answer.push(count) // index === 배포되는 기능 갯수
            days.splice(0, count) // 스택에서 index 만큼 제거
        
        // count === -1 :: 마지막 스택까지 확인한 경우
        } else {
            answer.push(days.length) // 남은 days 의 length === 남은 기능갯수
            days.splice(0, days.length) // 스택에서 모두 제거
        }
    }

    return answer
}

// const progress = [93, 30, 55]
// const speeds = [1, 30, 5]
const progress = [95, 90, 99, 99, 80, 99]
const speeds = [1, 1, 1, 1, 1, 1]

solution(progress, speeds)


// ======= 다른사람의 풀이


function solution(progresses, speeds) {
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]))
    let maxDay = days[0] // 맨 처음 값부터 비교

    let answer = [0]
    for(let i = 0, j = 0; i< days.length; i++){
        if (days[i] <= maxDay) { // 다음 개발일 보다 작은경우 :: 스택에 쌓아놓기
            answer[j] += 1
        } else {
            // 다음 개발일보다 큰경우 :: maxDay 의 최댓값을 현재 개발일로 설정
            // j의 값을 하나 올려서 값을 스택에 추가합니다. 
            maxDay = days[i]
            answer[++j] = 1
        }
    }

    return answer
}

// const progress = [93, 30, 55]
// const speeds = [1, 30, 5]
const progress = [95, 90, 99, 99, 80, 99]
const speeds = [1, 1, 1, 1, 1, 1]

solution(progress, speeds)
