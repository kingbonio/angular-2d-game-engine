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
        locationY: '2',
        direction: Direction.up
    },
    initialAreaSettings: {
        type: 'start'
    }
};
