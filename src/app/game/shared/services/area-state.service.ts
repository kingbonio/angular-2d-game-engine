import { Injectable } from '@angular/core';
import { IAreaStateData } from '../interfaces';

@Injectable()
export class AreaStateService {
  // Stores the location ID
  private _currentLocation: number;
  private _areaCompleted = false;

  constructor() {
    // Set the state to be the first level before anything
    this._currentLocation = 0;
  }

  get currentLocation() {
    return this._currentLocation;
  }

  set currentLocation(newLocation) {
    this._currentLocation = newLocation;
  }

  get areaCompleted() {
    return this._areaCompleted;
  }

  set areaCompleted(areaCompleted) {
    this._areaCompleted = areaCompleted;
  }

  /**
   * Return the area state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IAreaStateData {
    return {
      currentLocation: this.currentLocation,
      areaCompleted: this.areaCompleted,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IAreaStateData): void {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
