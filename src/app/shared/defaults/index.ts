import { Direction } from '../../game/shared/enums';

export default {
    // Game ticker in milliseconds
    gameTimer: 700,
    userInputPauseTime: 50,
    // Player defaults
    initialPlayerStats: {
        health: 20,
        maxHealth: 50,
        startingDirection: Direction.N,
        direction: Direction.N
    },
    animations: {
        movementDurationMilliseconds: 170,
        attackDurationMilliseconds: 170,
        guardDurationMilliseconds: 170,
        receiveAttackDurationMilliseconds: 170,
    },
    playerMultipliers: {
        stealSuccessRequirement: 5,
    },
    battleMultipliers: {
        guardDivider: 0.5,
    },
    playerBaseStats: {
        baseDamage: 5,
    },
    enemyProperties: {
        // Must be 1 or over
        baseArmour: 5,
        minimumAttackRoll: 3,
    },
    dialogue: {
        textOnScreenTimeMultiplier: 200,
        minimumOnScreenTime: 4000,
        nullElementResponse: "There is no response",
        keyItemNotActive: "You have not got the correct active item",
        keyItemDestroyed: "You have discarded the key item as it has no more use",
        computerName: "Game",
        computerCharacterType: "computer",
        areaTipsName: "area tips",
        areaTipsType: "area-tips",
        maximumMessagesOnScreen: 3,
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
    },
    volumes: {
        music: 0.5,
        soundEffect: 0.5,
    },
    enemyConfig: {
        // Not currently in use
        viewDistance: 1,
    },
    gameMenu: {
        loadingText: "Loading Area...",
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
        // TODO Does this mean lines or messages?
        dialogueLines: 8,
    },
    // DO NOT CHANGE THE FOLLOWING
    areaExitDestinations: {
        northExit: "h4",
        eastExit: "d8",
        southExit: "`4",
        westExit: "d0",
    },
    areaExitLocations: {
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
