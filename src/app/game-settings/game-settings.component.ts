import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../shared/services/game-settings.service';
import { PersistentStateService } from '../game/shared/services/persistent-state.service';
import { IGameSettings } from '../game/shared/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { UserInputService } from '../shared/services/user-input.service';
import { GameStateService } from '../game/shared/services/game-state.service';
import { KeyInputType } from '../shared/enums';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

  public allowMenuInGame: boolean;
  public keyActionSelected: KeyInputType;
  public userSetKeySubscription: Subscription;


  constructor(
    public gameSettingsService: GameSettingsService,
    public userInputService: UserInputService,
    public gameStateService: GameStateService,
  ) {
    this.allowMenuInGame = this.gameSettingsService.allowInGameMenu;

    this.userInputService.userSetKey.subscribe((key: number) => {
      console.log("key: ", key);
      if (this.gameStateService.awaitingKeyboardSetting && key !== 0 && key !== 27) {
        this.userSetKeyHandler(key);
      } else if (this.gameStateService.awaitingKeyboardSetting && key === 27) {
        this.unsetAwaitingKey();
      }
    });
  }

  ngOnInit() {

  }

  private userSetKeyHandler(key: number) {
    console.log("key entered: ", key);
    console.log("key action selected: ", this.keyActionSelected);
    this.gameSettingsService.updateKeyReference(key, this.keyActionSelected);
    this.gameStateService.awaitingKeyboardSetting = false;
  }

  public setAwaitingKey(keyAction: KeyInputType) {
    this.keyActionSelected = keyAction;
    this.gameStateService.awaitingKeyboardSetting = true;
    console.log("Selecting key");
  }

  public unsetAwaitingKey() {
    this.gameStateService.awaitingKeyboardSetting = false;
    console.log("Not selecting key");
  }

  public saveSettings() {
    this.gameSettingsService.allowInGameMenu = this.allowMenuInGame;
    this.gameSettingsService.saveGameSettings();
  }

}
