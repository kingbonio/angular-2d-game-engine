import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../shared/services/game-settings.service';
import { PersistentStateService } from '../game/shared/services/persistent-state.service';
import { IGameSettings } from '../game/shared/interfaces';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

  public allowMenuInGame: boolean;

  constructor(
    public gameSettingsService: GameSettingsService,
  ) {
    this.allowMenuInGame = this.gameSettingsService.allowInGameMenu;
  }

  ngOnInit() {

  }

  public saveSettings() {
    this.gameSettingsService.allowInGameMenu = this.allowMenuInGame;
    this.gameSettingsService.saveGameSettings();
  }

}
