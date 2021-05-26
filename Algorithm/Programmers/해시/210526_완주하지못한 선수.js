// 나의 문제 풀이
function solution1 (part, comp) {
    for (const c of comp) {
        if (part.includes(c)) part.splice(part.indexOf(c), 1)
    }
    return part[0]
}

// 문제풀이 방식 2
function solution2 (part, comp) {
    const sPart = part.sort()
    const sComp = comp.sort()
  
    return sPart.filter((p, idx) => {
      if (p !== sComp[idx]) return p
    })[0]
  }

const participant = ["leo", "kiki", "eden"]
const completion = 	["eden", "kiki"]

const participant = ["marina", "josipa", "nikola", "vinko", "filipa"]
const completion = 	["josipa", "filipa", "marina", "nikola"]

// 참가자 중에는 동명이인이 있을 수 있습니다.
const participant = ["mislav", "stanko", "mislav", "ana"]
const completion = 	["stanko", "ana", "mislav"]

const unpart = solution1(participant, completion)
console.log(unpart)