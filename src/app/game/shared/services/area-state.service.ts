import { Injectable } from '@angular/core';
import { IAreaStateData } from '../interfaces';
import { IGridReferences } from '../../area/interfaces';
import { Character } from '../enums';

@Injectable()
export class AreaStateService {
  // Stores the location ID
  private _currentLocation: number;
  private _areaCompleted = false;
  public locationKeys: any;
  public locations: IGridReferences;

  constructor() {
    // Set the state to be the first level before anything
    this._currentLocation = 0;
    this.locations = {
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      a5: null,
      a6: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      b5: null,
      b6: null,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      d1: null,
      d2: null,
      d3: null,
      d4: null,
      d5: null,
      d6: null,
      e1: null,
      e2: null,
      e3: null,
      e4: null,
      e5: null,
      e6: null,
      f1: null,
      f2: null,
      f3: null,
      f4: null,
      f5: null,
      f6: null,
    };
    this.locationKeys = Object.keys;
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
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
   * Checks whether the location on the grid can be moved into
   * @param location the grid reference for the location
   */
  isLocationFree(location: string): boolean {
    return (!!this.locations[location]);
  }

  public movePlayer(newLocation: string, currentLocation: string) {
    this.locations[currentLocation] = null;
    // TODO: We need to store a reference to the player object here
    this.locations[newLocation] = Character.player;
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
