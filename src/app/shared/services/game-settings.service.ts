import { Injectable } from '@angular/core';
import { IGameSettings } from '../../game/shared/interfaces';
import { PersistentStateService } from '../../game/shared/services/persistent-state.service';

import defaults from '../../shared/defaults';
import keyReferences from '../../shared/util/key-references';
import { IUserAction } from '../interfaces';
import { KeyInputType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  public allowInGameMenu = defaults.gameSettings.allowInGameMenu;
  public keyMap = defaults.defaultKeyMap;
  public keysMapped = {};

  constructor(
    public persistentStateService: PersistentStateService,
    ) {
    const persistentGameSettings: IGameSettings = this.persistentStateService.getGameSettings();
    if (persistentGameSettings) {
      this.applyAllSettings(persistentGameSettings);
    } else {
      this.setToDefaults();
    }
  }

  public updateKeyReference(key: number, action: KeyInputType) {
    this.keyMap[action] = key;
    this.keysMapped[key] = action;
  }

  public getKeyName(key) {
    return keyReferences[key];
  }

  /**
   * Returns the name of the key for each action
   * @param keyInputType the action we want to get the key name for
   * @returns The name of the key
   */
  public getSelectedKeyName(keyInputType: KeyInputType): string {
    return this.getKeyName(this.keyMap[keyInputType]);
  }

  public getCharacterActionType(inputKey: number): IUserAction {
    return this.keyMap[inputKey];
  }

  public saveGameSettings() {
    const allSettings = this.gatherAllSettings();
    this.persistentStateService.saveGameSettings(allSettings);
  }

  public setToDefaults() {
    this.keyMap = defaults.defaultKeyMap;
    // Set up the quick-access key references
    for (const inputReference in this.keyMap) {
      if (this.keyMap.hasOwnProperty(inputReference)) {
        this.keysMapped[this.keyMap[inputReference]] = inputReference;
      }
    }
  }

  /**
 * Return the area state for storage
 * @returns the state data relevant to this service
 * @returns the state data relevant to this service
 */
  public gatherAllSettings(): IGameSettings {
    return {
      allowInGameMenu: this.allowInGameMenu,
      keyMap: this.keyMap,
      keysMapped: this.keysMapped,
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
