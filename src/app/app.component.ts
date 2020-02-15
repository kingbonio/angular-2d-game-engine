import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuStateService } from './shared/services/menu-state.service';
import { GameSettingsService } from './shared/services/game-settings.service';
import { UserInputService } from './shared/services/user-input.service';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  private userInputSubscription: Subscription;

  constructor(
    private menuStateService: MenuStateService,
    private gameSettingsService: GameSettingsService,
    private userInputService: UserInputService,
  ) {
  }

  ngOnInit() {
    this.userInputSubscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
      this.userInputService.keyDownEventHandler($e);
    });
  }

  public toggleBorder() {
    this.gameSettingsService.border = !this.gameSettingsService.border;
  }

  public getBorderState() {
    return this.gameSettingsService.border ? "on" : "off";
  }

  ngOnDestroy() {
    this.userInputSubscription.unsubscribe();
  }
}
