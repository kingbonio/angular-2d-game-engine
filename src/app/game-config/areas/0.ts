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
                        asleep: false,
                        angry: true,
                        level: 1,
                        maxHp: 2,
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
                  startingPositionX: 4,
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
                        name: "Old chest",
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: true,
                        itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                        imageName: "old-chest.png",
                        loot: [
                              weapons.axe,
                        ]
                  },
                  startingPositionX: 1,
                  startingPositionY: "d",
            }
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
