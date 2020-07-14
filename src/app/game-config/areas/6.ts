import { IAreaElement } from "../../game/area/interfaces";
import { IWeapons } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, MonsterClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, potions, weapons } from "../items";

export default {
      room: 6,
      backgroundMusic: "bossMusic",
      floorImageFileName: "pavement.png",
      areaLoadMessage: "Test area",
      areaElements: [
            {
                  type: ElementClass.player,
                  elementProperties: {
                        name: "Smelly Jeremy",
                        imageFileName: "shadow-player.png",
                  },
                  startingPositionX: 4,
                  startingPositionY: "a",
                  startingDirection: Direction.N,
                  direction: Direction.N,
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "c7",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-npc.png",
                        startingLocation: "g1",
                  },
                  startingPositionY: "g",
                  startingPositionX: 1,
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "c6",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-npc.png",
                        startingLocation: "g2",
                  },
                  startingPositionY: "g",
                  startingPositionX: 2,
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "c4",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-npc.png",
                        startingLocation: "g4",
                  },
                  startingPositionY: "g",
                  startingPositionX: 4,
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "c2",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-npc.png",
                        startingLocation: "g6",
                  },
                  startingPositionY: "g",
                  startingPositionX: 6,
            },
            {
                  type: ElementClass.npc,
                  elementProperties: {
                        id: "28be7086-bafe-49f5-9e3c-ec3ca90e45a6",
                        asleep: true,
                        angry: false,
                        level: 1,
                        maxHp: 50,
                        lowHealthThreshold: 6,
                        maxPauseDuration: 1,
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "c1",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-npc.png",
                        startingLocation: "g7",
                  },
                  startingPositionY: "g",
                  startingPositionX: 7,
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
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "g7",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-enemy.png",
                        startingLocation: "c1",
                  },
                  startingPositionY: "c",
                  startingPositionX: 1,
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
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "g5",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                              keyItems.lightBulb
                        ],
                        imageFileName: "shadow-enemy.png",
                        startingLocation: "c3",
                  },
                  startingPositionY: "c",
                  startingPositionX: 3,
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
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "g3",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-enemy.png",
                        startingLocation: "c5",
                  },
                  startingPositionY: "c",
                  startingPositionX: 5,
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
                        name: "Test",
                        class: MonsterClass.Human,
                        startingDirection: Direction.S,
                        direction: Direction.S,
                        patrolArea: true,
                        directionsForPatrol: [
                        ],
                        startingTargetLocation: "g1",
                        maxHuntingDuration: 3,
                        startingState: CharacterState.walkingPath,
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
                        imageFileName: "shadow-enemy.png",
                        startingLocation: "c7",
                  },
                  startingPositionY: "c",
                  startingPositionX: 7,
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
                        soundEffect: "openChest",
                        loot: [
                              potions.smallDamageBuff,
                        ]
                  },
                  startingPositionY: "b",
                  startingPositionX: 4,
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
                        soundEffect: "openChest",
                        loot: [
                              potions.smallDamageBuff,
                        ]
                  },
                  startingPositionY: "b",
                  startingPositionX: 3,
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
                        lockedDialogue: "Kill the darkness to open the chest",
                        itemReferenceNeeded: "58e99098-ede4-4c2f-813d-40c77ab304d4",
                        imageFileName: "old-chest.png",
                        soundEffect: "openChest",
                        loot: [
                              weapons.axe,
                              potions.smallHealthPotion,
                        ]
                  },
                  startingPositionY: "b",
                  startingPositionX: 5,
            },
      ] as IAreaElement[],
      areaCompleteRequirements: {
            item: false,
            monster: true
      }
};
