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

    /**
     * Calculates and returns the total armour protection value for the player
     *
     * @returns {number}
     */
    get armourTotal(): number {
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

    /**
     * Calculates and returns the total weapon damage value for the player
     *
     * @returns {number}
     */
    get getWeaponDamage(): number {
      let totalDamage = this.weapons.primary ? this.weapons.primary.properties.damage : defaults.playerBaseStats.baseDamage;
      if (this.activeBuff && this.activeBuff.properties.effectType === PotionEffectType.damageOvercharge) {
        totalDamage += this.activeBuff.properties.effectAmount;
      }

      return totalDamage;
    }

    /**
     * Adds an item to its relevant armour slot
     *
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
     *
     * @param newWeapon weapon item being add
     */
    public setWeaponType(newWeapon: IInventoryItem): void {
      if (newWeapon.class !== ItemClass.weapon) {
        // Do nothing
      } else {
        this.weapons[newWeapon.weaponSlot] = newWeapon;
      }
    }

    /**
     * Adds item to the relevant armour slot and returns the existing item if being replaced
     *
     * @param {IInventoryItem} item The item to go into the armour slot
     *
     * @returns {IInventoryItem}
     */
    public switchArmourType(item: IInventoryItem): IInventoryItem {
      const returnItem = this.armour[item.armourSlot];
      this.armour[item.armourSlot] = item;
      return returnItem;
    }

    /**
     * Adds item to the relevant weapon slot and returns the existing item if being replaced
     *
     * @param {IInventoryItem} item The item to go into the weapon slot
     *
     * @returns {IInventoryItem}
     */
    public switchWeaponType(item: IInventoryItem): IInventoryItem {
      const returnItem = this.weapons[item.weaponSlot];
      this.weapons[item.weaponSlot] = item;
      return returnItem;
    }

    /**
     * Adds item to the relevant active item slot and returns the existing item if being replaced
     *
     * @param {IInventoryItem} item The item to go into the active item slot
     *
     * @returns {IInventoryItem}
     */
    public switchActiveItem(item: IInventoryItem): IInventoryItem {
      const returnItem = this.activeItem;
      this.activeItem = item;
      return returnItem;
    }

    /**
     * Destroys the item in the armour slot given
     *
     * @param {ArmourType} armourSlot
     */
    public removeArmour(armourSlot: ArmourType): void {
      this.armour[armourSlot] = null;
    }

    /**
     * Destroys the item in the armour slot given
     *
     * @param {WeaponType} armourSlot
     */
    public removeWeapon(weaponSlot: WeaponType): void {
      this.weapons[weaponSlot] = null;
    }

    /**
     * Destroys the equipped active item
     */
    public removeActiveItem(): void {
      this.activeItem = null;
    }

    /**
     * Destroys the equipped active item
     */
    public destroyActiveItem(): void {
      this.activeItem = null;
    }

    /**
     * Gets the armour item in the type slot requested
     *
     * @param {ArmourType} type For selecting armour slot
     *
     * @returns {IInventoryItem}
     */
    public getArmourType(type: ArmourType): IInventoryItem {
      return this.armour[type];
    }

    /**
     * Gets the armour item in the type slot requested
     *
     * @param {WeaponType} type For selecting weapon slot
     *
     * @returns {IInventoryItem}
     */
    public getWeaponType(type: WeaponType = WeaponType.primary): IInventoryItem {
      return this.weapons[type];
    }

    /**
     * Kicks off a counter for how long a buff will remain active for
     *
     * @param duration The starting time of the duration
     */
    public startBuffTimer(duration: number): void {
      this.buffTimeRemaining = duration;
    }

    /**
     * Sets service's state to default
     */
    public setDefaults(): void {
      this.armour = {
        head: null,
        arms: null,
        hands: null,
        torso: null,
        legs: null,
        boots: null,
      };
      this.weapons = {
        primary: null
      };

      this.activeItem = null;
      this.activeBuff = null;
      this.buffTimeRemaining = 0;
    }

    /**
     * Return the equipment service's state
     *
     * @returns {IEquipmentStateData}
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
     *
     * @param {IEquipmentStateData} newState Settings to push to this state service
     */
    public applyState(newState: IEquipmentStateData): void {
      for (const stateSetting in newState) {
        if (newState.hasOwnProperty(stateSetting)) {
            this[stateSetting] = newState[stateSetting];
        }
      }
    }
}
