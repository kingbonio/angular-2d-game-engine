import { Character } from "./character";
import { MonsterClass, CharacterType } from "../shared/enums";

export class Enemy extends Character {
      public type = CharacterType.enemy;
      public name: string;
      public class: MonsterClass;
      public imageName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isAsleep: boolean;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            this.imageName = characterDetails.imageName;
            this.speechResponse = characterDetails.speechResponse;
            this.sleepResponse = characterDetails.sleepResponse;
            this.isAsleep = characterDetails.asleep;
      }

      public getSpeechResponse() {
            return this.isAsleep ? this.sleepResponse : this.speechResponse;
      }

      public getInteractResponse() {

      }
}
