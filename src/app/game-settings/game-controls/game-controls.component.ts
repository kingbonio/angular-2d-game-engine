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


  private userSetKeyHandler(key: number) {
    this.updateKeyBinding(key, this.keyActionSelected);
    this.gameStateService.awaitingKeyboardSetting = false;
    this.keyActionSelected = null;
  }

  public setAwaitingKey(keyAction: KeyInputType) {
    this.keyActionSelected = keyAction;
    this.gameStateService.awaitingKeyboardSetting = true;
  }

  public unsetAwaitingKey() {
    this.gameStateService.awaitingKeyboardSetting = false;
  }

  public isHiddenControl(keyName: string) {

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

  public pullCurrentSettings() {
    this.keyMap = this.gameSettingsService.keyMap;
    this.keysMapped = this.gameSettingsService.keysMapped;
  }

  public saveSettings() {
    this.gameSettingsService.saveGameSettings({
      keyMap: this.keyMap,
      keysMapped: this.keysMapped,
    });
  }

  // Apply defaults to this component
  public setDefaults() {
    this.keyMap = defaults.defaultKeyMap;

    // Set up the quick-access key references
    this.keysMapped = {};
    for (const inputReference in this.keyMap) {
      if (this.keyMap.hasOwnProperty(inputReference)) {
        this.keysMapped[this.keyMap[inputReference]] = inputReference;
      }
    }
  }

  // Navigate to main menu
  public loadMainMenu() {
    this.router.navigate(['/']);
  }
}
