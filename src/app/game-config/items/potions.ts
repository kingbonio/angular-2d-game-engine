import { ItemClass, PotionType } from "../../game/item/enums";
import { PotionEffectType } from "../../game/item/enums/potion-effect-type";
import { IInventoryItem } from "../../game/item/interfaces";

export const potions = {
    smallHealthPotion: {
        name: "Small Health Potion",
        class: ItemClass.potion,
        type: PotionType.healing,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "health-potion.png",
        properties: {
            effectType: PotionEffectType.healing,
            effectAmount: 20,
        }
    } as IInventoryItem,
    smallArmourBuff: {
        name: "Small Armour Buff",
        class: ItemClass.potion,
        type: PotionType.buff,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "armour-buff-potion.png",
        properties: {
            effectAmount: 20,
            effectType: PotionEffectType.armourOvercharge,
            effectDuration: 10,
        }
    } as IInventoryItem,
    largeArmourBuff: {
        name: "Large Armour Buff",
        class: ItemClass.potion,
        type: PotionType.buff,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "armour-buff-potion.png",
        properties: {
            effectAmount: 40,
            effectType: PotionEffectType.armourOvercharge,
            effectDuration: 10,
        }
    } as IInventoryItem,
    largeHealthBuff: {
        name: "Large Health Buff",
        class: ItemClass.potion,
        type: PotionType.buff,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "health-potion.png",
        properties: {
            effectType: PotionEffectType.healthOvercharge,
            effectDuration: 10,
            effectAmount: 40,
        }
    } as IInventoryItem,
    largeDamageBuff: {
        name: "Large Damage Buff",
        class: ItemClass.potion,
        type: PotionType.buff,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "damage-potion.png",
        properties: {
            effectType: PotionEffectType.damageOvercharge,
            effectDuration: 10,
            effectAmount: 5,
        }
    } as IInventoryItem,
    invisiblityPotion: {
        name: "Invisibility Potion",
        class: ItemClass.potion,
        type: PotionType.buff,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "invisibility-potion.png",
        properties: {
            effectType: PotionEffectType.invisibility,
            effectDuration: 5,
        }
    } as IInventoryItem,
};
