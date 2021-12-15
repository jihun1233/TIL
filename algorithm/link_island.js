function solution(n, costs) {
    var answer = 0;
//     연결여부
    const check = Array.from(new Array(n),()=>new Array());
//     line이 n-1이 되면 종료(모두연결)
    const target = n-1;
    let linkCount = 0;
    const linkEachOther = (from, to) => {
      check[from].push(to);
      check[to].push(from);
        check[from].forEach(node=>{
            if(!check[to].includes(node)){
                check[to].push(node);
            }
        });
        check[to].forEach(node=>{
            if(!check[from].includes(node)){
                check[from].push(node);
            }
        })
    }
//     costs를 e[2] 비용값에 따라 오름차순 정렬
    costs.sort((a,b)=>(
        a[2]-b[2]
    ))
//     가장 작은 비용부터 연결
    costs.forEach(costArr=>{
        const [from, to, cost] = costArr;
        if(linkCount === target) return;
        if(check[from].includes(to)) return;
//         linkCount 더하고 코스트를 answer에 더함
        linkCount++;
        answer += cost;
//         서로 연결 공유
        linkEachOther(from,to);
    })

    
    return answer;
}

// console.log(solution(
//   5,[[0, 1, 5], [1, 2, 3], [2, 3, 3], [3, 1, 2], [3, 0, 4], [2, 4, 6], [4, 0, 7]]
// ))
// return 15

console.log(solution(
  4,[[0, 1, 5], [1, 2, 3], [2, 3, 3], [3, 1, 2], [3, 0, 4]]
))

/*
n = 4
costs = [[0, 1, 5], [1, 2, 3], [2, 3, 3], [3, 1, 2], [3, 0, 4]]
return 9
*/