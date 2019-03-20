import { ItemClass, WeaponType } from "../../game/item/enums";

export const Weapons = {
      basicKnife: {
            name: "Basic Knife",
            class: ItemClass.weapon,
            armourSlot: null,
            weaponSlot: WeaponType.primary,
            usable: false,
            level: 1,
            weight: 2,
            inventoryHeight: 2,
            inventoryWidth: 1,
            value: 100,
            imageFileName: "",
            properties: {
                  damage: 10,
            },
      },
      cuthroatRazor: {
            name: "Cuthroat Razor",
            class: ItemClass.weapon,
            armourSlot: null,
            weaponSlot: WeaponType.primary,
            usable: false,
            level: 1,
            weight: 2,
            inventoryHeight: 2,
            inventoryWidth: 1,
            value: 100,
            imageFileName: "",
            properties: {
                  damage: 12,
            },
      },
};
