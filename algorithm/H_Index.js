// 프로그래머스 코테연습 > 정렬 > H-Index
// 실패
// 9번이 안되는데 왜인지 알수가없다.
// h가 index를 넘을 수 없으니 내림차순으로 정렬해서 index의 값이 index보다 큰지, 그다음값은 작은지 확인하는 방식으로 해결하려했다.
function solution(citations) {
  var answer = 0;
  let result = 0;
  citations.sort((a,b)=>b-a);
  
  for (let index = 1; index <= citations.length; index++) {
    if(citations[index-1] >= index && citations[index] <= index){
      result = index;
    }
  }
  // for (let index = 0; index < citations.length; index++) {
  //   if(cit)
  // }
  answer = result;
  return answer;
}

console.log(solution(
  [1,0]
))