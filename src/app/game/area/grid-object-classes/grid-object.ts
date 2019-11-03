import { IInventoryItem } from "../../item/interfaces";
import { ElementClass, Direction } from "../../shared/enums";
import { ObjectType } from "../../shared/enums";

export class GridObject {
      public type = ElementClass.object;
      public name: string;
      public imageFileName: string;
      public canBeTraversed: boolean;
      public isInteractive: boolean;
      public itemReferenceNeeded: string;
      public direction: Direction;
      public startingDirection: Direction;
      public loot: IInventoryItem[];
      public objectType: ObjectType;

      public inventoryLocations: any;
      public locationKeys: any;

      constructor(elementProperties: any) {
            this.inventoryLocations = elementProperties.inventoryLocations || {
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

            this.name = elementProperties.name;
            this.imageFileName = elementProperties.imageFileName;
            this.canBeTraversed = elementProperties.canBeTraversed;
            this.isInteractive = elementProperties.isInteractive;
            this.direction = elementProperties.direction;
            this.startingDirection = elementProperties.startingDirection;
            this.itemReferenceNeeded = elementProperties.itemReferenceNeeded;
            this.loot = elementProperties.loot;
            this.objectType = elementProperties.objectType;
            if (this.loot) {
                  elementProperties.loot.forEach((item: IInventoryItem) => {
                        for (const slot in this.inventoryLocations) {
                              if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                                    this.inventoryLocations[slot] = item;
                                    return;
                              }
                        }
                  });
            }
      }
}
