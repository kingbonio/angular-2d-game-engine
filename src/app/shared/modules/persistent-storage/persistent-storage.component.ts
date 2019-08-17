import { Component, OnInit } from '@angular/core';
import { PersistentStateService } from '../../../game/shared/services/persistent-state.service';
import defaults from '../../defaults';

@Component({
  selector: 'app-persistent-storage',
  templateUrl: './persistent-storage.component.html',
  styleUrls: ['./persistent-storage.component.scss']
})
export class PersistentStorageComponent implements OnInit {

  public objectKeys;
  public saveSlots;

  constructor(
    private persistentStateService: PersistentStateService,
  ) {
    this.objectKeys = Object.keys;
    this.saveSlots = defaults.gameMenu.saveSlots;
  }

  ngOnInit() {
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
}
