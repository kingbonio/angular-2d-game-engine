import { Injectable } from '@angular/core';
import defaults from '../defaults';
import { SoundEffects } from '../enums';
import { soundEffects } from "../../game-config/audio/sound-effects";
import { backgroundMusic } from '../../game-config/audio';

interface IAudioEngine {
  play: any;
  load: any;
  src: string;
}

@Injectable({
  providedIn: 'root'
})
export class SoundEffectService {

  private soundEffectInstances = {};
  private musicEngine: IAudioEngine;
  public _isPlayingMusic = false;

  constructor() {
    for (const soundEffectName in SoundEffects) {
      if (SoundEffects.hasOwnProperty(soundEffectName)) {
        this.soundEffectInstances[soundEffectName] = new Audio();
        this.soundEffectInstances[soundEffectName].src = soundEffects[soundEffectName];
        this.soundEffectInstances[soundEffectName].load();
      }
    }
    this.musicEngine = new Audio();
  }

  /**
   * Start an audio item playing and return the item reference
   * @param soundName filename reference
   */
  public playSound(soundName: SoundEffects) {


    this.soundEffectInstances[soundName].load();
    this.soundEffectInstances[soundName].play()
      .then(() => {

      }).catch(() => {

        // TODO Swallowing errors
      });
  }

  public playMusic(musicName: string) {
    this.musicEngine.src = backgroundMusic.gameMusic;
    this.musicEngine.load();
    this.musicEngine.play()
      .then(() => {

      }).catch(() => {

        // TODO Swallowing errors
      });
  }

  public toggleMusic() {
    if (this._isPlayingMusic) {
      this.musicEngine.load();
      this._isPlayingMusic = false;
    } else {
      this.musicEngine.play();
      this._isPlayingMusic = true;
    }
  }
}
