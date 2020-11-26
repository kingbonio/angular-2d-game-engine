import { ItemClass } from "../../game/item/enums";
import { IInventoryItem } from "../../game/item/interfaces";

export const keyItems = {
    rustyOldKey: {
        name: "Chest Key",
        itemReference: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
        class: ItemClass.keyItem,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "rusty-old-key.png",
        properties: {
            keyItem: true,
        }
    } as IInventoryItem,
    fancyKey: {
        name: "Door Key",
        itemReference: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
        class: ItemClass.keyItem,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "fancy-key.png",
        properties: {
            keyItem: true,
        }
    } as IInventoryItem,
    greenDoorKey: {
        name: "Green Door Key",
        itemReference: "73c02921-f0a6-4ea1-8b24-97842ee28fb6",
        class: ItemClass.keyItem,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "green-door-key.png",
        properties: {
            keyItem: true,
        }
    } as IInventoryItem,
    redDoorKey: {
        name: "Red Door Key",
        itemReference: "65a25063-4303-47b6-bdbe-0ce239396e0d",
        class: ItemClass.keyItem,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "red-door-key.png",
        properties: {
            keyItem: true,
        }
    } as IInventoryItem,
    lightBulb: {
        name: "Light Bulb",
        itemReference: "58e99098-ede4-4c2f-813d-40c77ab304d4",
        class: ItemClass.keyItem,
        destroyedOnUse: true,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "light-bulb.png",
        properties: {
            keyItem: true,
        }
    } as IInventoryItem,
    trophy: {
        name: "Trophy",
        itemReference: "560e76d0-e7f1-4573-ae0a-ec5746486b7b",
        class: ItemClass.keyItem,
        armourSlot: null,
        weaponSlot: null,
        imageFileName: "trophy.png",
        gameEndTrigger: true,
        properties: {
            keyItem: true,
        }
    } as IInventoryItem,
};
