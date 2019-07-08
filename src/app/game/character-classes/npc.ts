import { Character } from "./character";
import { CharacterType, Direction, ElementClass } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";

export class NPC extends Character {
      public type = ElementClass.npc;
      public name: string;
      public class: NPC;
      public maxHp: number;
      public currentHp: number;
      public imageName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isAsleep: boolean;
      public isAngry: boolean;
      public isPaused: boolean;
      public imageFileName: string;
      public direction: Direction;
      public armour: IArmour;
      public weapons: IWeapons;
      public loot: IInventoryItem[];

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            // TODO Need to figure out how to use this in the css
            this.imageName = characterDetails.imageName;
            this.isAsleep = characterDetails.asleep;
            this.isAngry = characterDetails.angry;
            this.speechResponse = characterDetails.speechResponse;
            this.direction = characterDetails.direction;
            this.maxHp = characterDetails.maxHp;
            this.armour = characterDetails.equippedArmour;
            this.loot = characterDetails.loot;
            this.imageFileName = characterDetails.imageFileName;
            if (this.loot) {
                  characterDetails.loot.forEach((item: IInventoryItem) => {
                        for (const slot in this.inventoryLocations) {
                              if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                                    this.inventoryLocations[slot] = item;
                                    return;
                              }
                        }
                  });
            }
            this.currentHp = this.maxHp;
            this.isPaused = false;
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
                        return;
            }
      }

      public isLowHealth() {

      }

      public isDead(): boolean {
            return (this.currentHp <= 0);
      }

}
