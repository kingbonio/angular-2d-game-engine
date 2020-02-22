import { Component } from '@angular/core';
import { GameSettingsService } from '../../shared/services/game-settings.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent {

  constructor(
    public gameSettingsService: GameSettingsService,
  ) { }

  public saveSettings() {
    this.gameSettingsService.saveGameSettings();
  }

  public resetToDefaults() {
    this.gameSettingsService.setToDefaults();
  }
}
