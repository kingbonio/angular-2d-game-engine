import { Character } from "./character";
import { CharacterType, Direction, ElementClass, CharacterState } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";

export class NPC extends Character {
      public type = ElementClass.npc;
      public name: string;
      public class: NPC;
      public maxHp: number;
      public currentHp: number;
      public lowHealthThreshold: number;
      public imageFileName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isAsleep: boolean;
      public isAngry: boolean;
      public isPaused: boolean;
      public direction: Direction;
      public startingLocation: string;
      public patrolArea: boolean;
      public directionsForPatrol: Direction[];
      public currentPositionInRoute: number;
      public currentState: CharacterState;
      public startingState: CharacterState;
      public armour: IArmour;
      public weapons: IWeapons;
      public loot: IInventoryItem[];
      public level: number;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            // TODO Need to figure out how to use this in the css
            this.imageFileName = characterDetails.imageFileName;
            this.isAsleep = characterDetails.asleep;
            this.isAngry = characterDetails.angry;
            this.speechResponse = characterDetails.speechResponse;
            this.direction = characterDetails.direction;
            this.startingLocation = characterDetails.startingLocation;
            this.patrolArea = characterDetails.patrolArea;
            this.directionsForPatrol = characterDetails.directionsForPatrol;
            this.currentPositionInRoute = 0,
            this.startingState = characterDetails.startingState;
            this.currentState = characterDetails.startingState;
            this.maxHp = characterDetails.maxHp;
            this.lowHealthThreshold = characterDetails.lowHealthThreshold;
            this.armour = characterDetails.equippedArmour;
            this.loot = characterDetails.loot;
            this.level = characterDetails.level;
            this.imageFileName = characterDetails.imageFileName;
            if (!characterDetails.inventoryLocations && this.loot) {
                  characterDetails.loot.forEach((item: IInventoryItem) => {
                        for (const slot in this.inventoryLocations) {
                              if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                                    this.inventoryLocations[slot] = item;
                                    return;
                              }
                        }
                  });
            }
            this.currentHp = (characterDetails.currentHp !== undefined) ? characterDetails.currentHp : this.maxHp;
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
            return this.currentHp < this.lowHealthThreshold;
      }

      public isDead(): boolean {
            return (this.currentHp <= 0);
      }

}
