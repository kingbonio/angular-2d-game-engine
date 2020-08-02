import { Injectable } from '@angular/core';
import { IGameSettings } from '../../game/shared/interfaces';
import { PersistentStateService } from '../../game/shared/services/persistent-state.service';
import defaults from '../../shared/defaults';
import keyActions from '../../shared/util/key-actions';
import keyReferences from '../../shared/util/key-references';
import { KeyInputType } from '../enums';
import { IUserAction } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  public allowInGameMenu = defaults.gameSettings.allowInGameMenu;
  public showRoomShadow = defaults.gameSettings.showRoomShadow;
  public oneHandedControls = defaults.gameSettings.oneHandedControls;
  public keyMap = defaults.defaultKeyMap;
  public border = false;
  public keysMapped = {};
  public musicVolume = 0.5;
  public soundEffectVolume = 0.5;

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

  /**
   * Sets the new key and clears the previous action the key was set to
   * @param key key entered for new binding
   * @param action Reference for the action
   */
  public updateKeyBinding(key: number, action: KeyInputType) {
    const previousKey = this.keyMap[action];
    this.keyMap[action] = key;
    this.keysMapped[key] = action;
    this.keysMapped[previousKey] = null;
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

  /**
   * Returns the action object which can be used to determine outcome for key entry
   * @param inputKey The key reference to get the action for
   */
  public getCharacterActionType(inputKey: number): IUserAction {
    const characterAction = this.keysMapped[inputKey];
    return keyActions[characterAction];
  }

  public saveGameSettings() {
    const allSettings = this.gatherAllSettings();
    this.persistentStateService.saveGameSettings(allSettings);
  }

  public setToDefaults() {
    this.keyMap = defaults.defaultKeyMap;
    // Set up the quick-access key references
    this.keysMapped = {};
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
      showRoomShadow: this.showRoomShadow,
      allowInGameMenu: this.allowInGameMenu,
      oneHandedControls: this.oneHandedControls,
      keyMap: this.keyMap,
      keysMapped: this.keysMapped,
      border: this.border,
      musicVolume: this.musicVolume,
      soundEffectVolume: this.soundEffectVolume,
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
