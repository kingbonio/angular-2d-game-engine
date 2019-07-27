import { Injectable } from '@angular/core';
import defaults from '../defaults';
import { IUserAction } from '../interfaces';
import { UserActionTypes, UserInteractionTypes } from '../enums';
import { PlayerStateService } from '../../game/shared/services/player-state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserInputService {

  public playerMoved: BehaviorSubject<string>;

  constructor(
    private playerStateService: PlayerStateService,
  ) {
    this.playerMoved = new BehaviorSubject("forceCharacterMove");
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
          // this.playerMoved.emit("hello");
          this.playerMoved.next("forceCharacterMove");

          break;

        case UserActionTypes.direction:
          this.playerStateService.direction = characterAction.direction;
          break;

        case UserActionTypes.interaction:
          switch (characterAction.interaction) {

            case UserInteractionTypes.attack:
              this.playerStateService.attack();
              this.playerMoved.next("forceCharacterMove");
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
