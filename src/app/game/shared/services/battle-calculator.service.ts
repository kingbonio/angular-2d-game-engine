import { Injectable } from '@angular/core';
import defaults from '../../../shared/defaults';
import { Character } from '../../character-classes/character';
import { WeaponType } from '../../item/enums';
import { PotionEffectType } from '../../item/enums/potion-effect-type';
import { IArmourSlots, IInventoryItem } from '../../item/interfaces';
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
     * Calculates the total damage to a target Character
     *
     * @param {Character} target The character we're calculating damage to
     * @param {WeaponType} weaponTypeUsed Reference for player weapon type
     * @param {boolean} isGuarding Whether or not to consider reducing damage
     * @param {IInventoryItem} activeBuff Magical effects to consider
     *
     * @returns {number}
     */
    public getDamageToEnemy(target: Character, weaponTypeUsed: WeaponType, isGuarding = false, activeBuff?: IInventoryItem | null): number {

        // TODO this may become redundant
        const equippedWeapon = this.equipmentManagerService.getWeaponType(weaponTypeUsed);

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
     * Calculates the damage to receive to player from an attack
     *
     * @param {Character} character The character we're calculating damage from
     * @param {WeaponType} weaponTypeUsed Reference for charater weapon type
     * @param {boolean} isGuarding Whether or not to consider reducing damage
     * @param {IInventoryItem} activeBuff Magical effects to consider
     *
     * @returns {number}
     */
    public getDamageToPlayer(character: Character, armour: IArmourSlots, isGuarding = false, activeBuff?: IInventoryItem | null): number {

        let characterDamage = character.baseDamage;

        // TODO We'll be allowing primary only for the time being
        if (character.weapons && character.weapons.primary) {
            characterDamage += character.weapons.primary.properties.damage;
        }

        if (activeBuff && activeBuff.properties.effectType === PotionEffectType.armourOvercharge) {
            const calculatedDamage = this.calculateDamage(armour, characterDamage, isGuarding, activeBuff);

            return calculatedDamage;
        } else {
            const calculatedDamage = this.calculateDamage(armour, characterDamage, isGuarding);

            return calculatedDamage;
        }
    }

    /**
     * Generic method to calculate damage based on weapon damage and equipped armour
     *
     * @param {IArmourSlots} targetArmour The set of items use to reduce the damage
     * @param {number} weaponDamage Base amount of damage done by the weapon
     * @param {boolean} isGuarding Whether or not to consider reducing damage
     * @param {IInventoryItem} activeBuff Magical effects to attack or defence
     *
     * @returns {number}
     */
    private calculateDamage(targetArmour: IArmourSlots, weaponDamage: number, isGuarding = false, activeBuff?: IInventoryItem): number {
        let totalArmourValue = defaults.enemyProperties.baseArmour;

        if (targetArmour) {
            for (const item in targetArmour) {
                if (targetArmour.hasOwnProperty(item) && targetArmour[item]) {
                    totalArmourValue += targetArmour[item].properties.defense;
                }
            }

            if (activeBuff && activeBuff.properties.effectType === PotionEffectType.armourOvercharge) {
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
            damageTaken = Math.floor(damageTaken * defaults.battleMultipliers.guardMultiplier);
        }

        return damageTaken;
    }
}
