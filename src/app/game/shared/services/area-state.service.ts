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
  public room: number;
  public locationKeys: any;
  public locations: IGridReferences;

  constructor(
  ) {
    // Set the state to be the first level before anything
    this._currentLocation = 0;
    // TODO Might be worth holding location x and y data on the object alongside the gridObject or null
    this.locations = {
      a1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      a2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      a3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      // north door
      a4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      a5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      a6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      a7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      b7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      c7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      // west door
      d1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      d2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      d3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      d4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      d5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      d6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      // east door
      d7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      e7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      f7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      g1: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      g2: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      g3: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      // south door
      g4: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      g5: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      g6: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
      g7: {
        exitDestination: null,
        areaEffect: null,
        element: null,
        floorStyle: null,
      },
    };
    this.locationKeys = Object.keys;
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
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
    console.log(`Attempting to move ${this.locations[currentLocation].type} from ${currentLocation} to ${newLocation}`);
    console.log("While this grid location: ", this.locations);
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
