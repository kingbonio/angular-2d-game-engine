import { IAreaElement } from "../../../game/area/interfaces";
import { IWeapons } from "../../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../../game/shared/enums";
import { armour, keyItems, potions, weapons } from "../../items";

export default {
    room: 13,
    floorImageFileName: "wood.png",
    areaLoadMessage: "Room 13",
    areaElements: [
        {
            type: ElementClass.player,
            elementProperties: {
                name: "Smelly Jeremy",
                imageFileName: "shadow-player.png",
            },
            startingPositionX: 4,
            startingPositionY: "a",
            startingDirection: Direction.N,
            direction: Direction.N,
        },
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                asleep: true,
                angry: false,
                level: 1,
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Gary The Dick",

                startingDirection: Direction.W,
                direction: Direction.W,
                patrolArea: true,
                directionsForPatrol: [
                    Direction.W,
                    Direction.W,
                    Direction.W,
                    Direction.W,
                    Direction.N,
                    Direction.N,
                    Direction.E,
                    Direction.E,
                    Direction.E,
                    Direction.E,
                    Direction.S,
                    Direction.S,
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.patrolling,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                lootParameters: {
                    level: 6,
                    allowWeapon: true,
                    allowPotion: false,
                    allowKey: false,
                },
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                    secondary: null,
                    concealed: null,
                    shield: null,
                } as IWeapons,
                loot: [
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "d7",
            },
            startingPositionY: "d",
            startingPositionX: 7,
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Old chest",
                objectType: ObjectType.lootObject,
                startingDirection: Direction.S,
                direction: Direction.S,
                canBeTraversed: false,
                isInteractive: true,
                isLocked: true,
                itemReferenceNeeded: "",
                imageFileName: "old-chest.png",
                loot: [
                    weapons.axe,
                    potions.smallHealthPotion,
                    keyItems.greenDoorKey
                ]
            },
            startingPositionX: 1,
            startingPositionY: "g",
        },
    ] as IAreaElement[],
    areaCompleteRequirements: {
        item: false,
        monster: true
    }
};
