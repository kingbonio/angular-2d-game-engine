import { Injectable } from '@angular/core';
import { IArmour, IInventoryItem, IWeapons } from '../interfaces';
import { ItemClass, ArmourType } from '../enums';
import { WeaponType } from '../enums/weapon-type';
import { InventoryManagerService } from './inventory-manager.service';
import { IEquipmentStateData } from '../../shared/interfaces/iequipment-state-data';

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
  public activeItem: IInventoryItem;

  constructor(
    private inventoryManagerService: InventoryManagerService
    ) { }

  // TODO This is inefficient
  get armourTotal() {
    let armourTotal = 0;
    for (const armourSlot in this.armour) {
      if (this.armour.hasOwnProperty(armourSlot) && this.armour[armourSlot]) {
        armourTotal += this.armour[armourSlot].properties.defense;
      }
    }
    return armourTotal;
  }

  get getWeaponDamage() {
    return this.weapons.primary ? this.weapons.primary.properties.damage : 0;
  }

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
        // TODO This actually isn't being used yet but if it is it needs safeguardng for inventory full error
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

  public switchActiveItem(item: IInventoryItem): IInventoryItem {
    const returnItem = this.activeItem;
    this.activeItem = item;
    return returnItem;
  }

  public removeArmour(armourSlot: ArmourType) {
    this.armour[armourSlot] = null;
  }

  public removeWeapon(weaponSlot: WeaponType) {
    this.weapons[weaponSlot] = null;
  }

  public removeActiveItem() {
    this.activeItem = null;
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

  /**
 * Return the area state for storage
 * @returns the state data relevant to this service
 * @returns the state data relevant to this service
 */
  public gatherState(): IEquipmentStateData {
    return {
      armour: this.armour,
      weapons: this.weapons,
      activeItem: this.activeItem,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IEquipmentStateData): void {
    for (const stateSetting in newState) {
      if (newState.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
