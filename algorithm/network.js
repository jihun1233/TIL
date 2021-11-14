//  프로그래머스 코테연습. 네트워크. 풀이 성공.
function solution(n, computers) {
  var answer = 0;
  // n개의 컴퓨터 방문여부. false: 아직 방문안함, true: 방문함
  const visited = new Array(n).fill(false);
  
  const bfs = (start) => {
    const queue = [];
    visited[start] = true;
    queue.push(computers[start]);
    // queue가 빌 때 까지 계속 탐색.
    while(queue.length > 0){
      const current = queue.shift();
      current.forEach((node, index) => {
        if(node === 1 && visited[index] === false){
          // 연결되어있고 방문하지 않은 노드를 queue에 넣고 visited 방문함으로 변경.
          queue.push(computers[index])
          visited[index] = true;
        }
      })
    }
    // bfs 한번 실행할때마다 ++ -> 연결되어있는 하나의 그래프가 하나의 네트워크 = bfs 실행횟수.
    answer++;
  }
  for (let index = 0; index < n; index++) {
    // 방문안한 곳이면 bfs 실행.
    if(visited[index] === false){
      bfs(index);
    }
  }
  return answer;
}

console.log(
  solution(3,[[1, 1, 0], [1, 1, 0], [0, 0, 1]])
);
console.log(
  solution(3,[[1, 1, 0], [1, 1, 1], [0, 1, 1]])
);