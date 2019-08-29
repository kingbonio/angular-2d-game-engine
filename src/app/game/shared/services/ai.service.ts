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
import { CharacterState } from '../enums';

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
      if (this.gameStateService.battleMode &&
          !this.gameStateService.gamePaused &&
          !this.areaStateService.loadingPreviousArea &&
          !this.areaStateService.loadingSavedGame) {
        this.actionTriggerHandler();
      }
    });
    this.timerService.counter.subscribe(value => {
      // TODO This may need a more specific flag
      // We don't want to perform AI actions if loading game
      if (!this.gameStateService.battleMode &&
          !this.gameStateService.gamePaused &&
          !this.areaStateService.loadingPreviousArea &&
          !this.areaStateService.loadingSavedGame) {
        this.actionTriggerHandler();
      }
    });
  }

  public actionTriggerHandler() {
    const characters: { gridElement: IAreaElement, gridLocation: string }[] = this.areaStateService.getCharactersOnGrid();
    characters.forEach(({ gridElement, gridLocation }) => {
      this.action(gridElement, gridLocation);
    });
  }

  // TODO types
  public action(character: any, gridLocation: string) {
    if (character) {
      console.log(character.name + " " + character.currentState);
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
          this.movement.walkRoute(character, gridLocation);
          break;
        case CharacterState.returningToPatrol:
          this.movement.returnToRouteStart(character, gridLocation);
          break;
        case CharacterState.hunting:

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
          break;
        case CharacterState.afraid:
          // Character is low health and needs to escape
          this.movement.moveWithRespectToPlayer(character, gridLocation, false);
          break;
        default:
          // Do nothing
          break;
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
  }
}
