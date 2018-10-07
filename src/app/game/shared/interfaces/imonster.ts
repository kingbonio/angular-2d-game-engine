import { MonsterClass, Direction } from "../enums";
import { IInventoryItem } from "./iinventory-item";

export interface IMonster {
      asleep: boolean;
      level: number;
      name: string;
      class: MonsterClass;
      loot: IInventoryItem[];
      direction: Direction;
}
