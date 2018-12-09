import { MonsterClass, Direction } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";

export default {
      areaElements: [
            {
                  elementClass: {
                        asleep: false,
                        level: 1,
                        name: "RatFace",
                        class: MonsterClass.Rat,
                        lootParameters: {
                              level: 6,
                              allowWeapon: true,
                              allowPotion: false,
                              allowKey: false
                        },
                  },
                  startingPositionY: "c",
                  startingPositionX: 4,
                  direction: Direction.S
            },
            {
                  elementClass: {
                        name: "Smelly Jeremy",
                        imageName: "player1.jpg"
                  },
                  startingPositionY: "g",
                  startingPositionX: 4,
                  direction: Direction.N
            }
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
