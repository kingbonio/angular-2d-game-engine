import { Injectable } from '@angular/core';
import * as maps from "../../../game-config/areas/map";
import { IAreaData } from '../../../game-config/interfaces';
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
     *
     * @param {number} saveSlot The reference for this saved game
     */
    public save(saveSlot: number): void {
        this.collectStates();
        this.saveToStorage(saveSlot);
        this.state = null;
    }

    /**
     * Gather state from storage using the reference provided and applies to all state-based services
     *
     * @param {number} saveSlot The reference for the save game we're loading
     */
    public load(saveSlot: number): void {
        this.state = this.gatherFromStorage(saveSlot);
        this.applyToStates();

        this.areaStateService.loadingSavedGame = true;
        this.areaStateService.loadFromSaveGame(this.state.area);

        this.state = null;
    }

    /**
     * Remove the game from memory
     *
     * @param {number} saveSlot The reference for the save we're removing
     */
    public delete(saveSlot: number): void {
        localStorage.removeItem("save-slot-" + saveSlot);
    }

    /**
     * Gather the game settings from storage
     *
     * @returns {IGameSettings}
     */
    public getGameSettings(): IGameSettings | null {
        const gameSettings = localStorage.getItem("game-settings");
        if (gameSettings && gameSettings.length) {

            return JSON.parse(gameSettings);
        } else {

            return null;
        }
    }

    /**
     * Saves game settings data to storage
     *
     * @param {IGameSettings} settings The settings we're pushing to storage
     */
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
     * Gets the source filename of the image used for the save icon
     *
     * @returns {string}
     */
    private getSaveIconSrcFromGame() {
        const playerLocation = this.areaStateService.playerLocation;
        const playerGridElement = this.areaStateService.locations[playerLocation];

        return playerGridElement.element.imageFileName;
    }

    /**
     * Return the source filename of the image used for the save icon from storage
     *
     * @param {number} saveSlot The reference of the save game we're pulling data from
     *
     * @returns {string}
     */
    public getsaveIconSrcFromStorage(saveSlot: number): string {
        const state = this.gatherFromStorage(saveSlot);

        return state.saveIconSrc;
    }

    /**
     * Set save data to storage
     *
     * @param {number} saveSlot The reference of the save game we're saving
     */
    private saveToStorage(saveSlot: number): void {
        localStorage.setItem("save-slot-" + saveSlot, JSON.stringify(this.state));
    }

    /**
     * Get state data from storage
     *
     * @param {number} saveSlot The reference of the save game we're getting data for
     *
     * @return {IStateData}
     */
    private gatherFromStorage(saveSlot: number): IStateData {
        return JSON.parse(localStorage.getItem("save-slot-" + saveSlot));
    }

    /**
     * Gathers the states of the areas for the current game from local storage
     *
     * @returns {any} The collection of area states
     */
    private gatherAreasFromStorage(): any {
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
     * Writes the states of the areas of the current game to local storage
     */
    private applyAreasToStorage(): void {

        this.clearAreas();

        // Set the current area
        const currentArea: IAreaData = {
            config: this.state.area.areaConfig,
            locations: this.state.area.locations
        };

        localStorage.setItem(String(this.state.area.currentArea), JSON.stringify(currentArea));

        // Set the other areas
        for (const areaId in this.state.otherAreas) {
            if (this.areaIds.includes(areaId) && Number(areaId) !== this.state.area.currentArea) {
                localStorage.setItem(areaId, JSON.stringify(this.state.otherAreas[areaId]));
            }
        }
    }

    /**
     * Clears the local storage of area data
     */
    public clearAreas() {

        // Set all areas to be empty
        for (const areaId in this.areaIds) {
            if (this.areaIds.hasOwnProperty(areaId)) {
                localStorage.setItem(areaId, "{}");
            }
        }
    }

    /**
     * Apply the current state data to the services
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
