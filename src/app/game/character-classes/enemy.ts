import { Character } from "./character";
import { MonsterClass, CharacterType, Direction, ElementClass } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";
import { IArmour, IWeapons, IInventoryItem } from "../item/interfaces";

export class Enemy extends Character {
      // private movement: Movement;
      public type = ElementClass.enemy;
      public name: string;
      public class: MonsterClass;
      public maxHp: number;
      public currentHp: number;
      public imageName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isAsleep: boolean;
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
            this.imageName = characterDetails.imageName;
            this.speechResponse = characterDetails.speechResponse;
            this.sleepResponse = characterDetails.sleepResponse;
            this.isAsleep = characterDetails.asleep;
            this.direction = characterDetails.direction;
            // TODO: Set this manually
            this.maxHp = characterDetails.maxHp;
            this.currentHp = this.maxHp;
            this.xp = 0;
            this.armour = characterDetails.armour;
            this.weapons = characterDetails.weapons;
            // TODO this could be more efficient
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
