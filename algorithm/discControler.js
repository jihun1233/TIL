// 프로그래머스 코테연습. 75% 정답. 나머지 오답의 원인을 알 수 없음.
// 보류중.
const PriorityQueue = require('./PriorityQueue_minHeap.js').PriorityQueue;

// class | function => 1. 작업을 진행하는 동작
// 2. 작업을 채워넣는 동작
// time 축적. run 시 작업소요시간만큼 ++
// 작업 채워넣을때는 현제 작업한시간 time보다 작거나 같은 시간에 들어온 작업을 priority queue 의 heap에 채워넣음.
function solution(jobs) {
  jobs.sort((a,b)=>{
    return a[0] - b[0];
  })
  var answer = 0;

  let accTime = 0;
  let waitTime = 0 ;
  const size = jobs.length;
  const pq = new PriorityQueue();

  const runJob = () => {
    const currentJob = pq.pop();
    const runTime = currentJob.priority;
    const arrivedTime = currentJob.value;
    
    accTime += runTime;
    waitTime += accTime - arrivedTime;
    pushJob();
  }
  const pushJob = () => {
    if(jobs.length < 1){
      if(pq.heap.length > 0){
        runJob();
      }
      return;
    }

    let firstJob = jobs[0];
    if(firstJob[0] > accTime){
      accTime = firstJob[0];
    }
    while(jobs.length > 0 && jobs[0][0] <= accTime){
      firstJob = jobs.shift();
      pq.push(firstJob[1],firstJob[0]);
    }
    runJob();
  }
  pushJob();
  answer = Math.floor(waitTime/size);
  return answer;
}
console.log(solution(
  [[0, 10], [2, 10], [25, 10], [25, 2]]
  ));