import { Injectable, OnInit } from '@angular/core';
import * as areaConfigs from "../../../game-config/areas";
import * as maps from "../../../game-config/areas/map";
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { weapons, armour, potions } from '../../../game-config/items';
import { InventoryManagerService } from '../../item/services/inventory-manager.service';

@Injectable()
export class AreaConfigProviderService implements OnInit {

  private areas: any;
  private map: any;

  constructor(
    private equipmentManagerService: EquipmentManagerService,
    public inventoryManagerService: InventoryManagerService,
    ) {
      // TODO: This needs fixing
      this.areas = areaConfigs;
      this.map = maps.default;
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
    // TODO This is not safeguarded against the inventory being full, when sorting this sort that
    this.inventoryManagerService.addItemToInventory(potions.smallArmourBuff);
    this.inventoryManagerService.addItemToInventory(potions.smallHealthPotion);
    this.inventoryManagerService.addItemToInventory(potions.invisiblityPotion);
    this.inventoryManagerService.addItemToInventory(potions.largeHealthBuff);
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
  public getAreaConfig(id?: number): any {
    // TODO: Should be returning IAreaConfig
    return this.areas["area" + id].default;
  }

  public getAreaExits(id?: number): any {
    // TODO Should get from id
    return this.map[id];
  }

}
