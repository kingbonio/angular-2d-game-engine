import { Character } from "./character";

export class NPC extends Character {
      name: string;
      class: NPC;
      imageName: string;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
      }

}
