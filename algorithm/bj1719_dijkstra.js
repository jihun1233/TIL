const { timingSafeEqual } = require('crypto');
const { stdin, stdout } = require('process');
const readline = require('readline');

class PriorityQueue{
  heap;
  constructor(){
    this.heap=[];
  }
  size(){
    return this.heap.length;
  }
  heapUp(){
    let target=this.heap.length-1;
    const lastNode = this.heap[target];
    while(target > 0){
      const parent = this.getParent(target);
      if(this.heap[parent].priority <= lastNode.priority)break;
      // 현재 target의 우선순위가 parent보다 낮다면 바꿈
      this.heap[target] = this.heap[parent];
      target = parent;
    }
    this.heap[target] = lastNode;
  }
  heapDown(){
    let target = 0;
    const rootNode = this.heap[target];
    while(this.getLeftChild(target) < this.heap.length){
      const rChild = this.getRightChild(target);
      const lChild = this.getLeftChild(target);
      let smallerChild = lChild;
      if(rChild < this.heap.length && this.heap[rChild].priority > this.heap[lChild].priority ){
        smallerChild = rChild;
      }
      if(rootNode.priority <= smallerChild.priority)break;
      this.heap[target] = this.heap[smallerChild];
      target = smallerChild;
    }
    this.heap[target] = rootNode;
  }
  enqueue({value,priority}){
    this.heap.push({value, priority});
    this.heapUp();
  }
  dequeue(){
    if(this.heap.length === 0)return undefined;
    const root = this.heap[0];
    if(this.heap.length === 1){
      this.heap = [];
    }else{
      this.heap[0] = this.heap.pop();
      this.heapDown();
    }
    return root;
  }
  getLeftChild(index){
    return index*2 + 1;
  }
  getRightChild(index){
    return index*2 + 2;
  }
  getParent(index){
    return Math.floor((index-1)/2);
  }
}
const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

const input = [];
let graph;
let visited;
let distAll;
let prevAll;
rl.on('line',(line)=>{
  input.push(line.split(' ').map(v=>Number(v)));
}).on('close',()=>{
  const [nodeN, edgeN ]=input.shift();
  graph = Array.from(new Array(nodeN),()=>new Array(nodeN).fill(Number.MAX_SAFE_INTEGER));
  visited = new Array(nodeN).fill(false);
  distAll = Array.from(new Array(nodeN),()=>new Array(nodeN));
  prevAll = Array.from(new Array(nodeN),()=>new Array(nodeN).fill(null));
  // set graph
  
  for (let index = 0; index < graph.length; index++) {
    graph[index][index] = 0;
  }
  input.forEach(line => {
    const [from, to, weight] = line;
    // console.log(from, to, weight)
    graph[from-1][to-1] = weight;
    graph[to-1][from-1] = weight;
  })
  console.log(graph);
  for (let index = 0; index < nodeN; index++) {
    dijkstra(index,distAll[index],prevAll[index]);
    visited = new Array(nodeN).fill(false);
  }
  prevAll.forEach((p,i)=>{
    prevAll[i] = findFirst(i,p).map(v=>!isNaN(v)?v+1:v);
  })
  const result = prevAll.reduce((acc,line)=>{
    return acc+line.join(' ')+'\n';
  },'')
  console.log(result);
  
})

const dijkstra = (node, dist, prev) => {
  const pq = new PriorityQueue();
  for (let index = 0; index < dist.length; index++) {
     dist[index] = Number.MAX_SAFE_INTEGER;
  }
  dist[node] = 0;
  pq.enqueue({value:node,priority:0})
  while(pq.size() > 0){
    const {value, priority} = pq.dequeue();
    
    const cNode = value;
    // const cWeight = priority;
    if(visited[cNode])continue;
    visited[cNode] = true;
    for(let i =0; i < graph.length; i++){
      // console.log(cNode)
      if(dist[cNode] + graph[cNode][i] < dist[i]){
        prev[i] = cNode;
        dist[i] = dist[cNode] + graph[cNode][i];
        pq.enqueue({value:i, priority:dist[i]});
      }
    }
  }
}

const findFirst = (node,array) => {
  return array.map((v,i)=>{
    if(v === null)return '-';
    if(v === node)return i;
    let current = i;
    let prev = v;
    while(prev !== node){
      current = prev;
      prev = array[current];
    }
    return current

  })
}