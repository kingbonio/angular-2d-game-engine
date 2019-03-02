import { Injectable } from '@angular/core';
import defaults from '../defaults';
import { IUserAction } from '../interfaces';
import { UserActionTypes, UserInteractionTypes } from '../enums';
import { PlayerStateService } from '../../game/shared/services/player-state.service';

@Injectable()
export class UserInputService {

  constructor(private playerStateService: PlayerStateService) { }

  public keyDownEventHandler($e: KeyboardEvent) {
    // TODO This will need updating from user config
    const characterAction: IUserAction = defaults.keyMap[$e.keyCode];
    console.log(characterAction);
    if (characterAction) {
      switch (characterAction.type) {

        case UserActionTypes.move:
          this.playerStateService.move(characterAction.direction);
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
