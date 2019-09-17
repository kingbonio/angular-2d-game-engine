import { MonsterClass, Direction, CharacterType } from "../../shared/enums";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { ILocation } from "selenium-webdriver";
import { ILootParameters } from "../../shared/interfaces";

export interface IMonster {
      type: CharacterType.enemy;
      asleep: boolean;
      level: number;
      name: string;
      class: MonsterClass;
      lootParameters: ILootParameters;
      startingLocation: string;
      currentDirection: Direction;
      currentLocation?: ILocation;
}
