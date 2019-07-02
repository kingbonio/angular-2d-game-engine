import { Injectable } from '@angular/core';
import { Character } from '../../character-classes/character';
import { MovementComponent } from '../../../util/movement/movement.component';
import { AreaStateService } from './area-state.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(private areaStateService: AreaStateService) {

  }

  // TODO set up observable to receive notification on movement input

  // TODO types
  public react(character: Character, gridLocation: any) {
    if (character.isAsleep) {
      // Do nothing, maybe say Zzzzzzzz (sleep speech command)
    } else {
      if (!character.isAngry) {
        MovementComponent.wander(character, gridLocation);
      } else {
        if (!character.isLowHealth()) {
          MovementComponent.moveTowardsPlayer(character, gridLocation);

          if (this.areaStateService.isNextToPlayer(gridLocation)) {
            this.areaStateService
            this.character.attackPlayer();
          }
        } else {
          MovementComponent.runAway(character);
        }
      }
    }
  }
}
