import { MonsterClass, Direction, ElementClass, CharacterState } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { armour, weapons, keyItems } from "../items";
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
                  type: ElementClass.enemy,
                  elementProperties: {
                        asleep: false,
                        angry: false,
                        level: 1,
                        maxHp: 30,
                        lowHealthThreshold: 6,
                        name: "Gary The Dick",
                        class: MonsterClass.Human,
                        direction: Direction.W,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
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
                  },
                  startingPositionX: 2,
                  startingPositionY: "a",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
