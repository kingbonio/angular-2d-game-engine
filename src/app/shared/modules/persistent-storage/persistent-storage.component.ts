import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersistentStateService } from '../../../game/shared/services/persistent-state.service';
import defaults from '../../defaults';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-persistent-storage',
  templateUrl: './persistent-storage.component.html',
  styleUrls: ['./persistent-storage.component.scss']
})
export class PersistentStorageComponent {

  public objectKeys;
  public saveSlots;

  constructor(
    private persistentStateService: PersistentStateService,
    public applicationStateService: ApplicationStateService,
    private router: Router,
  ) {
    this.objectKeys = Object.keys;
    this.saveSlots = defaults.gameMenu.saveSlots;
  }

  public getSaveIconImageSource(saveSlot: number) {

    const saveIconSrc = this.persistentStateService.getsaveIconSrcFromStorage(saveSlot);

    if (saveIconSrc) {
    return 'assets/images/save-icons/' + saveIconSrc;
    } else {
    return "default-save-icon.png";
    }
  }

  public saveGame(saveSlot) {
    this.persistentStateService.save(saveSlot);
  }

  public loadGame(saveSlot) {
    if (this.router.url !== "/game") {
    this.applicationStateService.loadingFromOutsideGame = true;
    this.applicationStateService.canAccessGame = true;
    this.router.navigate(["game"]);
    }
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
