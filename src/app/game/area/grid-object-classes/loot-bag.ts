import { IInventoryItem } from "../../item/interfaces";
import { ObjectType } from "../../shared/enums";

export class LootBag {

      public name = "loot-bag";
      public imageName = "loot-bag.png";
      public objectType = ObjectType.lootBag;
      public inventoryLocations: any;
      public locationKeys: any;

      constructor(loot: any) {

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

            this._addLoot(loot);
      }

      /**
       * Checks to see if there are any objects in the inventory and returns false if there are any
       */
      public get isEmpty(): boolean {
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

      /**
       * Add the initial loot to the bag
       * @param loot Items to be added to the bag
       */
      private _addLoot(loot: any) {

            // if (loot) {
            //       loot.forEach((item: IInventoryItem) => {
            //             for (const slot in this.inventoryLocations) {
            //                   if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
            //                         this.inventoryLocations[slot] = item;
            //                         return;
            //                   }
            //             }
            //       });
            // }

            this.inventoryLocations = loot;
      }
}
