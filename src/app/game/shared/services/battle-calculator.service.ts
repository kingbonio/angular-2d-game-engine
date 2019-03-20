import { Injectable } from '@angular/core';
import { PlayerStateService } from './player-state.service';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { Character } from '../../character-classes/character';
import { WeaponType } from '../../item/enums';
import defaults from '../../../shared/defaults';

@Injectable()
export class BattleCalculatorService {

  constructor(
    private equipmentManagerService: EquipmentManagerService,
    ) { }

  public isDead(hp: number): boolean {
    return (hp <= 0);
  }

  /**
   * Checks the armour on the target and calculates damage to from chosen weapon
   * @param target The character with equipped armour
   * @param weaponTypeUsed Reference for player weapon type
   */
  public calculateDamageToEnemy(target: Character, weaponTypeUsed: WeaponType, levelMultiplyer: number): number {
    let totalArmourValue = 0;

    for (const item in target.armour) {
      if (target.armour.hasOwnProperty(item)) {
        totalArmourValue += target.armour[item].properties.defense;
      }
    }

    const equippedWeapon = this.equipmentManagerService.getWeaponType(weaponTypeUsed);

    const equippedWeaponDamage = equippedWeapon.properties.damage + levelMultiplyer;

    if (equippedWeapon) {
      // Round up the damage to the nearest whole number
      return Math.ceil(equippedWeaponDamage / totalArmourValue);
    }

    return 0;
  }
}
