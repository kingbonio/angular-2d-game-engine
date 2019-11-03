import { MonsterClass, Direction, CharacterType, ElementClass, CharacterState } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { armour, weapons, keyItems, potions } from "../items";
import { IWeapons } from "../../game/item/interfaces";
import { ObjectType } from "../../game/shared/enums";

export default {
      room: 1,
      areaLoadMessage: "Your first enemy! If you attack the enemy or step in their (short) line of sight, you will enter a turn-based 'Battle Mode' where they will move slower than you but only when you do. The enemy will chase you and attack you. They will give up chasing you if you stay out of sight for a few rounds of movement Click on the armour on the right to equip so you can protect yourself. Attack with (Default) 'Space'. If you die at any point (Health in the bottom right), reload the page. After the enemy has been defeated walk through the north exit.",
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
            //             id: "e93f1307-fedd-4a91-aae5-27c633c4ff53",
            //             asleep: true,
            //             angry: false,
            //             level: 1,
            //             maxHp: 30,
            //             lowHealthThreshold: 6,
            //             maxPauseDuration: 2,
            //             name: "Gary The Dick",
            //             class: MonsterClass.Human,
            //             startingDirection: Direction.S,
            // direction: Direction.S,
            //             patrolArea: true,
            //             directionsForPatrol: [
            //                   Direction.S,
            //                   Direction.S,
            //                   Direction.W,
            //                   Direction.N,
            //                   Direction.N,
            //                   Direction.E,
            //             ],
            //             maxHuntingDuration: 3,
            //             startingState: CharacterState.patrolling,
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
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //                   armour.ironHelmet,
            //                   keyItems.rustyOldKey,
            //             ],
            //             imageFileName: "",
            //             startingLocation: "f6",
            //       },
            //       startingPositionY: "f",
            //       startingPositionX: 6,
            // },
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
                        ],
                        imageFileName: "",
                        startingLocation: "d7",
                  },
                  startingPositionY: "d",
                  startingPositionX: 7,
            },
            // {
            //       type: ElementClass.npc,
            //       elementProperties: {
            // id: "424745e4-3bfc-452c-8ff6-78c04251a294",
            //             asleep: false,
            //             angry: false,
            //             level: 1,
            //             maxHp: 20,
            //             lowHealthThreshold: 15,
            // maxPauseDuration: 2,
            //             name: "David",
            //             startingDirection: Direction.E,
            // direction: Direction.E,
            //             patrolArea: false,
            //             directionsForPatrol: [
            //             ],
            // maxHuntingDuration: 3,
            //             startingState: CharacterState.wandering,
            //             speechResponse: "Stop bothering me, you fool!",
            //             sleepResponse: "Zzzzzzzzzzzzzzzz",
            //             lootParameters: {
            //                   level: 6,
            //                   allowWeapon: true,
            //                   allowPotion: false,
            //                   allowKey: false,
            //             },
            //             armour: {
            //                   head: null,
            //                   arms: null,
            //                   hands: null,
            //                   torso: null,
            //                   legs: null,
            //                   boots: null,
            //             },
            //             weapons: {
            //                   primary: null,
            //                   secondary: null,
            //                   concealed: null,
            //                   shield: null,
            //             } as IWeapons,
            //             loot: [
            //                   keyItems.fancyKey,
            //                   potions.smallHealthPotion,
            //             ],
            //             imageFileName: "",
            // startingLocation: "a4",
            //       },
            //       startingPositionX: 3,
            //       startingPositionY: "e",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Straight Wall",
            //             startingDirection: Direction.N,
            // direction: Direction.N,
            //             canBeTraversed: false,
            //             isInteractive: false,
            //             imageFileName: "wall-straight.png",
            //       },
            //       startingPositionX: 2,
            //       startingPositionY: "f",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Straight Wall",
            //             startingDirection: Direction.N,
            // direction: Direction.N,
            //             canBeTraversed: false,
            //             isInteractive: false,
            //             imageFileName: "wall-straight.png",
            //       },
            //       startingPositionX: 2,
            //       startingPositionY: "e",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Straight Wall",
            //             startingDirection: Direction.N,
            // direction: Direction.E,
            //             canBeTraversed: false,
            //             isInteractive: false,
            //             imageFileName: "wall-straight.png",
            //       },
            //       startingPositionX: 1,
            //       startingPositionY: "c",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Straight Wall",
            //             startingDirection: Direction.E,
            // direction: Direction.E,
            //             canBeTraversed: false,
            //             isInteractive: false,
            //             imageFileName: "wall-straight.png",
            //       },
            //       startingPositionX: 2,
            //       startingPositionY: "c",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Corner Wall",
            //             startingDirection: Direction.E,
            // direction: Direction.E,
            //             canBeTraversed: false,
            //             isInteractive: false,
            //             imageFileName: "wall-corner.png",
            //       },
            //       startingPositionX: 3,
            //       startingPositionY: "c",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Door",
            //             objectType: ObjectType.door,
            //             startingDirection: Direction.N,
            // direction: Direction.N,
            //             canBeTraversed: false,
            //             isInteractive: true,
            //             itemReferenceNeeded: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
            //             imageFileName: "door.png",
            //       },
            //       startingPositionX: 3,
            //       startingPositionY: "b",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Straight Wall",
            //             startingDirection: Direction.S,
            // direction: Direction.S,
            //             canBeTraversed: false,
            //             isInteractive: false,
            //             imageFileName: "wall-straight.png",
            //       },
            //       startingPositionX: 3,
            //       startingPositionY: "a",
            // },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Old chest",
            //             objectType: ObjectType.lootObject,
            //             startingDirection: Direction.N,
            // direction: Direction.N,
            //             canBeTraversed: false,
            //             isInteractive: true,
            //             itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
            //             imageFileName: "old-chest.png",
            //             loot: [
            //                   weapons.axe,
            //                   potions.smallHealthPotion,
            //             ]
            //       },
            //       startingPositionX: 1,
            //       startingPositionY: "a",
            // },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
