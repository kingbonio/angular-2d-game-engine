import { Character } from "./character";
import { CharacterType, Direction } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";

export class NPC extends Character {
      public type = CharacterType.npc;
      public name: string;
      public class: NPC;
      public maxHp: number;
      public currentHp: number;
      public imageName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isAsleep: boolean;
      public direction: Direction;
      public armour: IArmour;
      public weapons: IWeapons;
      loot: IInventoryItem[];

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
            this.maxHp = characterDetails.maxHp;
            this.currentHp = this.maxHp;
            this.xp = 0;
            this.armour = characterDetails.equippedArmour;
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
