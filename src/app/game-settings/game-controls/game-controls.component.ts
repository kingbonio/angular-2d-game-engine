import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStateService } from '../../game/shared/services/game-state.service';
import defaults from '../../shared/defaults';
import { KeyInputType } from '../../shared/enums';
import { GameSettingsService } from '../../shared/services/game-settings.service';
import { UserInputService } from '../../shared/services/user-input.service';
import keyFullNames from '../../shared/util/key-full-names';
import keyReferences from '../../shared/util/key-references';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-controls',
    templateUrl: './game-controls.component.html',
    styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent {
    public keyActionSelected: KeyInputType;
    public userSetKeySubscription: Subscription;
    public keyNames: string[];
    public keyFullNames: any;
    public oneHandedControls = defaults.gameSettings.oneHandedControls;
    public keyMap = defaults.defaultKeyMap;
    public keysMapped = {};


    constructor(
        public gameSettingsService: GameSettingsService,
        public userInputService: UserInputService,
        public gameStateService: GameStateService,
        public router: Router
    ) {
        this.keyNames = Object.keys(defaults.defaultKeyMap);
        this.keyFullNames = keyFullNames;

        this.pullCurrentSettings();

        this.userInputService.userSetKey.subscribe((key: number) => {
            if (
                this.gameStateService.awaitingKeyboardSetting &&
                key !== 0 &&
                key !== 27 &&
                !this.keysMapped[key]
            ) {

                // TODO Need to block any that are already selected
                this.userSetKeyHandler(key);
            } else if (this.gameStateService.awaitingKeyboardSetting && key === 27) {
                this.unsetAwaitingKey();
            }
        });
    }

    /**
     * Sets the new key and clears the previous action the key was set to
     *
     * @param key key entered for new binding
     * @param action Reference for the action
     */
    public updateKeyBinding(key: number, action: KeyInputType): void {
        const previousKey = this.keyMap[action];
        this.keyMap[action] = key;
        this.keysMapped[key] = action;
        this.keysMapped[previousKey] = null;
    }

    /**
     * Gets the name of a key
     *
     * @param {string} key The reference for the key
     *
     * @return {string}
     */
    public getKeyName(key: string): string {
        return keyReferences[key];
    }

    /**
     * Returns the name of the key for each action
     *
     * @param keyInputType the action we want to get the key name for
     *
     * @returns {string}
     */
    public getSelectedKeyName(keyInputType: KeyInputType): string {
        return this.getKeyName(this.keyMap[keyInputType]);
    }

    /**
     * Handles the setting of the key binding
     *
     * @param {number} key The key we're trying to assign an action to
     */
    private userSetKeyHandler(key: number): void {
        this.updateKeyBinding(key, this.keyActionSelected);
        this.gameStateService.awaitingKeyboardSetting = false;
        this.keyActionSelected = null;
    }

    /**
     * Sets the component state to expect a new key binding
     *
     * @param {KeyInputType} keyAction The action we're binding the upcoming key to
     */
    public setAwaitingKey(keyAction: KeyInputType): void {
        this.keyActionSelected = keyAction;
        this.gameStateService.awaitingKeyboardSetting = true;
    }

    /**
     * Sets the component state to not expecting a key input
     */
    public unsetAwaitingKey(): void {
        this.gameStateService.awaitingKeyboardSetting = false;
    }

    /**
     * Determines if the key should be hidden
     *
     * @param {string} keyName The name of the key we're checking
     *
     * @returns {boolean}
     */
    public isHiddenControl(keyName: string): boolean {

        // TODO This could be tidier
        const isHidden = (
            this.oneHandedControls &&
            (keyName === "directionNorth" ||
                keyName === "directionEast" ||
                keyName === "directionSouth" ||
                keyName === "directionWest")
        );
        return isHidden;
    }

    /**
     * Pulls the settings from game settings service state to this component
     */
    public pullCurrentSettings(): void {
        this.keyMap = this.gameSettingsService.keyMap;
        this.keysMapped = this.gameSettingsService.keysMapped;
    }

    /**
     * Applies the key maps to the game settings service
     */
    public saveSettings(): void {
        this.gameSettingsService.saveGameSettings({
            keyMap: this.keyMap,
            keysMapped: this.keysMapped,
        });
    }

    /**
     * Pull and apply defaults to this component
     */
    public setDefaults(): void {
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
     * Navigate to main menu
     */
    public loadMainMenu(): void {
        this.router.navigate(['/']);
    }
}
