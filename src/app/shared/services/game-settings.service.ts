import { Injectable } from '@angular/core';
import { IGameSettings } from '../../game/shared/interfaces';
import { PersistentStateService } from '../../game/shared/services/persistent-state.service';
import defaults from '../../shared/defaults';
import { SoundEffectService } from './sound-effect.service';
import { BackgroundMusicService } from './background-music.service';
import { IUserAction } from '../interfaces';
import keyActions from '../../shared/util/key-actions';


@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  public allowInGameMenu = defaults.gameSettings.allowInGameMenu;
  public showRoomShadow = defaults.gameSettings.showRoomShadow;
  public showControls = defaults.gameSettings.showControls;
  public oneHandedControls = defaults.gameSettings.oneHandedControls;
  public keyMap = defaults.defaultKeyMap;
  public keysMapped = {};
  public musicVolume = defaults.volumes.music;
  public soundEffectVolume = defaults.volumes.soundEffect;

  constructor(
    public persistentStateService: PersistentStateService,
    private soundEffectService: SoundEffectService,
    private backgroundMusicService: BackgroundMusicService,
  ) {
    const persistentGameSettings: IGameSettings = this.persistentStateService.getGameSettings();

    if (persistentGameSettings) {
    this.applyAllSettings(persistentGameSettings);
    } else {
    this.setToDefaults();
    }

    // Push volume settings to background music setting
    if (persistentGameSettings.musicVolume) {
    this.backgroundMusicService.setVolume(persistentGameSettings.musicVolume);
    }

    // Push volume settings to sound effect setting
    if (persistentGameSettings.soundEffectVolume) {
    this.soundEffectService.setVolume(persistentGameSettings.soundEffectVolume);
    }
  }

  /**
   * Returns the action object which can be used to determine outcome for key entry
   * @param inputKey The key reference to get the action for
   */
  public getCharacterActionType(inputKey: number): IUserAction {
    const characterAction = this.keysMapped[inputKey];
    return keyActions[characterAction];
  }

  public saveGameSettings(newSettings: any) {
    for (const newSetting in newSettings) {
    if (newSettings.hasOwnProperty(newSetting)) {
      this[newSetting] = newSettings[newSetting];
    }
    }

    // Push volume settings to background music setting
    if (newSettings.musicVolume) {
    this.backgroundMusicService.setVolume(newSettings.musicVolume);
    }

    // Push volume settings to sound effect setting
    if (newSettings.soundEffectVolume) {
    this.soundEffectService.setVolume(newSettings.soundEffectVolume);
    }

    this.saveToStorage();
  }

  private saveToStorage() {
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
    showControls: this.showControls,
    allowInGameMenu: this.allowInGameMenu,
    oneHandedControls: this.oneHandedControls,
    keyMap: this.keyMap,
    keysMapped: this.keysMapped,
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
