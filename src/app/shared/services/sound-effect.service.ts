import { Injectable } from '@angular/core';
import defaults from '../defaults';
import { SoundEffects } from '../enums';
import { soundEffects } from "../../game-config/audio/sound-effects";

interface IAudioEngine {
  play: any;
  load: any;
  src: string;
}

interface IAudioItem {
  reference: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SoundEffectService {

  public audioEngine: IAudioEngine;
  private playingAudio: any;
  public currentlyPlaying = false;

  constructor() { }

  public loadAudioEngine(audioEngine: IAudioEngine) {
    this.audioEngine = audioEngine;
  }

  /**
   * Start an audio item playing and return the item reference
   * @param soundName filename reference
   */
  public playSound(soundName: SoundEffects) {

    // TODO this needs moving to injection
    if (!this.audioEngine) {
      this.audioEngine = new Audio();
    }

    this.audioEngine.src = soundEffects[soundName];
    this.audioEngine.load();
    // this.audioEngine.load(soundEffects[soundName]);

    // this.audioEngine.play();

    this.audioEngine.play()
      .then(() => {

      }).catch(() => {

        // TODO This feels awful
        console.log("The audio element threw an error");
      });




    // // const soundSrc = defaults.soundEffectFiles[soundName];

    // if (this.audioEngine && this.audioEngine.src) {
    //   this.audioEngine.load();
    //   this.audioEngine.play();
    //   this.currentlyPlaying = true;
    // } else {

    //   // Do nothing
    // }
    // const itemReference = this.audioEngine.play();
    // this.playingAudio[itemReference] = ;
  }

  public stopSound() {
    // TODO this needs moving to injection
    if (!this.audioEngine) {
      this.audioEngine = new Audio();
    }

    this.audioEngine.load();
    this.currentlyPlaying = false;
  }

  public setFile(filename: string) {
    this.audioEngine.src = "assets/audio/music/" + filename;
  }

  // public stopSound(): boolean {

  // }
}
