// 프로그래머스 코테연습 > 깊이/너비 우선 탐색 > 단어 변환
// 생각해보니 모든 경우의 수를 다 찾지않더라도
// bfs로 depth를 높이며 탐색하다가 target에 도달했을 경우 멈추도록 하면
// 가장 먼저 도달한 경우 멈추고 depth가 답이되기때문에 그렇게 하면 될것같다.
// 참고 : https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EB%8B%A8%EC%96%B4%EB%B3%80%ED%99%98-JS

const isChangable = (word, target) => {
  if(word.length !== target.length) return false;
  let matchCount = 0;

  for (let index = 0; index < word.length; index++) {
    if(word[index] === target[index]){
      matchCount++;
    }
  }
  return matchCount === word.length-1;
}

function solution(begin, target, words) {
  if(!words.find(word => word === target))return 0;
  
  var answer = 0;
  const visited =  new Array(words.length).fill(false);
  let minCount = Infinity;
  words.unshift(begin);
// dfs, 백트래킹
  const dfs = ( node, count ) => {
    const currentWord = words[node];
    visited[node] = true;

    if(isChangable(currentWord, target) && minCount > count + 1){
      minCount = count + 1;
      return;
    }

    for (let index = 0; index < words.length; index++) {

      if(!visited[index] && isChangable(currentWord, words[index])){

        dfs(index, count+1);
        visited[index] = false;
      }
      
    }
  }
  dfs(0,0);
  answer = minCount === Infinity? 0:minCount;
  return answer;
}

console.log(solution(
  "hit",	"cog",	["hot", "dot", "dog", "lot", "log", "cog"]
));

console.log(solution(
  "hit",	"cog",	["hot", "dot", "dog", "lot", "log"]
));