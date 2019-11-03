import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Character } from '../../character-classes/character';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { DialogueService } from '../../shared/services/dialogue.service';
import defaults from '../../../shared/defaults';
import { GameStateService } from '../../shared/services/game-state.service';

@Component({
  selector: 'app-looting',
  templateUrl: './looting-modal.component.html',
  styleUrls: ['./looting-modal.component.scss']
})
export class LootingModalComponent implements OnInit, OnDestroy {
  public target: Character;

  constructor(
    private inventoryManagerService: InventoryManagerService,
    private dialogueService: DialogueService,
    private gameStateService: GameStateService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.target = data;
  }

  ngOnInit() {
    console.log(this.target);
    this.gameStateService.gamePaused = true;
  }

  public useItem(itemSlot: string) {
    try {
      this.inventoryManagerService.addItemToInventory(this.target.inventoryLocations[itemSlot]);

      // Only perform this is error not thrown
      this.target.inventoryLocations[itemSlot] = null;
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
