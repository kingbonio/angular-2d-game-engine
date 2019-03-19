import { Injectable } from '@angular/core';
import { IAreaConfig } from '../../../game-config/interfaces';
import * as areaConfig from "../../../game-config/areas";
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { Weapons, Armour } from '../../../game-config/items';
import { InventoryManagerService } from '../../item/services/inventory-manager.service';

@Injectable()
export class AreaConfigProviderService {

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

  private assignEquipmentToPlayer() {
    // TODO This might be useful when properly setting equipment
    // this.equipmentManagerService.setWeaponType(Weapons.cuthroatRazor);
  }

  private assignItemsToInventory() {
    // TODO This might be useful when properly setting equipment
    this.inventoryManagerService.addItemToInventory(Weapons.cuthroatRazor);
    this.inventoryManagerService.addItemToInventory(Armour.leatherHelmet);
  }

  /**
   * Retrieves the specific config file for the area requested
   * @param id reference for the area
   * @returns the area config object
   */
  public getConfig(id: number): any {
    // TODO: Should be returning IAreaConfig
    return areaConfig;
  }

}
