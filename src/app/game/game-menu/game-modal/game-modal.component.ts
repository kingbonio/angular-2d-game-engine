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
  public saveSlots;
  public objectKeys;

  constructor(
    private persistentStateService: PersistentStateService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.objectKeys = Object.keys;
    this.saveSlots = defaults.gameMenu.saveSlots;
  }

  public saveGame(saveSlot) {
    this.persistentStateService.save(saveSlot);
  }

  public loadGame(saveSlot) {
    this.persistentStateService.load(saveSlot);
  }

  public deleteGame(saveSlot) {
    this.persistentStateService.delete(saveSlot);
  }

  public saveSlotDoesntExist(saveSlot: number): boolean {
    // TODO Intensely inefficient
    return !!(localStorage.getItem("save-slot-" + saveSlot));
  }

  ngOnInit() {
  }

}
