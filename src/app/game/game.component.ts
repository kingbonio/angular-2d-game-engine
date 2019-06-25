import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Direction } from './shared/enums';
import { PlayerStateService } from './shared/services/player-state.service';
import { DialogueService } from './shared/services/dialogue.service';
import { UserInputService } from '../shared/services/user-input.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  title = 'game';

  constructor(
    public playerStateService: PlayerStateService,
    public dialogueService: DialogueService,
    public userInputService: UserInputService,
  ) { }

  ngOnInit(): void {
    this.subscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
      this.userInputService.keyDownEventHandler($e);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // public onKeyDown($e) {
  //   this.userInputService.keyDownEventHandler($e);
  // }



  // TODO: Look for a way to check menu on site load
}
