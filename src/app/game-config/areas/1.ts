import { MonsterClass, Direction, Character } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";

export default {
      areaElements: [
            {
                  type: Character.player,
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
