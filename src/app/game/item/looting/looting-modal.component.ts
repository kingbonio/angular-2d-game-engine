import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import defaults from '../../../shared/defaults';
import { GridObject } from '../../area/grid-object-classes/grid-object';
import { LootBag } from '../../area/grid-object-classes/loot-bag';
import { DialogueService } from '../../shared/services/dialogue.service';
import { GameStateService } from '../../shared/services/game-state.service';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { SoundEffectService } from '../../../shared/services/sound-effect.service';
import { SoundEffects } from '../../../shared/enums';

@Component({
    selector: 'app-looting',
    templateUrl: './looting-modal.component.html',
    styleUrls: ['./looting-modal.component.scss']
})
export class LootingModalComponent implements OnDestroy {
    public targetGridData: GridObject | LootBag;

    constructor(
      private inventoryManagerService: InventoryManagerService,
      private dialogueService: DialogueService,
      private gameStateService: GameStateService,
      private soundEffectsService: SoundEffectService,
      @Inject(MAT_DIALOG_DATA) data
    ) {
      this.targetGridData = data;
      this.gameStateService.gamePaused = true;
    }

    /**
     * Attempts to put the item selected into the player's inventory
     *
     * @param {string} itemSlot The location of the item in the loot inventory
     */
    public useItem(itemSlot: string): void {
      try {
        this.inventoryManagerService.addItemToInventory(this.targetGridData.inventoryLocations[itemSlot]);

        // Only perform this if error not thrown
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.takenItem(this.targetGridData.inventoryLocations[itemSlot].name),
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });

        this.targetGridData.inventoryLocations[itemSlot] = null;
        this.soundEffectsService.playSound(SoundEffects.moveItem);
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
