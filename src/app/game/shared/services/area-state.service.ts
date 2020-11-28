import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAreaElement, IGridReferences } from '../../area/interfaces';
import { Character } from '../../character-classes/character';
import { ElementClass, Direction } from '../enums';
import { IAreaStateData, ILocation } from '../interfaces';
import locationsDefaults from '../models/locations';
import { AreaConfigProviderService } from './area-config-provider.service';
import defaults from '../../../shared/defaults';
import { GridHelper } from '../util/area/grid-helper';
import { AreaExitStatus } from '../../area/enums';
import { Helper } from '../../../shared/util/helper';
import { IAreaConfig, IAreaData } from '../../../game-config/interfaces';

@Injectable()
export class AreaStateService {

    public currentArea: number;
    public newArea: number;
    public loadingArea = false;
    public loadingExistingArea = false;
    public loadingSavedGame = false;
    public locationKeys: any;
    public locations: IGridReferences;
    public areaConfig: IAreaConfig;
    public previousPlayerLocation: string;
    public huntingList = [];

    public areaChange: BehaviorSubject<number>;
    public areaReady: BehaviorSubject<number>;

    constructor(
        private areaConfigProviderService: AreaConfigProviderService,
    ) {
        this.setDefaults();

        this.areaChange = new BehaviorSubject(1);
        this.areaReady = new BehaviorSubject(1);
    }

