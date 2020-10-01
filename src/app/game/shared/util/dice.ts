export class Dice {
    constructor() {

    }

    /**
     * Gets a random number from the range of 1 to 4
     *
     * @returns {number}
     */
    public static roll1d4(): number {
        return this.getRandomNumber(4);
    }

    /**
     * Gets a random number from the range of 1 to 6
     *
     * @returns {number}
     */
    public static roll1d6(): number {
        return this.getRandomNumber(6);
    }

    /**
     * Gets a random number from the range of 1 to 20
     *
     * @returns {number}
     */
    public static roll1d20(): number {
        return this.getRandomNumber(20);
    }

    /**
     * Gets a random number from the range of 1 to the max number provided
     *
     * @param {number} max The highest number we want to pick from
     *
     * @returns {number}
     */
    private static getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max) + 1;
    }
}
