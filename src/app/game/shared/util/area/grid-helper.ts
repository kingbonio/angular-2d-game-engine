import defaults from "../../../../shared/defaults";
import { Direction, FloorStyle, ElementClass, ObjectType } from "../../enums";
import { Character } from "../../../character-classes/character";
import { ILocationData, ILocation } from "../../interfaces";
import { IGridReferences } from "../../../area/interfaces";
import { IGridData } from "./../../../area/interfaces";
import { LootBag } from "../../../area/grid-object-classes/loot-bag";

export class GridHelper {

      constructor() { }

      public static isTargetLocationOutOfBounds(targetLocation: string): boolean {
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

      /**
       * Removes the element from the grid and adds effects to the location and any loot dropped
       * @param character The character we want to remove
       * @param gridLocation The location to remove the character from and update area effects
       * @param locations The list of locations from Area State Service
       */
      public static decomposeCharacter(character: Character, gridLocation: string, locations: IGridReferences) {

            if (locations[gridLocation].element.type === ElementClass.enemy || locations[gridLocation].element.type === ElementClass.npc) {
                  const targetLocation = locations[gridLocation];

                  const targetElement: Character = targetLocation.element;

                  // Lay down the blood floor style
                  targetLocation.floorStyle = FloorStyle.blood;

                  // Drop a loot bag if there is one
                  if (!targetElement.hasNoLoot ) {
                        if (targetLocation.groundItem && targetLocation.groundItem.objectType === ObjectType.lootBag) {
                              targetLocation.groundItem.addLoot(targetElement.inventoryLocations);
                        } else {
                              targetLocation.groundItem = new LootBag(targetElement.inventoryLocations);
                        }
                  }

                  // Remove the element from the location
                  targetLocation.element = null;
            }
      }

      public static previousYReference(yReference: string | null): string {
            return String.fromCharCode(yReference.charCodeAt(0) - 1);
      }

      public static nextYReference(yReference: string): string {
            return String.fromCharCode(yReference.charCodeAt(0) + 1);
      }

      public static previousXReference(xReference: number): number {
            return xReference - 1;
      }

      public static nextXReference(xReference: number): number {
            return xReference + 1;
      }


      public static getNumberFromYCoordinate(coordinate: string): number {

            // a will always equal 1
            if (coordinate === "a") {
                  return 1;
            }

            // Set the starting number
            let numberCoordinate = 2;

            // Loop until the newCoordinate matches the difference of the source coordinate accounting for ascii starting number
            while (numberCoordinate !== ((coordinate.charCodeAt(0) + 1) - "a".charCodeAt(0))) {
                  numberCoordinate++;

                  // Infinite loop insurance
                  if (numberCoordinate > 100) {
                        break;
                  }
            }

            return numberCoordinate;
      }

      public static getDirectionFromNumber(numberReference: number): Direction | null {
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

      public static getNumberFromDirection(direction: Direction): number | null {
            switch (direction) {
                  case Direction.N:
                        return 1;
                  case Direction.E:
                        return 2;
                  case Direction.S:
                        return 3;
                  case Direction.W:
                        return 4;
                  default:
                        return null;
            }
      }

      public static isTargetFacingSource(target: Character, sourceDirection: Direction): boolean {
            if (this.getOppositeDirection(target.direction) === sourceDirection) {
                  return true;
            } else {
                  return false;
            }
      }

      public static getOppositeDirection(direction: Direction): Direction | null {
            switch (direction) {
                  case Direction.N:
                        return Direction.S;
                  case Direction.E:
                        return Direction.W;
                  case Direction.S:
                        return Direction.N;
                  case Direction.W:
                        return Direction.E;
                  default:
                        return null;
            }
      }


      public static getDirectionToFace(direction: Direction) {
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

      public static isTargetLocationAreaExit(currentLocation: string, targetLocation: string, locations: any): boolean {
            for (const exit in defaults.areaExitDestinations) {
                  if (defaults.areaExitDestinations.hasOwnProperty(exit) && targetLocation === defaults.areaExitDestinations[exit]) {
                        return !!locations[currentLocation].areaExit;
                  }
            }

            return false;
      }

      // TODO Maybe update this location interface/enum
      // TODO Look into direction being used from the service
      // TODO Could refactor this switch statement
      // tslint:disable-next-line:max-line-length
      public static getNextLocation(locationY: string, locationX: number, direction: Direction, locations: any): ILocationData | null {

            // Attempt movement
            let newLocationY;
            let newLocationX;
            let isTargetLocationAreaExit;
            let isLocationFree;
            switch (direction) {
                  case Direction.N:
                        newLocationY = GridHelper.nextYReference(locationY);
                        newLocationX = locationX;
                        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX, locations);
                        isLocationFree = (!isTargetLocationAreaExit && !GridHelper.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                              (locations[newLocationY + newLocationX] && !locations[newLocationY + newLocationX].element) :
                              false;
                        return {
                              locationY: newLocationY,
                              locationX: newLocationX,
                              isTargetAreaExit: isTargetLocationAreaExit,
                              isLocationFree: isLocationFree,
                        };
                  case Direction.E:
                        newLocationX = GridHelper.nextXReference(locationX);
                        newLocationY = locationY;
                        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX, locations);
                        isLocationFree = (!isTargetLocationAreaExit && !GridHelper.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                              (locations[newLocationY + newLocationX] && !locations[newLocationY + newLocationX].element) :
                              false;
                        return {
                              locationY: newLocationY,
                              locationX: newLocationX,
                              isTargetAreaExit: isTargetLocationAreaExit,
                              isLocationFree: isLocationFree,
                        };
                  case Direction.S:
                        newLocationY = GridHelper.previousYReference(locationY);
                        newLocationX = locationX;
                        // Make sure the location isn't off the edge of the grid and get new reference
                        // TODO This may need tidying up
                        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX, locations);
                        isLocationFree = (!isTargetLocationAreaExit && !GridHelper.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                              (locations[newLocationY + newLocationX] && !locations[newLocationY + newLocationX].element) :
                              false;
                        return {
                              locationY: newLocationY,
                              locationX: newLocationX,
                              isTargetAreaExit: isTargetLocationAreaExit,
                              isLocationFree: isLocationFree,
                        };
                        return null;
                  case Direction.W:
                        newLocationX = GridHelper.previousXReference(locationX);
                        newLocationY = locationY;
                        isTargetLocationAreaExit = this.isTargetLocationAreaExit(locationY + locationX, newLocationY + newLocationX, locations);
                        isLocationFree = (!isTargetLocationAreaExit && !GridHelper.isTargetLocationOutOfBounds(newLocationY + newLocationX)) ?
                              (locations[newLocationY + newLocationX] && !locations[newLocationY + newLocationX].element) :
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
}
