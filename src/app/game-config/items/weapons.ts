import { ItemClass, WeaponType } from "../../game/item/enums";

export const weapons = {
      basicKnife: {
            name: "Basic Knife",
            class: ItemClass.weapon,
            armourSlot: null,
            weaponSlot: WeaponType.primary,
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
            imageFileName: "sword.png",
            properties: {
                  damage: 6,
            },
      },
      axe: {
            name: "Axe",
            class: ItemClass.weapon,
            armourSlot: null,
            weaponSlot: WeaponType.primary,
            imageFileName: "axe.png",
            properties: {
                  damage: 5,
            },
      },
};
