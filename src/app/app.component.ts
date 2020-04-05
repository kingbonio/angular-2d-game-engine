import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { GameSettingsService } from './shared/services/game-settings.service';
import { UserInputService } from './shared/services/user-input.service';
import { SoundEffectService } from './shared/services/sound-effect.service';
import { backgroundMusic } from './game-config/audio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  private userInputSubscription: Subscription;

  constructor(
    private gameSettingsService: GameSettingsService,
    private userInputService: UserInputService,
    public audioService: SoundEffectService,
  ) { }

  ngOnInit() {

    // Listen for keyboard input events
    this.userInputSubscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
      this.userInputService.keyDownEventHandler($e);
    });
  }

  get backgroundMusicIsPlaying() {
    return this.audioService.currentlyPlaying;
  }

  set backgroundMusicIsPlaying(newStatus: boolean) {
    this.audioService.currentlyPlaying = newStatus;
  }

  public toggleBackgroundMusic() {
    if (this.backgroundMusicIsPlaying) {
      this.audioService.stopSound();
    } else {
      // TODO Not this
      this.playBackgroundMusic();
    }
    this.backgroundMusicIsPlaying = !this.backgroundMusicIsPlaying;
  }

  public playBackgroundMusic() {

    // console.log("Starting audio");
    // const audioEngine = new Audio();

    // // Set background volume
    // audioEngine.volume = 0.3;

    // // Load audio engine into service
    // this.audioService.loadAudioEngine(audioEngine);
    // this.audioService.setFile(backgroundMusic.gameMusic);

    // // TODO Undo this commenting
    // // this.audioService.playSound(backgroundMusic.gameMusic);

  }

  /**
   * Adds or removes border
   */
  public toggleBorder() {
    this.gameSettingsService.border = !this.gameSettingsService.border;
  }

  /**
   * Gets whether border is set or not
   */
  public getBorderState() {
    return this.gameSettingsService.border ? "on" : "off";
  }

  ngOnDestroy() {

    // Remove the listener for key events
    this.userInputSubscription.unsubscribe();
  }
}
