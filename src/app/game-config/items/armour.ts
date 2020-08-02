import { ArmourType, ItemClass } from "../../game/item/enums";

// TODO these should have interfaces
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
      },
      fedora: {
            name: "Fedora",
            class: ItemClass.armour,
            armourSlot: ArmourType.head,
            weaponSlot: null,
            imageFileName: "",
            properties: {
                  defense: 0,
            },
      },
      leatherBoots: {
            name: "Leather Boots",
            class: ItemClass.armour,
            armourSlot: ArmourType.boots,
            weaponSlot: null,
            imageFileName: "",
            properties: {
                  defense: 12,
            },
      },
      ironHelmet: {
            name: "Iron Helmet",
            class: ItemClass.armour,
            armourSlot: ArmourType.head,
            weaponSlot: null,
            imageFileName: "iron-helmet.png",
            properties: {
                  defense: 12,
            },
      },
      leatherChestPiece: {
            name: "Leather Chest Piece",
            class: ItemClass.armour,
            armourSlot: ArmourType.torso,
            weaponSlot: null,
            imageFileName: "leather-chestpiece.png",
            properties: {
                  defense: 12,
            },
      },
};
