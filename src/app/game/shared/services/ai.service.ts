import { Injectable } from '@angular/core';
import { Character } from '../../character-classes/character';
import { MovementComponent } from '../util/movement/movement.component';
import { AreaStateService } from './area-state.service';
import { UserInputService } from '../../../shared/services/user-input.service';
import { Subscription } from 'rxjs/Subscription';

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
      // // this.playerMovedSubscription = this.userInputService.playerMoved.subscribe(this.actionTriggerHandler);
      // this.playerMovedSubscription = this.userInputService.playerMoved.subscribe({
      //   next() {
      //     this.actionTriggerHandler();
      //   }
      // });
      console.log("AI service instatiated");
      this.userInputService.playerMoved.subscribe(data => {
        console.log(this.areaStateService.locations);
        this.actionTriggerHandler();
      });
  }


  public actionTriggerHandler() {
    const characters: {gridItem: any, gridLocation: string}[] = this.areaStateService.getCharactersOnGrid();
    characters.forEach(({gridItem, gridLocation}) => {
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
}
