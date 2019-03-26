import { CharacterType, Direction } from "../shared/enums";
import { IWeapons, IArmour, IInventoryItem } from "../item/interfaces";

export class Character {
      currentHp: number;
      maxHp: number;
      xp: number;
      asleep: boolean;
      type: CharacterType;
      direction: Direction;
      armour?: IArmour;
      weapons?: IWeapons;
      loot: IInventoryItem[];

      constructor() {
      }
}
