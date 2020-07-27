import { UserInteractionTypes } from "../../shared/enums";
import { IArmour, IInventoryItem, IWeapons } from "../item/interfaces";
import { CharacterState, Direction, ElementClass } from "../shared/enums";
import { ILocation } from "../shared/interfaces";
import { Character } from "./character";

export class NPC extends Character {
      public id: string;
      public type = ElementClass.npc;
      public name: string;
      public maxHp: number;
      public currentHp: number;
      public lowHealthThreshold: number;
      public imageFileName: string;
      public speechResponse: string;
      public sleepResponse: string;
      public isMovingForwards: boolean;
      public isAttacking: boolean;
      public isGuarding: boolean;
      public isReceivingAttack: boolean;
      public baseDamage: number;
      public pauseCounter: number;
      public attackPauseDuration: number;
      public direction: Direction;
      public startingDirection: Direction;
      public startingLocation: string;
      public directionsForPatrol: Direction[];
      public startingTargetLocation: string;
      public currentPositionInRoute: number;
      public currentHuntingDuration: number;
      public maxHuntingDuration: number;
      public currentPathToDestination: any[];
      public pathfindingDestination: ILocation;
      public currentState: CharacterState;
      public startingState: CharacterState;
      public armour: IArmour;
      public weapons: IWeapons;
      public loot: IInventoryItem[];

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.id = characterDetails.id;
            this.name = characterDetails.name;
            this.imageFileName = characterDetails.imageFileName;
            this.isMovingForwards = false;
            this.isAttacking = false;
            this.isGuarding = false;
            this.isReceivingAttack = false;
            this.baseDamage = characterDetails.baseDamage;
            this.pauseCounter = characterDetails.pauseCounter || 0;
            this.attackPauseDuration = characterDetails.attackPauseDuration;
            this.speechResponse = characterDetails.speechResponse;
            this.direction = characterDetails.startingDirection;
            this.startingDirection = characterDetails.startingDirection;
            this.startingLocation = characterDetails.startingLocation;
            this.directionsForPatrol = characterDetails.directionsForPatrol;
            this.startingTargetLocation = characterDetails.startingTargetLocation;
            this.currentPositionInRoute = (characterDetails.currentPositionInRoute === undefined) ? 0 : characterDetails.currentPositionInRoute;
            this.currentHuntingDuration = (characterDetails.currentHuntingDuration === undefined) ? 0 : characterDetails.currentHuntingDuration;
            this.maxHuntingDuration = characterDetails.maxHuntingDuration;
            this.startingState = characterDetails.startingState;
            this.currentState = characterDetails.startingState;
            this.maxHp = characterDetails.maxHp;
            this.lowHealthThreshold = characterDetails.lowHealthThreshold;
            this.armour = characterDetails.equippedArmour;
            this.weapons = characterDetails.weapons;
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
            this.currentHp = (characterDetails.currentHp !== undefined) ? characterDetails.currentHp : this.maxHp;
      }

      public respond(interaction: UserInteractionTypes, directionToFace: Direction, damage: number) {
            switch (interaction) {
                  case UserInteractionTypes.speak:
                        // TODO Replace these references
                        if (this.currentState !== CharacterState.asleep) {
                              this.direction = directionToFace;
                              return this.speechResponse;
                        } else {
                              return this.sleepResponse;
                        }
                  // TODO Do we even use this here any more?
                  case UserInteractionTypes.attack:
                        this.direction = directionToFace;
                        this.currentHp -= damage;

                        if (!this.isLowHealth()) {
                              this.currentState = CharacterState.hunting;
                        } else {
                              this.currentState = CharacterState.afraid;
                        }

                        return;
            }
      }

      public isLowHealth() {
            return (this.currentHp < this.lowHealthThreshold && !this.isDead);
      }

      public isDead(): boolean {
            return (this.currentHp <= 0);
      }

}
