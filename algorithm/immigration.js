// 프로그래머스 코테연습 > 이분탐색 > 입국심사
// 풀었지만 다시 풀며 복습
function solution(n, times){
  var answer = 0;
  // 가능한 범위는 1 ~ 가장 긴 시간
  // 가장 긴 시간 : times 중 가장 큰 숫자 * n(가장 느린 사람 기준으로 모두를 처리하는 시간)
  // 이 범위를 이분탐색으로 탐색하며 mid가 된 시간을 기준으로 sumPeople로 처리한 사람수를 구해 n이상이면 기존 answer와 비교하여 answer에 대입.
  
  times.sort((a,b)=>a-b); // 오름차순 정렬
  const longgest = times[times.length-1]*n;
  answer = longgest;
  let left = 1;
  let right = longgest;
  let mid;
  while(left <= right){
    mid = Math.floor((left + right)/2);
    const sum = sumPeople(times, mid);
    if(sum < n){
      left = mid+1;
    }
    else{
      right = mid-1;
      if(answer > mid){
        answer = mid;
      }
    }
  }

  return answer;
}

// 답으로는 시간이 필요한데, 특정 시간일 때 처리가능한 사람 수를 구하는 함수 필요.
function sumPeople(times, midTime){
  // 해당시간동안 처리할수 있는 사람수 = midTime(이분탐색중 정해진 mid시간) / 1인처리시간(times의 각 원소)
  return times.reduce((acc, cur)=> acc + Math.floor(midTime/cur),0);
}

console.log(solution(
  6, [7, 10]
))