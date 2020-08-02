import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../../shared/services/game-settings.service';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {

  public music = {
    min: 0,
    max: 1,
    step: 0.1,
  };

  public soundEffect = {
    min: 0,
    max: 1,
    step: 0.1,
  };

  constructor(
    public gameSettingsService: GameSettingsService,
  ) { }

  ngOnInit() {
  }

  public getVolumePercentage(soundSource: string): number {
    return Number(this.gameSettingsService[soundSource]) * 100;
  }

  public saveSettings() {
    this.gameSettingsService.saveGameSettings();
  }
}
