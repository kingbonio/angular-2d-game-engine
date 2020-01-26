import { Component } from '@angular/core';
import { AreaStateService } from '../../services/area-state.service';
import { Direction } from '../../enums';
import { Dice } from '../dice';
import { ILocation, ILocationData } from '../../interfaces';
import { Character } from '../../../character-classes/character';
import { GridHelper } from '../area/grid-helper';
import { PathfindingComponent } from './pathfinding/pathfinding.component';

@Component({
  selector: 'app-movement',
  template: '',
})
export class MovementComponent {

  constructor(
    private areaStateService: AreaStateService,
    private pathfinding: PathfindingComponent,
  ) { }

  /**
   * Return the locations the character can see at any time
   * @param viewDistance How many squares out the character can see
   * @param direction Which way the character is facing
   * @param gridLocation The current location of the character
   */
  public getViewAreaLocations(viewDistance: number, direction: Direction, gridLocation: string): string[] {
    const gridReferences = [];
    const splitLocation = this.areaStateService.splitLocationReference(gridLocation);

    // TODO Only catering for 1 view distance at the moment
    let location: string;
    switch (direction) {

      case Direction.N:
        // Get first location
        location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
        gridReferences.push(location);
        // Get second location
        location = GridHelper.nextYReference(splitLocation.locationY) + splitLocation.locationX;
        gridReferences.push(location);
        // Get third location
        location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
        gridReferences.push(location);
        break;

      case Direction.E:
        // Get first location
        location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
        gridReferences.push(location);
        // Get second location
        location = splitLocation.locationY + GridHelper.nextXReference(splitLocation.locationX);
        gridReferences.push(location);
        // Get third location
        location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
        gridReferences.push(location);
        break;

      case Direction.S:
        // Get first location
        location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.nextXReference(splitLocation.locationX);
        gridReferences.push(location);
        // Get second location
        location = GridHelper.previousYReference(splitLocation.locationY) + splitLocation.locationX;
        gridReferences.push(location);
        // Get third location
        location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
        gridReferences.push(location);
        break;

      case Direction.W:
        // Get first location
        location = GridHelper.previousYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
        gridReferences.push(location);
        // Get second location
        location = splitLocation.locationY + GridHelper.previousXReference(splitLocation.locationX);
        gridReferences.push(location);
        // Get third location
        location = GridHelper.nextYReference(splitLocation.locationY) + GridHelper.previousXReference(splitLocation.locationX);
        gridReferences.push(location);
        break;

      default:
      // Do nothing
    }

    return gridReferences;
  }


  /**
   * Try a random direction then move to that location, if it's blocked, try the other 3 directions or do nothing
   * @param character wandering character
   * @param currentLocation character's location
   */
  public wander(character: any, currentLocation: string): void {

    const directionDiceRoll = Dice.roll1d4();

    let direction: Direction = GridHelper.getDirectionFromNumber(directionDiceRoll);

    // TODO This seems unnecessary but will need to refactor the method and other dependencies
    let currentLocationDetails = this.areaStateService.splitLocationReference(currentLocation);

    let targetLocationDetails = GridHelper.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction, this.areaStateService.locations);

