import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass } from "../../game/shared/enums";
import { armour, keyItems, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 2,
    backgroundMusic: BackgroundMusic.gameMusic,
    floorImageFileName: "grass.png",
    areaVisited: false,
    areaLoadMessage: "This enemy is much tougher and fighting him will be difficult. Try to steal his items using Interact (E).",
    areaElements: [
        player,
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "535a28ed-da6d-4d84-84df-cd297cb667ef",
                maxHp: 50,
                baseDamage: 5,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Strong Awful Gary",
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
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.largeAxe,
                } as IWeaponSlots,
                loot: [
                    armour.ironHelmet,
                    keyItems.fancyKey,
                ],
                imageFileName: "hard-enemy.png",
                startingLocation: "c4",
            },
            startingPositionY: "c",
            startingPositionX: 4,
        },
        // Left wall
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
            startingPositionX: 2,
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
            startingPositionX: 2,
            startingPositionY: "e",
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
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 2,
            startingPositionY: "f",
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
            startingPositionY: "f",
        },
        // Right wall
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Straight Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-straight.png",
            },
            startingPositionX: 6,
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
            startingPositionX: 5,
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
            startingPositionX: 6,
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
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.S,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 6,
            startingPositionY: "c",
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
                name: "Corner Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 5,
            startingPositionY: "f",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 6,
            startingPositionY: "f",
        },
    ] as IAreaElement[]
};
