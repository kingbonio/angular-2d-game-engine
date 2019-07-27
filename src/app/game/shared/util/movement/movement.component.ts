import { Component, OnInit } from '@angular/core';
import { AreaStateService } from '../../services/area-state.service';
import { Direction } from '../../enums';
import { DiceService } from '../../services/dice.service';
import { Dice } from '../dice';
import { ILocation } from '../../interfaces';
import defaults from '../../../../shared/defaults';

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
  public getNextLocation(locationY: string, locationX: number, direction: Direction): { locationY: string, locationX: number, isLocationFree: boolean, isTargetAreaExit: boolean } | null {

    // Attempt movement
    let newLocationY;
    let newLocationX;
    let isTargetLocationAreaExit;
    let isLocationFree;
    switch (direction) {
      case Direction.N:
        newLocationY = this.previousYReference(locationY);
        newLocationX = locationX;
        // Make sure the location isn't off the edge of the grid and get new reference
        // TODO This may need tidying up
        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX);
        isLocationFree = (!isTargetLocationAreaExit && !this.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                          this.areaStateService.isLocationFree(newLocationY + newLocationX) :
                          false;
        return {
          locationY: newLocationY,
          locationX: newLocationX,
          isTargetAreaExit: isTargetLocationAreaExit,
          isLocationFree: isLocationFree,
        };
        return null;
      case Direction.E:
        newLocationX = this.nextXReference(locationX);
        newLocationY = locationY;
        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX);
        isLocationFree = (!isTargetLocationAreaExit && !this.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                          this.areaStateService.isLocationFree(newLocationY + newLocationX) :
                          false;
        return {
          locationY: newLocationY,
          locationX: newLocationX,
          isTargetAreaExit: isTargetLocationAreaExit,
          isLocationFree: isLocationFree,
        };
      case Direction.S:
        newLocationY = this.nextYReference(locationY);
        newLocationX = locationX;
        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX);
        isLocationFree = (!isTargetLocationAreaExit && !this.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                          this.areaStateService.isLocationFree(newLocationY + newLocationX) :
                          false;
        return {
          locationY: newLocationY,
          locationX: newLocationX,
          isTargetAreaExit: isTargetLocationAreaExit,
          isLocationFree: isLocationFree,
        };
      case Direction.W:
        newLocationX = this.previousXReference(locationX);
        newLocationY = locationY;
        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX);
        isLocationFree = (!isTargetLocationAreaExit && !this.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                          this.areaStateService.isLocationFree(newLocationY + newLocationX) :
                          false;
        return {
          locationY: newLocationY,
          locationX: newLocationX,
          isTargetAreaExit: isTargetLocationAreaExit,
          isLocationFree: isLocationFree,
        };
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
    let currentLocationDetails = this.areaStateService.splitLocationReference(currentLocation);

    let targetLocationDetails = this.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction);

    if (targetLocationDetails && targetLocationDetails.isLocationFree) {
      const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
      this.areaStateService.locations[currentLocation].element.direction = direction;
      this.areaStateService.moveCharacter(targetLocation, currentLocation);
    } else {
      // Select a direction to move
      for (let i = 1; i < 4; i++) {

        if (i === directionDiceRoll) {
          continue;
        }

        direction = this.getDirectionFromNumber(i);

        currentLocationDetails = this.areaStateService.splitLocationReference(currentLocation);

        targetLocationDetails = this.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction);

        if (targetLocationDetails && targetLocationDetails.isLocationFree) {
          const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
          this.areaStateService.locations[currentLocation].element.direction = direction;
          this.areaStateService.moveCharacter(targetLocation, currentLocation);

          return;
        }
      }
    }
    // Do nothing
    return;
  }

  /**
   * If direction is available move the chracter towards the player's location
   * @param character The character that will be moving
   * @param characterLocation The location of the character in question
   * @param moveTowardsPlayer Whether to more towards or away from player's location
   */
  public moveWithRespectToPlayer(character: any, characterLocation: string, moveTowardsPlayer: boolean) {
    const playerLocation = this.areaStateService.playerLocation;
    const splitPlayerLocation = this.areaStateService.splitLocationReference(playerLocation);
    const splitCharacterLocation = this.areaStateService.splitLocationReference(characterLocation);
    const furthestDirectionToPlayer = this.getDirectionWithRespectToPlayer(splitPlayerLocation, splitCharacterLocation, moveTowardsPlayer);
    this.areaStateService.locations[characterLocation].element.direction = furthestDirectionToPlayer;
    const targetLocationDetails = this.getNextLocation(splitCharacterLocation.locationY, splitCharacterLocation.locationX, furthestDirectionToPlayer);

    if (targetLocationDetails && targetLocationDetails.isLocationFree) {
      const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
      this.areaStateService.moveCharacter(targetLocation, characterLocation);
    }
  }

  /**
   * Returns the best direction towards or away from the player's location
   * @param playerLocation The current location of the player
   * @param characterLocation The current location of the character to move
   * @param towardsPlayer Whether to more towards or away from player's location
   */
  public getDirectionWithRespectToPlayer(playerLocation: ILocation, characterLocation: ILocation, towardsPlayer: boolean): Direction {
    const distanceData = this.areaStateService.getDistanceBetweenLocations(playerLocation, characterLocation);

    // Move vertically
    if (Math.abs(distanceData.yDistance) >= Math.abs(distanceData.xDistance)) {
      if (distanceData.yDistance >= 0) {
        return towardsPlayer ? Direction.S : Direction.N;
      } else {
        return towardsPlayer ? Direction.N : Direction.S;
      }
    } else {
      // Move horizontally
      if (distanceData.xDistance >= 0) {
        return towardsPlayer ? Direction.E : Direction.W;
      } else {
        return towardsPlayer ? Direction.W : Direction.E;
      }
    }
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
    return String.fromCharCode(yReference.charCodeAt(0) - 1);
  }

  private nextYReference(yReference: string): string {
    return String.fromCharCode(yReference.charCodeAt(0) + 1);
  }

  private previousXReference(xReference: number): number {
    return xReference - 1;
  }

  private nextXReference(xReference: number): number {
    return xReference + 1;
  }

  private isTargetLocationAreaExit(currentLocation: string, targetLocation: string): boolean {
    // if (targetLocation === defaults.mapDetails.northExit) {
    //   return !!this.areaStateService.locations[currentLocation].exitDestination;
    // }
    // if (targetLocation === defaults.mapDetails.eastExit) {
    //   return !!this.areaStateService.locations[currentLocation].exitDestination;
    // }
    // if (targetLocation === defaults.mapDetails.southExit) {
    //   return !!this.areaStateService.locations[currentLocation].exitDestination;
    // }
    // if (targetLocation === defaults.mapDetails.westExit) {
    //   return !!this.areaStateService.locations[currentLocation].exitDestination;
    // }

    for (const exit in defaults.areaExitDestinations) {
      if (defaults.areaExitDestinations.hasOwnProperty(exit) && targetLocation === defaults.areaExitDestinations[exit]) {
        return !!this.areaStateService.locations[currentLocation].exitDestination;
      }
    }

    return false;
  }

  private isTargetLocationOutOfBounds(targetLocation: string) {
    if (targetLocation.indexOf(defaults.areaOuterBoundaries.lowerYBoundary) === -1 &&
        targetLocation.indexOf(defaults.areaOuterBoundaries.upperYBoundary) === -1 &&
        targetLocation.indexOf(defaults.areaOuterBoundaries.lowerXBoundary) === -1 &&
        targetLocation.indexOf(defaults.areaOuterBoundaries.upperXBoundary) === -1
    ) {
      return false;
    } else {
      return true;
    }
  }
}
