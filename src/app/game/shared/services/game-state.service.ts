import { Injectable, Output, EventEmitter } from '@angular/core';
import { IGameStateData } from '../interfaces';

@Injectable()
export class GameStateService {
  public gamePaused = false;
  public awaitingKeyboardSetting = false;
  public battleMode: boolean;
  private _gameMenuOpen;

  constructor() {
  }

  get gameMenuOpen() {
    return this._gameMenuOpen;
  }

  set gameMenuOpen(newState: boolean) {
    this._gameMenuOpen = newState;
    this.gamePaused = newState;
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
