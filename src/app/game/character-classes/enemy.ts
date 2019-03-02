import { Character } from "./character";
import { MonsterClass, CharacterType } from "../shared/enums";

export class Enemy extends Character {
      public type = CharacterType.enemy;
      public name: string;
      public class: MonsterClass;
      public imageName: string;
      public speechResponse: string;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
            this.speechResponse = characterDetails.speechResponse;
      }

      public getSpeechResponse() {
            return this.speechResponse;
      }
}
