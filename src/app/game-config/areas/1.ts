import { IAreaElement } from "../../game/area/interfaces";
import { IWeapons } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, MonsterClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, weapons } from "../items";

export default {
      room: 1,
      areaLoadMessage: "Your first enemy! If you attack the enemy or step in their (short) line of sight, you will enter a turn-based 'Battle Mode' where they will move slower than you but only when you do. The enemy will chase you and attack you. They will give up chasing you if you stay out of sight for a few rounds of movement. Click on the blue armour icon on the right to equip so you can protect yourself. Attack with (Default) 'Space'. After the enemy has been defeated, interact with the dropped loot bag to get the door key and set it to your active item, then unlock and walk through north door.",
      areaElements: [
            {
                  type: ElementClass.player,
                  elementProperties: {
                        name: "Smelly Jeremy",
                        imageFileName: "player1.jpg",
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
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Gary The Dick",
                        class: MonsterClass.Human,
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
                              keyItems.greenDoorKey
                        ],
                        imageFileName: "",
                        startingLocation: "d7",
                  },
                  startingPositionY: "d",
                  startingPositionX: 7,
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
