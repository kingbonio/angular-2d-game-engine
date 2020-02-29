import { IAreaElement } from "../../../game/area/interfaces";
import { IWeapons } from "../../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, MonsterClass } from "../../../game/shared/enums";
import { armour, keyItems, weapons } from "../../items";

export default {
      room: 8,
      areaLoadMessage: "Room 8",
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
            // {
            //       type: ElementClass.enemy,
            //       elementProperties: {
            //             id: "5abde32d-b10e-49a6-b392-6a022166b9cf",
            //             asleep: false,
            //             angry: false,
            //             level: 1,
            //             maxHp: 30,
            //             lowHealthThreshold: 6,
            //             maxPauseDuration: 2,
            //             name: "Gary The Dick",
            //             class: MonsterClass.Human,
            //             startingDirection: Direction.W,
            //             direction: Direction.W,
            //             patrolArea: true,
            //             directionsForPatrol: [
            //             ],
            //             maxHuntingDuration: 3,
            //             startingState: CharacterState.wandering,
            //             speechResponse: "I'm gonna kill you",
            //             sleepResponse: "Zzzzzzzzzzzzzzzz",
            //             lootParameters: {
            //                   level: 6,
            //                   allowWeapon: true,
            //                   allowPotion: false,
            //                   allowKey: false,
            //             },
            //             armour: {
            //                   head: armour.leatherHelmet,
            //                   arms: null,
            //                   hands: null,
            //                   torso: null,
            //                   legs: null,
            //                   boots: armour.leatherBoots,
            //             },
            //             weapons: {
            //                   primary: weapons.basicKnife,
            //                   secondary: null,
            //                   concealed: null,
            //                   shield: null,
            //             } as IWeapons,
            //             loot: [
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //             ],
            //             imageFileName: "",
            //             startingLocation: "a2",
            //       },
            //       startingPositionX: 2,
            //       startingPositionY: "a",
            // },
            {
                  type: ElementClass.enemy,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
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
                              primary: weapons.axe,
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
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        startingDirection: Direction.N,
direction: Direction.N,
                        canBeTraversed: false,
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
direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageFileName: "wall-straight.png",
                  },
                  startingPositionX: 2,
                  startingPositionY: "e",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};