import { IAreaElement } from "../../../game/area/interfaces";
import { Direction, ElementClass, ObjectType } from "../../../game/shared/enums";
import { keyItems, potions, weapons } from "../../items";

export default {
      room: 2,
      areaLoadMessage: "Room 2",
      areaElements: [
            {
                  type: ElementClass.player,
                  elementProperties: {
                        name: "Smelly Jeremy",
                        imageFileName: "player1.jpg",
                  },
                  startingPositionX: 4,
                  startingPositionY: "a",
                  startingDirection: Direction.N,
                  direction: Direction.N,
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Old chest",
                        objectType: ObjectType.lootObject,
                        startingDirection: Direction.N,
                        direction: Direction.N,
                        canBeTraversed: false,
                        isInteractive: true,
                        isLocked: true,
                        itemReferenceNeeded: "",
                        imageFileName: "old-chest.png",
                        loot: [
                              weapons.axe,
                              potions.smallHealthPotion,
                              keyItems.redDoorKey
                        ]
                  },
                  startingPositionY: "a",
                  startingPositionX: 3,
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
