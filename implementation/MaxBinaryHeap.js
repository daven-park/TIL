class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    insert(value){
        this.values.push(value);
        this.bubbleUp();
        
        // let index = values.length - 1;
        // let parentIndex = Math.floor((index - 1) / 2);
        // while(values[index] > values[parentIndex]){
        //     let temp = values[parentIndex];
        //     values[parentIndex] = values[index];
        //     values[index] = temp;
        //     index = parentIndex;
        // }
    }
    bubbleUp(){
        let index = this.values.length - 1;
        const value = this.values[index];
        while(index > 0){
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex]
            if(value <= parent) break;
            this.values[parentIndex] = value;
            this.values[index] = parent;
            index = parentIndex;
        }
    }
    extractMax(){
        const max = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild = this.values[leftChildIdx];
            let rightChild = this.values[rightChildIdx]
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild > element){
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild > element) || 
                    (swap !== null && rightChild > leftChild)){
                    swap = rightChildIdx;
                }
            }

            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}
    



let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
