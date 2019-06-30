import { Injectable, OnInit } from '@angular/core';
import * as areaConfig from "../../../game-config/areas/0";
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { weapons, armour } from '../../../game-config/items';
import { InventoryManagerService } from '../../item/services/inventory-manager.service';

@Injectable()
export class AreaConfigProviderService implements OnInit {

  private areaConfig: any;

  constructor(
    private equipmentManagerService: EquipmentManagerService,
    public inventoryManagerService: InventoryManagerService,
    ) {
      // TODO: This needs fixing
      this.areaConfig = areaConfig;
      this.assignEquipmentToPlayer();
      this.assignItemsToInventory();
  }

  ngOnInit() {
  }

  // TODO Probably move this to another class
  private assignEquipmentToPlayer() {
    // TODO This might be useful when properly setting equipment
    // this.equipmentManagerService.setWeaponType(Weapons.cutthroatRazor);
  }

  private assignItemsToInventory() {
    // TODO This might be useful when properly setting equipment
    this.inventoryManagerService.addItemToInventory(weapons.sword);
    this.inventoryManagerService.addItemToInventory(weapons.axe);
    this.inventoryManagerService.addItemToInventory(armour.leatherChestPiece);
    this.inventoryManagerService.addItemToInventory(armour.ironHelmet);
  }

  /**
   * Retrieves the specific config file for the area requested
   * @param id reference for the area
   * @returns the area config object
   */
  public getConfig(id?: number): any {
    // TODO: Should be returning IAreaConfig
    return this.areaConfig;
  }

}
