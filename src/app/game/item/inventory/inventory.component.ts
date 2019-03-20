import { Component, OnInit } from '@angular/core';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { IInventoryItem } from '../interfaces';
import { ItemClass } from '../enums';
import { EquipmentManagerService } from '../services/equipment-manager.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(
    public inventoryManagerService: InventoryManagerService,
    public equipmentManagerService: EquipmentManagerService,
  ) { }

  ngOnInit() {
  }

  public useItem(itemSlot: string) {
    if (this.inventoryManagerService.locations[itemSlot]) {
      switch (this.inventoryManagerService.locations[itemSlot].class) {
        case (ItemClass.armour):
          // Place item in armour slot
          this.inventoryManagerService.locations[itemSlot] = this.equipmentManagerService.switchArmourType(this.inventoryManagerService.locations[itemSlot]);
          break;
        case (ItemClass.weapon):
          // Place item in weapon slot
          this.inventoryManagerService.locations[itemSlot] = this.equipmentManagerService.switchWeaponType(this.inventoryManagerService.locations[itemSlot]);
          break;
        case (ItemClass.potion):
          // Drink potion and inbue effect
          break;
        case (ItemClass.misc):
          // Attempt to use item
          break;
      }
    }
  }

}
