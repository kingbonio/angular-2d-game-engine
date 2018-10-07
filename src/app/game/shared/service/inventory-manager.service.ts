import { Injectable } from '@angular/core';
import { PlayerStateService } from './player-state.service';
import { IInventoryStateData, IInventoryItem } from '../interfaces';
import defaults from '../../../shared/defaults';

@Injectable()
export class InventoryManagerService {
  public contents: IInventoryItem[];

  constructor(private playerStateService: PlayerStateService) { }


  onInit() { }

  /**
   * Return the total weight of the contents of the inventory
   */
  get contentsWeight(): number {
    let contentsWeight = 0;
    this.contents.forEach(item => {
      contentsWeight += item.weight;
    });
    return contentsWeight;
  }

  get capacity(): number {
    return this.playerStateService.strength * defaults.playerMultiplyers.inventoryCapacityMultiplyer;
  }

  /**
   * Adds an inventory item to the inventory is there is space,
   * otherwise notifies the player of the failure
   * @param newItem item added to the inventory from the game
   */
  public addItemToInventory(newItem: IInventoryItem): void {
    if (this.contentsWeight + newItem.weight > this.capacity) {
      this.contents.push(newItem);
    } else {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Your inventory is full");
      // Maybe drop the item or overload capacity
    }
  }

  /**
   * Searches for items in the inventory matching a given name
   * @param itemName the terms to search for
   * @returns array of items found matching search terms
   */
  public searchForItems(itemName: string): IInventoryItem[] {
    return this.contents.filter(item => item.name === itemName);
  }

  /**
   * Returns the index of the first item in the inventory contents or null, if none found
   * @param itemName the terms to search for
   * @returns index of first item found or null if none found
   */
  public getIndexOfItem(itemName: string): number | null {
    for (let i = 0; i < this.contents.length; ++i) {
      if (this.contents[i].name === itemName) {
        return i;
      }
    }
    return null;
  }

  /**
   * Removes the first instance of an item matching the itemName from the inventory contents
   * @param itemName the terms to search for
   */
  public removeItem(itemName: string): void {
    const indexOfItem = this.getIndexOfItem(itemName);
    if (indexOfItem) {
      this.contents.splice(indexOfItem, 1);
    } else {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Item cannot be found in inventory");
    }
  }

  /**
   * Return the inventory state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IInventoryStateData {
    return {
      capacity: this.capacity
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
