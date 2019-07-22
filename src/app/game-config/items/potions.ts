import { ItemClass, PotionType } from "../../game/item/enums";

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
                  healing: 20,
            }
      },
};
