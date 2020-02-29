import { Injectable } from '@angular/core';

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
export class AudioService {

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
  public playSound(soundName?: string) {
    if (this.audioEngine && this.audioEngine.src) {
      this.audioEngine.load();
      this.audioEngine.play();
      this.currentlyPlaying = true;
    } else {

      // Do nothing
    }
    // const itemReference = this.audioEngine.play();
    // this.playingAudio[itemReference] = ;
  }

  public stopSound() {
    this.audioEngine.load();
    this.currentlyPlaying = false;
  }

  public setFile(filename: string) {
    this.audioEngine.src = "assets/audio/music/" + filename;
  }

  // public stopSound(): boolean {

  // }
}
