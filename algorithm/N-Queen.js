// https://www.acmicpc.net/problem/9663
// 백준 N퀸
const rl = require('readline').createInterface({
  input: process.stdin, output: process.stdout
});


let n = 0;
let temp = [];
let count = 0;
const bfs = (col) => {
  if(col === n){
    count++;
    return;
  }
  for (let row = 0; row < n; row++) {
    let check = true;
    for (let i = 0; i < col; i++) {
      temp[col] = row;
      if(temp[i] === row || Math.abs(col - i) === Math.abs(row - temp[i])){
        check = false;
        break;
      }
    }
    
    if(check)bfs(col + 1);
  }

};
rl.on('line',(line)=>{
  n = parseInt(line);
  for (let index = 0; index < n; index++) {
    temp[0] = index;
    bfs(1);
  }
  rl.close();
})
.on('close',()=>{
  console.log(count);
  process.exit();
})
