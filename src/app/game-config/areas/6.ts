import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, potions, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 6,
    backgroundMusic: BackgroundMusic.bossMusic,
    floorImageFileName: "pavement.png",
    areaVisited: false,
    areaLoadMessage: "Test area",
    areaElements: [
        player,
        // Top left of set
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "53831a37-395e-47f6-88ed-bc6be994c0c6",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                startingTargetLocation: "f3",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "g2",
            },
            startingPositionY: "g",
            startingPositionX: 2,
        },
        // Top middle
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "5ac92002-3033-4adb-9832-3a520ea02f5f",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.N,
                directionsForPatrol: [
                ],
                startingTargetLocation: "f4",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                    keyItems.lightBulb
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "g4",
            },
            startingPositionY: "g",
            startingPositionX: 4,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "5ac92002-3a33-4adb-9832-3aae0ea02f5f",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.N,
                directionsForPatrol: [
                ],
                startingTargetLocation: "f5",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                    keyItems.lightBulb
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "f6",
            },
            startingPositionY: "f",
            startingPositionX: 6,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "2f475fc48-65a6-4d5e-8908-ddd259ae57f5",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                startingTargetLocation: "e5",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "e6",
            },
            startingPositionY: "e",
            startingPositionX: 6,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "595f3d40-37df-4531-b4b3-35bf2ede1f2f",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.E,
                directionsForPatrol: [
                ],
                startingTargetLocation: "d5",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "c6",
            },
            startingPositionY: "c",
            startingPositionX: 6,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "5c5f3d40-37df-4a31-b4b3-35bf2eee1f2f",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.S,
                directionsForPatrol: [
                ],
                startingTargetLocation: "d4",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "c4",
            },
            startingPositionY: "c",
            startingPositionX: 4,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "5c543d40-37df-4a31-b4b3-35bf2eee1fa3",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.S,
                directionsForPatrol: [
                ],
                startingTargetLocation: "d3",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "c2",
            },
            startingPositionY: "c",
            startingPositionX: 2,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "5c5a3d40-37df-4a31-b4a3-35bf2a4e1fa3",
                maxHp: 50,
                baseDamage: 3,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
                startingDirection: Direction.W,
                directionsForPatrol: [
                ],
                startingTargetLocation: "e3",
                maxHuntingDuration: 3,
                startingState: CharacterState.walkingPath,
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
                    potions.largeDamageBuff,
                ],
                imageFileName: "shadow-enemy-hard.png",
                startingLocation: "e2",
            },
            startingPositionY: "e",
            startingPositionX: 2,
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
                    potions.invisiblityPotion,
                    potions.largeDamageBuff,
                ]
            },
            startingPositionY: "a",
            startingPositionX: 3,
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.S,
                isInteractive: true,
                isLocked: true,
                lockedDialogue: "Kill the darkness to open the chest",
                itemReferenceNeeded: "58e99098-ede4-4c2f-813d-40c77ab304d4",
                imageFileName: "old-chest.png",
                soundEffect: "openChest",
                loot: [
                    keyItems.trophy,
                ]
            },
            startingPositionY: "e",
            startingPositionX: 4,
        },
    ] as IAreaElement[]
};
