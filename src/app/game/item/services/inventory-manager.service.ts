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
   * Return the total weight of the contents of the inventory
   */
  get contentsWeight(): number {
    let contentsWeight = 0;
    for (const location in this.locations) {
      if (this.locations.hasOwnProperty(location) && this.locations[location] !== null) {
        contentsWeight += this.locations[location].weight;
      }
    }
    return contentsWeight;
  }

  /**
   * Adds an inventory item to the inventory is there is space,
   * otherwise notifies the player of the failure
   * @param newItem item added to the inventory from the game
   */
  public addItemToInventory(newItem: IInventoryItem): void {
    const targetLocation = this.getNextFreeSlot();
    if (!targetLocation) {
      throw new Error("Inventory full");
    } else {
      this.locations[targetLocation] = newItem;
    }
  }

  public getNextFreeSlot(): string | null {
    for (const itemSlot in this.locations) {
      if (this.locations.hasOwnProperty(itemSlot) && !this.locations[itemSlot]) {
        return itemSlot;
      }
    }
    return null;
  }

  /**
   * Sets all service states to default
   */
  public setDefaults() {
    this.locations = this.cloneInventoryLocations(inventoryLocationsDefaults);
    this.locationKeys = Object.keys;
    this.addItemToInventory(armour.leatherChestPiece);
  }

  public cloneInventoryLocations(sourceInventoryLocations) {
    return JSON.parse(JSON.stringify(sourceInventoryLocations));
  }

  /**
   * Return the inventory state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IInventoryStateData {
    return {
      locationKeys: this.locationKeys,
      locations: this.locations,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IInventoryStateData): void {
    for (const stateSetting in newState) {
      if (newState.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
