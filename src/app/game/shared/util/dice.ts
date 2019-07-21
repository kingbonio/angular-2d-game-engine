export class Dice {
      constructor() {

      }

      public static roll1d4(): number {
            return this.getRandomNumber(4);
      }

      public static roll1d6(): number {
            return this.getRandomNumber(6);
      }

      public static roll1d20(): number {
            return this.getRandomNumber(20);
      }

      private static getRandomNumber(max: number): number {
            return Math.floor(Math.random() * max) + 1;
      }
}
