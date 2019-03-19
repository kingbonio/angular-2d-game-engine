import { Injectable } from '@angular/core';
import { IArmour, IInventoryItem, IWeapons } from '../interfaces';
import { ItemClass, ArmourType } from '../enums';
import { WeaponType } from '../enums/weapon-type';
import { InventoryManagerService } from './inventory-manager.service';

@Injectable()
export class EquipmentManagerService {
  public armour: IArmour = {
    head: null,
    arms: null,
    hands: null,
    torso: null,
    legs: null,
    boots: null,
  };
  public weapons: IWeapons = {
    primary: null,
    secondary: null,
    concealed: null,
    shield: null,
  };

  constructor(
    private inventoryManagerService: InventoryManagerService
    ) { }

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

  public switchArmourType(item: IInventoryItem): IInventoryItem {
    const returnItem = this.armour[item.armourSlot];
    this.armour[item.armourSlot] = item;
    return returnItem;
  }

  public switchWeaponType(item: IInventoryItem): IInventoryItem {
    const returnItem = this.weapons[item.weaponSlot];
    this.weapons[item.weaponSlot] = item;
    return returnItem;
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
    return this.weapons[type];
  }
}
