// 다리를 지나는 트럭


/**
 * @param bridge_length 다리에 올라갈 수 있는 최대 트럭 수
 * @param weight 다리가 견딜 수 있는 무게
 * @param truck_weights 트럭별 무게
 * 다리에 완전히 오르지 않은 트럭의 무게는 무시
 * @returns 모든 트럭이 다리를 건너기 위한 최소 시간(초)
 */






 function solution(bridge_length, weight, truck_weights) {
    let answer = 0 // 총 시간
    let crossing_weights = 0 // 현재 다리 무게
    const crossing_truck = [] // 다리를 건너고 있는 트럭

    for (let i = 0; i < bridge_length; i++) crossing_truck.push(null)

    let current = truck_weights.shift() // 현재 다리를 지나가고있는 트럭

    // 트럭을 넣고 다리를 앞으로 한칸씩 당김
    crossing_truck.unshift(current)
    crossing_truck.pop()
    crossing_truck

    crossing_weights += current // 다리 무게 증가
    answer++

    while (crossing_weights) {

        crossing_weights -= crossing_truck.pop() // 다리에 있는 트럭 이동
        current = truck_weights.shift()

        if (current + crossing_weights <= weight) {
            crossing_truck.unshift(current)
            crossing_weights += current
        } else {
            crossing_truck.unshift(0)
            truck_weights.unshift(current)
        }
        answer++
        crossing_truck

    //     const current = truck_weights.shift() // 현재 다리를 지나가고있는 트럭
    //     let next = 0
    //     current
    //     next

    //     const total = current + next
        
    //     total
    //     current

    //     if (total < weight) {
    //         crossing_truck.push(current)
    //         next = truck_weights[0]
            
    //     } else {
    //         crossing_truck.push(current)
    //         crossing_truck.push(null)
    //     }

    //     crossing_truck.shift()    
    //     crossing_truck
    }

    answer
    return answer
}

const bridge_length = 2
const weight = 10
const truck_weights = [7, 4, 5, 6]

solution(bridge_length, weight, truck_weights)









// const trucks = truck_weights.reduce((acc, curr) => {
//     if (acc + curr > weight) return acc
//     else return acc + curr
// })


/**
 * 0.0 ~ 0.9 7kg (시작- > 1)
 * 1.0 ~ 1.9 7kg (1 -> 2)
 * 2.0 ~ 2.9 7kg (2 -> 탈출) 4kg(시작 -> 1)
 * 3.0 ~ 3.9 4kg (1 -> 2) 5kg (시작 -> 1)
 * 4.0 ~ 4.9 4kg (2 -> 탈출) 5kg (1 -> 2)
 * 5.0 ~ 5.9 5kg (2 -> 탈출) 6kg (시작 -> 1)
 * 6.0 ~ 6.9 6kg (1 -> 2)
 * 7.0 ~ 7.9 6kg (2 -> 탈출)
 * 
 * 즉 총 8 초가 걸림니다
 */