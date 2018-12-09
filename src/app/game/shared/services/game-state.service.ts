import { Injectable, Output, EventEmitter } from '@angular/core';
import { IGameStateData } from '../interfaces';

@Injectable()
export class GameStateService {
  _isGameFinishedBooting;
  _gamePaused;
  @Output() performComputerMove: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.isGameFinishedBooting = true;
  }

  get isGameFinishedBooting() {
    return this._isGameFinishedBooting;
  }

  set isGameFinishedBooting(isGameFinishedBooting) {
    this._isGameFinishedBooting = isGameFinishedBooting;
  }

  get gamePaused() {
    return this._gamePaused;
  }

  set gamePaused(newPauseState) {
    this._gamePaused = newPauseState;
  }

  public takeComputerTurn() {
    // TODO: Build this event emitter to update any subscribers to perform a "computer move"
    this.performComputerMove.emit();
  }

  /**
   * Return the game state for storage
   * @returns the state data relevant to this service
   */
  gatherState(): IGameStateData {
    return {
      gamePaused: this.gamePaused,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IGameStateData): void {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }

}
