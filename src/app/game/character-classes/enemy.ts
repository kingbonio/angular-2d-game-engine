import { Character } from "./character";
import { MonsterClass, CharacterType, Direction } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";

export class Enemy extends Character {
      // private movement: Movement;
      public type = CharacterType.enemy;
      public name: string;
      public class: MonsterClass;
      public maxHp: number;
      public currentHp: number;
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
            this.imageName = characterDetails.imageName;
            this.speechResponse = characterDetails.speechResponse;
            this.sleepResponse = characterDetails.sleepResponse;
            this.isAsleep = characterDetails.asleep;
            this.direction = characterDetails.direction;
            // TODO: Set this manually
            this.maxHp = characterDetails.maxHp;
            this.currentHp = this.maxHp;
            this.xp = 0;
      }

      public respond(interaction: UserInteractionTypes, directionToFace: Direction, damage: number) {
            switch (interaction) {
                  case UserInteractionTypes.speak:
                        if (!this.isAsleep) {
                              this.direction = directionToFace;
                              return this.speechResponse;
                        } else {
                              return this.sleepResponse;
                        }
                  case UserInteractionTypes.attack:
                        this.isAsleep = false;
                        this.direction = directionToFace;
                        this.currentHp -= damage;
                        return this.currentHp;
            }
      }
}
