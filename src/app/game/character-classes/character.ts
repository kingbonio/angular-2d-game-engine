import { CharacterType, Direction } from "../shared/enums";
import { IArmour } from "../shared/interfaces";

export class Character {
      currentHp: number;
      maxHp: number;
      xp: number;
      asleep: boolean;
      type: CharacterType;
      direction: Direction;
      armour?: IArmour;

      constructor() {
      }
}
