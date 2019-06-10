import { Injectable } from '@angular/core';
import { PlayerStateService } from './player-state.service';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { Character } from '../../character-classes/character';
import { WeaponType } from '../../item/enums';
import defaults from '../../../shared/defaults';
import { DialogueService } from './dialogue.service';

@Injectable()
export class BattleCalculatorService {

  constructor(
    private equipmentManagerService: EquipmentManagerService,
    private dialogueService: DialogueService,
  ) { }

  public isDead(hp: number): boolean {
    return (hp <= 0);
  }

  /**
   * Checks the armour on the target and calculates damage to from chosen weapon
   * @param target The character with equipped armour
   * @param weaponTypeUsed Reference for player weapon type
   */
  public calculateDamageToEnemy(target: Character, weaponTypeUsed: WeaponType, levelMultiplyer: number): number | undefined {
    let totalArmourValue = 0;
    let damageTaken = 0;

    for (const item in target.armour) {
      if (target.armour.hasOwnProperty(item) && target.armour[item]) {
        totalArmourValue += target.armour[item].properties.defense;
      }
    }

    const equippedWeapon = this.equipmentManagerService.getWeaponType(weaponTypeUsed);

    const equippedWeaponDamage = equippedWeapon.properties.damage + levelMultiplyer;

    // Round up the damage to the nearest whole number
    damageTaken = Math.ceil(equippedWeaponDamage / totalArmourValue);

    return damageTaken;
  }
}
