import { Character } from "./character";
import { Direction, ElementClass, CharacterState } from "../shared/enums";
import { UserInteractionTypes } from "../../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";
import { ILocation } from "../shared/interfaces";
import defaults from "../../shared/defaults";

export class NPC extends Character {
      public id: string;
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
      public isAttacking: boolean;
      public isGuarding: boolean;
      public isReceivingAttack: boolean;
      public baseDamage: number;
      public pauseCounter: number;
      public maxPauseDuration: number;
      public direction: Direction;
      public startingDirection: Direction;
      public startingLocation: string;
      public patrolArea: boolean;
      public directionsForPatrol: Direction[];
      public startingTargetLocation: string;
      public currentPositionInRoute: number;
      public currentHuntingDuration: number;
      public maxHuntingDuration: number;
      public currentPathToDestination: any[]; // TODO PriorityQueue
      public pathfindingDestination: ILocation;
      public currentState: CharacterState;
      public startingState: CharacterState;
      public armour: IArmour;
      public weapons: IWeapons;
      public loot: IInventoryItem[];
      public level: number;

      constructor(characterDetails: any) {
            // TODO: Resolve any
            super();
            this.id = characterDetails.id;
            this.name = characterDetails.name;
            this.class = characterDetails.class;
            // TODO Need to figure out how to use this in the css
            this.imageFileName = characterDetails.imageFileName;
            this.isAsleep = characterDetails.asleep;
            this.isAngry = characterDetails.angry;
            this.isAttacking = false;
            this.isGuarding = false;
            this.isReceivingAttack = false;
            this.baseDamage = characterDetails.baseDamage;
            this.pauseCounter = characterDetails.pauseCounter || 0;
            this.maxPauseDuration = characterDetails.maxPauseDuration;
            this.speechResponse = characterDetails.speechResponse;
            this.direction = characterDetails.direction;
            this.startingDirection = characterDetails.startingDirection;
            this.startingLocation = characterDetails.startingLocation;
            this.patrolArea = characterDetails.patrolArea;
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
            this.level = characterDetails.level;
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
            this.xp = 0;
      }

      public respond(interaction: UserInteractionTypes, directionToFace: Direction, damage: number) {
            switch (interaction) {
                  case UserInteractionTypes.speak:
                        // TODO Replace these references
                        if (!this.isAsleep) {
                              this.direction = directionToFace;
                              return this.speechResponse;
                        } else {
                              return this.sleepResponse;
                        }
                  case UserInteractionTypes.attack:
                        this.isAsleep = false;
                        this.currentState = CharacterState.hunting;
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
