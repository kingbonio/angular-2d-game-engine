import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import defaults from '../../../shared/defaults';
import { GridObject } from '../../area/grid-object-classes/grid-object';
import { LootBag } from '../../area/grid-object-classes/loot-bag';
import { DialogueService } from '../../shared/services/dialogue.service';
import { GameStateService } from '../../shared/services/game-state.service';
import { InventoryManagerService } from '../services/inventory-manager.service';

@Component({
  selector: 'app-looting',
  templateUrl: './looting-modal.component.html',
  styleUrls: ['./looting-modal.component.scss']
})
export class LootingModalComponent implements OnInit, OnDestroy {
  public targetGridData: GridObject | LootBag;

  constructor(
    private inventoryManagerService: InventoryManagerService,
    private dialogueService: DialogueService,
    private gameStateService: GameStateService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.targetGridData = data;
  }

  ngOnInit() {
    this.gameStateService.gamePaused = true;
  }

  public useItem(itemSlot: string) {
    try {
      this.inventoryManagerService.addItemToInventory(this.targetGridData.inventoryLocations[itemSlot]);

      // Only perform this is error not thrown
      this.targetGridData.inventoryLocations[itemSlot] = null;
    } catch (err) {
      this.dialogueService.displayDialogueMessage({
        text: defaults.dialogue.inventoryFull,
        character: defaults.dialogue.computerCharacterType,
        name: defaults.dialogue.computerName
      });
    }
  }

  ngOnDestroy() {
    this.gameStateService.gamePaused = false;
  }

}
