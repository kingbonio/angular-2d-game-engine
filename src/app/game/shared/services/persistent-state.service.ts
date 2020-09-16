import { Injectable } from '@angular/core';
import * as maps from "../../../game-config/areas/map";
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { InventoryManagerService } from '../../item/services/inventory-manager.service';
import { IAreaStateData, IDialogueStateData, IGameSettings, IInventoryStateData, IPlayerStateData, IStateData } from '../interfaces';
import { IEquipmentStateData } from '../interfaces/iequipment-state-data';
import { AreaStateService } from './area-state.service';
import { DialogueService } from './dialogue.service';
import { PlayerStateService } from './player-state.service';

@Injectable()
export class PersistentStateService {
    private state: IStateData;
    private areaIds: any;

    constructor(
        private areaStateService: AreaStateService,
        private playerStateService: PlayerStateService,
        private dialogueStateService: DialogueService,
        private inventoryManagerService: InventoryManagerService,
        private equipmentManagerService: EquipmentManagerService,
    ) {
        this.areaIds = Object.keys(maps.default);
    }

    /**
     * Gather states from all state-based services and write to storage
     */
    public save(saveSlot: number): void {
        this.collectStates();
        this.saveToStorage(saveSlot);
        this.state = null;
    }

    /**
     * Gather state from storage and apply to all state-based services
     */
    public load(saveSlot: number): void {
        this.state = this.gatherFromStorage(saveSlot);
        this.applyToStates();

        // Ensure the areaStateService performs the necessary actions
        this.areaStateService.loadingSavedGame = true;
        this.areaStateService.loadFromSaveGame(this.state.area);

        this.state = null;
    }

    /**
     * Remove the game from memory
     */
    public delete(saveSlot: number): void {
        localStorage.removeItem("save-slot-" + saveSlot);
    }

    public getGameSettings(): IGameSettings | null {
        const gameSettings = localStorage.getItem("game-settings");
        if (gameSettings && gameSettings.length) {
            return JSON.parse(gameSettings);
        } else {
            return null;
        }
    }

    public saveGameSettings(settings: IGameSettings): void {
        localStorage.setItem("game-settings", JSON.stringify(settings));
    }

    /**
     * Gather states from all relevant services
     */
    private collectStates(): void {
        this.state = {
            area: this.areaStateService.gatherState(),
            otherAreas: this.gatherAreasFromStorage(),
            player: this.playerStateService.gatherState(),
            dialogue: this.dialogueStateService.gatherState(),
            inventory: this.inventoryManagerService.gatherState(),
            equipment: this.equipmentManagerService.gatherState(),
            saveIconSrc: this.getSaveIconSrcFromGame(),
        };
    }

    /**
     * Return the source of the image used for the save icon
     */
    private getSaveIconSrcFromGame() {
        const playerLocation = this.areaStateService.playerLocation;
        const playerGridElement = this.areaStateService.locations[playerLocation];
        return playerGridElement.element.imageFileName;
    }

    public getsaveIconSrcFromStorage(saveSlot): string {
        const state = this.gatherFromStorage(saveSlot);
        return state.saveIconSrc;
    }

    /**
     * Set storage medium to retain current state
     */
    private saveToStorage(saveSlot: number): void {
        localStorage.setItem("save-slot-" + saveSlot, JSON.stringify(this.state));
    }

    /**
     * Get state data from storage medium
     */
    private gatherFromStorage(saveSlot): IStateData {
        return JSON.parse(localStorage.getItem("save-slot-" + saveSlot));
    }

    /**
     * Gathers the states of the areas from local storage
     */
    private gatherAreasFromStorage() {
        const areaStates = {};
        for (const areaId in this.areaIds) {
            if (this.areaIds.hasOwnProperty(areaId) && Number(this.areaIds[areaId]) !== this.areaStateService.currentArea) {
                const areaFromStorage = localStorage.getItem(this.areaIds[areaId]) || "{}";
                areaStates[this.areaIds[areaId]] = JSON.parse(areaFromStorage);
            }
        }
        return areaStates;
    }

    /**
     * Writes the states of the areas to local storage
     */
    private applyAreasToStorage() {
        for (const areaId in this.state.otherAreas) {
            if (this.areaIds.includes(areaId) && Number(areaId) !== this.state.area.currentLocation) {
                localStorage.setItem(areaId, JSON.stringify(this.state.otherAreas[areaId]));
            }
        }
    }

    /**
     * Apply the loaded state data to the services;
     */
    private applyToStates(): void {
        this.areaStateService.applyState(this.state.area as IAreaStateData);
        this.applyAreasToStorage();
        this.playerStateService.applyState(this.state.player as IPlayerStateData);
        this.dialogueStateService.applyState(this.state.dialogue as IDialogueStateData);
        this.inventoryManagerService.applyState(this.state.inventory as IInventoryStateData);
        this.equipmentManagerService.applyState(this.state.equipment as IEquipmentStateData);
    }
}
