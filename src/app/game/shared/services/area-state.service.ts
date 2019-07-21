import { Injectable } from '@angular/core';
import { IAreaStateData, ILocation } from '../interfaces';
import { IGridReferences, IAreaElement } from '../../area/interfaces';
import { Direction, ElementClass } from '../enums';
import { AiService } from './ai.service';
import { PlayerStateService } from './player-state.service';

@Injectable()
export class AreaStateService {
  // Stores the location ID
  private _currentLocation: number;
  private _areaCompleted = false;
  public locationKeys: any;
  public locations: IGridReferences;

  constructor(
  ) {
    // Set the state to be the first level before anything
    this._currentLocation = 0;
    // TODO Might be worth holding location x and y data on the object alongside the gridObject or null
    this.locations = {
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      a5: null,
      a6: null,
      a7: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      b5: null,
      b6: null,
      b7: null,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      c7: null,
      d1: null,
      d2: null,
      d3: null,
      d4: null,
      d5: null,
      d6: null,
      d7: null,
      e1: null,
      e2: null,
      e3: null,
      e4: null,
      e5: null,
      e6: null,
      e7: null,
      f1: null,
      f2: null,
      f3: null,
      f4: null,
      f5: null,
      f6: null,
      f7: null,
      g1: null,
      g2: null,
      g3: null,
      g4: null,
      g5: null,
      g6: null,
      g7: null,
    };
    this.locationKeys = Object.keys;
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
  }

  get playerLocation(): string {
    for (const gridLocation in this.locations) {
      if (this.locations.hasOwnProperty(gridLocation) &&
        this.locations[gridLocation] &&
        this.locations[gridLocation].type &&
        (this.locations[gridLocation].type === ElementClass.player)) {
        return gridLocation;
      }
    }
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
   * Push all characters on grid into an array and return it
   */
  // TODO return type as interface
  public getCharactersOnGrid(): { gridItem: IAreaElement, gridLocation: string }[] {
    const characterData = [];
    for (const gridLocation in this.locations) {
      if (this.locations.hasOwnProperty(gridLocation) &&
        this.locations[gridLocation] &&
        this.locations[gridLocation].type &&
        (this.locations[gridLocation].type === ElementClass.enemy || this.locations[gridLocation].type === ElementClass.npc) &&
        !this.locations[gridLocation].isDead()) {
        const gridItem = this.locations[gridLocation];
        if (gridItem.type && (gridItem.type === ElementClass.enemy || gridItem.type === ElementClass.npc)) {
          characterData.push({
            gridItem,
            gridLocation
          });
        }
      }
    }
    return characterData;
  }

  public isCharacterNextToPlayer(gridLocation: string): boolean {
    const playerCoordinates = this.splitLocationReference(this.playerLocation);
    const characterCoordinates = this.splitLocationReference(gridLocation);
    const distanceFromPlayerCoordinates = this.getDistanceBetweenLocations(playerCoordinates, characterCoordinates);
    // Positive differences should be 0 and 1
    if (Math.abs(distanceFromPlayerCoordinates.xDistance) + Math.abs(distanceFromPlayerCoordinates.yDistance) === 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns a positive or negative value for both x and y distances to target location
   * @param currentLocation The location we want the distance to
   * @param targetLocation The location we want the distance from
   */
  public getDistanceBetweenLocations(currentLocation: ILocation, targetLocation: ILocation): { yDistance: number, xDistance: number } {
    const differenceBetweenY = currentLocation.locationY.charCodeAt(0) - targetLocation.locationY.charCodeAt(0);
    const differenceBetweenX = currentLocation.locationX - targetLocation.locationX;
    return { yDistance: differenceBetweenY, xDistance: differenceBetweenX };
  }

  /**
   * Checks whether the location on the grid can be moved into
   * @param location the grid reference for the location
   */
  public isLocationFree(location: string): boolean {
    return (!this.locations[location]);
  }

  public moveCharacter(newLocation: string, currentLocation: string) {
    console.log(`Attempting to move ${this.locations[currentLocation].type} from ${currentLocation} to ${newLocation}`);
    console.log("While this grid location: ", this.locations);
    // TODO: We need to store a reference to the player object here
    this.locations[newLocation] = this.locations[currentLocation];
    this.locations[currentLocation] = null;
  }

  public removeElementFromArea(target: IAreaElement, location: string) {
    this.locations[location] = null;
  }

  public splitLocationReference(gridLocation: string): ILocation {
    return {
      locationY: gridLocation[0],
      locationX: Number(gridLocation[1]),
    };
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
