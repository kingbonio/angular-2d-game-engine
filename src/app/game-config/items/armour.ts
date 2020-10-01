import { ArmourType, ItemClass } from "../../game/item/enums";
import { IInventoryItem } from "../../game/item/interfaces";

export const armour = {
    leatherHelmet: {
        name: "Leather Helmet",
        class: ItemClass.armour,
        armourSlot: ArmourType.head,
        weaponSlot: null,
        imageFileName: "",
        properties: {
            defense: 10,
        },
    } as IInventoryItem,
    fedora: {
        name: "Fedora",
        class: ItemClass.armour,
        armourSlot: ArmourType.head,
        weaponSlot: null,
        imageFileName: "",
        properties: {
            defense: 0,
        },
    } as IInventoryItem,
    leatherBoots: {
        name: "Leather Boots",
        class: ItemClass.armour,
        armourSlot: ArmourType.boots,
        weaponSlot: null,
        imageFileName: "",
        properties: {
            defense: 12,
        },
    } as IInventoryItem,
    ironHelmet: {
        name: "Iron Helmet",
        class: ItemClass.armour,
        armourSlot: ArmourType.head,
        weaponSlot: null,
        imageFileName: "iron-helmet.png",
        properties: {
            defense: 12,
        },
    } as IInventoryItem,
    leatherChestPiece: {
        name: "Leather Chest Piece",
        class: ItemClass.armour,
        armourSlot: ArmourType.torso,
        weaponSlot: null,
        imageFileName: "leather-chestpiece.png",
        properties: {
            defense: 12,
        },
    } as IInventoryItem,
};
