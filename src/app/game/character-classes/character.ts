import { Direction, ElementClass, CharacterState } from "../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";
import { ILocation } from "../shared/interfaces";
import defaults from "../../shared/defaults";

export class Character {
      id: string;
      name: string;
      currentHp: number;
      maxHp: number;
      xp: number;
      isAsleep: boolean;
      isAngry: boolean;
      isAttacking: boolean;
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

      public wait() {
            this.pauseCounter++;
      }

      public resetPauseCounter() {
            this.pauseCounter = 0;
      }

      public attack() {

            // console.log("Attempting attack");

            this.isAttacking = false;


            // console.log("Status: ", this.isAttacking);
            // Allow the page to rerender before starting animation
            setTimeout(() => {
                  this.isAttacking = true;
                  // console.log("Status: ", this.isAttacking);
            }, 0);

            // Clear the attack animation once it's played out
            setTimeout(() => {
                  this.isAttacking = false;
                  // console.log("Status: ", this.isAttacking);
            }, defaults.animations.attackDurationMilliseconds);

      }

      public receiveAttack() {

            console.log("Attempting receive attack");

            this.isReceivingAttack = false;


            console.log("Status: ", this.isReceivingAttack);
            // Allow the page to rerender before starting animation
            setTimeout(() => {
                  this.isReceivingAttack = true;
                  console.log("Status: ", this.isReceivingAttack);
            }, 0);

            // Clear the attack animation once it's played out
            setTimeout(() => {
                  this.isReceivingAttack = false;
                  console.log("Status: ", this.isReceivingAttack);
            }, defaults.animations.receiveAttackDurationMilliseconds);
      }

}
