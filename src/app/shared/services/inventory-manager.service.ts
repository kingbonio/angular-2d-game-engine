import { Injectable } from '@angular/core';
import { PlayerStateService } from './player-state.service';
import { IInventoryStateData, IInventoryItem } from '../interfaces';
import defaults from '../defaults';

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
  public addItemToInventory(newItem: IInventoryItem) {
    if (this.contentsWeight + newItem.weight > this.capacity) {
      this.contents.push(newItem);
    } else {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Your inventory is full");    
    }
  }

  /**
   * Return the inventory state for storage
   */
  public gatherState(): IInventoryStateData {
    return {
      capacity: this.capacity
    };
  }

  /**
   * Applies state data to this service
   */
  public applyState(newState: IInventoryStateData) {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
