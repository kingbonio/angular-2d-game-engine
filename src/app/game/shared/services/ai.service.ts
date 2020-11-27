import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import defaults from '../../../shared/defaults';
import { UserInputService } from '../../../shared/services/user-input.service';
import { Character } from '../../character-classes/character';
import { PotionEffectType } from '../../item/enums/potion-effect-type';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { CharacterState, ElementClass } from '../enums';
import { MovementComponent } from '../util/movement/movement.component';
import { AreaStateService } from './area-state.service';
import { GameStateService } from './game-state.service';
import { PlayerStateService } from './player-state.service';
import { TimerService } from './timer.service';

@Injectable({
    providedIn: 'root'
})
export class AiService {
    @Injectable()

    public playerMovedSubscription: Subscription;

    constructor(
        private movement: MovementComponent,
        private areaStateService: AreaStateService,
        private equipmentManagerService: EquipmentManagerService,
        private userInputService: UserInputService,
        private playerStateService: PlayerStateService,
        private timerService: TimerService,
        private gameStateService: GameStateService,
    ) {
        this.userInputService.playerMoved.subscribe(data => {

            // We don't want to perform AI actions if loading game
            if (!this.gameStateService.gamePaused &&
                !this.gameStateService.gameEnd &&
                !this.areaStateService.loadingArea &&
                !this.areaStateService.loadingSavedGame) {
                this.actionTriggerHandler(true);
            }

        });
        this.timerService.counter.subscribe(value => {

            // We don't want to perform AI actions if loading game
            if (!this.gameStateService.battleMode &&
                !this.gameStateService.gameEnd &&
                !this.gameStateService.gamePaused &&
                !this.areaStateService.loadingArea &&
                !this.areaStateService.loadingSavedGame) {
                this.actionTriggerHandler(false);
            }
        });
    }

    /**
     * Updates and forces action on each character on screen if not paused
     *
     * @param {boolean} isUserInput Used to determine if from keyboard input or not
     */
    public actionTriggerHandler(isUserInput: boolean): void {

        const characters: { character: Character, gridLocation: string }[] = this.areaStateService.getCharactersOnGrid();
        characters.forEach(({ character, gridLocation }) => {

            if (isUserInput && this.gameStateService.battleMode) {

                // Only act in this way if is user input in battle mode
                if (character.isPaused) {
                    character.wait();
                } else {
                    this.action(character, gridLocation);
                    character.resetPauseCounter();
                }
            } else if (!isUserInput && !this.gameStateService.battleMode) {

                // Only act in this way in normal mode
                this.action(character, gridLocation);
            }

            // Either an enemy or an angry npc
            if ((character.type === ElementClass.enemy || character.currentState === CharacterState.hunting) &&
                character.currentState !== CharacterState.afraid &&
                this.isPlayerInSight(character, gridLocation)) {
                this.startHunting(character);
            }

        });
    }

    /**
     * Finite state machine handler which enacts set actions based on current state
     *
     * @param {Characte} character The unique character we're calling action on
     * @param {string} gridLocation The current location of this character
     */
    public action(character: Character, gridLocation: string): void {
        if (character) {
            switch (character.currentState) {
                case CharacterState.dead:
                    // Do nothing
                    break;
                case CharacterState.asleep:
                    // Do nothing
                    break;
                case CharacterState.still:
                    // Do nothing
                    break;
                case CharacterState.wandering:
                    if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                        this.movement.wander(character, gridLocation);
                    }

                    break;
                case CharacterState.walkingPath:

                    // If we're already there don't do anything
                    if (gridLocation === character.startingTargetLocation) {
                        character.currentState = CharacterState.still;
                        character.direction = character.startingDirection;

                        return;
                    }

                    // TODO Maybe this would be better to approach the location anyway
                    // If we can't get there there's no point in trying
                    if (!this.areaStateService.isLocationFree(character.startingTargetLocation)) {

                        // Ranmdoly move if target cannot be gotten to
                        if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                            this.movement.wander(character, gridLocation);
                        }

                        return;
                    }

                    if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                        this.movement.moveTowardsLocation(character, gridLocation, character.startingTargetLocation);
                    }

                    break;
                case CharacterState.patrolling:
                    if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                        const newLocation = this.movement.walkRoute(character, gridLocation);

