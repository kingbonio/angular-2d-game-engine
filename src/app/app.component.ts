import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
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
    ) { }

    ngOnInit() {

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
