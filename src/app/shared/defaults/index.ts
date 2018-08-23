import { Direction } from '../enums';

export default {
    // Player defaults
    initialPlayerStats: {
        health: 30,
        maxHealth: 50,
        strength: 10,
        dexterity: 10,
        magicka: 10,
        exp: 0,
        imageLocation: 'src/assets/images/player-image.jpg',
        locationX: 'B',
        locationY: 2,
        direction: Direction.up
    },
    playerMultiplyers: {
        inventoryStorageMultiplyer: 30,
        inventoryCapacityMultiplyer: 30,
        levelCalculation: (exp) => {
            return exp / 3000;
        }
    },
    initialAreaSettings: {
        type: 'start'
    },
    dialogue: {
        textOnScreenTimeMultiplyer: 0.1,
        minimumOnScreenTime: 30,
    },
    gameMenu: {
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
        ]
    }
};
