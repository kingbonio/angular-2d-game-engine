import { Injectable, ɵsetCurrentInjector, Output, EventEmitter, Inject } from '@angular/core';
import defaults from '../defaults';
import { IUserAction } from '../interfaces';
import { UserActionTypes, UserInteractionTypes } from '../enums';
import { PlayerStateService } from '../../game/shared/services/player-state.service';
import { Observable } from 'rxjs/observable';
import { AreaStateService } from '../../game/shared/services/area-state.service';
import { ElementClass } from '../../game/shared/enums';
import { ReactiveFormsModule } from '@angular/forms';
import { AiService } from '../../game/shared/services/ai.service';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class UserInputService {

  public playerMovedSubscription: Subscription;

  // @Output() playerMoved = new EventEmitter<any>();
  // public playerMoved = new Subject<void>().asObservable();
  public playerMoved: BehaviorSubject<string>;

  // private countdownEndSource = new Subject<void>();
  // public countdownEnd$ = this.countdownEndSource.asObservable();

  // public playerMoved = new Observable(observer => {
  //   // TODO tidy this up
  //   // this.aiService.actionTriggerHandler();
  //   observer.next();
  // });

  constructor(
    private playerStateService: PlayerStateService,
    // private aiService: AiService,
  ) {
    console.log("User Input Service instantiated");
    this.playerMoved = new BehaviorSubject("test");

    this.playerMovedSubscription = this.playerMoved.subscribe(data => {
      console.log(this.playerMoved.value);
    });

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
          this.playerMoved.next("test");

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
