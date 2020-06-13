import { IAreaElement } from "../../../game/area/interfaces";
import { IWeapons } from "../../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, MonsterClass, ObjectType } from "../../../game/shared/enums";
import { armour, potions, weapons } from "../../items";

export default {
      room: 5,
      floorImageFileName: "wood.png",
      areaLoadMessage: "Room 5",
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
                  type: ElementClass.enemy,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Gary The Dick",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        maxHuntingDuration: 3,
                        startingState: CharacterState.still,
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
                              torso: armour.leatherChestPiece,
                              legs: null,
                              boots: armour.leatherBoots,
                        },
                        weapons: {
                              primary: weapons.axe,
                              secondary: null,
                              concealed: null,
                              shield: null,
                        } as IWeapons,
                        loot: [
                              potions.largeHealthBuff,
                              potions.smallDamageBuff,
                        ],
                        imageFileName: "",
                        startingLocation: "e5",
                  },
                  startingPositionY: "e",
                  startingPositionX: 5,
            },
            {
                  type: ElementClass.object,
                  elementProperties: {
                        name: "Old chest",
                        objectType: ObjectType.lootObject,
                        startingDirection: Direction.E,
                        direction: Direction.E,
                        canBeTraversed: false,
                        isInteractive: true,
                        isLocked: true,
                        itemReferenceNeeded: "b27f504c-4fb4-4855-a4e7-9facbf693c76",
                        imageFileName: "old-chest.png",
                        loot: [
                              potions.smallDamageBuff,
                        ]
                  },
                  startingPositionX: 3,
                  startingPositionY: "a",
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
