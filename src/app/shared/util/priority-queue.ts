
export class PriorityQueue {

      private _heap: [] = [];

      constructor() { }

      public get() {
            // Grab the item at position 0
            const returnElement = cloneDeep(this._heap[0]);

            // Move the last element to position 0
            this._heap[0] = this._heap[this._heap.length];

            this._restore();
      }

      public put(value: any) {

      }

      public isEmpty() {
            return this._heap.length === 0;
      }

      private _restore() {
            if (this._heap[0].priority < child1.priority) {
                  // switch places with 0, 1
            } else if (this._heap[0].priority < child2.priority) {
                  // switch places
            }
            

            while (node1.priority <= parentNode.priority) {
                  // switch places of nodes
            }
      }
}
