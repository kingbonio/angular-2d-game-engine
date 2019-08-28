import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Character } from '../../character-classes/character';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { DialogueService } from '../../shared/services/dialogue.service';
import defaults from '../../../shared/defaults';

@Component({
  selector: 'app-looting',
  templateUrl: './looting-modal.component.html',
  styleUrls: ['./looting-modal.component.scss']
})
export class LootingModalComponent implements OnInit {
  public target: Character;

  constructor(
    private inventoryManagerService: InventoryManagerService,
    private dialogueService: DialogueService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.target = data;
  }

  ngOnInit() {
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

}
