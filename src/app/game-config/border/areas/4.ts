import { MonsterClass, Direction, ElementClass, CharacterState, ObjectType } from "../../../game/shared/enums";
import { IAreaElement } from "../../../game/area/interfaces";
import { armour, weapons, keyItems, potions } from "../../items";
import { IWeapons } from "../../../game/item/interfaces";

export default {
      room: 4,
      areaLoadMessage: "Room 4",
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
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              potions.smallHealthPotion
                        ],
                        imageFileName: "",
                        startingLocation: "f3",
                  },
                  startingPositionY: "f",
                  startingPositionX: 3,
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
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              potions.smallDamageBuff,
                        ],
                        imageFileName: "",
                        startingLocation: "e3",
                  },
                  startingPositionY: "e",
                  startingPositionX: 3,
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
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              potions.smallHealthPotion,
                        ],
                        imageFileName: "",
                        startingLocation: "f5",
                  },
                  startingPositionY: "f",
                  startingPositionX: 5,
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
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              weapons.axe,
                        ],
                        imageFileName: "",
                        startingLocation: "e5",
                  },
                  startingPositionY: "e",
                  startingPositionX: 5,
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
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              weapons.sword,
                        ],
                        imageFileName: "",
                        startingLocation: "g3",
                  },
                  startingPositionY: "g",
                  startingPositionX: 3,
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
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              potions.smallArmourBuff
                        ],
                        imageFileName: "",
                        startingLocation: "g5",
                  },
                  startingPositionY: "g",
                  startingPositionX: 5,
            },
            // {
            //       type: ElementClass.enemy,
            //       elementProperties: {
            //             id: "36d3f958-42d3-4197-bf00-de6119bf4e9a",
            //             asleep: false,
            //             angry: false,
            //             level: 1,
            //             maxHp: 30,
            //             lowHealthThreshold: 6,
            //             maxPauseDuration: 2,
            //             name: "Gary The Dick",
            //             class: MonsterClass.Human,
            //             startingDirection: Direction.W,
            // direction: Direction.W,
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
            //             startingLocation: "b7",
            //       },
            //       startingPositionX: 7,
            //       startingPositionY: "b",
            // },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Old chest",
                        objectType: ObjectType.lootObject,
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: true,
                        isLocked: true,
                        itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                        imageFileName: "old-chest.png",
                        loot: [
                              potions.invisiblityPotion,
                              keyItems.redDoorKey
                        ]
                  },
                  startingPositionX: 3,
                  startingPositionY: "a",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
