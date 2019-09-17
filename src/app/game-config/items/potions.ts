import { ItemClass, PotionType } from "../../game/item/enums";
import { PotionEffectType } from "../../game/item/enums/potion-effect-type";

export const potions = {
      smallHealthPotion: {
            name: "Small Health Potion",
            itemReference: "19e43409-a10a-4d3c-854e-74cd1df18de5",
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
            itemReference: "3ec037c4-93e5-4b7f-8395-1d3093663001",
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
                  effectDuration: 20,
            }
      },
};
