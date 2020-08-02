import { Injectable } from '@angular/core';
import defaults from '../../../shared/defaults';
import { Character } from '../../character-classes/character';
import { WeaponType } from '../../item/enums';
import { PotionEffectType } from '../../item/enums/potion-effect-type';
import { IArmour, IInventoryItem } from '../../item/interfaces';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { Dice } from '../util/dice';

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
   * @param isGuarding Whether or not to consider reducing damage
   * @param activeBuff Magical effects to attack or defence
   */
  public getDamageToEnemy(target: Character, weaponTypeUsed: WeaponType, isGuarding = false, activeBuff?: IInventoryItem | null): number | undefined {

    // TODO this may become redundant
    const equippedWeapon = this.equipmentManagerService.getWeaponType(weaponTypeUsed);

    // We'll be allowing primary only for the time being
    let totalDamage = defaults.playerBaseStats.baseDamage;

    if (equippedWeapon) {
      totalDamage += equippedWeapon.properties.damage;
    }

    if (activeBuff && activeBuff.properties.effectType === PotionEffectType.damageOvercharge) {
      totalDamage += activeBuff.properties.effectAmount;
    }

    return this.calculateDamage(target.armour, totalDamage, target.isGuarding);
  }

  /**
   * Checks the armour on the player and calculates damage to from character's weapon
   * @param target The character with equipped armour
   * @param weaponTypeUsed Reference for player weapon type
   * @param isGuarding Whether or not to consider reducing damage
   * @param activeBuff Magical effects to attack or defence
   */
  public getDamageToPlayer(character: Character, armour: IArmour, isGuarding = false, activeBuff?: IInventoryItem | null): number {

    let characterDamage = character.baseDamage;

    // We'll be allowing primary only for the time being
    if (character.weapons && character.weapons.primary) {
      characterDamage += character.weapons.primary.properties.damage;
    }

    if (activeBuff && activeBuff.properties.effectType === PotionEffectType.armour) {
      return this.calculateDamage(armour, characterDamage, isGuarding, activeBuff);
    } else {

      // TODO assumed always using primary
      return this.calculateDamage(armour, characterDamage, isGuarding);
    }
  }

  /**
   * Calculates damage based on weapon damage and armour
   * @param targetArmour The set of items use to reduce the damage
   * @param weaponDamage base amount of damage done by the weapon
   * @param isGuarding whether or not to consider reducing damage
   * @param activeBuff Magical effects to attack or defence
   */
  private calculateDamage(targetArmour: IArmour, weaponDamage: number, isGuarding = false, activeBuff?: IInventoryItem) {
    let totalArmourValue = defaults.enemyProperties.baseArmour;

    if (targetArmour) {
      for (const item in targetArmour) {
        if (targetArmour.hasOwnProperty(item) && targetArmour[item]) {
          totalArmourValue += targetArmour[item].properties.defense;
        }
      }

      if (activeBuff && activeBuff.properties.effectType === PotionEffectType.armour) {
        totalArmourValue += activeBuff.properties.effectAmount;
      }
    }

    const diceRoll = Dice.roll1d20();

    if (diceRoll <= defaults.enemyProperties.minimumAttackRoll) {
      return 0;
    }

    const damageTotal = Math.ceil(weaponDamage * (diceRoll / 20));

    const defenseTotal = Math.ceil(weaponDamage / totalArmourValue);

    let damageTaken = (damageTotal * defenseTotal);

    // Reduce the final amount if the target is guarding
    if (isGuarding) {
      damageTaken = Math.floor(damageTaken * defaults.battleMultipliers.guardDivider);
    }

    return damageTaken;
  }
}
