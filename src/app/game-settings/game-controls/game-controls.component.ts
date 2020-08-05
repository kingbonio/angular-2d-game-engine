import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameStateService } from '../../game/shared/services/game-state.service';
import defaults from '../../shared/defaults';
import { KeyInputType } from '../../shared/enums';
import { GameSettingsService } from '../../shared/services/game-settings.service';
import { UserInputService } from '../../shared/services/user-input.service';
import keyFullNames from '../../shared/util/key-full-names';

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


  constructor(
    public gameSettingsService: GameSettingsService,
    public userInputService: UserInputService,
    public gameStateService: GameStateService,
  ) {
    this.keyNames = Object.keys(defaults.defaultKeyMap);
    this.keyFullNames = keyFullNames;

    this.userInputService.userSetKey.subscribe((key: number) => {
      if (
        this.gameStateService.awaitingKeyboardSetting &&
        key !== 0 &&
        key !== 27 &&
        !this.gameSettingsService.keysMapped[key]
      ) {
        // TODO Need to block any that are already selected
        this.userSetKeyHandler(key);
      } else if (this.gameStateService.awaitingKeyboardSetting && key === 27) {
        this.unsetAwaitingKey();
      }
    });
  }

  private userSetKeyHandler(key: number) {
    this.gameSettingsService.updateKeyBinding(key, this.keyActionSelected);
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
      this.gameSettingsService.oneHandedControls &&
      (keyName === "directionNorth" ||
       keyName === "directionEast" ||
       keyName === "directionSouth" ||
       keyName === "directionWest")
    );
    return isHidden;
  }

  public saveSettings() {
    this.gameSettingsService.saveGameSettings({});
  }

  public resetToDefaults() {
    this.gameSettingsService.setToDefaults();
  }
}
