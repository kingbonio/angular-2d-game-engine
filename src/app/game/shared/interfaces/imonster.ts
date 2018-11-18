import { MonsterClass, Direction } from "../enums";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { ILocation } from "selenium-webdriver";
import { ILootParameters } from "./";

export interface IMonster {
      asleep: boolean;
      level: number;
      name: string;
      class: MonsterClass;
      lootParameters: ILootParameters;
      currentDirection: Direction;
      currentLocation?: ILocation;
}
