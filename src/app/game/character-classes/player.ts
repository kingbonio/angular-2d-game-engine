import { Character } from "./character";
import { PlayerClass, Direction, ElementClass } from "../shared/enums";
import defaults from "../../shared/defaults";

export class Player extends Character {
      public type = ElementClass.player;
      public name: string;
      public class: PlayerClass.fighter;
      public imageFileName: string;
      public direction: Direction;
      public startingDirection: Direction;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageFileName = characterDetails.imageFileName;
      }

}
