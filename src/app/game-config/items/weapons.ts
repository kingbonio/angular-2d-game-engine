import { ItemClass, WeaponType } from "../../game/item/enums";

export const weapons = {
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
                  damage: 4,
            },
      },
      cutthroatRazor: {
            name: "Cutthroat Razor",
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
                  damage: 3,
            },
      },
      sword: {
            name: "Sword",
            class: ItemClass.weapon,
            armourSlot: null,
            weaponSlot: WeaponType.primary,
            usable: false,
            level: 3,
            weight: 4,
            inventoryHeight: 2,
            inventoryWidth: 1,
            value: 100,
            imageFileName: "sword.png",
            properties: {
                  damage: 10,
            },
      },
      axe: {
            name: "Axe",
            class: ItemClass.weapon,
            armourSlot: null,
            weaponSlot: WeaponType.primary,
            usable: false,
            level: 3,
            weight: 4,
            inventoryHeight: 2,
            inventoryWidth: 1,
            value: 100,
            imageFileName: "axe.png",
            properties: {
                  damage: 9,
            },
      },
};