import { MonsterClass, Direction, ElementClass, CharacterState } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { armour, weapons, keyItems, potions } from "../items";
import { IWeapons } from "../../game/item/interfaces";

export default {
      room: 2,
      areaElements: [
            {
                  type: ElementClass.player,
                  elementProperties: {
                        name: "Smelly Jeremy",
                        imageFileName: "player1.jpg",
                  },
                  startingPositionX: 4,
                  startingPositionY: "g",
                  direction: Direction.N,
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
            id: "424745e4-3bfc-452c-8ff6-78c04251a294",
                        asleep: false,
                        angry: false,
                        level: 1,
                        maxHp: 20,
                        lowHealthThreshold: 15,
            maxPauseDuration: 2,
                        name: "David",
                        direction: Direction.E,
                        patrolArea: false,
                        directionsForPatrol: [
                        ],
            maxHuntingDuration: 3,
                        startingState: CharacterState.wandering,
                        speechResponse: "Stop bothering me, you fool!",
                        sleepResponse: "Zzzzzzzzzzzzzzzz",
                        lootParameters: {
                              level: 6,
                              allowWeapon: true,
                              allowPotion: false,
                              allowKey: false,
                        },
                        armour: {
                              head: null,
                              arms: null,
                              hands: null,
                              torso: null,
                              legs: null,
                              boots: null,
                        },
                        weapons: {
                              primary: null,
                              secondary: null,
                              concealed: null,
                              shield: null,
                        } as IWeapons,
                        loot: [
                              keyItems.fancyKey,
                              potions.smallHealthPotion,
                        ],
                        imageFileName: "",
                        startingLocation: "a4",
                  },
                  startingPositionX: 3,
                  startingPositionY: "e",
            },
            {
                  type: ElementClass.enemy,
                  elementProperties: {
                        id: "6938873e-7cdf-4835-89c5-deee1ec9b91c",
                        asleep: false,
                        angry: false,
                        level: 1,
                        maxHp: 30,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 2,
                        name: "Gary The Dick",
                        class: MonsterClass.Human,
                        direction: Direction.W,
                        patrolArea: false,
                        directionsForPatrol: [
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.wandering,
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
                        startingLocation: "c4",
                  },
                  startingPositionX: 4,
                  startingPositionY: "c",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
