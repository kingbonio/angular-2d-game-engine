import { MonsterClass, Direction, CharacterType, ItemClass, ArmourType } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { IArmour } from "../../game/shared/interfaces";
import { WeaponType } from "../../game/item/enums";
import { Armour, Weapons } from "../items";
import { IWeapons } from "../../game/item/interfaces";

export default {
      areaElements: [
            {
                  type: CharacterType.player,
                  elementClass: {
                        name: "Smelly Jeremy",
                        imageName: "player1.jpg",
                  },
                  startingPositionX: 4,
                  startingPositionY: "g",
                  direction: Direction.N,
            },
            {
                  type: CharacterType.enemy,
                  elementClass: {
                        asleep: true,
                        level: 1,
                        maxHp: 10,
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
                              head: Armour.leatherHelmet,
                              arms: null,
                              hands: null,
                              torso: null,
                              legs: null,
                              boots: Armour.leatherBoots,
                        },
                        weapons: {
                              primary: Weapons.basicKnife,
                              secondary: null,
                              concealed: null,
                              shield: null,
                        } as IWeapons,
                  },
                  startingPositionX: 4,
                  startingPositionY: "c",
            },
            {
                  type: CharacterType.npc,
                  elementClass: {
                        asleep: false,
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
                  },
                  startingPositionX: 3,
                  startingPositionY: "e",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
