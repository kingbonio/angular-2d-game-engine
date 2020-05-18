import { Component } from '@angular/core';
import defaults from '../../../shared/defaults';
import { DialogueService } from '../../shared/services/dialogue.service';
import { IInventoryItem } from '../interfaces';
import { EquipmentManagerService } from '../services/equipment-manager.service';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { SoundEffects } from '../../../shared/enums';
import { SoundEffectService } from '../../../shared/services/sound-effect.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {

  constructor(
    public equipmentManagerService: EquipmentManagerService,
    public inventoryManagerService: InventoryManagerService,
    private dialogueService: DialogueService,
    private soundEffectsService: SoundEffectService,

  ) { }

  public removeArmour(item: IInventoryItem) {
    if (item) {
      try {
        this.inventoryManagerService.addItemToInventory(item);
        this.equipmentManagerService.removeArmour(item.armourSlot);
        this.soundEffectsService.playSound(SoundEffects.moveItem);
      } catch (err) {
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.inventoryFull,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });
      }
    }
  }

  public removeWeapon(item: IInventoryItem) {
    if (item) {
      try {
        this.inventoryManagerService.addItemToInventory(item);
        this.equipmentManagerService.removeWeapon(item.weaponSlot);
        this.soundEffectsService.playSound(SoundEffects.moveItem);
      } catch (err) {
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.inventoryFull,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });
      }
    }
  }

  public removeActiveItem(item: IInventoryItem) {
    if (item) {
      try {
        this.inventoryManagerService.addItemToInventory(item);
        this.equipmentManagerService.removeActiveItem();
        this.soundEffectsService.playSound(SoundEffects.moveItem);
      } catch (err) {
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.inventoryFull,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });
      }
    }
  }

  public getImageSource(item: IInventoryItem) {
    return 'assets/images/' + item.class + "/" + item.imageFileName;
  }

}
