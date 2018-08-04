import { Injectable } from '@angular/core';
import { Locations } from '../enums';
import { IAreaStateData } from '../interfaces';

@Injectable()
export class AreaStateService {
  private _currentLocation: Locations;
  private _areaCompleted = false;

  constructor() {
    this._currentLocation = Locations.start;
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
   */
  public gatherState(): IAreaStateData {
    return {
      currentLocation: this.currentLocation,
      areaCompleted: this.areaCompleted,
    };
  }

  /**
   * Applies state data to this service
   */
  public applyState(newState: IAreaStateData) {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
