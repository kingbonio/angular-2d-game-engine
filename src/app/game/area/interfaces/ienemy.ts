import { ILocation } from "selenium-webdriver";
import { CharacterType, Direction, MonsterClass } from "../../shared/enums";
import { ILootParameters } from "../../shared/interfaces";

export interface IEnemy {
      type: CharacterType.enemy;
      asleep: boolean;
      level: number;
      name: string;
      class: MonsterClass;
      lootParameters: ILootParameters;
      startingLocation: string;
      currentDirection: Direction;
      currentLocation?: ILocation;
      loot: any[];
}
