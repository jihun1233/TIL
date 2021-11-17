// 프로그래머스 코테연습 > 깊이/너비 우선 탐색 > 단어 변환

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