import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass } from "../../game/shared/enums";
import { armour, keyItems, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 2,
    backgroundMusic: BackgroundMusic.gameMusic,,
    floorImageFileName: "wood.png",
    areaVisited: false,
    areaLoadMessage: "Sneak up behind and pickpocket the (much tougher) enemy using Interact (default 'E') and take the key, you'll need it later. If the enemy spots you or they realise what you're doing you will enter 'Battle Mode' and will need to run away until they give up the chase and return to their patrol route. If you kill the enemy, use Interact on their corpse to loot them. Once you have the key, walk through the north exit",
    areaElements: [
        player,
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "535a28ed-da6d-4d84-84df-cd297cb667ef",
                maxHp: 50,
                baseDamage: 2,
                lowHealthThreshold: 6,
                attackPauseDuration: 1,
                name: "Gary The Dick",
                startingDirection: Direction.W,
                directionsForPatrol: [
                    Direction.W,
                    Direction.W,
                    Direction.N,
                    Direction.N,
                    Direction.N,
                    Direction.E,
                    Direction.E,
                    Direction.S,
                    Direction.S,
                    Direction.S,
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.patrolling,
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
                    primary: weapons.axe,
                } as IWeaponSlots,
                loot: [
                    armour.ironHelmet,
                    keyItems.rustyOldKey,
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "d3",
            },
            startingPositionY: "d",
            startingPositionX: 3,
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
            startingPositionX: 2,
            startingPositionY: "e",
        },
    ] as IAreaElement[]
};
