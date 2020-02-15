import { MonsterClass, Direction, ElementClass, CharacterState, ObjectType } from "../../../game/shared/enums";
import { IAreaElement } from "../../../game/area/interfaces";
import { armour, weapons, keyItems, potions } from "../../items";
import { IWeapons } from "../../../game/item/interfaces";

export default {
      room: 15,
      areaLoadMessage: "Room 15",
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
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageFileName: "wall-straight.png",
                  },
                  startingPositionX: 1,
                  startingPositionY: "c",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageFileName: "wall-straight.png",
                  },
                  startingPositionX: 2,
                  startingPositionY: "c",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Corner Wall",
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageFileName: "wall-corner.png",
                  },
                  startingPositionX: 3,
                  startingPositionY: "c",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Door",
                        objectType: ObjectType.door,
                        startingDirection: Direction.N,
                        direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: true,
                        isLocked: true,
                        itemReferenceNeeded: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
                        imageFileName: "door.png",
                  },
                  startingPositionX: 3,
                  startingPositionY: "b",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageFileName: "wall-straight.png",
                  },
                  startingPositionX: 3,
                  startingPositionY: "a",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Old chest",
                        objectType: ObjectType.lootObject,
                        startingDirection: Direction.N,
                        direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: true,
                        isLocked: true,
                        itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                        imageFileName: "old-chest.png",
                        loot: [
                              weapons.axe,
                              potions.smallHealthPotion,
                        ]
                  },
                  startingPositionX: 1,
                  startingPositionY: "a",
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
                        startingDirection: Direction.E,
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
                              primary: weapons.basicKnife,
                              secondary: null,
                              concealed: null,
                              shield: null,
                        } as IWeapons,
                        loot: [
                              keyItems.fancyKey,
                              potions.smallHealthPotion,
                        ],
                        imageFileName: "",
                        startingLocation: "f2",
                  },
                  startingPositionX: 2,
                  startingPositionY: "f",
            },
            // {
            //       type: ElementClass.enemy,
            //       elementProperties: {
            //             id: "6938873e-7cdf-4835-89c5-deee1ec9b91c",
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
            //             patrolArea: false,
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
            //             startingLocation: "c4",
            //       },
            //       startingPositionX: 4,
            //       startingPositionY: "c",
            // },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
