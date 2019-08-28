import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../../shared/services/game-settings.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent implements OnInit {

  constructor(
    public gameSettingsService: GameSettingsService,
  ) { }

  ngOnInit() {
  }

  public saveSettings() {
    this.gameSettingsService.saveGameSettings();
  }

  public resetToDefaults() {
    this.gameSettingsService.setToDefaults();
  }
}
