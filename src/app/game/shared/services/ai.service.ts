import { Injectable } from '@angular/core';
import { Character } from '../../character-classes/character';
import { MovementComponent } from '../util/movement/movement.component';
import { AreaStateService } from './area-state.service';
import { UserInputService } from '../../../shared/services/user-input.service';
import { Subscription } from 'rxjs/Subscription';
import { PlayerStateService } from './player-state.service';
import { BattleCalculatorService } from './battle-calculator.service';

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
  ) {
    this.userInputService.playerMoved.subscribe(data => {
      this.actionTriggerHandler();
    });
  }

  public actionTriggerHandler() {
    const characters: { gridItem: any, gridLocation: string }[] = this.areaStateService.getCharactersOnGrid();
    characters.forEach(({ gridItem, gridLocation }) => {
      this.action(gridItem, gridLocation);
    });
  }

  // TODO set up observable to receive notification on movement input

  // TODO types
  public action(character: any, gridLocation: string) {
    if (character) {
      if (character.isAsleep || character.isDead() || character.isPaused) {

        // Not expected to move
        if (character.isPaused) {
          character.isPaused = false;
        }
      } else {

        // Expected to perform an action
        if (!character.isAngry && !character.isLowHealth()) {

          // Untroubled character, do some wandering
          this.movement.wander(character, gridLocation);

          character.isPaused = true;
        } else if (character.isAngry && !character.isLowHealth()) {

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
        } else {

          // Character is low health and needs to escape
          this.movement.moveWithRespectToPlayer(character, gridLocation, false);

          // Maybe move these to a response method on character
          character.angry = false;
        }

        character.isPaused = true;
      }
    }
  }
}
