import { Injectable } from '@angular/core';
import { Character } from '../../character-classes/character';
import { MovementComponent } from '../util/movement/movement.component';
import { AreaStateService } from './area-state.service';
import { UserInputService } from '../../../shared/services/user-input.service';
import { Subscription } from 'rxjs/Subscription';
import { PlayerStateService } from './player-state.service';
import { BattleCalculatorService } from './battle-calculator.service';
import { IAreaElement } from '../../area/interfaces';
import { TimerService } from './timer.service';
import { GameStateService } from './game-state.service';
import { CharacterState, ElementClass, Direction } from '../enums';
import defaults from '../../../shared/defaults';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  @Injectable()

  public playerMovedSubscription: Subscription;

  constructor(
    private movement: MovementComponent,
    private areaStateService: AreaStateService,
    private userInputService: UserInputService,
    private playerStateService: PlayerStateService,
    private timerService: TimerService,
    private gameStateService: GameStateService,
  ) {
    this.userInputService.playerMoved.subscribe(data => {
      // TODO This may need a more specific flag
      // We don't want to perform AI actions if loading game
      if (!this.gameStateService.battleMode &&
        !this.gameStateService.gamePaused &&
        !this.areaStateService.loadingPreviousArea &&
        !this.areaStateService.loadingSavedGame) {
        this.actionTriggerHandler(true);
      }
    });
    this.timerService.counter.subscribe(value => {
      // TODO This may need a more specific flag
      // We don't want to perform AI actions if loading game
      if (!this.gameStateService.battleMode &&
        !this.gameStateService.gamePaused &&
        !this.areaStateService.loadingPreviousArea &&
        !this.areaStateService.loadingSavedGame) {
        this.actionTriggerHandler(false);
      }
    });
  }

  // TODO Change this parameter
  public actionTriggerHandler(playerInput: boolean) {
    const characters: { character: Character, gridLocation: string }[] = this.areaStateService.getCharactersOnGrid();
    characters.forEach(({ character, gridLocation }) => {

      if (!playerInput) {
        this.action(character, gridLocation);
      }
      if (this.isPlayerInSight(character, gridLocation)) {
        this.restartHunting(character);
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
          this.movement.wander(character, gridLocation);
          break;
        case CharacterState.patrolling:
          const newLocation = this.movement.walkRoute(character, gridLocation);

          if (this.isPlayerInSight(character, newLocation)) {
            this.restartHunting(character);
          }
          break;
        case CharacterState.returningToPosition:
          if (this.isPlayerInSight(character, gridLocation)) {
            this.restartHunting(character);
          }

          if (character.startingLocation === gridLocation) {
            character.currentState = character.startingState;
            character.currentPositionInRoute = 0;

            // Force a new action
            this.action(character, gridLocation);

          } else {
            this.movement.returnToStartingPosition(character, gridLocation, character.startingLocation);
          }
          break;
        case CharacterState.hunting:
          console.log(character.currentHuntingDuration);
          if (character.currentHuntingDuration >= character.maxHuntingDuration) {
            character.currentHuntingDuration = 0;
            character.currentState = CharacterState.returningToPosition;

            this.action(character, gridLocation);
          } else {
            character.currentHuntingDuration++;
            this.huntPlayer(character, gridLocation);
          }

          break;
        case CharacterState.afraid:
          // Character is low health and needs to escape
          this.movement.moveWithRespectToPlayer(character, gridLocation, false);
          break;
        default:
          // Do nothing
          break;
      }

      // this.isPlayerInSight(character, gridLocation);
    }
  }

  private restartHunting(character: Character) {
    character.currentState = CharacterState.hunting;
    character.currentHuntingDuration = 0;
  }

  private isPlayerInSight(character: Character, gridLocation: string): boolean {
    const viewAreaLocations = this.movement.getViewAreaLocations(defaults.enemyConfig.viewDistance, character.direction, gridLocation);

    // We want to know if we can find the player in the given locations, return true if found
    return !!viewAreaLocations.find(location => {
      return (!this.movement.isTargetLocationOutOfBounds(location) &&
        this.areaStateService.locations[location].element &&
        this.areaStateService.locations[location].element.type === ElementClass.player);
    }, this);
  }

  private huntPlayer(character: Character, gridLocation: string) {
    // Head towards player and attack if next to player, otherwise move towards the player
    if (this.areaStateService.isCharacterNextToPlayer(gridLocation)) {

      const playerLocation = this.areaStateService.splitLocationReference(this.areaStateService.playerLocation);

      const characterLocation = this.areaStateService.splitLocationReference(gridLocation);

      const directionToPlayer = this.movement.getDirectionWithRespectToPlayer(playerLocation, characterLocation, true);

      character.direction = directionToPlayer;

      this.playerStateService.receiveAttack(character);
    } else {

      // Character needs to get closer to attack
      this.movement.moveWithRespectToPlayer(character, gridLocation, true);
    }
  }



  //   if (character.isAsleep || character.isDead() || character.isPaused) {

  //     // Not expected to move
  //     if (character.isPaused) {
  //       character.isPaused = false;
  //     }
  //   } else {

  //     // Expected to perform an action
  //     if (!character.isAngry && !character.isLowHealth()) {

  //       // TODO This needs to accommodate the other states
  //       if (character.walkRoute) {
  //         this.movement.walkRoute(character, gridLocation);
  //       } else {
  //         // Untroubled character, do some wandering
  //         this.movement.wander(character, gridLocation);
  //       }

  //       character.isPaused = true;
  //     } else if (character.isAngry && !character.isLowHealth()) {

  //       // Head towards player and attack if next to player, otherwise move towards the player
  //       if (this.areaStateService.isCharacterNextToPlayer(gridLocation)) {

  //         const playerLocation = this.areaStateService.splitLocationReference(this.areaStateService.playerLocation);

  //         const characterLocation = this.areaStateService.splitLocationReference(gridLocation);

  //         const directionToPlayer = this.movement.getDirectionWithRespectToPlayer(playerLocation, characterLocation, true);

  //         character.direction = directionToPlayer;

  //         this.playerStateService.receiveAttack(character);
  //       } else {

  //         // Character needs to get closer to attack
  //         this.movement.moveWithRespectToPlayer(character, gridLocation, true);
  //       }
  //     } else {

  //       // Character is low health and needs to escape
  //       this.movement.moveWithRespectToPlayer(character, gridLocation, false);

  //       // Maybe move these to a response method on character
  //       character.angry = false;
  //     }

  //     character.isPaused = true;
  //   }

}
