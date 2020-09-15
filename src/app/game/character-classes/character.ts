import defaults from "../../shared/defaults";
import { IArmour, IInventoryItem, IWeapons } from "../item/interfaces";
import { CharacterState, Direction, ElementClass } from "../shared/enums";
import { ILocation } from "../shared/interfaces";
import inventoryLocationsDefaults from "../shared/models/inventoryLocations";
import { IInventoryReferences } from "../item/inventory/interfaces";

export class Character {
    id: string;
    name: string;
    currentHp: number;
    maxHp: number;
    isAttacking: boolean;
    isGuarding: boolean;
    isReceivingAttack: boolean;
    isMovingForwards: boolean;
    baseDamage: number;
    pauseCounter: number;
    attackPauseDuration: number;
    type: ElementClass;
    direction: Direction;
    startingDirection: Direction;
    startingLocation: string;
    directionsForPatrol: Direction[];
    startingTargetLocation: string;
    currentPositionInRoute: number;
    currentHuntingDuration: number;
    maxHuntingDuration: number;
    currentPathToDestination: any[];
    pathfindingDestination: ILocation;
    currentState: CharacterState;
    startingState: CharacterState;
    armour?: IArmour;
    weapons?: IWeapons;
    loot: IInventoryItem[];
    imageFileName: string;

    inventoryLocations: IInventoryReferences;
    locationKeys: any;

    constructor() {
        this.inventoryLocations = this.cloneInventoryLocations(inventoryLocationsDefaults);
        this.locationKeys = Object.keys;
    }

    /**
     * Returns whether the character is paused for attack
     *
     * @returns {boolean}
     */
    get isPaused(): boolean {
        return (this.pauseCounter <= this.attackPauseDuration);
    }

    /**
     * Checks to see if there are any objects in the inventory and returns false if there are any
     *
     * @returns {boolean}
     */
    get hasNoLoot(): boolean {
        let _isEmpty = true;

        for (const slot in this.inventoryLocations) {

            // Check if the key exists and the slot contains an element
            if (this.inventoryLocations.hasOwnProperty(slot) && this.inventoryLocations[slot]) {
                _isEmpty = false;
                break;
            }
        }

        return _isEmpty;
    }

    /**
     * Adds a count to the total paused time for the character
     */
    public wait(): void {
        this.pauseCounter++;
    }

    /**
     * Sets the amount of time the character's action is paused to 0
     */
    public resetPauseCounter(): void {
        this.pauseCounter = 0;
    }

    /**
     * Sets the character to guard state and sets a timer to remove this state
     */
    public guard(): void {
        this.isGuarding = true;

        // Clear the attack animation once it's played out
        setTimeout(() => {
            this.isGuarding = false;
        }, defaults.animations.guardDurationMilliseconds);
    }

    /**
     * Sets the character to attack state after an initial setTimeout
     */
    public attack(): void {
        this.isAttacking = false;

        // Allow the page to rerender before starting animation
        setTimeout(() => {
            this.isAttacking = true;
        }, 0);

        // Clear the attack animation once it's played out
        setTimeout(() => {
            this.isAttacking = false;
        }, defaults.animations.attackDurationMilliseconds);

    }

    /**
     * Sets the character to receive attack state after an initial setTimeout
     */
    public receiveAttack(): void {
        this.isReceivingAttack = false;

        // Allow the page to rerender before starting animation
        setTimeout(() => {
            this.isReceivingAttack = true;
        }, 0);

        // Clear the attack animation once it's played out
        setTimeout(() => {
            this.isReceivingAttack = false;
        }, defaults.animations.receiveAttackDurationMilliseconds);
    }

    /**
     * Sets the character to moving forward state and sets a timer to remove this state
     *
     * @param { function } finishMovementCallback
     */
    public moveForwards(finishMovementCallback: any): void {
        this.isMovingForwards = true;

        // Clear the attack animation once it's played out
        setTimeout(() => {
            this.isMovingForwards = false;
            finishMovementCallback();
        }, defaults.animations.movementDurationMilliseconds);
    }

    /**
     * Returns a cloned version of the locations object provided
     *
     * @param {IInventoryReferences} sourceInventoryLocations The locations object we are cloning
     *
     * @returns {IInventoryReferences}
     */
    public cloneInventoryLocations(sourceInventoryLocations: IInventoryReferences): IInventoryReferences {
        return JSON.parse(JSON.stringify(sourceInventoryLocations));
    }

}
