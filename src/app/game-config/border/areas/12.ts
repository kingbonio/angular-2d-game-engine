import { MonsterClass, Direction, ElementClass, CharacterState, ObjectType } from "../../../game/shared/enums";
import { IAreaElement } from "../../../game/area/interfaces";
import { armour, weapons, keyItems, potions } from "../../items";
import { IWeapons } from "../../../game/item/interfaces";

export default {
      room: 12,
      areaLoadMessage: "Room 12",
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
                        maxHp: 15,
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
                              armour.ironHelmet,
                              keyItems.rustyOldKey,
                        ],
                        imageFileName: "",
                        startingLocation: "d3",
                  },
                  startingPositionY: "d",
                  startingPositionX: 3,
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
