export interface IPriorityItem {
      priority: number;
}

export class PriorityQueue {
      private _heap: any[];
      private _comparator: any;
      private top = 0;

      constructor() {
            this._heap = [];
            this._comparator = (a: IPriorityItem, b: IPriorityItem) => {
                  return a.priority < b.priority;
            };
      }

      /**
       * Get the current size of the heap
       * @returns { number } The heap size
       */
      get size() {
            return this._heap.length;
      }

      /**
       * Get whether or not the heap is empty
       * @returns { boolean } If heap is empty
       */
      public isEmpty() {
            return this.size === 0;
      }

      /**
       * Get the first item in the queue
       * @returns { any } The stored item at index 0
       */
      public peek() {
            return this._heap[this.top];
      }

      /**
       * Adds an item to the bottom of the heap and bubbles it up if necessary
       * @param { any[] } values The items to add to the heap
       * @returns { number } The heap size
       */
      public push(...values) {
            values.forEach((value: IPriorityItem) => {

                  // Push item to the end of the heap array
                  this._heap.push(value);

                  // Perform any bubbling up on the new item if necessary
                  this._siftUp();
            });

            return this.size;
      }

      /**
       * Removes and returns the first item in the queue (index 0) and reshuffles the heap upwards
       * @returns { any } The item from the front of the queue
       */
      public pop() {

            // Get the first item without removing it
            const poppedValue = this.peek();

            // Get the index of the bottom of the heap
            const bottom = this.size - 1;

            // Only switch if the item's priority is higher than its parent
            // TODO item.priority should be used instead
            if (bottom > this.top) {

                  // Perform the switch of the locations of the items to reorder
                  this._swap(this.top, bottom);
            }

            // Remove the last item in the queue as we already have poppedValue
            // TODO This may not work as poppedValue would be a reference to the one in the array and may die with the pop action
            // TODO Maybe just reassign it here poppedValue = this._heap.pop()...
            this._heap.pop();

            // TODO come back to this
            // TODO Why would it sift down
            //
            this._siftDown();

            return poppedValue;
      }

      /**
       * Swaps out the item at the front of the queue and reshuffles it down if necessary
       * @param { any } value The item to put into the queue
       */
      public replace(value) {

            // Get reference to the first item in the queue
            const replacedValue = this.peek();

            // Replace the first item with the new one
            this._heap[this.top] = value;

            // Perform  a shuffle down if necessary
            this._siftDown();

            return replacedValue;
      }

      /**
       * Gets the parent index of a given index in the heap
       * @param { number } i The starting index
       * @returns { number } The index of the parent item
       */
      private _parent(i: any) {
            return ((i + 1) >>> 1) - 1;
      }

      /**
       * Gets the left child index of a given index in the heap
       * @param { number } i The starting index
       * @returns { number } The index of the left child item
       */
      private _left(i: any) {
            return (i << 1) + 1;
      }

      /**
       * Gets the right child index of a given index in the heap
       * @param { number } i The starting index
       * @returns { number } The index of the right child item
       */
      private _right(i: any) {
            return (i + 1) << 1;
      }

      /**
       * Get whether the item's priority is greater than another or not
       * @param { number } i The index of the first item
       * @param { number } j The index of the second item
       * @returns { boolean } The outcome of the comparison
       */
      private _greater(i, j) {

            // TODO This needs to check the priority property on the object
            return this._comparator(this._heap[i], this._heap[j]);
      }

      /**
       * Switches the locations of two items in the heap
       * @param { number } i The index of the first item
       * @param { number } j The index of the second item
       */
      private _swap(i, j) {
            [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
      }

      /**
       * Reshuffles the last item in the heap upwards until the heap is again ordered
       */
      private _siftUp() {

            // Get the last item in the heap
            let node = this.size - 1;

            // Cycle over the items all the way down the heap and switch any items that aren't ordered
            while (node > this.top && this._greater(node, this._parent(node))) {

                  // Switch positions with the parent node
                  this._swap(node, this._parent(node));

                  // Move onto the next item
                  node = this._parent(node);
            }
      }

      /**
       * Reshuffles the heap after removing from the front of the queue
       */
      private _siftDown() {

            // Start with the front of the queue
            let node = this.top;

            // Restrict the loop to only when we are not at the bottom of the heap and one of the current item's children is of higher priority
            while (
                  (this._left(node) < this.size && this._greater(this._left(node), node)) ||
                  (this._right(node) < this.size && this._greater(this._right(node), node))
            ) {
                  // Figure out which child we want to replace
                  const maxChild = (this._right(node) < this.size && this._greater(this._right(node), this._left(node))) ? this._right(node) : this._left(node);

                  // Swap the current item with the selected child
                  this._swap(node, maxChild);

                  // Set the currently selected item to the selected child's old place.
                  node = maxChild;
            }
      }

}

      // public get() {
      //       // Grab the item at position 0
      //       const returnElement = cloneDeep(this._heap[0]);

      //       // Move the last element to position 0
      //       this._heap[0] = this._heap[this._heap.length];

      //       this._restore();
      // }

      // public put(value: any) {

      // }

      // public isEmpty() {
      //       return this._heap.length === 0;
      // }

      // private _restore() {
      //       if (this._heap[0].priority < child1.priority) {
      //             // switch places with 0, 1
      //       } else if (this._heap[0].priority < child2.priority) {
      //             // switch places
      //       }


      //       while (node1.priority <= this.parentNode.priority) {
      //             // switch places of nodes
      //       }
      // }




// }
