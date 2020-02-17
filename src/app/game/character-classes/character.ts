import defaults from "../../shared/defaults";
import { IArmour, IInventoryItem, IWeapons } from "../item/interfaces";
import { CharacterState, Direction, ElementClass } from "../shared/enums";
import { ILocation } from "../shared/interfaces";

export class Character {
      id: string;
      name: string;
      currentHp: number;
      maxHp: number;
      xp: number;
      isAsleep: boolean;
      isAngry: boolean;
      isAttacking: boolean;
      isGuarding: boolean;
      isReceivingAttack: boolean;
      baseDamage: number;
      pauseCounter: number;
      maxPauseDuration: number;
      type: ElementClass;
      direction: Direction;
      startingDirection: Direction;
      startingLocation: string;
      patrolArea: boolean;
      directionsForPatrol: Direction[];
      startingTargetLocation: string;
      currentPositionInRoute: number;
      currentHuntingDuration: number;
      maxHuntingDuration: number;
      currentPathToDestination: any[]; // TODO PriorityQueue
      pathfindingDestination: ILocation;
      currentState: CharacterState;
      startingState: CharacterState;
      armour?: IArmour;
      weapons?: IWeapons;
      loot: IInventoryItem[];
      level: number;
      imageFileName: string;

      inventoryLocations: any;
      locationKeys: any;
      this: any;

      constructor() {
            this.inventoryLocations = {
                  a1: null,
                  a2: null,
                  a3: null,
                  a4: null,
                  a5: null,
                  b1: null,
                  b2: null,
                  b3: null,
                  b4: null,
                  b5: null,
                  c1: null,
                  c2: null,
                  c3: null,
                  c4: null,
                  c5: null,
                  d1: null,
                  d2: null,
                  d3: null,
                  d4: null,
                  d5: null,
                  e1: null,
                  e2: null,
                  e3: null,
                  e4: null,
                  e5: null,
            };
            this.locationKeys = Object.keys;
      }



      get isPaused(): boolean {
            return (this.pauseCounter <= this.maxPauseDuration);
      }

      /**
       * Checks to see if there are any objects in the inventory and returns false if there are any
       */
      get hasNoLoot(): boolean {
            let _isEmpty = true;

            for (const slot in this.inventoryLocations) {

                  // Check if the key exists and the slot contains an element
                  if (this.inventoryLocations.hasOwnProperty(slot) && this.inventoryLocations[slot]) {
                        _isEmpty = false;
                        break;
                  }
            }

            return _isEmpty;
      }

      public wait() {
            this.pauseCounter++;
      }

      public resetPauseCounter() {
            this.pauseCounter = 0;
      }

      public guard() {
            this.isGuarding = true;

            // // Allow the page to rerender before starting animation
            // setTimeout(() => {
            //       this.isGuarding = true;
            // }, 0);

            // Clear the attack animation once it's played out
            setTimeout(() => {
                  this.isGuarding = false;
            }, defaults.animations.guardDurationMilliseconds);
      }

      public attack() {
            this.isAttacking = false;

            // Allow the page to rerender before starting animation
            setTimeout(() => {
                  this.isAttacking = true;
            }, 0);

            // Clear the attack animation once it's played out
            setTimeout(() => {
                  this.isAttacking = false;
            }, defaults.animations.attackDurationMilliseconds);

      }

      public receiveAttack() {
            this.isReceivingAttack = false;

            // Allow the page to rerender before starting animation
            setTimeout(() => {
                  this.isReceivingAttack = true;
            }, 0);

            // Clear the attack animation once it's played out
            setTimeout(() => {
                  this.isReceivingAttack = false;
            }, defaults.animations.receiveAttackDurationMilliseconds);
      }

}
