import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import defaults from '../../../shared/defaults';
import { IGameStateData } from '../interfaces';
import { AreaStateService } from './area-state.service';
import { TimerService } from './timer.service';

@Injectable()
export class GameStateService {
    public gamePaused = false;
    public inputPaused = false;
    public awaitingKeyboardSetting = false;
    public gameEnd = false;
    private _gameMenuOpen;
    public gameEndSubject: Subject<string>;

    constructor(
        public areaStateService: AreaStateService,
        private timerService: TimerService
    ) {
        this.gameEndSubject = new ReplaySubject<string>();
    }

    /**
     * Returns if the game menu is open or not
     *
     * @returns {boolean}
     */
    get gameMenuOpen(): boolean {
        return this._gameMenuOpen;
    }

    /**
     * Sets the service states to the ones supplies
     *
     * @param {boolean} newState The state we're setting the "menu is open" property to
     */
    set gameMenuOpen(newState: boolean) {
        this._gameMenuOpen = newState;
        this.gamePaused = newState;
    }

    /**
     * Returns whether the game is in battle mode or not
     *
     * @returns {boolean}
     */
    get battleMode(): boolean {
        return this.areaStateService.huntingList.length > 0;
    }

    /**
     * Pauses the user input for a roughly set period
     */
    public pauseInput(): void {
        this.inputPaused = true;

        this.timerService.startTimer(defaults.userInputPauseTime)
            .then((res) => {
                this.inputPaused = false;
            });
    }

    /**
     * Return the game state for storage
     *
     * @returns {IGameStateData}
     */
    gatherState(): IGameStateData {
        return {
            gamePaused: this.gamePaused,
            battleMode: this.battleMode,
        };
    }

    /**
     * Applies state data to this service
     *
     * @param {IGameStateData} newState settings from storage to push to this state service
     */
    public applyState(newState: IGameStateData): void {
        for (const stateSetting in newState) {
            if (newState.hasOwnProperty(stateSetting)) {
                this[stateSetting] = newState[stateSetting];
            }
        }
    }
}
