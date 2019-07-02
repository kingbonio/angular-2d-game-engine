import { Injectable, ɵsetCurrentInjector } from '@angular/core';
import defaults from '../defaults';
import { IUserAction } from '../interfaces';
import { UserActionTypes, UserInteractionTypes } from '../enums';
import { PlayerStateService } from '../../game/shared/services/player-state.service';
import { Observable } from 'rxjs/observable';
import { AreaStateService } from '../../game/shared/services/area-state.service';
import { ElementClass } from '../../game/shared/enums';
import { ReactiveFormsModule } from '@angular/forms';
import { AiService } from '../../game/shared/services/ai.service';

@Injectable()
export class UserInputService {
  public $playerMoved = new Observable(direction => {
    // TODO tidy this up
    for (const gridLocation in this.areaStateService.locations) {
      if (this.areaStateService.locations.hasOwnProperty(gridLocation) && this.areaStateService.locations[gridLocation]) {
        const gridItem = this.areaStateService.locations[gridLocation];
        if (gridItem.type && (gridItem.type === ElementClass.enemy || gridItem.type === ElementClass.npc)) {
          this.aiService.react(gridItem, gridLocation);
        }
      }
    }
  });

  constructor(
    private aiService: AiService,
    private playerStateService: PlayerStateService,
    private areaStateService: AreaStateService) {

  }

  public keyDownEventHandler($e: KeyboardEvent) {
    // TODO This will need updating from user config
    const characterAction: IUserAction = defaults.keyMap[$e.keyCode];
    if (characterAction) {
      switch (characterAction.type) {

        case UserActionTypes.move:
          this.playerStateService.move(characterAction.direction);
          // TODO Hook up event listener to move enemies
          // this.$playerMoved.next(characterAction.direction);
          break;

        case UserActionTypes.direction:
          this.playerStateService.direction = characterAction.direction;
          break;

        case UserActionTypes.interaction:
          switch (characterAction.interaction) {

            case UserInteractionTypes.attack:
              this.playerStateService.attack();
              break;

            case UserInteractionTypes.guard:
              this.playerStateService.guard();
              break;

            case UserInteractionTypes.interact:
              this.playerStateService.interact();
              break;

            case UserInteractionTypes.speak:
              this.playerStateService.speak();
              break;
          }
      }
    }
  }
}
