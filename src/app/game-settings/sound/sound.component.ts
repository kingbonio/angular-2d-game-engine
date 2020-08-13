import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../../shared/services/game-settings.service';
import defaults from '../../shared/defaults';
import { Router } from '@angular/router';

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

  public soundEffectVolume: number;
  public musicVolume: number;

  constructor(
    public gameSettingsService: GameSettingsService,
    public router: Router
  ) {
    this.soundEffectVolume = this.gameSettingsService.soundEffectVolume;
    this.musicVolume = this.gameSettingsService.musicVolume;
  }

  ngOnInit() {
  }

  public getVolumePercentage(soundSource: string): number {
    return Number(this[soundSource]) * 100;
  }

  public saveSettings() {
    this.gameSettingsService.saveGameSettings({
      soundEffectVolume: this.soundEffectVolume,
      musicVolume: this.musicVolume,
    });
  }

  // Apply defaults to this component
  public setDefaults() {
    this.soundEffectVolume = defaults.volumes.soundEffect;
    this.musicVolume = defaults.volumes.music;
  }

  // Navigate to main menu
  public loadMainMenu() {
    this.router.navigate(['/']);
  }
}
