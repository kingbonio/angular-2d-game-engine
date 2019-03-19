import { ItemClass, ArmourType } from "../../game/item/enums";

export const Armour = {
      leatherHelmet: {
            name: "Leather Helmet",
            class: ItemClass.armour,
            armourSlot: ArmourType.head,
            weaponSlot: null,
            usable: false,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 100,
            imageFileName: "",
            properties: {
                  damage: 10,
            },
      },
      leatherBoots: {
            name: "Leather Boots",
            class: ItemClass.armour,
            armourSlot: ArmourType.boots,
            weaponSlot: null,
            usable: false,
            level: 1,
            weight: 2,
            inventoryHeight: 2,
            inventoryWidth: 2,
            value: 100,
            imageFileName: "",
            properties: {
                  damage: 12,
            },
      },
};
