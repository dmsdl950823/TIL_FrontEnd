// 다리를 지나는 트럭


/**
 * @param bridge_length 다리에 올라갈 수 있는 최대 트럭 수
 * @param weight 다리가 견딜 수 있는 무게
 * @param truck_weights 트럭별 무게
 * 다리에 완전히 오르지 않은 트럭의 무게는 무시
 * @returns 모든 트럭이 다리를 건너기 위한 최소 시간(초)
 */






 function solution(bridge_length, weight, truck_weights) {
    var answer = 0 // 총 시간

    let crossing_truck = []

    // const ddd = crossing_truck.length * bridge_length
   
    while (truck_weights.length) {
        if (!crossing_truck.length) {
            const current = truck_weights.shift()
            crossing_truck.push(current)
            const trucks = crossing_truck.reduce((acc, curr) => {
                return (acc + curr > weight) ? acc : acc + curr
            })
            if (trucks < weight) answer += crossing_truck.length * bridge_length
            else {
    
            }
        } else {
            const current = truck_weights.shift()
            crossing_truck.push(current)
            const trucks = crossing_truck.reduce((acc, curr) => {
                return (acc + curr > weight) ? acc : acc + curr
            })
            if (trucks < weight) answer += crossing_truck.length * bridge_length
            else {
    
            }
        }
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