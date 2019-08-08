import { Injectable } from '@angular/core';
import { AreaStateService } from './area-state.service';
import { PlayerStateService } from './player-state.service';
import { DialogueService } from './dialogue.service';
import { InventoryManagerService } from '../../item/services/inventory-manager.service';
import { GameStateService } from './game-state.service';
import { IStateData, IAreaStateData, IPlayerStateData, IDialogueStateData, IInventoryStateData, IGameStateData } from '../interfaces';
import * as maps from "../../../game-config/areas/map";
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { IEquipmentStateData } from '../interfaces/iequipment-state-data';

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
    this.gatherFromStorage(saveSlot);
    this.applyToStates();
    this.state = null;
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
    };
    console.log(this.state);
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
  private gatherFromStorage(saveSlot): void {
    this.state = JSON.parse(localStorage.getItem("save-slot-" + saveSlot));
  }

  /**
   * Gathers the states of the areas from local storage
   */
  private gatherAreasFromStorage() {
    const areaStates = {};
    for (const areaId in this.areaIds) {
      if (this.areaIds.hasOwnProperty(areaId) && Number(this.areaIds[areaId]) !== this.areaStateService.currentLocation) {
        const areaFromStorage = localStorage.getItem(this.areaIds[areaId]) || "{}";
        console.log(areaFromStorage);
        areaStates[this.areaIds[areaId]] = JSON.parse(areaFromStorage);
      }
    }
    console.log(areaStates);
    return areaStates;
  }

  /**
   * Writes the states of the areas to local storage
   */
  private applyAreasToStorage() {
    for (const areaId in this.state.otherAreas) {
      if (this.areaIds.hasOwnProperty(areaId) && Number(areaId) !== this.state.area.currentLocation) {
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
    console.log(this.state);
  }

}
