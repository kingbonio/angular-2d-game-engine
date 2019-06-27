import { Component, OnInit } from '@angular/core';
import { EquipmentManagerService } from '../services/equipment-manager.service';
import { IInventoryItem } from '../interfaces';
import { InventoryManagerService } from '../services/inventory-manager.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  constructor(
    public equipmentManagerService: EquipmentManagerService,
    public inventoryManagerService: InventoryManagerService,
  ) { }

  ngOnInit() {
  }

  public removeArmour(item: IInventoryItem) {
    if (item) {
      this.inventoryManagerService.addItemToInventory(item);
      this.equipmentManagerService.removeArmour(item.armourSlot);
    }
  }

  public removeWeapon(item: IInventoryItem) {
    if (item) {
      this.inventoryManagerService.addItemToInventory(item);
      this.equipmentManagerService.removeWeapon(item.weaponSlot);
    }
  }

  public removeActiveItem(item: IInventoryItem) {
    if (item) {
      this.inventoryManagerService.addItemToInventory(item);
      this.equipmentManagerService.removeActiveItem();
    }
  }

  public getImageSource(item: IInventoryItem) {
    return 'assets/images/' + item.class + "/" + item.imageFileName;
  }

}
