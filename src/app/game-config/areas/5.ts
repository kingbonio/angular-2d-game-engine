import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, potions, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 5,
    backgroundMusic: BackgroundMusic.gameMusic,
    floorImageFileName: "grass.png",
    areaVisited: false,
    areaLoadMessage: "Use the 10-second Damage Buff Potion in the chest to take out these guards.",
    areaElements: [
        player,
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "a4944dda-0ac7-479c-84c3-c0356bf67d39",
                maxHp: 50,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.S,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: armour.leatherChestPiece,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.axe,
                } as IWeaponSlots,
                loot: [
                    keyItems.boltCutters
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "e4",
            },
            startingPositionY: "e",
            startingPositionX: 4,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "a4944dda-0ac7-479c-84c3-c0gedbf67d39",
                maxHp: 50,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Awful Gary",
                startingDirection: Direction.S,
                directionsForPatrol: [
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.still,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: armour.leatherChestPiece,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.axe,
                } as IWeaponSlots,
                loot: [
                    potions.largeArmourBuff
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "c1",
            },
            startingPositionY: "c",
            startingPositionX: 1,
        },
        // Left side
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 1,
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 2,
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 2,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.W,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 2,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.S,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 3,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 3,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 3,
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 3,
            startingPositionY: "f",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 3,
            startingPositionY: "g",
        },
        // Door
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Door",
                objectType: ObjectType.door,
                startingDirection: Direction.E,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
                imageFileName: "door.png",
                soundEffect: "openWoodenDoor",
            },
            startingPositionX: 4,
            startingPositionY: "g",
        },
        // Right side
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 5,
            startingPositionY: "g",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 5,
            startingPositionY: "f",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 5,
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 5,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.W,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 5,
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
            startingPositionX: 6,
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
            startingPositionX: 7,
            startingPositionY: "c",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.S,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                imageFileName: "old-chest.png",
                soundEffect: "openChest",
                loot: [
                    potions.smallHealthPotion,
                    keyItems.redDoorKey
                ]
            },
            startingPositionY: "d",
            startingPositionX: 1,
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.E,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                imageFileName: "old-chest.png",
                soundEffect: "openChest",
                loot: [
                    potions.largeDamageBuff,
                ]
            },
            startingPositionX: 3,
            startingPositionY: "a",
        },
    ] as IAreaElement[]
};
