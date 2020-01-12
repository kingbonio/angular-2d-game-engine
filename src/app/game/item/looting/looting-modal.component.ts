import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Character } from '../../character-classes/character';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { DialogueService } from '../../shared/services/dialogue.service';
import defaults from '../../../shared/defaults';
import { GameStateService } from '../../shared/services/game-state.service';
import { LootBag } from '../../area/grid-object-classes/loot-bag';
import { ObjectType } from "../../shared/enums";
import { Enemy, NPC } from '../../character-classes';
import { GridObject } from '../../area/grid-object-classes/grid-object';

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
    console.log("Inventory locations: ", this.targetGridData.inventoryLocations);
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
