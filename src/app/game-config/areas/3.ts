import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { keyItems, potions, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 3,
    backgroundMusic: BackgroundMusic.gameMusic,,
    floorImageFileName: "wood.png",
    areaVisited: false,
    areaLoadMessage: "Your first non-player character, they will wander freely and will not attack you unless they catch you pickpocketing, you can either attempt a pickpocket or kill the character (He will fight back) to obtain his key. Once you have the key, click on it in your inventory (bottom right) to set it as your active item and use Interact on the wooden door in the bottom left of the area, switch to your other key to open the chest",
    areaElements: [
        player,
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 1,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 2,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 3,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Door",
                objectType: ObjectType.door,
                startingDirection: Direction.N,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
                imageFileName: "door.png",
                soundEffect: "openWoodenDoor",
            },
            startingPositionX: 3,
            startingPositionY: "b",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.S,
                direction: Direction.S,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 3,
            startingPositionY: "a",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.N,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                imageFileName: "old-chest.png",
                soundEffect: "openChest",
                loot: [
                    weapons.axe,
                    potions.smallHealthPotion,
                ]
            },
            startingPositionX: 1,
            startingPositionY: "a",
        },
        {
            type: ElementClass.npc,
            elementProperties: {
                id: "424745e4-3bfc-452c-8ff6-78c04251a294",
                maxHp: 20,
                baseDamage: 2,
                lowHealthThreshold: 15,
                attackPauseDuration: 2,
                name: "David",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "Stop bothering me, you fool!",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: null,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: null,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    keyItems.fancyKey,
                    potions.smallHealthPotion,
                ],
                imageFileName: "shadow-npc.png",
                startingLocation: "f2",
            },
            startingPositionX: 2,
            startingPositionY: "f",
        },
    ] as IAreaElement[]
};
