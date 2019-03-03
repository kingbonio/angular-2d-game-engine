import { CharacterType, Direction } from "../shared/enums";

export class Character {
      currentHp: number;
      maxHp: number;
      xp: number;
      asleep: boolean;
      type: CharacterType;
      direction: Direction;

      constructor() {
      }
}
