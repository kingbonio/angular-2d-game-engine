import { Injectable } from '@angular/core';
import { backgroundMusic } from '../../game-config/audio';
import { IAudioEngine } from '../interfaces';
import { BackgroundMusic } from '../enums';
import { GameSettingsService } from './game-settings.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMusicService {
  private backgroundMusicInstances = {};
  private currentlyActiveMusic: BackgroundMusic;

  constructor(
    ) {
    for (const backgroundMusicName in BackgroundMusic) {
      if (BackgroundMusic.hasOwnProperty(backgroundMusicName)) {
        this.backgroundMusicInstances[backgroundMusicName] = new Audio() as IAudioEngine;
        this.backgroundMusicInstances[backgroundMusicName].loop = true;
        this.backgroundMusicInstances[backgroundMusicName].src = backgroundMusic[backgroundMusicName];
        this.backgroundMusicInstances[backgroundMusicName].load();
      }
    }
  }

  public stopMusic() {
    for (const backgroundMusicInstance in this.backgroundMusicInstances) {
      if (this.backgroundMusicInstances.hasOwnProperty(backgroundMusicInstance)) {
        this.backgroundMusicInstances[backgroundMusicInstance].load();
      }
    }
    this.currentlyActiveMusic = null;
  }

  public startMusic(musicName: BackgroundMusic) {
    if (this.currentlyActiveMusic !== musicName) {
      for (const backgroundMusicInstance in this.backgroundMusicInstances) {
        if (this.backgroundMusicInstances.hasOwnProperty(backgroundMusicInstance)) {
          this.backgroundMusicInstances[backgroundMusicInstance].load();
          if (backgroundMusicInstance === musicName) {
            this.backgroundMusicInstances[backgroundMusicInstance].play();
            this.currentlyActiveMusic = musicName;
          }
        }
      }
    }
  }

  public setVolume(newVolume: number) {
    for (const backgroundMusicInstance in this.backgroundMusicInstances) {
      if (this.backgroundMusicInstances.hasOwnProperty(backgroundMusicInstance)) {
        this.backgroundMusicInstances[backgroundMusicInstance].volume = newVolume;
      }
    }
  }
}
