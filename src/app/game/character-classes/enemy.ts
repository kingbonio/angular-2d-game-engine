import { Character } from "./character";

export class Enemy extends Character {
      private element: any;

      constructor(element) {
            super();
            this.element = element;
      }
}
