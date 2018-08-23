import { Injectable } from '@angular/core';
import { IArmour, IInventoryItem } from '../interfaces';
import { ItemClass, ArmourType } from '../enums';
import { WeaponType } from '../enums/weapon-type';
import { InventoryManagerService } from './inventory-manager.service';

@Injectable()
export class EquipmentManagerService {
  armour: IArmour;
  weapons: IInventoryItem;

  constructor(private inventoryManagerService: InventoryManagerService) { }

  /**
   * Adds an item to its relevant armour slot
   * @param newArmour armour item being added
   */
  public setArmourType(newArmour: IInventoryItem): void {
    if (newArmour.class !== ItemClass.armour) {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Item is not armour");
    } else {
      if (this.armour[newArmour.armourSlot]) {
        this.inventoryManagerService.addItemToInventory(this.armour[newArmour.armourSlot]);
      }
      this.armour[newArmour.armourSlot] = newArmour;
    }
  }

  /**
   * Adds an item to its relevant armour slot
   * @param newWeapon weapon item being add
   */
  public setWeaponType(newWeapon: IInventoryItem): void {
    if (newWeapon.class !== ItemClass.weapon) {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Item is not a weapon");
    } else {
      this.weapons[newWeapon.weaponSlot] = newWeapon;
    }
  }

  /**
   * Returns the armour item in the *type* slot
   * @param type for selecting armour slot
   */
  public getArmourType(type: ArmourType): IInventoryItem {
    return this.armour[type];
  }

  /**
   * Returns the weapon item in the *type* slot
   * @param type for selecting weapon slot
   */
  public getWeaponType(type: WeaponType): IInventoryItem {
    return this.armour[type];
  }
}
