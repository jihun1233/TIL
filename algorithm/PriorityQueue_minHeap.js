class PriorityQueue{
  constructor(){
    // MinHeap
    // 0번 인덱스부터 사용.
    // 값은 {value:"", priority:0}
    this.heap = [];
  }
  heapifyUp(){
    let index = this.heap.length-1;
    const lastNode = this.heap[index];

    // 루트가 아닐 때
    while(index > 0){
      const parentIndex = this.getParentIndex(index);
      // 부모가 더 작거나 같으면 정상이므로 break.
      if(this.heap[parentIndex].priority <= lastNode.priority) break;

      // 부모 내리고 index 바꾸기
      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
    }

    this.heap[index] = lastNode;
  }
  heapifyDown(){
    let index = 0;
    const rootNode = this.heap[index];

    // * left child가 있을 때 까지 한다.
    while(this.getLeftChildIndex(index) < this.heap.length){
      const rightChildIndex = this.getRightChildIndex(index);
      const leftChildIndex = this.getLeftChildIndex(index);
      const smallerChildIndex = 
      rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority <= this.heap[leftChildIndex].priority ?
      rightChildIndex : leftChildIndex;

      if(rootNode.priority <= this.heap[smallerChildIndex].priority)break;
      this.heap[index] = this.heap[smallerChildIndex];
      index = smallerChildIndex;
    }
    this.heap[index] = rootNode;
  }
  push(priority, value){
    this.heap.push({priority, value});
    this.heapifyUp();
  }
  pop(){
    if(this.heap.length < 1)return undefined;
    const rootNode = this.heap[0];
    // 비었을 시에는 빈배열로 초기화
    if(this.heap.length === 1){
      this.heap = [];
    }else{
      // 끝 노드를 끌어올리고 다시 heapify 진행
      this.heap[0]=this.heap.pop();
      this.heapifyDown();
    }
    return rootNode;
  }
  getLeftChildIndex(index){
    return index*2 +1;
  }
  getRightChildIndex(index){
    return index*2 +2;
  }
  getParentIndex(index){
    return Math.floor((index-1)/2);
  }
}
exports.PriorityQueue = PriorityQueue;
// const test = () => {
//   const pq = new PriorityQueue();
//   pq.push(1,5);
//   pq.push(2,4);
//   pq.push(3,3);
//   pq.push(4,2);
//   pq.push(5,1);
  
//   console.log(pq.heap);
//   console.log(pq.pop());
//   console.log(pq.pop());
//   console.log(pq.pop());
//   console.log(pq.pop());
//   console.log(pq.pop());
// }
// test();