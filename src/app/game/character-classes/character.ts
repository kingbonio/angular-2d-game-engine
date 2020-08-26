import defaults from "../../shared/defaults";
import { IArmour, IInventoryItem, IWeapons } from "../item/interfaces";
import { CharacterState, Direction, ElementClass } from "../shared/enums";
import { ILocation } from "../shared/interfaces";
import inventoryLocationsDefaults from "../shared/models/inventoryLocations";

export class Character {
      id: string;
      name: string;
      currentHp: number;
      maxHp: number;
      isAttacking: boolean;
      isGuarding: boolean;
      isReceivingAttack: boolean;
      isMovingForwards: boolean;
      baseDamage: number;
      pauseCounter: number;
      attackPauseDuration: number;
      type: ElementClass;
      direction: Direction;
      startingDirection: Direction;
      startingLocation: string;
      directionsForPatrol: Direction[];
      startingTargetLocation: string;
      currentPositionInRoute: number;
      currentHuntingDuration: number;
      maxHuntingDuration: number;
      currentPathToDestination: any[];
      pathfindingDestination: ILocation;
      currentState: CharacterState;
      startingState: CharacterState;
      armour?: IArmour;
      weapons?: IWeapons;
      loot: IInventoryItem[];
      imageFileName: string;

      inventoryLocations: any;
      locationKeys: any;
      this: any; // TODO Is this even a thing?

      constructor() {
            this.inventoryLocations = this.cloneInventoryLocations(inventoryLocationsDefaults);
            this.locationKeys = Object.keys;
      }

      get isPaused(): boolean {
            return (this.pauseCounter <= this.attackPauseDuration);
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

      /**
       * Start and prepare a finishing callback for the character moving forwards
       * @param { function } finishMovementCallback
       */
      public moveForwards(finishMovementCallback: any) {
            this.isMovingForwards = true;

            // Clear the attack animation once it's played out
            setTimeout(() => {
                  this.isMovingForwards = false;
                  finishMovementCallback();
            }, defaults.animations.movementDurationMilliseconds);
      }

      public cloneInventoryLocations(sourceInventoryLocations) {
            return JSON.parse(JSON.stringify(sourceInventoryLocations));
      }

}
