import { Component, OnInit } from '@angular/core';
import { EquipmentManagerService } from '../services/equipment-manager.service';
import { IInventoryItem } from '../interfaces';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { DialogueService } from '../../shared/services/dialogue.service';
import defaults from '../../../shared/defaults';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  constructor(
    public equipmentManagerService: EquipmentManagerService,
    public inventoryManagerService: InventoryManagerService,
    private dialogueService: DialogueService,

  ) { }

  ngOnInit() {
  }

  public removeArmour(item: IInventoryItem) {
    if (item) {
      try {
        this.inventoryManagerService.addItemToInventory(item);
        this.equipmentManagerService.removeArmour(item.armourSlot);
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