import { Injectable } from '@angular/core';
import defaults from '../../../shared/defaults';
import { IEquipmentStateData } from '../../shared/interfaces/iequipment-state-data';
import { TimerService } from '../../shared/services/timer.service';
import { ArmourType, ItemClass } from '../enums';
import { PotionEffectType } from '../enums/potion-effect-type';
import { WeaponType } from '../enums/weapon-type';
import { IArmour, IInventoryItem, IWeapons } from '../interfaces';
import { InventoryManagerService } from './inventory-manager.service';

@Injectable()
export class EquipmentManagerService {
  public armour: IArmour;
  public weapons: IWeapons;
  public activeItem: IInventoryItem;
  public activeBuff: IInventoryItem | null;
  public buffTimeRemaining: number;

  constructor(
    private inventoryManagerService: InventoryManagerService,
    private timerService: TimerService,
  ) {
    this.setDefaults();
    this.timerService.counter.subscribe(value => {
      if (this.buffTimeRemaining > 0) {
        this.buffTimeRemaining--;
      } else {
        this.activeBuff = null;
      }
    });
  }

  // TODO This is inefficient
  get armourTotal() {
    let armourTotal = 0;
    for (const armourSlot in this.armour) {
      if (this.armour.hasOwnProperty(armourSlot) && this.armour[armourSlot]) {
        armourTotal += this.armour[armourSlot].properties.defense;

      }
    }
    if (this.activeBuff && this.activeBuff.properties.effectType === PotionEffectType.armour) {
      armourTotal += this.activeBuff.properties.effectAmount;
    }
    return armourTotal;
  }

  get getWeaponDamage() {
    let totalDamage = this.weapons.primary ? this.weapons.primary.properties.damage : defaults.playerBaseStats.baseDamage;
    if (this.activeBuff && this.activeBuff.properties.effectType === PotionEffectType.damage) {
      totalDamage += this.activeBuff.properties.effectAmount;
    }
    return totalDamage;
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

  public destroyActiveItem() {
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

  public startBuffTimer(duration: number): void {
    this.buffTimeRemaining = duration;
  }

  /**
   * Resets service's state to default
   */
  public setDefaults() {
    this.armour = {
      head: null,
      arms: null,
      hands: null,
      torso: null,
      legs: null,
      boots: null,
    };
    this.weapons = {
      primary: null,
      secondary: null,
      concealed: null,
      shield: null,
    };

    this.activeItem = null;
    this.activeBuff = null;
    this.buffTimeRemaining = 0;
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
