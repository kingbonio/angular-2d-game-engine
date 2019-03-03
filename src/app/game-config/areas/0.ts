import { MonsterClass, Direction, CharacterType } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";

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
                        name: "Gary The Dick",
                        class: MonsterClass.Human,
                        direction: Direction.S,
                        speechResponse: "I'm gonna kill you",
                        sleepResponse: "Zzzzzzzzzzzzzzzz",
                        lootParameters: {
                              level: 6,
                              allowWeapon: true,
                              allowPotion: false,
                              allowKey: false,
                        },
                  },
                  startingPositionX: 4,
                  startingPositionY: "c",
            },
            {
                  type: CharacterType.npc,
                  elementClass: {
                        asleep: false,
                        level: 1,
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
