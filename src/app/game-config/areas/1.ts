import { MonsterClass, Direction, CharacterType, ElementClass } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { armour, weapons, keyItems, potions } from "../items";
import { IWeapons } from "../../game/item/interfaces";
import { ObjectType } from "../../game/shared/enums";

export default {
      room: 1,
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
                        maxHp: 30,
                        lowHealthThreshold: 6,
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
                        ],
                        imageFileName: "",
                  },
                  startingPositionX: 2,
                  startingPositionY: "b",
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 20,
                        lowHealthThreshold: 15,
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
                        loot: [
                              keyItems.fancyKey,
                              potions.smallHealthPotion,
                        ],
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
                        name: "Corner Wall",
                        direction: Direction.S,
                        canBeTraversed: false,
                        isInteractive: false,
                        imageName: "wall-corner.png",
                  },
                  startingPositionX: 3,
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
                  startingPositionX: 3,
                  startingPositionY: "c",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Door",
                        objectType: ObjectType.door,
                        direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: true,
                        itemReferenceNeeded: "64c87a80-4f1a-4dc3-b2c8-c47a9c393f61",
                        imageName: "door.png",
                  },
                  startingPositionX: 3,
                  startingPositionY: "b",
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
                  startingPositionX: 3,
                  startingPositionY: "a",
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Old chest",
                        objectType: ObjectType.lootObject,
                        direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: true,
                        itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                        imageName: "old-chest.png",
                        loot: [
                              weapons.axe,
                              potions.smallHealthPotion,
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
