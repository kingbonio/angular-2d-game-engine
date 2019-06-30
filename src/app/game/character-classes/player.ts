import { Character } from "./character";
import { IAreaElement, IPlayer } from "../area/interfaces";
import { PlayerClass, CharacterType, Direction, ElementClass } from "../shared/enums";

export class Player extends Character {
      public type = ElementClass.player;
      public name: string;
      public class: PlayerClass.fighter;
      public imageName: string;
      public direction: Direction;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
      }
}
