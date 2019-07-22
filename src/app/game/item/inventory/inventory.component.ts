import { Component, OnInit } from '@angular/core';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { IInventoryItem } from '../interfaces';
import { ItemClass } from '../enums';
import { EquipmentManagerService } from '../services/equipment-manager.service';
import { PlayerStateService } from '../../shared/services/player-state.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(
    public inventoryManagerService: InventoryManagerService,
    public equipmentManagerService: EquipmentManagerService,
    public playerStateService: PlayerStateService,
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
          this.playerStateService.useConsumable(this.inventoryManagerService.locations[itemSlot]);
          this.inventoryManagerService.locations[itemSlot] = null;
          break;
        case (ItemClass.keyItem):
          // Assign the item to active slot
          this.inventoryManagerService.locations[itemSlot] = this.equipmentManagerService.switchActiveItem(this.inventoryManagerService.locations[itemSlot]);
          break;
      }
    }
  }




}
