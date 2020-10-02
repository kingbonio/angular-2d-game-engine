import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, weapons } from "../items";
import { player } from "../characters";

export default {
    room: 1,
    backgroundMusic: "gameMusic",
    floorImageFileName: "wood.png",
    areaVisited: false,
    areaLoadMessage: "Your first enemy! If you attack the enemy or step in their (short) line of sight, you will enter a turn-based 'Battle Mode' where they will move slower than you but only when you do. The enemy will chase you and attack you. They will give up chasing you if you stay out of sight for a few rounds of movement. Click on the blue armour icon on the right to equip so you can protect yourself. Attack with (Default) 'Space'. After the enemy has been defeated, interact with the dropped loot bag to get the door key and set it to your active item, then unlock and walk through north door.",
    areaElements: [
        player,
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "cbdd6e52-dc3e-4059-b9b6-e231fdd775a1",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 18,
                attackPauseDuration: 1,
                name: "Gary The Dick",
                startingDirection: Direction.W,
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
                } as IWeaponSlots,
                loot: [
                    keyItems.greenDoorKey
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "d7",
            },
            startingPositionY: "d",
            startingPositionX: 7,
        },
    ] as IAreaElement[]
};
