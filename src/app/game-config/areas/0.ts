import { MonsterClass, Direction, CharacterType, ItemClass, ArmourType } from "../../game/shared/enums";
import { IAreaElement } from "../../game/area/interfaces";
import { IArmour } from "../../game/shared/interfaces";
import { WeaponType } from "../../game/item/enums";

export default {
      weapons: [
            {
                  name: "Basic Knife",
                  class: ItemClass.weapon,
                  armourSlot: null,
                  weaponSlot: WeaponType.primary,
                  usable: false,
                  level: 1,
                  weight: 2,
                  inventoryHeight: 2,
                  inventoryWidth: 1,
                  value: 100,
                  imageFileName: "",
                  properties: {
                        damage: 10,
                  },
            },
            {
                  name: "Cuthroat Razor",
                  class: ItemClass.weapon,
                  armourSlot: null,
                  weaponSlot: WeaponType.primary,
                  usable: false,
                  level: 1,
                  weight: 2,
                  inventoryHeight: 2,
                  inventoryWidth: 1,
                  value: 100,
                  imageFileName: "",
                  properties: {
                        damage: 12,
                  },
            },
      ],
      armour: [
            {
                  name: "Leather Helmet",
                  class: ItemClass.armour,
                  armourSlot: null,
                  weaponSlot: ArmourType.head,
                  usable: false,
                  level: 1,
                  weight: 1,
                  inventoryHeight: 1,
                  inventoryWidth: 1,
                  value: 100,
                  imageFileName: "",
                  properties: {
                        damage: 10,
                  },
            },
            {
                  name: "Leather Boots",
                  class: ItemClass.armour,
                  armourSlot: null,
                  weaponSlot: ArmourType.boots,
                  usable: false,
                  level: 1,
                  weight: 2,
                  inventoryHeight: 2,
                  inventoryWidth: 2,
                  value: 100,
                  imageFileName: "",
                  properties: {
                        damage: 12,
                  },
            },
      ],
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
                              head: this.helmet,
                              arms: IInventoryItem;
                              hands: IInventoryItem;
                              torso: IInventoryItem;
                              legs: IInventoryItem;
                              boots: IInventoryItem;
                        } as IArmour,
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
