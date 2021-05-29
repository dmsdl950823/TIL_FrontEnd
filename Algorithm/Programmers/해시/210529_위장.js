function solution(clothes) {
    let answer = 1

    const hash = {}
    for (const cloth of clothes) {
        const key = cloth[1]
        if (!hash[key]) hash[key] = 1
        hash[key] = hash[key] + 1
    }
    // hash // { headgear: [ 'yellowhat', 'green_turban' ], eyewear: [ 'bluesunglasses' ] }

    // factorial
    for (const key in hash) {
        answer *= hash[key]
    }

    return (answer - 1) // 옷을 입지 않은 경우 제외
}

const clothes = [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]
// const clothes = [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]
solution(clothes)


// ---- 다른사람의 풀이 1.

function solution(clothes) {
    let key = new Map()
    for (let i = 0; i < clothes.length; i++) {
        const cloth = clothes[i][1]
        
        if (key.has(cloth)) key.set(cloth, key.get(cloth) + 1)
        else key.set(cloth, 1)
    }
    let answer = 1
    for (const a of key.values()) {
        answer *= (a + 1)
    }

    return answer - 1
}

// ---- 다른사람의 풀이 2.

function solution(clothes) {
    const reduce = clothes.reduce((obj, t) => {
        const key = t[1]
		obj[key] = obj[key] ? obj[key] + 1 : 1;
		return obj
    }, {})
    // reduce // { headgear: 2, eyewear: 1 }

    const values = Object.values(reduce)  // [ 2, 1 ]
    const answer = values.reduce((a, b) => {
        return a * ( b + 1 )
    }, 1) // 6

    return answer -1
}

// ====== backup - 백업용

function backup () {
    const hash = {}
    for (const cloth of clothes) {
        const key = cloth[1]
        if (!hash[key]) hash[key] = []
    
        hash[key].push(cloth[0])
    }
    // hash // { headgear: [ 'yellowhat', 'green_turban' ], eyewear: [ 'bluesunglasses' ] }
}
