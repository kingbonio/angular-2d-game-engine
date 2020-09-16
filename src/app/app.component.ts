import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { GameSettingsService } from './shared/services/game-settings.service';
import { UserInputService } from './shared/services/user-input.service';
import { SoundEffectService } from './shared/services/sound-effect.service';
import { backgroundMusic } from './game-config/audio';
import { BackgroundMusicService } from './shared/services/background-music.service';

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
    ) { }

    ngOnInit() {

        // Listen for keyboard input events
        this.userInputSubscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
            this.userInputService.keyDownEventHandler($e);
        });
        // this.playBackgroundMusic();
    }

    ngOnDestroy() {

        // Remove the listener for key events
        this.userInputSubscription.unsubscribe();
    }
}
