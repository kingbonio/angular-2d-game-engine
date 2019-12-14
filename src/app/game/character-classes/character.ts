import { Direction, ElementClass, CharacterState } from "../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";
import { ILocation } from "../shared/interfaces";

export class Character {
      id: string;
      name: string;
      currentHp: number;
      maxHp: number;
      xp: number;
      isAsleep: boolean;
      isAngry: boolean;
      baseDamage: number;
      pauseCounter: number;
      maxPauseDuration: number;
      type: ElementClass;
      direction: Direction;
      startingDirection: Direction;
      startingLocation: string;
      patrolArea: boolean;
      directionsForPatrol: Direction[];
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

}
