import { ObjectType } from "../../shared/enums";
import inventoryLocationsDefaults from "../../shared/models/inventoryLocations";
import { IInventoryReferences } from "../../item/inventory/interfaces";

export class LootBag {

      public name = "loot-bag";
      public imageName = "loot-bag.png";
      public objectType = ObjectType.lootBag;
      public inventoryLocations: any;
      public locationKeys: any;

      constructor(loot: any, inventoryLocations?: IInventoryReferences) {
            this.inventoryLocations = this.cloneInventoryLocations(inventoryLocationsDefaults);
            this.locationKeys = Object.keys;

            if (loot) {
                  this.addLoot(loot);
            }
            if (inventoryLocations) {
                  this.inventoryLocations = inventoryLocations;
            }
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
      public addLoot(loot: any) {

            if (!this.isEmpty) {

                  lootLoop:
                  for (const inventoryLocation in loot) {
                        if (loot.hasOwnProperty(inventoryLocation) && loot[inventoryLocation])  {

                              inventoryLocationLoop:
                              for (const slot in this.inventoryLocations) {
                                    if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                                          this.inventoryLocations[slot] = loot[inventoryLocation];
                                          break inventoryLocationLoop;
                                    }
                              }
                        }
                  }
            } else {
                  this.inventoryLocations = loot;
            }
      }

      public cloneInventoryLocations(sourceInventoryLocations) {
            return JSON.parse(JSON.stringify(sourceInventoryLocations));
      }
}
