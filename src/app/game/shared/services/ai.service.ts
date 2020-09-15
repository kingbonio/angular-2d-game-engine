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
    // TODO This may need a more specific flag
    // We don't want to perform AI actions if loading game
    if (!this.gameStateService.gamePaused &&
      !this.areaStateService.loadingArea &&
      !this.areaStateService.loadingSavedGame) {
      this.actionTriggerHandler(true);
    }

    });
    this.timerService.counter.subscribe(value => {
    // TODO This may need a more specific flag
    // We don't want to perform AI actions if loading game
    if (!this.gameStateService.battleMode &&
      !this.gameStateService.gamePaused &&
      !this.areaStateService.loadingArea &&
      !this.areaStateService.loadingSavedGame) {
      this.actionTriggerHandler(false);
    }
    });
  }

  // TODO Change this parameter
  public actionTriggerHandler(userInput: boolean) {

    // if (userInput && this.playerStateService.playerGridLocation && this.playerStateService.playerGridLocation.element.isMovingForwards) {
    //   return;
    // }


    const characters: { character: Character, gridLocation: string }[] = this.areaStateService.getCharactersOnGrid();
    characters.forEach(({ character, gridLocation }) => {

    if (userInput && this.gameStateService.battleMode) {

      // Only act in this way if is user input in battle mode
      if (character.isPaused) {
        character.wait();
      } else {
        this.action(character, gridLocation);
        character.resetPauseCounter();
      }
    } else if (!userInput && !this.gameStateService.battleMode) {

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

  // TODO types
  public action(character: any, gridLocation: string) {
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

        // TODO Maybe this would be better to approach the location anyway
        // If we can't get there there's no point in trying
        if (!this.areaStateService.isLocationFree(character.startingTargetLocation)) {

        if (gridLocation !== character.startingTargetLocation) {

          // Ranmdoly move if target cannot be gotten to
          if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
            this.movement.wander(character, gridLocation);
          }
        } else {
          character.direction = character.startingDirection;
        }

        // Maybe update state
        return;
        }

        // If we're already there don't do anything
        if (gridLocation === character.startingTargetLocation) {
        character.currentState = CharacterState.still;

        return;
        }

        if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
        this.movement.moveTowardsLocation(character, gridLocation, character.startingTargetLocation);
        }

        break;
      case CharacterState.patrolling:
        if (!this.areaStateService.locations[gridLocation].element.isMovingForwards) {
        const newLocation = this.movement.walkRoute(character, gridLocation);

        if ((character.type === ElementClass.enemy || character.currentState === CharacterState.hunting) &&
          this.isPlayerInSight(character, newLocation.locationY + newLocation.locationX)) {
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
        // this.movement.returnToStartingPosition(character, gridLocation, character.startingLocation);
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

    // this.isPlayerInSight(character, gridLocation);
    }
  }

  private startHunting(character: Character) {
    character.currentState = CharacterState.hunting;
    character.currentHuntingDuration = 0;

    this.areaStateService.addCharacterToHuntingList(character);
  }

  private stopHunting(character: Character) {
    character.currentHuntingDuration = 0;

    this.areaStateService.removeCharacterFromHuntingList(character);
  }

  private isPlayerInSight(character: Character, gridLocation: string): boolean {
    if (this.equipmentManagerService.activeBuff && this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.invisibility) {
    return false;
    }

    const viewAreaLocations = this.movement.getViewAreaLocations(defaults.enemyConfig.viewDistance, character.direction, gridLocation);

    // We want to know if we can find the player in the given locations, return true if found
    return !!viewAreaLocations.find(location => {
    return (location === this.playerStateService.locationY + this.playerStateService.locationX);
    // return (!this.movement.isTargetLocationOutOfBounds(location) &&
    //   this.areaStateService.locations[location].element &&
    //   this.areaStateService.locations[location].element.type === ElementClass.player);
    }, this);
  }

  private huntPlayer(character: Character, gridLocation: string) {
    const playerIsInvisible = (this.equipmentManagerService.activeBuff && this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.invisibility);
    let targetLocation;

    if (playerIsInvisible) {
    targetLocation = this.areaStateService.splitLocationReference(this.playerStateService.lastKnownLocation);
    } else {
    targetLocation = this.areaStateService.splitLocationReference(this.areaStateService.playerLocation);
    }

    // Head towards player and attack if next to player, otherwise move towards the player
    if (this.areaStateService.isCharacterNextToPlayer(gridLocation)) {
    const characterLocation = this.areaStateService.splitLocationReference(gridLocation);
    const directionToPlayer = this.movement.getDirectionWithRespectToLocation(targetLocation, characterLocation, true);

    character.direction = directionToPlayer;

    if (playerIsInvisible) {

      // Do nothing
    } else {

      // // We only want to attack if the player isn't already moving
      // if (!this.areaStateService.locations[targetLocation].isMovingForwards) {
        character.attack();
        this.playerStateService.receiveAttack(character);
      // }
    }
    } else {

    // Character needs to get closer to attack
    if (playerIsInvisible) {

      // TODO This is awful
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
