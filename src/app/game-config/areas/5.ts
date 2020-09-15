import { IAreaElement } from "../../game/area/interfaces";
import { IWeapons } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { armour, potions, weapons } from "../items";
import { player } from "../characters";

export default {
    room: 5,
    backgroundMusic: "bossMusic",
    floorImageFileName: "pavement.png",
    areaLoadMessage: "In the chest you will find a damage buff potion, which boosts your strength for 10 seconds, use it to attack this strong enemy. Remember to equip any armour and weapons you have to make the fight easier.",
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
                name: "Gary The Dick",
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
                } as IWeapons,
                loot: [
                    potions.largeHealthBuff,
                    potions.smallDamageBuff,
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "e5",
            },
            startingPositionY: "e",
            startingPositionX: 5,
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
                    potions.smallDamageBuff,
                ]
            },
            startingPositionX: 3,
            startingPositionY: "a",
        },
    ] as IAreaElement[]
};
