import { ILocation } from "selenium-webdriver";
import { CharacterType, Direction } from "../../shared/enums";

export interface IEnemy {
    type: CharacterType.enemy;
    elementProperties: any;
    name: string;
    startingLocation: string;
    currentDirection: Direction;
    currentLocation?: ILocation;
    loot: any[];
}
