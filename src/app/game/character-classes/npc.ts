import { Character } from "./character";
import { CharacterType } from "../shared/enums";

export class NPC extends Character {
      public type = CharacterType.npc;
      public name: string;
      public class: NPC;
      public imageName: string;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
      }

}
