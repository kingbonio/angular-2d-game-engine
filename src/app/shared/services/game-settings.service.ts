import { Injectable } from '@angular/core';
import { IGameSettings } from '../../game/shared/interfaces';
import { PersistentStateService } from '../../game/shared/services/persistent-state.service';

import defaults from '../../shared/defaults';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  public allowInGameMenu = defaults.gameSettings.allowInGameMenu;

  constructor(
    public persistentStateService: PersistentStateService,
    ) {
    const persistentGameSettings: IGameSettings = this.persistentStateService.getGameSettings();
    if (persistentGameSettings) {
      this.applyAllSettings(persistentGameSettings);
    }
  }

  public saveGameSettings() {
    const allSettings = this.gatherAllSettings();
    this.persistentStateService.saveGameSettings(allSettings);
  }

  /**
 * Return the area state for storage
 * @returns the state data relevant to this service
 * @returns the state data relevant to this service
 */
  public gatherAllSettings(): IGameSettings {
    return {
      allowInGameMenu: this.allowInGameMenu,
    };
  }

  /**
   * Applies state data to this service
   * @param settings settings from storage to push to this state service
   */
  public applyAllSettings(settings: IGameSettings): void {
    for (const setting in settings) {
      if (settings.hasOwnProperty(setting)) {
        this[setting] = settings[setting];
      }
    }
  }
}