                        if (character.type === ElementClass.enemy && this.isPlayerInSight(character, newLocation.locationY + newLocation.locationX)) {
                            this.startHunting(character);
                        }
                    }
                    break;
                case CharacterState.returningToPosition:
                    if (character.startingLocation === gridLocation) {
                        character.currentState = character.startingState;
                        character.currentPositionInRoute = 0;
                        character.direction = character.startingDirection;

                        // Force a new action
                        this.action(character, gridLocation);

                    } else {
                        if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                            this.movement.moveTowardsLocation(character, gridLocation, character.startingLocation);
                        }
                    }
                    break;
                case CharacterState.hunting:
                    if (character.currentHuntingDuration >= character.maxHuntingDuration) {

                        character.currentState = CharacterState.returningToPosition;
                        this.stopHunting(character);

                        this.action(character, gridLocation);
                    } else {
                        character.currentHuntingDuration++;
                        this.huntPlayer(character, gridLocation);
                    }

                    break;
                case CharacterState.afraid:
                    this.stopHunting(character);

                    const splitGridLocation = this.areaStateService.splitLocationReference(gridLocation);
                    const splitplayerLocation = this.areaStateService.splitLocationReference(this.areaStateService.playerLocation);

                    this.movement.moveAwayFromLocation(character, splitGridLocation, splitplayerLocation);
                    break;
                default:
                    // Do nothing
                    break;
            }
        }
    }

    /**
     * Places a character in hunting state and adds them to the list of hunting characters
     *
     * @param {Character} character The unique character we're calling action on
     */
    private startHunting(character: Character): void {
        character.currentState = CharacterState.hunting;
        character.currentHuntingDuration = 0;

        this.areaStateService.addCharacterToHuntingList(character);
    }

    /**
     * Removes the character from the hunting list
     *
     * @param {Character} character The unique character we're calling action on
     */
    private stopHunting(character: Character) {
        character.currentHuntingDuration = 0;

        this.areaStateService.removeCharacterFromHuntingList(character);
    }

    /**
     * Determines if the player is in the visual range of the character
     *
     * @param {Character} character The unique character we're calling action on
     * @param {string} gridLocation The current location of the character
     */
    private isPlayerInSight(character: Character, gridLocation: string): boolean {
        if (this.equipmentManagerService.activeBuff && this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.invisibility) {
            return false;
        }

        const viewAreaLocations = this.movement.getViewAreaLocations(defaults.enemyProperties.viewDistance, character.direction, gridLocation);

        // We want to know if we can find the player in the given locations, return true if found
        return !!viewAreaLocations.find(location => {

            return (location === this.playerStateService.locationY + this.playerStateService.locationX);
        }, this);
    }

    /**
     * Determines the direction of the character or last known location of the character to travel towards
     *
     * @param {Character} character The unique character we're calling action on
     * @param {string} gridLocation The current location of the character
     */
    private huntPlayer(character: Character, gridLocation: string) {
        const playerIsInvisible = (this.equipmentManagerService.activeBuff && this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.invisibility);
        let targetLocation;

        if (playerIsInvisible) {
            targetLocation = this.areaStateService.splitLocationReference(this.playerStateService.lastKnownLocation);
        } else {
            targetLocation = this.areaStateService.splitLocationReference(this.areaStateService.playerLocation);
        }

        // Head towards player and attack if next to player, otherwise move towards the player
        if (this.areaStateService.isLocationNextToPlayer(gridLocation)) {
            const characterLocation = this.areaStateService.splitLocationReference(gridLocation);
            const directionToPlayer = this.movement.getDirectionWithRespectToLocation(targetLocation, characterLocation, true);

            character.direction = directionToPlayer;

            if (playerIsInvisible) {

                // Do nothing
            } else {

                character.attack();
                this.playerStateService.receiveAttack(character);
            }
        } else {

            // Character needs to get closer to attack
            if (playerIsInvisible) {
                targetLocation = targetLocation.locationY + targetLocation.locationX;

                if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                    this.movement.moveTowardsLocation(character, gridLocation, targetLocation);
                }
            } else {
                if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
                    this.movement.moveTowardsPlayer(character, gridLocation);
                }
            }
        }
    }
}
