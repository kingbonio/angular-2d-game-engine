import { Character } from "./character";
import { CharacterType, Direction } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";

export class NPC extends Character {
      public type = CharacterType.npc;
      public name: string;
      public class: NPC;
      public imageName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isAsleep: boolean;
      public direction: Direction;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            // TODO Need to figure out how to use this in the css
            this.imageName = characterDetails.imageName;
            this.isAsleep = characterDetails.asleep;
            this.speechResponse = characterDetails.speechResponse;
            this.direction = characterDetails.direction;
      }

      public respond(interaction: UserInteractionTypes, directionToFace: Direction) {
            switch (interaction) {
                  case UserInteractionTypes.speak:
                        this.direction = directionToFace;
                        return this.isAsleep ? this.sleepResponse : this.speechResponse;
                  case UserInteractionTypes.attack:
                        this.direction = directionToFace;
                        return this.isAsleep ? this.sleepResponse : this.speechResponse;
            }
      }

}
