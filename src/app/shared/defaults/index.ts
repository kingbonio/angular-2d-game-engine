import { Direction } from '../../game/shared/enums';

export default {
    // Game ticker in milliseconds
    // This is how fast enemies etc move on their own
    gameTimer: 700,
    // Gives the milliseconds to pause player input
    userInputPauseTime: 50,
    // Player defaults
    initialPlayerStats: {
        health: 20,
        maxHealth: 50,
        // The initial direction of the player
        direction: Direction.N
    },
    animations: {
        // Sets the milliseconds for waiting on an animation to finish
        // This needs to match the CSS animation time
        // area.component.scss (animation-duration: 0.17s;)
        movementDurationMilliseconds: 170,
        attackDurationMilliseconds: 170,
        guardDurationMilliseconds: 170,
        receiveAttackDurationMilliseconds: 170,
    },
    playerMultipliers: {
        // This is the minimum dice roll to succeed in stealing from someone
        stealSuccessRequirement: 5,
    },
    battleMultipliers: {
        // How much to multiply the damage by if character/player is guarding
        // Should be between 0 and 1
        guardMultiplier: 0.5,
    },
    playerBaseStats: {
        // The minimum damage inflicted by the player
        baseDamage: 5,
    },
    enemyProperties: {
        // The minimum armour total without armour equipped
        // Must be 1 or over
        baseArmour: 5,
        // The minimum dice roll needed to succeed in an attack
        minimumAttackRoll: 3,
    },
    dialogue: {
        // If an object does not have a response
        nullElementResponse: "There is no response",
        // If you are trying to activate an object without the proper key item equipped
        keyItemNotActive: "You have not got the correct active item",
        // If the key item has been used up and discarded
        keyItemDestroyed: "You have discarded the key item as it has no more use",
        // The name that will show for the computer
        computerName: "Game",
        // The theme shown in the dialogue area (text colour for example)
        computerCharacterType: "computer",
        // The name that will show for area tips
        areaTipsName: "Area tips",
        // The theme shown in the dialogue area (text colour for example)
        areaTipsType: "area-tips",
        // If the door you're trying to open is locked
        areaExitLocked: "The door is locked",
        // If you try taking a non-buff health potion and you are already at maximum health
        alreadyAtFullHealth: "You are already at full health",
        // If you're trying to access a colour coded door without the correct key item equipped
        areaExitKeyNotActive: (keyColour) => {
            return `You need a ${keyColour} key to open this door`;
        },
        // If you successfully hit a character with an attack, displays the damage dealt
        attackSuccess: (damage) => {
            return `Your attack hits with damage: ${damage}`;
        },
        // If your attack attempt has failed
        attackFailure: "Your attack fails",
        // If your attack on a character takes them to 0 health or lower, is open for appending character name
        targetDead: "You have killed ",
        // If you receive a successful attack, shows attacker and damage dealt to player
        enemyAttacks: (damage, name) => {
            return `Your were attacked by ${name}, you take ${damage} damage`;
        },
        // If the character fails to hit the player
        enemyFailsAttack: (name) => {
            return `${name} failed to attack you`;
        },
        // If you use a non-buff health potion on yourself without being full health
        consumedHealthPotion: (name, healing) => {
            return `You have consumed a ${name}, you have been healed by ${healing} points`;
        },
        // If you use a buff potion, will display the name and duration
        consumedBuffPotion: (name, duration) => {
            return `You have consumed a ${name}, this will last for ${duration} seconds`;
        },
        // If you try to add an item to your inventory when the inventory is full
        inventoryFull: "Your inventory is full",
        // If your dice roll for steal success is lower than the required number
        stealAttemptFail: "You failed to steal from the target and you have angered them",
    },
    volumes: {
        // Volume for the background music
        music: 0.5,
        // Volume for sound effects
        soundEffect: 0.5,
    },
    enemyConfig: {
        // For determining the distance in locations an enemy can view
        // NOT USED - Do not change this from 1
        viewDistance: 1,
    },
    gameMenu: {
        // Text to be displayed while the area is loading
        loadingText: "Loading Area...",
        // Default save data
        // DO NOT CHANGE THESE
        saveSlots: {
            1: null,
            2: null,
            3: null,
        }
    },
    gameSettings: {
        // Shows the in-game menu option
        // Not recommended changing this
        allowInGameMenu: true,
        // If we are to show touchscreen controls
        showControls: true,
        // If we want to show room shadow in game
        // Not recommended changing this
        showRoomShadow: false,
        // If we want the game to start with one-handed controls
        oneHandedControls: true,
        // If we want to start with an accessible font
        dyslexiaFont: false,
    },
    gameConfig: {
        // Maximum number of messages to show in the dialogue area at once
        dialogueLines: 8,
    },
    // The references for the keyboard keys set as default
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
    },
    // The following are for the area boundaries
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
    }
};
