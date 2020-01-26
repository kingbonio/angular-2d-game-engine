import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameStateService } from '../../shared/services/game-state.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit, OnDestroy {
  public data;

  constructor(
    private router: Router,
    private gameStateService: GameStateService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }


  ngOnInit() {
    this.gameStateService.gamePaused = true;
  }

  public navigateToMainMenu() {
    this.router.navigateByUrl("");
  }

  ngOnDestroy() {
    this.gameStateService.gamePaused = false;
  }

}
