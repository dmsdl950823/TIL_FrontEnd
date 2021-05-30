/**
 * @param genres 노래의 장르를 나타내는 문자열 배열
 * @param plays 노래별 재생 횟수를 나타내는 배열
 */
// 1. 속한 노래가 많이 재생된 장르를 먼저 수록
// 2. 장르 내에서 많이 재생된 노래를 먼저 수록
// 3. 장르 내에서 재생 횟수가 같은 노래중에서는 고유번호가 낮은 노래를 먼저 수록

function solution(genres, plays) {
    const obj = {}
    for (let i = 0; i < genres.length; i++) {
        const key = genres[i]; // key
        const play = plays[i] // play 횟수
        const idx = i // index

        if (!obj[key]) obj[key] = { total : 0, data : [] }

        obj[key].total += play
        obj[key].data.push( [idx, play] )
    }

    var answer = []
    const sort = Object.values(obj).sort((l, r) => r.total - l.total) // 2 개 비교할때 -1650
    
    for (const genre of sort) {
        // console.log(genre.data)
        if (genre.data.length > 1) {
            genre.data.sort((l, r) => {
                if (l[1] > r[1]) return -1;
                else if (l[1] < r[1]) return 1;
                else return (l[0] > r[0]) ? 1 : -1;
                // 재생횟수가 같을 때 고유 번호의 값 까지 고려
            })
            
            answer.push(genre.data[0][0])
            answer.push(genre.data[1][0])
        } else {
            // 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
            answer.push(genre.data[0][0])
        }
    }

    return answer
}

const genres = ["classic", "pop", "classic", "classic", "pop"]
const plays = [500, 600, 150, 800, 2500]

const result = solution(genres, plays) // [ 4, 1, 3, 0 ]