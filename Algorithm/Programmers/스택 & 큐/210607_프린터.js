/**
 * @param priorities 현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities
 * @param location 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location (0, 1, 2, ...)
 * @returns 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지?
 */
 function solution(priorities, location) {
    let answer = 0
    
    let cnt = 0 // 인쇄를 몇번 했는지
    let mydoc = location // 내 문서의 위치

    while (priorities.length) {
        const first = priorities.shift() // 1. 맨 앞의 문서 확인
        const important = priorities.filter(e => e > first).length // 2. 맨 앞의 문서보다 우선순위보다 높은 문서가 있는지 확인

        // 만약 맨앞의 문서의 우선순위보다 높은 문서가 존재한다면
        if (important > 0) priorities.push(first) // 인쇄를 하지 않고 배열의 "맨 뒤"에 넣는다.
        
        // 맨앞의 문서의 우선순위보다 높은 문서가 없다면
        else {
            cnt ++    // 인쇄 카운트를 올려주고

            // 그게 바로 내문서라면 (기저조건)
            if (mydoc == 0) return answer = cnt    // 함수를 종료하고 cnt를 리턴한다.
        }

        mydoc --    // 문서를 하나 꺼낼 때마다 내문서의 위치를 하나씩 줄여간다

        // 만약 내문서가 맨뒤로 갔다면
        if (mydoc === -1) mydoc = priorities.length - 1    // 내문서 위치인덱스도 맨뒤로 바꿔준다.

    }

    return answer
}



// const priorities = [2, 1, 3, 2]
// const location = 2
const priorities = [1, 1, 9, 1, 1, 1]
const location = 0

solution(priorities, location)


/**
 * 다른 사람의 풀이 01
 */
function solution(priorities, location) {
    let list = priorities.map((priority, idx) => {
        return { priority, idx: idx === location }
    })

    let count = 0
    
    while (true) {
        const first = list.shift()
        const important = list.some(t => t.priority > first.priority)
        
        if (important) list.push(first)
        else {
            count++
            if (first.idx) return count
        }
    }
}


/**
 * 다른 사람의 풀이 02
 */
function solution(priorities, location) {
    let list = priorities.map((priority, idx) => {
        return { priority, idx }
    })

    const queue = []
    
    while (list.length) {
        const first = list.shift()
        const important = list.some(el => el.priority > first.priority)
        
        if (important) list.push(first)
        else queue.push(first)
    }

    return queue.findIndex(el => el.idx === location) + 1
}


/**
 * 다른 사람의 풀이 03
 */
function solution(priorities, location) {
    var answer = 0

    while(priorities.length) {
        const important = priorities.some(cv => priorities[0] < cv)
        
        if (important) {
            priorities.push(priorities.shift())
            if(location === 0) {
                location = priorities.length - 1
                continue
            }
        } else {
            priorities.shift()
            answer++
            if(location === 0) return answer
        }
        
        location--
    }
    return answer
}