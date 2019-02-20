import { Character } from "./character";

export class Player extends Character {
      private element: any;

      constructor(element) {
            super();
            this.element = element;
      }

}
