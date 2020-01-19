import { Direction } from '../../game/shared/enums';

export default {
    // Game ticker in milliseconds
    gameTimer: 700,
    userInputPauseTime: 50,
    // Player defaults
    initialPlayerStats: {
        health: 20,
        maxHealth: 50,
        strength: 10,
        dexterity: 10,
        magicka: 10,
        exp: 1,
        imageLocation: 'assets/images/player-image.jpg',
        locationX: 2,
        locationY: 'B',
        startingDirection: Direction.N,
        direction: Direction.N
    },
    animations: {
        attackDurationMilliseconds: 170,
        receiveAttackDurationMilliseconds: 170,
    },
    playerMultipliers: {
        inventoryStorageMultiplier: 30,
        inventoryCapacityMultiplier: 30,
        levelCalculation: (exp) => {
            return exp / 3000;
        },
        levelStatMultiplier: 1.2,
        stealSuccessRequirement: 5,
    },
    playerBaseStats: {
        baseDamage: 5,
    },
    enemyProperties: {
        // Must be 1 or over
        baseArmour: 5,
        minimumAttackRoll: 3,
    },
    initialAreaSettings: {
        type: 'start'
    },
    dialogue: {
        textOnScreenTimeMultiplier: 200,
        minimumOnScreenTime: 4000,
        nullElementResponse: "There is no response",
        keyItemNotActive: "You have not got the correct active item",
        computerName: "Game",
        computerCharacterType: "computer",
        areaTipsName: "area tips",
        areaTipsType: "area-tips",
        maximumMessagesOnScreen: 2,
        areaExitLocked: "The door is locked",
        alreadyAtFullHealth: "You are already at full health",
        areaExitKeyNotActive: (keyColour) => {
            return `You need a ${keyColour} key to open this door`;
        },
        attackSuccess: (damage) => {
            return `Your attack hits with damage: ${damage}`;
        },
        attackFailure: "Your attack fails",
        targetDead: "You have killed ",
        enemyAttacks: (damage, name) => {
            return `Your were attacked by ${name}, you take ${damage} damage`;
        },
        enemyFailsAttack: (name) => {
            return `${name} failed to attack you`;
        },
        consumedHealthPotion: (name, healing) => {
            return `You have consumed a ${name}, you have been healed by ${healing} points`;
        },
        consumedBuffPotion: (name, duration) => {
            return `You have consumed a ${name}, this will last for ${duration} seconds`;
        },
        inventoryFull: "Your inventory is full",
        noWeaponEquipped: "You have no weapon equipped to attack with",
        stealAttemptFail: "You failed to steal from the target and you have angered them",
        stealEnemyTooHighLevel: "The character is too strong to pickpocket, you have angered them",
    },
    enemyConfig: {
        viewDistance: 1,
    },
    gameMenu: {
        loadingText: "Loading Area...",
        menuOpenAtLoad: true,
        pages: [
            {
                title: "main",
                settings: [
                    {
                        name: "Example Option",
                        description: "Allows you to pick a setting for game play",
                        type: "checkbox"
                    }
                ]
            }
        ],
        saveSlots: {
            1: null,
            2: null,
            3: null,
        }
    },
    gameSettings: {
        allowInGameMenu: true,
        showRoomShadow: false,
        oneHandedControls: true,
    },
    gameConfig: {
        dialogueLines: 8,
    },
    areaExitDestinations: {
        // TODO This is not ideal
        northExit: "h4",
        eastExit: "d8",
        southExit: "`4",
        westExit: "d0",
    },
    areaExitLocations: {
        // TODO This is not ideal
        northExit: "g4",
        eastExit: "d7",
        southExit: "a4",
        westExit: "d1",
    },
    areaOuterBoundaries: {
        lowerYBoundary: "h",
        upperYBoundary: "`",
        lowerXBoundary: "0",
        upperXBoundary: "8",
    },
    // defaultKeyMap: {
    //     // https://keycode.info
    //     87: { type: "move", direction: "n" },
    //     68: { type: "move", direction: "e" },
    //     83: { type: "move", direction: "s" },
    //     65: { type: "move", direction: "w" },
    //     38: { type: "direction", direction: "n" },
    //     39: { type: "direction", direction: "e" },
    //     40: { type: "direction", direction: "s" },
    //     37: { type: "direction", direction: "w" },
    //     32: { type: "interaction", interaction: "attack" },
    //     17: { type: "interaction", interaction: "guard" },
    //     69: { type: "interaction", interaction: "interact" },
    //     81: { type: "interaction", interaction: "speak" },
    // },
    defaultKeyMap: {
        moveNorth: 87,
        moveEast: 68,
        moveSouth: 83,
        moveWest: 65,
        directionNorth: 38,
        directionEast: 39,
        directionSouth: 40,
        directionWest: 37,
        interactionAttack: 32,
        interactionGuard: 17,
        interactionInteract: 69,
        interactionSpeak: 81,
    }
};
