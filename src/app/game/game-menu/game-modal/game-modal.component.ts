import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import defaults from '../../../shared/defaults';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit {
  public data;
  public saveSlots;
  public objectKeys;

  constructor(
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.objectKeys = Object.keys;
    this.saveSlots = defaults.gameMenu.saveSlots;
  }

  public saveGame() {

  }

  public loadGame() {

  }

  ngOnInit() {
  }

}
