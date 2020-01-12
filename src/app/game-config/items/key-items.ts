import { ItemClass } from "../../game/item/enums";

export const keyItems = {
      rustyOldKey: {
            name: "Chest Key",
            itemReference: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
            class: ItemClass.keyItem,
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
      },
      fancyKey: {
            name: "Door Key",
            itemReference: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
            class: ItemClass.keyItem,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 10,
            imageFileName: "fancy-key.png",
            // TODO: May be a better way of assigning class-based properties
            properties: {
                  keyItem: true,
            }
      },
      greenDoorKey: {
            name: "Green Door Key",
            itemReference: "73c02921-f0a6-4ea1-8b24-97842ee28fb6",
            class: ItemClass.keyItem,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 10,
            imageFileName: "green-door-key.png",
            // TODO: May be a better way of assigning class-based properties
            properties: {
                  keyItem: true,
            }
      },
      redDoorKey: {
            name: "Red Door Key",
            itemReference: "65a25063-4303-47b6-bdbe-0ce239396e0d",
            class: ItemClass.keyItem,
            armourSlot: null,
            weaponSlot: null,
            usable: true,
            level: 1,
            weight: 1,
            inventoryHeight: 1,
            inventoryWidth: 1,
            value: 10,
            imageFileName: "red-door-key.png",
            // TODO: May be a better way of assigning class-based properties
            properties: {
                  keyItem: true,
            }
      },
};