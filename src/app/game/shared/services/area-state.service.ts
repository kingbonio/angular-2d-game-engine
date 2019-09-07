import { Injectable, OnInit } from '@angular/core';
import { IAreaStateData, ILocation } from '../interfaces';
import { IGridReferences, IAreaElement } from '../../area/interfaces';
import { ElementClass } from '../enums';
import locationDefaults from '../models/locations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Character } from '../../character-classes/character';

@Injectable()
export class AreaStateService implements OnInit {
  // Stores the location ID
  public currentArea: number;
  public newArea: number;
  public loadingPreviousArea = false;
  public loadingExistingArea = false;
  public loadingSavedGame = false;
  public locationKeys: any;
  public locations: IGridReferences;
  public previousPlayerLocation: string;

  public areaChange: BehaviorSubject<number>;
  public areaReady: BehaviorSubject<number>;

  constructor(
  ) {
    // Set the state to be the first level before anything
    this.currentArea = 1;
    this.newArea = null;
    // TODO Might be worth holding location x and y data on the object alongside the gridObject or null
    this.locations = this.cloneLocations(locationDefaults);
    this.locationKeys = Object.keys;
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
    this.areaChange = new BehaviorSubject(1);
    this.areaReady = new BehaviorSubject(1);
  }

  ngOnInit() {

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

  /**
   * Push all characters on grid into an array and return it
   */
  // TODO return type as interface
  public getCharactersOnGrid(): { character: Character, gridLocation: string }[] {
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
            character: gridElement,
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
    const differenceBetweenY = targetLocation.locationY.charCodeAt(0) - currentLocation.locationY.charCodeAt(0);
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

  public movePlayer(newLocation: string) {
    if (newLocation !== this.playerLocation) {
      this.moveCharacter(newLocation, this.playerLocation);
    }
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

  public notifyAreaChange() {
    // Let the area state service handle the death of the component
    this.areaReady.next(this.newArea);
  }

  public updateLocation() {
    this.currentArea = this.newArea;
    this.newArea = null;
  }

  // TODO This isn't great, redo this
  /**
   * Backs up current location state, loads the new one and emits event to notify listeners
   * @param newAreaReference The target are to pull data for
   */
  public loadNewArea(newAreaReference: number) {
    this.loadingPreviousArea = true;
    // Back up current state
    this.saveAreaState(this.currentArea);
    // Save the new area reference
    this.newArea = newAreaReference;

    this.previousPlayerLocation = this.playerLocation;

    const targetAreaData = this.getAreaState(newAreaReference);
    if (targetAreaData) {
      this.loadingExistingArea = true;
      // Reset the locations to be the stored data
      this.locations = targetAreaData;
    } else {
      // Reset the locations to blank
      this.locations = this.cloneLocations(locationDefaults);
    }

    // TODO this isn't ideal really, look for the other subject type
    this.areaChange.next(newAreaReference ? newAreaReference : this.currentArea);

    // Update the location
    this.currentArea = this.newArea;
    this.newArea = null;
  }

  public loadFromSaveGame(savedState: IAreaStateData) {
    this.loadingExistingArea = true;

    this.areaChange.next(savedState.currentLocation);
    this.areaReady.next(savedState.currentLocation);
  }

  /**
   * Save the area state to storage
   * @param newAreaReference the area number
   */
  public saveAreaState(newAreaReference: number) {
    localStorage.setItem(newAreaReference.toString(), JSON.stringify(this.locations));
  }

  /**
   * Get the area from storage
   * @param newAreaReference the area number
   */
  public getAreaState(newAreaReference: number): any | null {
    const stateJson = localStorage.getItem(newAreaReference.toString());
    if (stateJson.length && stateJson !== "{}") {
      return JSON.parse(stateJson);
    } else {
      return null;
    }
  }

  private cloneLocations(sourceLocations) {
    return JSON.parse(JSON.stringify(sourceLocations));
  }

  /**
   * Return the area state for storage
   * @returns the state data relevant to this service
   * @returns the state data relevant to this service
   */
  public gatherState(): IAreaStateData {
    return {
      currentLocation: this.currentArea,
      newLocation: this.newArea,
      loadingArea: this.loadingPreviousArea,
      loadingExistingArea: this.loadingExistingArea,
      locationKeys: this.locationKeys,
      locations: this.locations,
      previousPlayerLocation: this.previousPlayerLocation,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IAreaStateData): void {
    for (const stateSetting in newState) {
      if (newState.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