    /**
     * Returns the location reference for the player's current position
     *
     * @returns {string}
     */
    get playerLocation(): string {

        // TODO Potentially rewrite this
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
     * Removes character from local hunting list array
     *
     * @param {Character} character The character we'll be removing
     */
    public removeCharacterFromHuntingList(character: Character): void {

        const index = this.huntingList.indexOf(character.id);

        if (index !== -1) {

            // Remove the item from the hunting list
            this.huntingList.splice(index, 1);
        }
    }

    /**
     * Adds character to local hunting list array
     *
     * @param {Character} character The character we'll be adding
     */
    public addCharacterToHuntingList(character: Character): void {

        if (this.huntingList.indexOf(character.id) === -1) {

            // Add the character to the hunting list
            this.huntingList.push(character.id);
        }
    }

    /**
     * Returns a list of all characters and their locations in the locations grid
     *
     * @returns {{ Character, string }[]}
     */
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

    /**
     * Determines if the character is in a horizontal or vertical grid location adjacent to the player
     *
     * @param {string} gridLocation The reference for the location we're checking against
     *
     * @returns {boolean}
     */
    public isLocationNextToPlayer(gridLocation: string): boolean {
        const playerCoordinates = this.splitLocationReference(this.playerLocation);
        const locationCoordinates = this.splitLocationReference(gridLocation);
        const distanceFromPlayerCoordinates = this.getDistanceBetweenLocations(playerCoordinates, locationCoordinates);

        // Positive differences should be 0 and 1
        if (Math.abs(distanceFromPlayerCoordinates.xDistance) + Math.abs(distanceFromPlayerCoordinates.yDistance) === 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns a positive or negative value for both x and y distances to target location
     *
     * @param {ILocation} currentLocation The location we want the distance from
     * @param {ILocation} targetLocation The location we want the distance to
     *
     * @returns {{ number, number }}
     */
    public getDistanceBetweenLocations(currentLocation: ILocation, targetLocation: ILocation): { yDistance: number, xDistance: number } {
        const differenceBetweenY = targetLocation.locationY.charCodeAt(0) - currentLocation.locationY.charCodeAt(0);
        const differenceBetweenX = currentLocation.locationX - targetLocation.locationX;

        return { yDistance: differenceBetweenY, xDistance: differenceBetweenX };
    }

    /**
     * Checks whether the location on the grid exists and doesn't have an element already in it
     *
     * @param {string} location The grid reference for the location
     *
     * @returns {boolean}
     */
    public isLocationFree(location: string): boolean {
        return (this.locations[location] && !this.locations[location].element);
    }

    /**
     * Moves the element in the first location to the second location overwriting any existing element there
     *
     * @param {string} newLocation The target location we're moving element to
     * @param {string} currentLocation The current location we're moving element from
     */
    public repositionGridElement(newLocation: string, currentLocation: string): void {
        this.locations[newLocation].element = this.locations[currentLocation].element;
        this.locations[currentLocation].element = null;
    }

    /**
     * Moves the player from its current location to the new one given
     *
     * @param {string} newLocation The location we want to move the player to
     */
    public movePlayer(newLocation: string): void {
        if (newLocation !== this.playerLocation) {

            this.repositionGridElement(newLocation, this.playerLocation);
        }
    }

    /**
     * Deletes an element from a given location
     *
     * @param {string} location The reference for the location we're deleting from
     */
    public removeElementFromArea(location: string): void {
        this.locations[location].element = null;
    }

    /**
     * Provides an object that has individual x and y corrdinates
     *
     * @param {ILocation} gridLocation The reference for the location we're splitting the coordinates for
     *
     * @returns {ILocation}
     */
    public splitLocationReference(gridLocation: string): ILocation {
        return {
            locationY: gridLocation[0],
            locationX: Number(gridLocation[1]),
        };
    }

    /**
     * Sends an event to say the area is being changed
     */
    public notifyAreaChange(): void {
        this.areaReady.next(this.newArea);
    }

    /**
     * Backs up current location state, loads the new one and emits event to notify listeners
     *
     * @param {number} newAreaReference The target area to pull data for
     */
    public loadNewArea(newAreaReference: number): void {
        this.loadingArea = true;

        const currentAreaData: IAreaData = {
            config: this.areaConfig,
            locations: this.locations,
        };

        // Back up current state
        this.saveCurrentAreaData(this.currentArea, currentAreaData);

        // Save the new area reference
        this.newArea = newAreaReference;

        this.previousPlayerLocation = this.playerLocation;

        const targetAreaData = this.getAreaData(newAreaReference);
        if (targetAreaData) {
            this.loadingExistingArea = true;

            // Reset the locations to be the stored data
            this.locations = targetAreaData.locations;
        } else {

            // Reset the locations to blank
            this.locations = Helper.cloneObject(locationsDefaults as IGridReferences);
        }

        this.areaChange.next(newAreaReference ? newAreaReference : this.currentArea);

        // Update the location
        this.currentArea = this.newArea;
        this.newArea = null;
    }

    /**
     * Emits events to trigger the loading of a saved area
     *
     * @param {IAreaStateData} savedState The area state data we want to load from
     */
    public loadFromSaveGame(savedState: IAreaStateData): void {
        this.loadingSavedGame = true;

        this.areaChange.next(savedState.currentArea);
        this.areaReady.next(savedState.currentArea);
    }

    /**
     * Opens the opposite door in the target area, opposite the exit location given, writing the area state to storage after
     *
     * @param {number} destination The reference for the area on the opposite side of the door
     * @param {Direction} exitDirection The direction towards to target area
     */
    public openSameAreaExitInNextArea(destination: number, exitDirection: Direction): void {

        // Attempt to get the existing area state data
        const nextAreaData = this.getAreaData(destination);

        let nextAreaLocations = nextAreaData ? nextAreaData.locations : null;
        let nextAreaConfig = nextAreaData ? nextAreaData.config : null;

        // If we don't have existing data, create new data
        if (!nextAreaLocations) {
            const nextAreaExits = this.areaConfigProviderService.getAreaExits(destination);
            nextAreaConfig = this.areaConfigProviderService.getAreaConfig(destination);

            // Create a fresh locations object
            nextAreaLocations = Helper.cloneObject(locationsDefaults as IGridReferences);

            // Add all the elements and exits to the new locations
            GridHelper.addElementsToGrid(nextAreaConfig.areaElements, nextAreaLocations);
            GridHelper.addExitsToGrid(nextAreaExits, nextAreaLocations);
        }

        const locationOfAreaExit = defaults.areaExitLocations[GridHelper.getLongDirectionName(exitDirection)];

        if (nextAreaLocations[locationOfAreaExit].areaExit) {
            nextAreaLocations[locationOfAreaExit].areaExit.status = AreaExitStatus.open;
        }

        const areaData: IAreaData = {
            config: nextAreaConfig,
            locations: nextAreaLocations,
        };

        this.saveAreaData(destination, areaData);
    }

    /**
     * Reset all local parameters to default
     */
    public setDefaults(): void {
        this.currentArea = 1;
        this.newArea = null;
        this.locations = Helper.cloneObject(locationsDefaults as IGridReferences);
        this.locationKeys = Object.keys;
        this.loadingArea = false;
        this.loadingExistingArea = false;
        this.loadingSavedGame = false;
        this.previousPlayerLocation = null;
        this.huntingList = [];
    }

    /**
     * Save the area locations state to storage
     *
     * @param {number} newAreaReference The reference for the area we're saving
     */
    public saveCurrentAreaData(newAreaReference: number, data: IAreaData): void {
        localStorage.setItem(newAreaReference.toString(), JSON.stringify(data));
    }

    /**
     * Saves an inactive area's locations state to storage
     *
     * @param {number} newAreaReference The reference for the area we're saving
     * @param {any} newAreaLocations The locations object to be saved
     */
    public saveAreaData(newAreaReference: number, newAreaLocations: any): void {
        localStorage.setItem(newAreaReference.toString(), JSON.stringify(newAreaLocations));
    }

    /**
     * Get the area data object
     *
     * @param areaReference The area reference
     *
     * @returns {IAreaData | null}
     */
    public getAreaData(areaReference: number): IAreaData | null {
        const stateJson = localStorage.getItem(areaReference.toString());
        if (stateJson && stateJson.length && stateJson !== "{}") {
            return JSON.parse(stateJson);
        } else {
            return null;
        }
    }

    /**
     * Returns an object with the state data for this service
     *
     * @returns {IAreaStateData}
     */
    public gatherState(): IAreaStateData {
        return {
            currentArea: this.currentArea,
            newLocation: this.newArea,
            loadingArea: this.loadingArea,
            loadingExistingArea: this.loadingExistingArea,
            locationKeys: this.locationKeys,
            locations: this.locations,
            areaConfig: this.areaConfig,
            previousPlayerLocation: this.previousPlayerLocation,
            huntingList: this.huntingList,
        };
    }

    /**
     * Applies state data to this service
     *
     * @param {IAreaStateData} newState State data to push to this service
     */
    public applyState(newState: IAreaStateData): void {
        for (const stateSetting in newState) {
            if (newState.hasOwnProperty(stateSetting)) {
                this[stateSetting] = newState[stateSetting];
            }
        }
    }
}
