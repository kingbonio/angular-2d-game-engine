import { Injectable, Output, EventEmitter } from '@angular/core';
import { IGameStateData } from '../interfaces';
import { AreaStateService } from './area-state.service';
import { TimerService } from './timer.service';
import defaults from '../../../shared/defaults';

@Injectable()
export class GameStateService {
  public gamePaused = false;
  public inputPaused = false;
  public awaitingKeyboardSetting = false;
  private _gameMenuOpen;

  constructor(
    public areaStateService: AreaStateService,
    private timerService: TimerService) {
  }

  get gameMenuOpen() {
    return this._gameMenuOpen;
  }

  set gameMenuOpen(newState: boolean) {
    this._gameMenuOpen = newState;
    this.gamePaused = newState;
  }

  get battleMode() {
    return this.areaStateService.huntingList.length > 0;
  }

  public pauseInput() {
    this.inputPaused = true;

    this.timerService.startTimer(defaults.userInputPauseTime)
    .then((res) => {
      this.inputPaused = false;
    });
  }

  /**
   * Return the game state for storage
   * @returns the state data relevant to this service
   */
  gatherState(): IGameStateData {
    return {
      gamePaused: this.gamePaused,
      battleMode: this.battleMode,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IGameStateData): void {
    for (const stateSetting in newState) {
      if (newState.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }

}
