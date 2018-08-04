import { Injectable } from '@angular/core';
import { PlayerStateService } from './player-state.service';
import { IInventoryStateData } from '../interfaces';

@Injectable()
export class InventoryManagerService {
  public capacity: number;

  constructor(private playerStateService: PlayerStateService) { }


  onInit() {
    this.capacity = this.playerStateService.inventoryCapacity;
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
