import { Character } from "./character";
import { IAreaElement, IPlayer } from "../area/interfaces";
import { PlayerClass } from "../shared/enums";

export class Player extends Character {
      name: string;
      class: PlayerClass.fighter;
      imageName: string;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
      }

}
