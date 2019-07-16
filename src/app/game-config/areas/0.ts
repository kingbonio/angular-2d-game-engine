import { MonsterClass, Direction, CharacterType, ElementClass } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { armour, weapons, keyItems } from "../items";
import { IWeapons } from "../../game/item/interfaces";

export default {
      areaElements: [
            {
                  type: ElementClass.player,
                  elementProperties: {
                        name: "Smelly Jeremy",
                        imageName: "player1.jpg",
                  },
                  startingPositionX: 4,
                  startingPositionY: "g",
                  direction: Direction.N,
            },
            {
                  type: ElementClass.enemy,
                  elementProperties: {
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 6,
                        lowHealthThreshold: 4,
                        name: "Gary The Dick",
                        class: MonsterClass.Human,
                        direction: Direction.N,
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
                              keyItems.fancyKey,
                        ],
                        imageFileName: "",
                  },
                  startingPositionX: 3,
                  startingPositionY: "c",
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        asleep: false,
                        angry: false,
                        level: 1,
                        maxHp: 10,
                        name: "David",
                        direction: Direction.E,
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
                        loot: [],
                        imageFileName: "",
                  },
                  startingPositionX: 3,
                  startingPositionY: "e",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-straight.png",
                  },
                  startingPositionX: 1,
                  startingPositionY: "d",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-straight.png",
                  },
                  startingPositionX: 2,
                  startingPositionY: "d",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-straight.png",
                  },
                  startingPositionX: 3,
                  startingPositionY: "d",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Corner Wall",
                        direction: Direction.S,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-corner.png",
                  },
                  startingPositionX: 4,
                  startingPositionY: "d",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        direction: Direction.S,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-straight.png",
                  },
                  startingPositionX: 4,
                  startingPositionY: "c",
            },
            // {
            //       type: ElementClass.object,
            //       elementProperties: {
            //             name: "Door",
            //             direction: Direction.N,
            //             canBeTraversed: false,
            //             isInteractive: true,
            //             imageName: "door.png",
            //       },
            //       startingPositionX: 4,
            //       startingPositionY: "b",
            // },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Straight Wall",
                        direction: Direction.S,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-straight.png",
                  },
                  startingPositionX: 4,
                  startingPositionY: "a",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Old chest",
                        direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: true,
                        itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                        imageName: "old-chest.png",
                        loot: [
                              weapons.axe,
                        ]
                  },
                  startingPositionX: 1,
                  startingPositionY: "c",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
