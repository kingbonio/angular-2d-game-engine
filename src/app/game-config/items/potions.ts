import { ItemClass, PotionType } from "../../game/item/enums";
import { PotionEffectType } from "../../game/item/enums/potion-effect-type";

export const potions = {
      smallHealthPotion: {
            name: "Small Health Potion",
            class: ItemClass.potion,
            type: PotionType.healing,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 10,
            imageFileName: "health-potion.png",
            properties: {
                  effectType: PotionEffectType.healing,
                  effectAmount: 20,
            }
      },
      smallArmourBuff: {
            name: "Small Armour Buff",
            class: ItemClass.potion,
            type: PotionType.buff,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 20,
            imageFileName: "armour-buff-potion.png",
            properties: {
                  effectAmount: 20,
                  effectType: PotionEffectType.armour,
                  effectDuration: 10,
            }
      },
      largeArmourBuff: {
            name: "Large Armour Buff",
            class: ItemClass.potion,
            type: PotionType.buff,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 3,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 40,
            imageFileName: "armour-buff-potion.png",
            properties: {
                  effectAmount: 40,
                  effectType: PotionEffectType.armour,
                  effectDuration: 10,
            }
      },
      largeHealthBuff: {
            name: "Large Health Buff",
            class: ItemClass.potion,
            type: PotionType.buff,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 3,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 30,
            imageFileName: "health-potion.png",
            properties: {
                  effectType: PotionEffectType.healthOvercharge,
                  effectDuration: 10,
                  remainingEffect: 10,
            }
      },
      smallDamageBuff: {
            name: "Small Damage Buff",
            class: ItemClass.potion,
            type: PotionType.buff,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 30,
            imageFileName: "damage-potion.png",
            properties: {
                  effectType: PotionEffectType.damage,
                  effectDuration: 10,
                  effectAmount: 10,
            }
      },
      invisiblityPotion: {
            name: "Invisibility Potion",
            class: ItemClass.potion,
            type: PotionType.buff,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 5,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 100,
            imageFileName: "invisibility-potion.png",
            properties: {
                  effectType: PotionEffectType.invisibility,
                  effectDuration: 10,
            }
      },
};
