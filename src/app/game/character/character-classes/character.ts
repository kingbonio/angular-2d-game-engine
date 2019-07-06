import { CharacterType, Direction, ElementClass } from "../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";

export class Character {
      currentHp: number;
      maxHp: number;
      xp: number;
      isAsleep: boolean;
      isAngry: boolean;
      type: ElementClass;
      direction: Direction;
      armour?: IArmour;
      weapons?: IWeapons;
      loot: IInventoryItem[];
      imageFileName: string;

      inventoryLocations: any;
      locationKeys: any;

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

}
