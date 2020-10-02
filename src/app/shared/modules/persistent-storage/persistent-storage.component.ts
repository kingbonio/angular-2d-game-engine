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

    /**
     * Retrieves the location of the image for the save slot
     *
     * @param {number} saveSlot The reference for the save slot
     *
     * @returns {string}
     */
    public getSaveIconImageSource(saveSlot: number): string {

        const saveIconSrc = this.persistentStateService.getsaveIconSrcFromStorage(saveSlot);

        if (saveIconSrc) {
            return 'assets/images/save-icons/' + saveIconSrc;
        } else {
            return "default-save-icon.png";
        }
    }

    /**
     * Saves the game state to storage
     *
     * @param {number} saveSlot The reference for the save slot
     */
    public saveGame(saveSlot: number): void {
        this.persistentStateService.save(saveSlot);
    }

    /**
     * Pulls data from storage for the save game and loads it
     *
     * @param {number} saveSlot The reference for the save slot
     */
    public loadGame(saveSlot: number): void {
        if (this.router.url !== "/game") {
            this.applicationStateService.loadingFromOutsideGame = true;
            this.applicationStateService.canAccessGame = true;
            this.router.navigate(["game"]);
        }
        this.persistentStateService.load(saveSlot);
    }

    /**
     * Deletes the save game from storage
     *
     * @param {number} saveSlot The reference for the save slot
     */
    public deleteGame(saveSlot: number): void {
        this.persistentStateService.delete(saveSlot);
    }

    /**
     * Determines if save slot is being used in persistent storage
     *
     * @param {number} saveSlot The reference for the save slot
     *
     * @returns {boolean}
     */
    public saveSlotDoesntExist(saveSlot: number): boolean {
        return !!(localStorage["save-slot-" + saveSlot]);
    }
}
