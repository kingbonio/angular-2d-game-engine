import { Injectable } from '@angular/core';
import { backgroundMusic } from '../../game-config/audio';
import { IAudioEngine } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMusicService {
  private _musicEngine: IAudioEngine;
  public isPlayingMusic = false;

  constructor() {
    this._musicEngine = new Audio();

    // TODO Move this
    // this._musicEngine.src = backgroundMusic.gameMusic;

    // TODO Move this to game config
    this._musicEngine.volume = 0.2;
  }

  public startMusic() {
    if (this._musicEngine.src) {
      this._musicEngine.load();
      this._musicEngine.play();
    } else {
      // TODO maybe a default music
    }
  }

  public stopMusic() {
    this._musicEngine.src = "";
    this._musicEngine.load();
  }

  public pauseMusic() {
    this._musicEngine.pause();
  }

  public loadMusic(musicName: string) {
    // TODO this check is not efficient
    if (!this._musicEngine.src.includes(backgroundMusic[musicName])) {
      this._musicEngine.src = backgroundMusic[musicName];
      this.startMusic();
    }

    // Continue playing the same music
    return;
  }

  // TODO get rid of this
  public toggleMusic() {
    if (this.isPlayingMusic) {
      this._musicEngine.load();
      this.isPlayingMusic = false;
    } else {
      this._musicEngine.play();
      this.isPlayingMusic = true;
    }
  }
}
