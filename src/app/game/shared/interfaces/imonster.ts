import { MonsterClass, Direction } from "../enums";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";

export interface IMonster {
      asleep: boolean;
      level: number;
      name: string;
      class: MonsterClass;
      loot: IInventoryItem[];
      direction: Direction;
}
