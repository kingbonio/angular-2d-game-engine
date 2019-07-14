import { Component, OnInit } from '@angular/core';
import { AreaStateService } from '../../services/area-state.service';
import { Direction } from '../../enums';
import { DiceService } from '../../services/dice.service';
import { Dice } from '../dice';

@Component({
  selector: 'app-movement',
  template: '',
})
export class MovementComponent {

  constructor(
    private areaStateService: AreaStateService,
  ) { }


  // TODO Maybe update this location interface/enum
  // TODO Look into direction being used from the service
  // TODO Could refactor this switch statement
  // tslint:disable-next-line:max-line-length
  public getNextLocation(locationY: string, locationX: number, direction: Direction): { locationY: string, locationX: number, isLocationFree: boolean } | null {

    // Attempt movement
    let newLocationY;
    let newLocationX;
    switch (direction) {
      case Direction.N:
        newLocationY = this.previousYReference(locationY);
        newLocationX = locationX;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationY && newLocationX) {
          return {
            locationY: newLocationY,
            locationX: newLocationX,
            isLocationFree: this.areaStateService.isLocationFree(newLocationY + newLocationX)
          };
        }
        return null;
      case Direction.E:
        newLocationX = this.nextXReference(locationX);
        newLocationY = locationY;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationY && newLocationX) {
          return {
            locationY: newLocationY,
            locationX: newLocationX,
            isLocationFree: this.areaStateService.isLocationFree(newLocationY + newLocationX)
          };
        }
        return null;
      case Direction.S:
        newLocationY = this.nextYReference(locationY);
        newLocationX = locationX;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationY && newLocationX) {
          return {
            locationY: newLocationY,
            locationX: newLocationX,
            isLocationFree: this.areaStateService.isLocationFree(newLocationY + newLocationX)
          };
        }
        return null;
      case Direction.W:
        newLocationX = this.previousXReference(locationX);
        newLocationY = locationY;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationY && newLocationX) {
          return {
            locationY: newLocationY,
            locationX: newLocationX,
            isLocationFree: this.areaStateService.isLocationFree(newLocationY + newLocationX)
          };
        }
        return null;
      default:
        return null;
    }
  }

  public getDirectionToFace(direction: Direction) {
    switch (direction) {
      case Direction.N:
        return Direction.S;
      case Direction.E:
        return Direction.W;
      case Direction.S:
        return Direction.N;
      case Direction.W:
        return Direction.E;
    }
  }

  /**
   * Try a random direction then move to that location, if it's blocked, try the other 3 directions or do nothing
   * @param character wandering character
   * @param currentLocation character's location
   */
  public wander(character: any, currentLocation: string): void {

    const directionDiceRoll = Dice.roll1d4();

    let direction: Direction = this.getDirectionFromNumber(directionDiceRoll);

    // TODO This seems unnecessary but will need to refactor the method and other dependencies
    let currentLocationDetails = this.splitLocationReference(currentLocation);

    let targetLocationDetails = this.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction);

    if (targetLocationDetails && targetLocationDetails.isLocationFree) {
      const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
      this.areaStateService.locations[currentLocation].direction = direction;
      this.areaStateService.moveCharacter(targetLocation, currentLocation);
    } else {
      // Select a direction to move
      for (let i = 1; i < 4; i++) {

        if (i = directionDiceRoll) {
          continue;
        }

        direction = this.getDirectionFromNumber(i);

        currentLocationDetails = this.splitLocationReference(currentLocation);

        targetLocationDetails = this.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction);

        if (targetLocationDetails && targetLocationDetails.isLocationFree) {
          const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
          this.areaStateService.locations[currentLocation].direction = direction;
          this.areaStateService.moveCharacter(targetLocation, currentLocation);

          return;
        }
      }
    }
    // Do nothing
    return;
  }

  public moveTowardsPlayer(character: any, characterLocation: string) {
    const playerLocation = this.areaStateService.playerLocation;
    const splitPlayerLocation = this.splitLocationReference(playerLocation);
    const furthestDirectionToPlayer = this.getFurthestDirectionToPlayer(splitPlayerLocation, this.splitLocationReference(characterLocation));
    this.areaStateService.locations[characterLocation].direction = furthestDirectionToPlayer;
  }

  public moveAwayFromPlayer() {

  }

  private getFurthestDirectionToPlayer(playerLocation: { locationY: string, locationX: number }, characterLocation: { locationY: string, locationX: number }): Direction {
    const differenceBetweenY = playerLocation.locationY.charCodeAt(0) - characterLocation.locationY.charCodeAt(0);
    const differenceBetweenX = playerLocation.locationX - characterLocation.locationX;
    // const differenceBetweenY = Math.abs(playerLocation.locationY.charCodeAt(0) - characterLocation.locationY.charCodeAt(0));
    // const differenceBetweenX = Math.abs(playerLocation.locationX - characterLocation.locationX);
    // TODO tidy this up

    if (Math.abs(differenceBetweenY) >= Math.abs(differenceBetweenX)) {
      // Move vertically
      if (differenceBetweenY >= 0) {
        return Direction.S;
      } else {
        return Direction.N;
      }
    } else {
      // Move horizontally
      if (differenceBetweenX >= 0) {
        return Direction.E;
      } else {
        return Direction.W;
      }
    }
  }

  private splitLocationReference(gridLocation: string): { locationY: string, locationX: number } {
    return {
      locationY: gridLocation[0],
      locationX: Number(gridLocation[1]),
    };
  }

  private getDirectionFromNumber(numberReference: number): Direction | null {
    switch (numberReference) {
      case 1:
        return Direction.N;
      case 2:
        return Direction.E;
      case 3:
        return Direction.S;
      case 4:
        return Direction.W;
      default:
        return null;
    }
  }

  private previousYReference(yReference: string | null): string {
    // TODO: Should really just check if it exists in grid somehow
    if (yReference === "a") {
      return null;
    }
    return String.fromCharCode(yReference.charCodeAt(0) - 1);
  }

  private nextYReference(yReference: string): string {
    if (yReference === "g") {
      return null;
    }
    return String.fromCharCode(yReference.charCodeAt(0) + 1);
  }

  private previousXReference(xReference: number): number {
    if (xReference === 1) {
      return null;
    }
    return xReference - 1;
  }

  private nextXReference(xReference: number): number {
    if (xReference === 7) {
      return null;
    }
    return xReference + 1;
  }
}
