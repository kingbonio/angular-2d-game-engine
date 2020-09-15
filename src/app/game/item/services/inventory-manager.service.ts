import { Injectable } from '@angular/core';
import { IInventoryItem, IInventoryStateData } from '../../shared/interfaces';
import { IInventoryReferences } from '../inventory/interfaces';
import { armour } from '../../../game-config/items';
import inventoryLocationsDefaults from '../../shared/models/inventoryLocations';

@Injectable()
export class InventoryManagerService {
    public locationKeys: any;
    public locations: IInventoryReferences;

    constructor(
    ) {
      this.setDefaults();
    }

    /**
     * Returns the next available slot location if one is available
     *
     * @returns {string|null}
     */
    private getNextFreeSlot(): string | null {
      for (const itemSlot in this.locations) {
        if (this.locations.hasOwnProperty(itemSlot) && !this.locations[itemSlot]) {
            return itemSlot;
        }
      }
      return null;
    }

    /**
	 * Adds an inventory item to the inventory is there is space,
	 * otherwise throws an error
     *
	 * @param newItem The item added to the inventory
     *
     * @throws {Error}
	 */
    public addItemToInventory(newItem: IInventoryItem): void {
      const targetLocation = this.getNextFreeSlot();
      if (!targetLocation) {
        throw new Error("Inventory full");
      } else {
        this.locations[targetLocation] = newItem;
      }
    }

    /**
	 * Sets all service states to default
	 */
    public setDefaults(): void {
      this.locations = this.cloneInventoryLocations(inventoryLocationsDefaults);
      this.locationKeys = Object.keys;
      this.addItemToInventory(armour.leatherChestPiece);
    }

    /**
     * Returns a cloned version of the locations object provided
     *
     * @param {IInventoryReferences} sourceInventoryLocations The locations object we are cloning
     *
     * @returns {IInventoryReferences}
     */
    public cloneInventoryLocations(sourceInventoryLocations: IInventoryReferences): IInventoryReferences {
      return JSON.parse(JSON.stringify(sourceInventoryLocations));
    }

    /**
	 * Return the inventory state for storage
     *
	 * @returns {IInventoryStateData}
	 */
    public gatherState(): IInventoryStateData {
      return {
        locationKeys: this.locationKeys,
        locations: this.locations,
      };
    }

    /**
     * Applies state data to this service
     *
     * @param {IInventoryStateData} newState Settings to push to this state service
     */
    public applyState(newState: IInventoryStateData): void {
      for (const stateSetting in newState) {
        if (newState.hasOwnProperty(stateSetting)) {
            this[stateSetting] = newState[stateSetting];
        }
      }
    }
}
