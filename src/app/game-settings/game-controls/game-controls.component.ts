import { Component, OnInit } from '@angular/core';
import { IGameSettings } from '../../game/shared/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { UserInputService } from '../../shared/services/user-input.service';
import { GameStateService } from '../../game/shared/services/game-state.service';
import { KeyInputType } from '../../shared/enums';
import keyFullNames from '../../shared/util/key-full-names';
import defaults from '../../shared/defaults';
import { GameSettingsService } from '../../shared/services/game-settings.service';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit {
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

  ngOnInit() {

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

  public saveSettings() {
    this.gameSettingsService.saveGameSettings();
  }

  public resetToDefaults() {
    this.gameSettingsService.setToDefaults();
  }
}
