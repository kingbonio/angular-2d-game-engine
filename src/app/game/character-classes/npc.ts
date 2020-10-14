import { UserInteractionTypes } from "../../shared/enums";
import { IArmourSlots, IInventoryItem, IWeaponSlots } from "../item/interfaces";
import { CharacterState, Direction, ElementClass } from "../shared/enums";
import { ILocation } from "../shared/interfaces";
import { Character } from "./character";

export class NPC extends Character {
    public armour: IArmourSlots;
    public attackPauseDuration: number;
    public baseDamage: number;
    public currentHp: number;
    public currentHuntingDuration: number;
    public currentPathToDestination: any[];
    public currentPositionInRoute: number;
    public currentState: CharacterState;
    public direction: Direction;
    public directionsForPatrol: Direction[];
    public id: string;
    public imageFileName: string;
    public isAttacking: boolean;
    public isGuarding: boolean;
    public isMovingForwards: boolean;
    public isReceivingAttack: boolean;
    public loot: IInventoryItem[] = [];
    public lowHealthThreshold: number;
    public maxHp: number;
    public maxHuntingDuration: number;
    public name: string;
    public pathfindingDestination: ILocation;
    public pauseCounter: number;
    public sleepResponse: string;
    public speechResponse: string;
    public startingDirection: Direction;
    public startingLocation: string;
    public startingState: CharacterState;
    public startingTargetLocation: string;
    public type = ElementClass.npc;
    public weapons: IWeaponSlots;

    constructor(characterDetails: any) {
        super();
        this.armour = characterDetails.equippedArmour;
        this.attackPauseDuration = characterDetails.attackPauseDuration;
        this.baseDamage = characterDetails.baseDamage;
        this.currentHuntingDuration = (characterDetails.currentHuntingDuration === undefined) ? 0 : characterDetails.currentHuntingDuration;
        this.currentPositionInRoute = (characterDetails.currentPositionInRoute === undefined) ? 0 : characterDetails.currentPositionInRoute;
        this.currentState = characterDetails.startingState;
        this.direction = characterDetails.startingDirection;
        this.directionsForPatrol = characterDetails.directionsForPatrol;
        this.id = characterDetails.id;
        this.imageFileName = characterDetails.imageFileName;
        this.imageFileName = characterDetails.imageFileName;
        this.isAttacking = false;
        this.isGuarding = false;
        this.isMovingForwards = false;
        this.isReceivingAttack = false;
        this.loot = characterDetails.loot;
        this.lowHealthThreshold = characterDetails.lowHealthThreshold;
        this.maxHp = characterDetails.maxHp;
        this.maxHuntingDuration = characterDetails.maxHuntingDuration;
        this.name = characterDetails.name;
        this.pauseCounter = characterDetails.pauseCounter || 0;
        this.speechResponse = characterDetails.speechResponse;
        this.startingDirection = characterDetails.startingDirection;
        this.startingLocation = characterDetails.startingLocation;
        this.startingState = characterDetails.startingState;
        this.startingTargetLocation = characterDetails.startingTargetLocation;
        this.weapons = characterDetails.weapons;

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
