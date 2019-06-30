import { ItemClass } from "../../game/item/enums";

export const keyItems = {
      rustyOldKey: {
            name: "Rusty Old Key",
            itemReference: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
            class: ItemClass.misc,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 10,
            imageFileName: "rusty-old-key.png",
            // TODO: May be a better way of assigning class-based properties
            properties: {
                  keyItem: true,
            }
      }
};
