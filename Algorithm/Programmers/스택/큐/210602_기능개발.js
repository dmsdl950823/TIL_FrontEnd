// 1. 진도가 100%일 때 서비스에 반영
// 2. 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고
//    뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포

/**
 * @param progresses 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses
 * @param speeds 각 작업의 개발 속도가 적힌 정수 배열 speeds
 * 구해야하는 결과 :: 각 배포마다 몇 개의 기능이 배포되는지?
 */

 function solution(progresses, speeds) {
    var answer = []

    const days = []
    progresses.forEach((progress, idx) => {
        const day = Math.ceil((100 - progress) / speeds[idx]) // 7, 3, 9
        days.push(day)
    })

    let idx = 0
    const dddd = []
    while (idx < days.length) {
        const day = days[idx]
        const nextDay = days[idx + 1]
        let temp = []

        if (day < nextDay) { // 다음날보다 작은경우는 바로 배포
            temp.push(day)
            dddd.push(temp)
            temp = []
        } else { // 다음날보다 큰경우는 더 큰 날짜가 나타날때까지 대기
            // while (day > nextDay) {
            //     idx++
            // }
            day
            nextDay
            temp.push(day)
            console.log(nextDay)
        }

        temp
        idx++
    }

    dddd

    // [2, 1]
    return answer
}

// const progress = [93, 30, 55]
// const speeds = [1, 30, 5]
const progress = [95, 90, 99, 99, 80, 99]
const speeds = [1, 1, 1, 1, 1, 1]

solution(progress, speeds)