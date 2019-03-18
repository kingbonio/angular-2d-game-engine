import { Injectable } from '@angular/core';
import { PlayerStateService } from './player-state.service';
import { IInventoryStateData, IInventoryItem } from '../interfaces';
import defaults from '../../../shared/defaults';
import { IGridReferences } from '../../area/interfaces';
import { IInventoryReferences } from '../../item/inventory/interfaces';

@Injectable()
export class InventoryManagerService {
  // public contents: IInventoryItem[];
  public locationKeys: any;
  public locations: IInventoryReferences;

  constructor() {
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
  //   return this.playerStateService.strength * defaults.playerMultiplyers.inventoryCapacityMultiplyer;
  // }

  /**
   * Adds an inventory item to the inventory is there is space,
   * otherwise notifies the player of the failure
   * @param newItem item added to the inventory from the game
   */
  public addItemToInventory(newItem: IInventoryItem): void {
    // if (this.contentsWeight + newItem.weight > this.capacity) {
      // this.contents.push(newItem);
    // } else {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Your inventory is full");
      // Maybe drop the item or overload capacity
    // }
  }

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
      // revert to this.capacity
      capacity: 11
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IInventoryStateData): void {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
