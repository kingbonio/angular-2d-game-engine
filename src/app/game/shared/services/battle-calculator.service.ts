import defaults from '../../../shared/defaults';
import { Injectable } from '@angular/core';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { Character } from '../../character-classes/character';
import { WeaponType } from '../../item/enums';
import { DialogueService } from './dialogue.service';
import { IArmour, IWeapons, IInventoryItem } from '../../item/interfaces';
import { Dice } from '../util/dice';
import { PlayerStateService } from './player-state.service';
import { PotionEffectType } from '../../item/enums/potion-effect-type';

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
  public getDamageToEnemy(target: Character, weaponTypeUsed: WeaponType): number | undefined {

    const equippedWeapon = this.equipmentManagerService.getWeaponType(weaponTypeUsed);

    return this.calculateDamage(target.armour, equippedWeapon);
  }

  public getDamageToPlayer(character: Character, armour: IArmour, activeBuff: IInventoryItem): number {

    if (activeBuff && activeBuff.properties.effectType === PotionEffectType.armour) {

      return this.calculateDamage(armour, character.weapons.primary, activeBuff.properties.effectAmount);
    } else {

      // TODO assumed always using primary
      return this.calculateDamage(armour, character.weapons.primary);
    }

  }

  private calculateDamage(targetArmour: IArmour, weapon: IInventoryItem, buff?: number) {
    let totalArmourValue = defaults.enemyProperties.baseArmour;

    if (targetArmour) {
      for (const item in targetArmour) {
        if (targetArmour.hasOwnProperty(item) && targetArmour[item]) {
          totalArmourValue += targetArmour[item].properties.defense;

        }
      }

      if (buff) {
        totalArmourValue += buff;
      }
    }

    const diceRoll = Dice.roll1d20();

    if (diceRoll <= defaults.enemyProperties.minimumAttackRoll) {
      return 0;
    }

    const damageTotal = Math.ceil(weapon.properties.damage * (diceRoll / 20));

    const defenseTotal = Math.ceil(weapon.properties.damage / totalArmourValue);

    const damageTaken = damageTotal * defenseTotal;

    return damageTaken;
  }
}
