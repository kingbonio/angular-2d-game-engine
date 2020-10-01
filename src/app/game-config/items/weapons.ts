import { ItemClass, WeaponType } from "../../game/item/enums";
import { IInventoryItem } from "../../game/item/interfaces";

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
    } as IInventoryItem,
    cutthroatRazor: {
        name: "Cutthroat Razor",
        class: ItemClass.weapon,
        armourSlot: null,
        weaponSlot: WeaponType.primary,
        imageFileName: "",
        properties: {
            damage: 3,
        },
    } as IInventoryItem,
    sword: {
        name: "Sword",
        class: ItemClass.weapon,
        armourSlot: null,
        weaponSlot: WeaponType.primary,
        imageFileName: "sword.png",
        properties: {
            damage: 6,
        },
    } as IInventoryItem,
    axe: {
        name: "Axe",
        class: ItemClass.weapon,
        armourSlot: null,
        weaponSlot: WeaponType.primary,
        imageFileName: "axe.png",
        properties: {
            damage: 5,
        },
    } as IInventoryItem,
};
