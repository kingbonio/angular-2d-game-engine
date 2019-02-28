import { MonsterClass, Direction, CharacterType } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";

export default {
      areaElements: [
            {
                  type: CharacterType.player,
                  elementClass: {
                        name: "Smelly Jeremy",
                        imageName: "player1.jpg"
                  },
                  startingPositionX: 4,
                  startingPositionY: "g",
                  direction: Direction.N
            },
            {
                  type: CharacterType.enemy,
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
                  startingPositionX: 4,
                  startingPositionY: "c",
                  direction: Direction.S
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
