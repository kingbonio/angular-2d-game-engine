import defaults from "../../../../shared/defaults";
import { Direction, FloorStyle, ElementClass, ObjectType } from "../../enums";
import { Character } from "../../../character-classes/character";
import { ILocationData, ILocation } from "../../interfaces";
import { IGridReferences, IAreaElement } from "../../../area/interfaces";
import { IGridData } from "./../../../area/interfaces";
import { LootBag } from "../../../area/grid-object-classes/loot-bag";
import { IAreaExits } from "../../../../game-config/interfaces";
import { Enemy, NPC } from "../../../character-classes";
import { Player } from "../../../character-classes/player";
import { GridObject } from "../../../area/grid-object-classes/grid-object";

export class GridHelper {

    constructor() { }

    /**
     * Adds any exits to the locations object provided
     *
     * @param {IAreaExits} areaExits The exits we're adding
     * @param {IGridReferences} locations The locations we're applying the exits too
     */
    public static addExitsToGrid(areaExits: IAreaExits, locations: IGridReferences): void {
        if (areaExits.north) {
            locations[defaults.areaExitLocations.northExit].areaExit = areaExits.north;
        }
        if (areaExits.east) {
            locations[defaults.areaExitLocations.eastExit].areaExit = areaExits.east;
        }
        if (areaExits.south) {
            locations[defaults.areaExitLocations.southExit].areaExit = areaExits.south;
        }
        if (areaExits.west) {
            locations[defaults.areaExitLocations.westExit].areaExit = areaExits.west;
        }
    }

    /**
     * Updates the locations object with the elements passed in
     *
     * @param {IAreaElement[]} elements The list of area elements to be added
     * @param {IGridReferences} locations The locations we're applying the exits too
     */
    public static addElementsToGrid(elements: IAreaElement[], locations: IGridReferences): void {
        elements.forEach(element => {

            // Check element's preferred grid reference and attempt to add it there
            const gridReference = element.startingPositionY + element.startingPositionX;
            if (!locations[gridReference].element) {

                // We want to create instances of each character in the config
                switch (element.type) {
                    case ElementClass.enemy:
                        locations[gridReference].element = new Enemy(element.elementProperties);
                        break;
                    case ElementClass.player:
                        locations[gridReference].element = new Player(element.elementProperties);
                        break;
                    case ElementClass.npc:
                        locations[gridReference].element = new NPC(element.elementProperties);
                        break;
                    case ElementClass.object:
                        locations[gridReference].element = new GridObject(element.elementProperties);
                        break;
                    default:
                        locations[gridReference].element = element;
                }
            } else {
                // TODO: Move them to another position, up to x amount (need to block overcrowding)
            }
        });
    }

    /**
     * Determines if the location is outside of the available grid area
     *
     * @param {string} targetLocation The location we're checking
     *
     * @returns {boolean}
     */
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
     *
     * @param {string} gridLocation The location to remove the character from and update area effects
     * @param {IGridReferences} locations The locations object we're altering
     */
    public static decomposeCharacter(gridLocation: string, locations: IGridReferences): void {

        if (locations[gridLocation].element.type === ElementClass.enemy || locations[gridLocation].element.type === ElementClass.npc) {
            const targetLocation = locations[gridLocation];

            const targetElement: Character = targetLocation.element;

            // Lay down the blood floor style
            targetLocation.floorStyle = FloorStyle.blood;

            // Drop a loot bag if there is one
            if (!targetElement.hasNoLoot) {
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

    /**
     * Gets the Y reference of the location below the given reference
     *
     * @param {string} yReference The starting reference
     *
     * @returns {string}
     */
    public static previousYReference(yReference: string): string {
        return String.fromCharCode(yReference.charCodeAt(0) - 1);
    }

    /**
     * Gets the Y reference of the location above the given reference
     *
     * @param {string} yReference The starting reference
     *
     * @returns {string}
     */
    public static nextYReference(yReference: string): string {
        return String.fromCharCode(yReference.charCodeAt(0) + 1);
    }

    /**
     * Gets the X reference of the location to the left of the given reference
     *
     * @param {number} xReference The starting reference
     *
     * @returns {number}
     */
    public static previousXReference(xReference: number): number {
        return xReference - 1;
    }

    /**
     * Gets the X reference of the location to the right of the given reference
     *
     * @param {number} xReference The starting reference
     *
     * @returns {number}
     */
    public static nextXReference(xReference: number): number {
        return xReference + 1;
    }

    /**
     * Gets the equivalent number for a letter used in a Y coordinate
     *
     * @param {string} coordinate The letter for the Y coordinate
     *
     * @returns {number}
     */
    public static getNumberFromYCoordinate(coordinate: string): number {

        // "a" will always equal 1
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

    /**
     * Gets the equivalent direction for the number provided
     *
     * @param {number} numberReference The number we want the direction for
     *
     * @returns {Direction|null}
     */
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

    /**
     * Gets the equivalent number for the direction provided
     *
     * @param {Direction} numberReference The direction we want the number for
     *
     * @returns {number|null}
     */
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

    /**
     * Determines if the target character is facing the opposite to the direction given
     *
     * @param {Character} target The character whose facing direction we're checking
     * @param {Direction} sourceDirection The direction the character is potentially being viewed from
     *
     * @returns {boolean}
     */
    public static isTargetFacingSource(target: Character, sourceDirection: Direction): boolean {
        if (this.getOppositeDirection(target.direction) === sourceDirection) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the direction opposite to the one given
     *
     * @param {Direction} direction The original direction
     *
     * @returns {Direction|null}
     */
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

    /**
     * Returns the long name of the direction given
     *
     * @param {Direction} direction The direction enum
     *
     * @returns {string|null}
     */
    public static getLongDirectionName(direction: Direction): string | null {
        switch (direction) {
            case Direction.N:
                return "northExit";
            case Direction.E:
                return "eastExit";
            case Direction.S:
                return "southExit";
            case Direction.W:
                return "westExit";
            default:

                return null;
        }
    }

    /**
     * Determines if the target location contains an area exit
     *
     * @param {string} currentLocation The starting location we're looking from
     * @param {string} targetLocation The location we're trying to get to
     * @param {IGridReferences} locations The locations object we're checking
     *
     * @returns {boolean}
     */
    public static isTargetLocationAreaExit(currentLocation: string, targetLocation: string, locations: IGridReferences): boolean {
        for (const exit in defaults.areaExitDestinations) {
            if (defaults.areaExitDestinations.hasOwnProperty(exit) && targetLocation === defaults.areaExitDestinations[exit]) {

                return !!locations[currentLocation].areaExit;
            }
        }

        return false;
    }

    /**
     * Gets the data for the next location the in the direction given
     *
     * @param {string} locationY The Y reference of the starting location
     * @param {number} locationX The X reference of the starting location
     * @param {Direction} direction The direction we're getting data on the next location for
     * @param {IGridReferences} locations The locations object we're checking through
     */
    public static getNextLocation(locationY: string, locationX: number, direction: Direction, locations: IGridReferences): ILocationData | null {

        // TODO Look into direction being used from the service
        // TODO Could refactor this switch statement

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
