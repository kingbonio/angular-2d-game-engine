import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import defaults from '../../../shared/defaults';
import { PersistentStateService } from '../../shared/services/persistent-state.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent implements OnInit {
  public data;

  constructor(
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }


  ngOnInit() {
  }

}
