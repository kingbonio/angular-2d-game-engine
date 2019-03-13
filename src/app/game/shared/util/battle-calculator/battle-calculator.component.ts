import { Component, OnInit } from '@angular/core';
import { Character } from '../../../character-classes/character';
import { IArmour, IInventoryItem } from '../../interfaces';
import { ItemClass } from '../../enums';
import defaults from '../../../../shared/defaults';
import { WeaponType } from '../../../item/enums';
import { EquipmentManagerService } from '../../../item/services/equipment-manager.service';
import { PlayerStateService } from '../../services/player-state.service';

@Component({
  selector: 'app-battle-calculator',
  template: ''
})
export class BattleCalculatorComponent {

  constructor(
    private equipmentManagerService: EquipmentManagerService,
    private playerStateService: PlayerStateService,
    ) { }

  public isDead(hp: number): boolean {
    return (hp <= 0);
  }

  // // TODO This will include a lot of armour/weapon calculations
  // public calculateDamage(target: Character): number {
  //   return 10;
  // }


  // /**
  //  * Accepts parameters which will calculate the outcome of the attack
  //  * @param weapon Will determine the base attack damage
  //  * @param armour The items which will reduce the attack damage
  //  */
  // public calculateAttackDamage(weapon: IInventoryItem | null, armour: IInventoryItem[] = []): number {
  //   let totalArmourValue = 0;

  //   // Cycle over the armour items and determine total reduction in attack
  //   armour.forEach(item => {
  //     if (item.class === ItemClass.armour || item.class === ItemClass.shield) {
  //       totalArmourValue += item.properties.defense;
  //     }
  //   });

  //   // const totalDamage;

  //   // Take the damage of the weapon and calculate the total damage based on the armour
  //   // Round this up to the nearest whole number
  //   // Minimum returned value will be 1
  //   if (weapon) {
  //     return Math.ceil(weapon.properties.damage / totalArmourValue);
  //   }
  //   return defaults.playerMultiplyers.levelStatMultiplyer;
  // }




  /**
   * Checks the armour on the target and calculates damage to from chosen weapon
   * @param target The character with equipped armour
   * @param weaponTypeUsed Reference for player weapon type
   */
  public calculateDamageToEnemy(target: Character, weaponTypeUsed: WeaponType): number {
    let totalArmourValue = 0;

    for (const item in target.armour) {
      if (target.armour.hasOwnProperty(item)) {
        totalArmourValue += target.armour[item].properties.defense;
      }
    }

    const equippedWeapon = this.equipmentManagerService.getWeaponType(weaponTypeUsed);

    const levelMultiplyer = this.playerStateService.level * defaults.playerMultiplyers.levelStatMultiplyer;

    const equippedWeaponDamage = equippedWeapon.properties.damage + levelMultiplyer;

    if (equippedWeapon) {
      // Round up the damage to the nearest whole number
      return Math.ceil(equippedWeaponDamage / totalArmourValue);
    }

    return 0;
  }
}
