import { Injectable } from '@angular/core';
import { AreaStateService } from './area-state.service';
import { PlayerStateService } from './player-state.service';
import { DialogueService } from './dialogue.service';
import { InventoryManagerService } from './inventory-manager.service';
import { GameStateService } from './game-state.service';
import { IStateData, IAreaStateData, IPlayerStateData, IDialogueStateData, IInventoryStateData, IGameStateData } from '../interfaces';

@Injectable()
export class PersistentStateService {
  state: IStateData;

  constructor(private gameStateService: GameStateService,
    private areaStateService: AreaStateService,
    private playerStateService: PlayerStateService,
    private dialogueStateService: DialogueService,
    private inventoryManagerService: InventoryManagerService
  ) { }

  public save() {
    this.collectStates();
    this.applyToStorage();
  }

  public load() {
    this.gatherFromStorage();
    this.applyToStates();
  }

  /**
   * Gather states from all relevant services
   */
  private collectStates(): void {
    this.state = {
      gameState: this.gameStateService.gatherState(),
      area: this.areaStateService.gatherState(),
      player: this.playerStateService.gatherState(),
      dialogue: this.dialogueStateService.gatherState(),
      inventory: this.inventoryManagerService.gatherState(),
    };
  }

  /**
   * Set storage medium to retain current state
   */
  private applyToStorage(): void {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  /**
   * Get state data from storage medium
   */
  private gatherFromStorage(): void {
    this.state = JSON.parse(localStorage.getItem("state"));
  }

  /**
   * Apply the loaded state data to the services;
   */
  private applyToStates(): void {
    this.gameStateService.applyState(this.state.gameState as IGameStateData);
    this.areaStateService.applyState(this.state.area as IAreaStateData);
    this.playerStateService.applyState(this.state.player as IPlayerStateData);
    this.dialogueStateService.applyState(this.state.dialogue as IDialogueStateData);
    this.inventoryManagerService.applyState(this.state.inventory as IInventoryStateData);
  }

}
