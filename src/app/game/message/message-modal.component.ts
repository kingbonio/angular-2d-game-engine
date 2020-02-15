import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { GameStateService } from '../shared/services/game-state.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit, OnDestroy {
  private message: string;

  constructor(
    private gameStateService: GameStateService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.message = data;
  }

  ngOnInit() {
    this.gameStateService.gamePaused = true;
  }

  ngOnDestroy() {
    this.gameStateService.gamePaused = false;
  }

}
