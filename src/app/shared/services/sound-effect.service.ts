import { Injectable } from '@angular/core';
import defaults from '../defaults';
import { SoundEffects } from '../enums';
import { soundEffects } from "../../game-config/audio/sound-effects";
import { backgroundMusic } from '../../game-config/audio';
import { IAudioEngine } from '../interfaces';
import { GameSettingsService } from './game-settings.service';


@Injectable({
  providedIn: 'root'
})
export class SoundEffectService {

  private soundEffectInstances = {};

  constructor(
    ) {
    for (const soundEffectName in SoundEffects) {
    if (SoundEffects.hasOwnProperty(soundEffectName)) {
      this.soundEffectInstances[soundEffectName] = new Audio() as IAudioEngine;
      this.soundEffectInstances[soundEffectName].src = soundEffects[soundEffectName];
      this.soundEffectInstances[soundEffectName].load();
    }
    }
  }

  public setVolume(newVolume: number) {
    for (const soundEffectInstance in this.soundEffectInstances) {
    if (this.soundEffectInstances.hasOwnProperty(soundEffectInstance)) {
      this.soundEffectInstances[soundEffectInstance].volume = newVolume;
    }
    }
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
}
