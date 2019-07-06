import { Injectable } from '@angular/core';
import { Character } from '../../character-classes/character';
import { MovementComponent } from '../util/movement/movement.component';
import { AreaStateService } from './area-state.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(
    private areaStateService: AreaStateService,
    private movement: MovementComponent,
    ) {

  }

  // TODO set up observable to receive notification on movement input

  // TODO types
  public react(character: any, gridLocation: string) {
    if (character) {
      if (character.isAsleep || character.isDead()) {
      // Do nothing, maybe say Zzzzzzzz (sleep speech command)
      }
    } else {
      if (!character.isAngry) {
        this.movement.wander(character, gridLocation);
      // } else {
      //   if (!character.isLowHealth()) {
      //     this.movement.moveTowardsPlayer(character, gridLocation);

      //     if (this.areaStateService.isNextToPlayer(gridLocation)) {
      //       this.areaStateService
      //       this.character.attackPlayer();
      //     }
      //   } else {
      //     this.movement.runAway(character);
      //   }
      }
    }
  }
}
