import { Character } from "./character";
import { IAreaElement, IPlayer } from "../area/interfaces";
import { PlayerClass, CharacterType } from "../shared/enums";

export class Player extends Character {
      public type = CharacterType.player;
      public name: string;
      public class: PlayerClass.fighter;
      public imageName: string;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
      }

}
