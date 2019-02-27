import { Character } from "./character";
import { MonsterClass } from "../shared/enums";

export class Enemy extends Character {
      name: string;
      class: MonsterClass;
      imageName: string;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
      }
}
