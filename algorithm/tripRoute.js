// 프로그래머스 코테연습 > 깊이/너비 우선 탐색 > 여행경로
// 참고 : https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EC%97%AC%ED%96%89%EA%B2%BD%EB%A1%9C-JS
// 노드의 대상을 각 공항으로 두면 한번 방문한 공항에 다시 돌아오는 경우를 처리하기가 어려웠지만 
// 티켓 위주로 생각해보니 더 쉽다.
function solution(tickets) {
  var answer = [];
  // 여러 곳으로 갈 수 있는 경우 알파벳 순서대로 가야하므로 정렬 진행.
  // js는 자동으로 오름차순 정렬. 이차원 배열의 경우 배열 내용의 array[0]이 같을 경우 array[1]을 비교해 다시 오름차순 정렬을 해준다.
  tickets.sort();
  const result = [];
  const visited = new Array(tickets.length).fill(false);
  const dfs = (city, count) => {

    result.push(city);
    // 정답. 종료조건.
    if(count === tickets.length){
      answer = result;
      return true;
    }

    for (let index = 0; index < tickets.length; index++) {
      if(tickets[index][0]===city && !visited[index]){
        visited[index] = true;
        // 다음 dfs를 호출. 그 결과가 true일 경우(최종적으로 종료조건에 의해 true) true를 리턴.
        if(dfs(tickets[index][1], count+1))return true;
        // false일 경우 visited를 다시 방문하지않은 false로 바꿔주고 result에서도 해당 지역을 없애준다.
        visited[index] = false;
        result.pop();
      }
    }
    return false;
  }

  dfs("ICN",0); // 항상 ICN에서 시작.
  return answer;
}

console.log(solution(
  [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]
))

console.log(solution(
  [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]
))