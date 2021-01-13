import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { GameSettingsService } from './shared/services/game-settings.service';
import { UserInputService } from './shared/services/user-input.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    private userInputSubscription: Subscription;

    constructor(
        private userInputService: UserInputService,
        public gameSettingsService: GameSettingsService,
        private meta: Meta
    ) { }

    ngOnInit() {

        // Sets the scale level to fit landscape mobile devices which won't fit the game in otherwise
        if (window.navigator.userAgent.toLowerCase().includes("mobile")) {
            this.meta.removeTag("name=viewport");
            this.meta.addTag({
                content: "width=device-width,initial-scale=0.45,maximum-scale=1,user-scalable=yes",
                name: "viewport"
            });
        }

        // Listen for keyboard input events
        this.userInputSubscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
            this.userInputService.keyDownEventHandler($e);
        });
    }

    ngOnDestroy() {

        // Remove the listener for key events
        this.userInputSubscription.unsubscribe();
    }
}
