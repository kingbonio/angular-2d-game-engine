export class MinHeap {

      private _heap: number[];

      constructor() {
            this._heap = [null];
      }

      public getMin() {
            return this._heap[1];
      }

      public insert(node) {

            // Add the new node to the end of the array
            this._heap.push(node);


            // Perform heapify if necessary
            if (this._heap.length > 1) {

                  // Get the last node (the one just pushed to the array)
                  let current = this._heap.length - 1;

                  // We only want to perform any restoration if the parent node is lower than the 'current' node
                  while (current > 1 && this._heap[Math.floor(current / 2)] > this._heap[current]) {

                        // Swap the parent node with the new child node
                        [this._heap[Math.floor(current / 2)], this._heap[current]] = [this._heap[current], this._heap[Math.floor(current / 2)]];

                        // Set the current to the previous parent position for the next iteration
                        current = this._heap[this._heap[Math.floor(current / 2)]];
                  }
            }
      }

      public remove(): any {
            // Get the first node at index 1
            const smallest = this._heap[1];

            // We only want to restore the heap if there are more than 2 nodes
            if (this._heap.length > 2) {

                  // Pull the lowest, right node to the top position
                  this._heap[1] = this._heap[this._heap.length - 1];

                  // Slice off the end node position
                  this._heap.splice(this._heap.length - 1);

                  // If a simple 3 node heap remains, we only need to perform one change or do nothing
                  if (this._heap.length === 3) {

                        // If the new top node is a larger number than the one in position two, switch it (It doesn't matter which child is the highest at this stage)
                        if (this._heap[1] > this._heap[2]) {
                              [this._heap[1], this._heap[2]] = [this._heap[2], this._heap[1]];
                        }

                        // Heapify done, return the previously copied node
                        return smallest;
                  }

                  // Otherwise perform a loop to restore the heap
                  let current = 1;
                  let leftChildIndex = current * 2;
                  let rightChildIndex = current * 2 + 1;

                  // Loop until the node currently at index 1 is moved into a logical position to reserve the heap (We only need to if it's actually larger than either child node)
                  while (this._heap[leftChildIndex] &&
                         this._heap[rightChildIndex] &&
                         (this._heap[current] < this._heap[leftChildIndex] ||
                          this._heap[current] < this._heap[rightChildIndex])) {

                        // We want to determine which child position we're moving the previously last node to
                        if (this._heap[leftChildIndex] > this._heap[rightChildIndex]) {

                              // Switch with the left child
                              [this._heap[current], this._heap[leftChildIndex]] = [this._heap[leftChildIndex], this._heap[current]];
                              current = leftChildIndex;
                        } else {

                              // Switch with the right child
                              [this._heap[current], this._heap[rightChildIndex]] = [this._heap[rightChildIndex], this._heap[current]];
                              current = rightChildIndex;
                        }

                        // Update the child indices for the next iteration
                        leftChildIndex = current * 2;
                        rightChildIndex = current * 2 + 1;
                  }
            } else if (this._heap.length === 2) {

                  // We can just splice the first node out of the array, shifting the 2nd node into the first index
                  this._heap.splice(1, 1);
            } else {

                  // The heap is empty, return nothing
                  return null;
            }

            return smallest;
      }
}
