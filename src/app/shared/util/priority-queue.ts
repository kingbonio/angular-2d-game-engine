export interface IPriorityItem {
    priority: number;
}

export class PriorityQueue {
    private _heap: any[];
    private _comparator: any;
    private topIndex = 0;

    constructor() {
        this._heap = [];
        this._comparator = (a: IPriorityItem, b: IPriorityItem) => {
            return a.priority < b.priority;
        };
    }

    /**
     * Get the current size of the heap
     *
     * @returns {number}
     */
    get size(): number {
        return this._heap.length;
    }

    /**
     * Get whether or not the heap is empty
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Get the first item in the queue
     *
     * @returns {IPriorityItem}
     */
    public peek(): IPriorityItem {
        return this._heap[this.topIndex];
    }

    /**
     * Adds an item to the bottom of the heap and bubbles it up if necessary
     *
     * @param {IPriorityItem[]} values The items to add to the heap
     *
     * @returns {number}
     */
    public push(...values: IPriorityItem[]) {
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
     *
     * @returns {IPriorityItem}
     */
    public pop(): IPriorityItem {

        // Get the first item without removing it
        const poppedValue = this.peek();

        // Get the index of the bottom of the heap
        const bottomIndex = this.size - 1;

        // Only switch if the item's priority is higher than its parent
        if (bottomIndex > this.topIndex) {

            // Perform the switch of the locations of the items to reorder
            this._swap(this.topIndex, bottomIndex);
        }

        // Remove the last item in the queue as we already have poppedValue
        this._heap.pop();

        // Reshuffle the heap
        this._siftDown();

        return poppedValue;
    }

    /**
     * Swaps out the item at the front of the queue and reshuffles it down if necessary
     *
     * @param {IPriorityItem} value The item to put into the queue
     */
    public replace(value: IPriorityItem): IPriorityItem {

        // Get reference to the first item in the queue
        const replacedValue = this.peek();

        // Replace the first item with the new one
        this._heap[this.topIndex] = value;

        // Perform  a shuffle down if necessary
        this._siftDown();

        return replacedValue;
    }

    /**
     * Gets the parent index of a given index in the heap
     *
     * @param {number} i The starting index
     *
     * @returns {number}
     */
    private _parent(i: number): number {

        return ((i + 1) >>> 1) - 1;
    }

    /**
     * Gets the left child index of a given index in the heap
     *
     * @param {number} i The starting index
     *
     * @returns {number}
     */
    private _left(i: number): number {

        return (i << 1) + 1;
    }

    /**
     * Gets the right child index of a given index in the heap
     *
     * @param {number} i The starting index
     *
     * @returns {number}
     */
    private _right(i: number) {

        return (i + 1) << 1;
    }

    /**
     * Get whether the item's priority is greater than another or not
     *
     * @param {number} i The index of the first item
     * @param {number} j The index of the second item
     *
     * @returns {boolean}
     */
    private _greater(i: number, j: number): boolean {

        return this._comparator(this._heap[i], this._heap[j]);
    }

    /**
     * Switches the locations of two items in the heap
     *
     * @param {number} i The index of the first item
     * @param {number} j The index of the second item
     */
    private _swap(i: number, j: number): void {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    /**
     * Reshuffles the last item in the heap upwards until the heap is again ordered
     */
    private _siftUp(): void {

        // Get the last item in the heap
        let node = this.size - 1;

        // Cycle over the items all the way down the heap and switch any items that aren't ordered
        while (node > this.topIndex && this._greater(node, this._parent(node))) {

            // Switch positions with the parent node
            this._swap(node, this._parent(node));

            // Move onto the next item
            node = this._parent(node);
        }
    }

    /**
     * Reshuffles the heap after removing from the front of the queue
     */
    private _siftDown(): void {

        // Start with the front of the queue
        let node = this.topIndex;

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
