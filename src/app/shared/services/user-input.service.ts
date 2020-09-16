import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GameStateService } from '../../game/shared/services/game-state.service';
import { PlayerStateService } from '../../game/shared/services/player-state.service';
import { UserActionTypes, UserInteractionTypes } from '../enums';
import { IUserAction } from '../interfaces';
import { GameSettingsService } from './game-settings.service';
import { AreaStateService } from '../../game/shared/services/area-state.service';
import { ApplicationStateService } from './application-state.service';


@Injectable()
export class UserInputService {

    public playerMoved: BehaviorSubject<string>;
    public userSetKey: BehaviorSubject<number>;

    constructor(
        private playerStateService: PlayerStateService,
        private areaStateService: AreaStateService,
        private gameSettingsService: GameSettingsService,
        private gameStateService: GameStateService,
        private applicationStateService: ApplicationStateService,
    ) {
        this.playerMoved = new BehaviorSubject("forceCharacterMove");
        this.userSetKey = new BehaviorSubject(0);
    }

    public keyDownEventHandler($e: KeyboardEvent) {
        if (this.gameStateService.awaitingKeyboardSetting) {
            this.userSetKey.next($e.keyCode);
        }

        if (this.applicationStateService.gameOpen && !this.gameStateService.gamePaused && !this.gameStateService.inputPaused) {

            if (this.gameSettingsService.oneHandedControls) {

                // First pause input for x seconds
                this.gameStateService.pauseInput();
            }

            const characterAction: IUserAction = this.gameSettingsService.getCharacterActionType($e.keyCode);

            this.invokeAction(characterAction);
        }
    }

    public invokeAction(characterAction: IUserAction) {
        if (characterAction) {
            switch (characterAction.type) {

                case UserActionTypes.move:
                    if (!this.areaStateService.locations[this.playerStateService.locationY + this.playerStateService.locationX].element.isMovingForwards) {
                        this.playerStateService.move(characterAction.direction, this.gameSettingsService.oneHandedControls);
                        this.playerMoved.next("forceCharacterMove");
                    }

                    break;

                case UserActionTypes.direction:
                    if (!this.gameSettingsService.oneHandedControls) {
                        this.playerStateService.direction = characterAction.direction;
                    }
                    break;

                case UserActionTypes.interaction:
                    switch (characterAction.interaction) {

                        case UserInteractionTypes.attack:
                            this.playerStateService.attack();
                            this.playerMoved.next("forceCharacterMove");
                            break;

                        case UserInteractionTypes.guard:
                            this.playerStateService.guard();
                            this.playerMoved.next("forceCharacterMove");
                            break;

                        case UserInteractionTypes.interact:
                            this.playerStateService.interact();
                            break;

                        case UserInteractionTypes.speak:
                            this.playerStateService.speak();
                            this.playerMoved.next("forceCharacterMove");
                            break;
                    }
            }
        }
    }
}
