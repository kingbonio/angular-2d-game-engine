import { MonsterClass, Direction, CharacterType } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";

export default {
      areaElements: [
            {
                  type: CharacterType.player,
                  elementClass: {
                        asleep: true,
                        level: 1,
                        name: "Darren",
                        class: MonsterClass.Rat,
                        lootParameters: {
                              level: 6,
                              allowWeapon: true,
                              allowPotion: false,
                              allowKey: false
                        },
                  },
                  startingPositionY: "c",
                  startingPositionX: 3,
                  direction: Direction.N
            }
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
