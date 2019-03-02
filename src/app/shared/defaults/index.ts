import { Direction } from '../../game/shared/enums';

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
        locationX: 2,
        locationY: 'B',
        direction: Direction.N
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
        textOnScreenTimeMultiplyer: 500,
        minimumOnScreenTime: 3000,
        nullElementResponse: "There is no response",
        computerName: "Computer",
        computerCharacterType: "computer",
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
