import { Injectable } from '@angular/core';
import { IInventoryStateData, IInventoryItem } from '../../shared/interfaces';
import defaults from '../../../shared/defaults';
import { IInventoryReferences } from '../inventory/interfaces';
import { DialogueService } from '../../shared/services/dialogue.service';

@Injectable()
export class InventoryManagerService {
  public locationKeys: any;
  public locations: IInventoryReferences;

  constructor(
    private dialogueService: DialogueService,
  ) {
    this.locations = {
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


  onInit() { }

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

  // get capacity(): number {
  //   return this.playerStateService.strength * defaults.playerMultipliers.inventoryCapacityMultiplier;
  // }

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

  // Get next available inventory slot

  // Return reference or null

  // If not null allow adding

  /**
   * Searches for items in the inventory matching a given name
   * @param itemName the terms to search for
   * @returns array of items found matching search terms
   */
  public searchForItems(itemName: string): IInventoryItem[] {
    // return this.contents.filter(item => item.name === itemName);
    // TODO remove this
    return [];
  }

  /**
   * Returns the index of the first item in the inventory contents or null, if none found
   * @param itemName the terms to search for
   * @returns index of first item found or null if none found
   */
  public getIndexOfItem(itemName: string): number | null {
    // for (let i = 0; i < this.contents.length; ++i) {
    //   if (this.contents[i].name === itemName) {
    //     return i;
    //   }
    // }
    return null;
  }

  /**
   * Removes the first instance of an item matching the itemName from the inventory contents
   * @param itemName the terms to search for
   */
  public removeItem(itemName: string): void {
    // const indexOfItem = this.getIndexOfItem(itemName);
    // if (indexOfItem) {
    //   this.contents.splice(indexOfItem, 1);
    // } else {
    //   // TODO: build recipient of this and insert translation service
    //   // this.notificationsService("Item cannot be found in inventory");
    // }
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