    if (targetLocationDetails && targetLocationDetails.isLocationFree) {
      const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
      this.areaStateService.locations[currentLocation].element.direction = direction;
      this.areaStateService.repositionCharacter(targetLocation, currentLocation);
    } else {
      // Select a direction to move
      for (let i = 1; i < 4; i++) {

        if (i === directionDiceRoll) {
          continue;
        }

        direction = GridHelper.getDirectionFromNumber(i);

        currentLocationDetails = this.areaStateService.splitLocationReference(currentLocation);

        targetLocationDetails = GridHelper.getNextLocation(currentLocationDetails.locationY, currentLocationDetails.locationX, direction, this.areaStateService.locations);

        if (targetLocationDetails && targetLocationDetails.isLocationFree) {
          const targetLocation = targetLocationDetails.locationY + targetLocationDetails.locationX;
          this.areaStateService.locations[currentLocation].element.direction = direction;
          this.areaStateService.repositionCharacter(targetLocation, currentLocation);

          return;
        }
      }
    }
    // Do nothing
    return;
  }

  /**
   * Cycle through the direction of patrol for character
   * Only move if the next location is free
   * @returns the newLocation of the character
   */
  public walkRoute(character: Character, gridLocation: string): ILocationData {
    if (character.directionsForPatrol.length) {
      const routeIndex = character.currentPositionInRoute;
      const splitLocation = this.areaStateService.splitLocationReference(gridLocation);
      const direction = character.directionsForPatrol[character.currentPositionInRoute];
      const newLocation = GridHelper.getNextLocation(splitLocation.locationY, splitLocation.locationX, direction, this.areaStateService.locations);
      if (newLocation && newLocation.isLocationFree) {
        this.areaStateService.repositionCharacter(newLocation.locationY + newLocation.locationX, gridLocation);

        if (routeIndex >= (character.directionsForPatrol.length - 1)) {
          character.currentPositionInRoute = 0;
        } else {
          character.currentPositionInRoute++;
        }

        // Cycle back around if we're at the end of the route
        const previousDirection = character.currentPositionInRoute === 0 ?
          character.directionsForPatrol[character.directionsForPatrol.length - 1] :
          character.directionsForPatrol[character.currentPositionInRoute - 1];

        character.direction = previousDirection;
      } else {
        character.direction = character.directionsForPatrol[character.currentPositionInRoute];
      }

      // Character has moved to new location, return the new location data
      return newLocation;

    } else {
      return;
    }

  }

  /**
   * Moves the character towards the starting position of their patrol route
   */
  public returnToStartingPosition(character: Character, gridLocation: string, newLocation: string) {
    this.moveCharacterToLocation(character, gridLocation, newLocation, true);
  }

  /**
   * If direction is available move the chracter towards the player's location
   * @param character The character that will be moving
   * @param characterLocation The current location of the character in question
   * @param moveTowardsLocation Whether to more towards or away from target's location
   */
  public moveCharacterToLocation(character: Character, characterLocation: string, targetLocation: string, moveTowardsLocation = true) {

    const splitNewLocation: ILocation = this.areaStateService.splitLocationReference(targetLocation);
    const splitCharacterLocation: ILocation = this.areaStateService.splitLocationReference(characterLocation);

    // Get and apply the direction to face
    const furthestDirectionToPlayer = this.getDirectionWithRespectToPlayer(splitNewLocation, splitCharacterLocation, moveTowardsLocation);
    this.areaStateService.locations[characterLocation].element.direction = furthestDirectionToPlayer;
    const targetLocationDetails = GridHelper.getNextLocation(splitCharacterLocation.locationY, splitCharacterLocation.locationX, furthestDirectionToPlayer, this.areaStateService.locations);

    // If the target location is free, move into it
    if (targetLocationDetails && targetLocationDetails.isLocationFree) {
      const targetLocationCoords = targetLocationDetails.locationY + targetLocationDetails.locationX;
      this.areaStateService.repositionCharacter(targetLocationCoords, characterLocation);
    }
  }

  /**
   * Get the path to the target location and make the first step towards it
   * @param character The character that will be moving
   * @param characterLocation The current location of the character in question
   * @param targetLocation Whether to more towards or away from player's location
   */
  public moveTowardsLocation(character: Character, characterLocation: string, targetLocation: string) {

    // If we can't get there there's no point in trying
    if (!this.areaStateService.isLocationFree(targetLocation)) {
      return;
    }

    const splitCurrentLocation = this.areaStateService.splitLocationReference(characterLocation);

    const splitNewLocation = this.areaStateService.splitLocationReference(targetLocation);

    character.currentPathToDestination = this.pathfinding.getShortestPath(splitCurrentLocation, splitNewLocation, this.areaStateService.locations);

    if (!character.currentPathToDestination || !character.currentPathToDestination.length) {

      // Ranmdoly move if target cannot be gotten to
      this.wander(character, characterLocation);
      return;
    }

    // Get the next target location
    const nextPathfindingLocation = character.currentPathToDestination[0];

    // Walk the path
    this.moveCharacterToLocation(character, characterLocation, nextPathfindingLocation, true);
  }

/**
 * Get the path to the player location and make the first step towards it
 * @param character The character that will be moving
 * @param characterLocation The current location of the character in question
 */
  public moveTowardsPlayer(character: Character, characterLocation: string) {
    const playerLocation = this.areaStateService.playerLocation;

    const splitCurrentLocation = this.areaStateService.splitLocationReference(characterLocation);

    const splitNewLocation = this.areaStateService.splitLocationReference(playerLocation);

    character.currentPathToDestination = this.pathfinding.getShortestPath(splitCurrentLocation, splitNewLocation, this.areaStateService.locations);

    if (!character.currentPathToDestination || !character.currentPathToDestination.length) {
      return;
    }

    // Get the next target location
    const nextPathfindingLocation = character.currentPathToDestination[0];

    this.moveTowardsLocation(character, characterLocation, nextPathfindingLocation);
  }

  /**
   * Returns the best direction towards or away from the player's location
   * @param playerLocation The current location of the player
   * @param characterLocation The current location of the character to move
   * @param towardsPlayer Whether to more towards or away from player's location
   */
  public getDirectionWithRespectToPlayer(playerLocation: ILocation, characterLocation: ILocation, towardsPlayer: boolean): Direction {
    const distanceData = this.areaStateService.getDistanceBetweenLocations(playerLocation, characterLocation);

    // Calculate which direction is furthest
    if (Math.abs(distanceData.yDistance) >= Math.abs(distanceData.xDistance)) {
      // Move vertically
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


}
