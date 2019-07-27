import { Injectable, OnInit } from '@angular/core';
import { IAreaStateData, ILocation } from '../interfaces';
import { IGridReferences, IAreaElement } from '../../area/interfaces';
import { ElementClass } from '../enums';
import locations from '../models/locations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AreaStateService implements OnInit {
  // Stores the location ID
  private _currentLocation: number;
  private _areaCompleted = false;
  public room: number;
  public locationKeys: any;
  public locations: IGridReferences;

  public areaChange: BehaviorSubject<string>;

  constructor(
  ) {
    // Set the state to be the first level before anything
    this.currentLocation = 1;
    // TODO Might be worth holding location x and y data on the object alongside the gridObject or null
    this.locations = locations;
    this.locationKeys = Object.keys;
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
  }

  ngOnInit() {
    this.areaChange = new BehaviorSubject("changedArea");

    // this.playerStateService.playerMoved.subscribe(data => {
    //   this.actionTriggerHandler();
    // });
  }

  get playerLocation(): string {
    for (const gridLocation in this.locations) {
      if (this.locations.hasOwnProperty(gridLocation) &&
        this.locations[gridLocation].element &&
        this.locations[gridLocation].element.type &&
        (this.locations[gridLocation].element.type === ElementClass.player)) {
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
  public getCharactersOnGrid(): { gridElement: IAreaElement, gridLocation: string }[] {
    const characterData = [];
    for (const gridLocation in this.locations) {
      if (this.locations.hasOwnProperty(gridLocation) &&
        this.locations[gridLocation].element &&
        this.locations[gridLocation].element.type &&
        (this.locations[gridLocation].element.type === ElementClass.enemy || this.locations[gridLocation].element.type === ElementClass.npc) &&
        !this.locations[gridLocation].element.isDead()) {
        const gridElement = this.locations[gridLocation].element;
        if (gridElement.type && (gridElement.type === ElementClass.enemy || gridElement.type === ElementClass.npc)) {
          characterData.push({
            gridElement: gridElement,
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
    return (!this.locations[location].element);
  }

  public moveCharacter(newLocation: string, currentLocation: string) {
    // TODO: We need to store a reference to the player object here
    this.locations[newLocation].element = this.locations[currentLocation].element;
    this.locations[currentLocation].element = null;
  }

  public removeElementFromArea(target: IAreaElement, location: string) {
    this.locations[location].element = null;
  }

  public splitLocationReference(gridLocation: string): ILocation {
    return {
      locationY: gridLocation[0],
      locationX: Number(gridLocation[1]),
    };
  }

  public loadNewArea(newAreaReference: number) {
    // Back up current state
    this.saveState(this.currentLocation);
    // Reset the locations to blank
    this.locations = locations;
    // Emit event to reset area component with new area reference
    this.areaChange.next("changedArea");
    this.currentLocation = newAreaReference;
  }

  /**
   * Save the area state to storage
   * @param newAreaReference the area number
   */
  public saveState(newAreaReference: number) {
    localStorage.setItem(newAreaReference.toString(), JSON.stringify(this.locations));
  }

  /**
   * Return the area state for storage
   * @returns the state data relevant to this service
   * @returns the state data relevant to this service
   */
  public gatherState(): IAreaStateData {
    return {
      locations: this.locations,
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
