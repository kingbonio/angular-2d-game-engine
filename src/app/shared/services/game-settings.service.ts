import { Injectable, OnInit } from '@angular/core';
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
export class GameSettingsService implements OnInit {

    public allowInGameMenu = defaults.gameSettings.allowInGameMenu;
    public showRoomShadow = defaults.gameSettings.showRoomShadow;
    public showControls = defaults.gameSettings.showControls;
    public oneHandedControls = defaults.gameSettings.oneHandedControls;
    public keyMap = defaults.defaultKeyMap;
    public keysMapped = {};
    public musicVolume = defaults.volumes.music;
    public soundEffectVolume = defaults.volumes.soundEffect;
    public dyslexiaFont = defaults.gameSettings.dyslexiaFont;

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

    }

    ngOnInit() {
        // Push volume settings to background music setting
        this.backgroundMusicService.setVolume(this.musicVolume);

        // Push volume settings to sound effect setting
        this.soundEffectService.setVolume(this.soundEffectVolume);
    }

    /**
     * Returns the action object which can be used to determine outcome for key entry
     *
     * @param {number} inputKey The key reference to get the action for
     * 
     * @returns {IUserAction}
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
        if (newSettings.musicVolume !== undefined) {
            this.backgroundMusicService.setVolume(newSettings.musicVolume);
        }

        // Push volume settings to sound effect setting
        if (newSettings.soundEffectVolume !== undefined) {
            this.soundEffectService.setVolume(newSettings.soundEffectVolume);
        }

        this.saveToStorage();
    }

    /**
     * Saves all game settings to storage
     */
    private saveToStorage(): void {
        const allSettings = this.gatherAllSettings();
        this.persistentStateService.saveGameSettings(allSettings);
    }

    /**
     * Pulls and sets defaults to all game settings
     */
    public setToDefaults(): void {
        this.keyMap = defaults.defaultKeyMap;

        // Set up the quick-access key references
        this.keysMapped = {};
        for (const inputReference in this.keyMap) {
            if (this.keyMap.hasOwnProperty(inputReference)) {
                this.keysMapped[this.keyMap[inputReference]] = inputReference;
            }
        }

        this.showRoomShadow = defaults.gameSettings.showRoomShadow;
        this.showControls = defaults.gameSettings.showControls;
        this.oneHandedControls = defaults.gameSettings.oneHandedControls;
        this.musicVolume = defaults.volumes.music;
        this.soundEffectVolume = defaults.volumes.soundEffect;
        this.dyslexiaFont = defaults.gameSettings.dyslexiaFont;
    }

    /**
     * Return theis service's state
     *
     * @returns {IGameSettings}
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
            dyslexiaFont: this.dyslexiaFont,
        };
    }

    /**
     * Applies state data to this service
     *
     * @param {IGameSettings} settings The settings from storage to push to this state service
     */
    public applyAllSettings(settings: IGameSettings): void {
        for (const setting in settings) {
            if (settings.hasOwnProperty(setting)) {
                this[setting] = settings[setting];
            }
        }
    }
}
