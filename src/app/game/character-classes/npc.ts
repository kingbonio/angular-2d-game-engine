import { UserInteractionTypes } from "../../shared/enums";
import { IArmourSlots, IInventoryItem, IWeaponSlots } from "../item/interfaces";
import { CharacterState, Direction, ElementClass } from "../shared/enums";
import { ILocation } from "../shared/interfaces";
import { Character } from "./character";

export class NPC extends Character {
    public id: string;
    public type = ElementClass.npc;
    public name: string;
    public maxHp: number;
    public currentHp: number;
    public lowHealthThreshold: number;
    public imageFileName: string;
    public speechResponse: string;
    public sleepResponse: string;
    public isMovingForwards: boolean;
    public isAttacking: boolean;
    public isGuarding: boolean;
    public isReceivingAttack: boolean;
    public baseDamage: number;
    public pauseCounter: number;
    public attackPauseDuration: number;
    public direction: Direction;
    public startingDirection: Direction;
    public startingLocation: string;
    public directionsForPatrol: Direction[];
    public startingTargetLocation: string;
    public currentPositionInRoute: number;
    public currentHuntingDuration: number;
    public maxHuntingDuration: number;
    public currentPathToDestination: any[];
    public pathfindingDestination: ILocation;
    public currentState: CharacterState;
    public startingState: CharacterState;
    public armour: IArmourSlots;
    public weapons: IWeaponSlots;
    public loot: IInventoryItem[] = [];

    constructor(characterDetails: any) {
        super();
        this.id = characterDetails.id;
        this.name = characterDetails.name;
        this.imageFileName = characterDetails.imageFileName;
        this.isMovingForwards = false;
        this.isAttacking = false;
        this.isGuarding = false;
        this.isReceivingAttack = false;
        this.baseDamage = characterDetails.baseDamage;
        this.pauseCounter = characterDetails.pauseCounter || 0;
        this.attackPauseDuration = characterDetails.attackPauseDuration;
        this.speechResponse = characterDetails.speechResponse;
        this.direction = characterDetails.startingDirection;
        this.startingDirection = characterDetails.startingDirection;
        this.startingLocation = characterDetails.startingLocation;
        this.directionsForPatrol = characterDetails.directionsForPatrol;
        this.startingTargetLocation = characterDetails.startingTargetLocation;
        this.currentPositionInRoute = (characterDetails.currentPositionInRoute === undefined) ? 0 : characterDetails.currentPositionInRoute;
        this.currentHuntingDuration = (characterDetails.currentHuntingDuration === undefined) ? 0 : characterDetails.currentHuntingDuration;
        this.maxHuntingDuration = characterDetails.maxHuntingDuration;
        this.startingState = characterDetails.startingState;
        this.currentState = characterDetails.startingState;
        this.maxHp = characterDetails.maxHp;
        this.lowHealthThreshold = characterDetails.lowHealthThreshold;
        this.armour = characterDetails.equippedArmour;
        this.weapons = characterDetails.weapons;
        this.loot = characterDetails.loot;
        this.imageFileName = characterDetails.imageFileName;

        // Overwrite existing inventoryLocations if provided
        if (characterDetails.inventoryLocations) {
            this.inventoryLocations = characterDetails.inventoryLocations;
        } else if (this.loot && this.loot.length) {
            characterDetails.loot.forEach((item: IInventoryItem) => {
                for (const slot in this.inventoryLocations) {
                    if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                        this.inventoryLocations[slot] = item;
                        return;
                    }
                }
            });
        }
        this.currentHp = (characterDetails.currentHp !== undefined) ? characterDetails.currentHp : this.maxHp;
    }

    /**
     * Performs a set response to interactions on the character
     *
     * @param {UserInteractionTypes} interaction The type of interaction to react to
     * @param {Direction} directionToFace Which direction the character should face during response
     * @param {number} damage The damage taken by the character if required
     *
     * @returns {string|void}
     */
    public respond(interaction: UserInteractionTypes, directionToFace: Direction, damage?: number): string | void {
        switch (interaction) {
            case UserInteractionTypes.speak:
                if (this.currentState !== CharacterState.asleep) {
                    this.direction = directionToFace;
                    return this.speechResponse;
                } else {
                    return this.sleepResponse;
                }
            case UserInteractionTypes.attack:
                this.direction = directionToFace;
                this.currentHp -= damage;

                if (!this.isLowHealth()) {
                    this.currentState = CharacterState.hunting;
                } else {
                    this.currentState = CharacterState.afraid;
                }

                return;
        }
    }

    /**
     * Returns whether the character is below the low health threshold
     *
     * @returns {boolean}
     */
    public isLowHealth() {
        return this.currentHp < this.lowHealthThreshold;
    }

    /**
     * Returns whether the character has 0 or less health
     *
     * @returns {boolean}
     */
    public isDead(): boolean {
        return (this.currentHp <= 0);
    }

}
