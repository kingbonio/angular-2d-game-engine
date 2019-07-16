import { Injectable } from '@angular/core';
import { Character } from '../../character-classes/character';
import { MovementComponent } from '../util/movement/movement.component';
import { AreaStateService } from './area-state.service';
import { UserInputService } from '../../../shared/services/user-input.service';
import { Subscription } from 'rxjs/Subscription';
import { PlayerStateService } from './player-state.service';

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
        if (character.isPaused) {
          character.isPaused = false;
        }
        // Do nothing, maybe say Zzzzzzzz (asleep speech command)
      } else {
        if (!character.isAngry) {
          this.movement.wander(character, gridLocation);
          character.isPaused = true;
        } else {
          if (!character.isLowHealth()) {
            // Head towards player and attack if next to player, otherwise move towards the player
            if (this.areaStateService.isCharacterNextToPlayer(gridLocation)) {
              console.log("I caught you!");
              //   this.character.attackPlayer();
            } else {
              this.movement.moveWithRespectToPlayer(character, gridLocation, true);
            }
          } else {
            // Run away from player
            this.movement.moveWithRespectToPlayer(character, gridLocation, false);
          }
          character.isPaused = true;
        }
      }
    }
  }
}
