import { CharacterType } from "../shared/enums";

export class Character {
      hp: number;
      xp: number;
      asleep: boolean;
      type: CharacterType;

      constructor() {
            // TODO: Set this manually
            this.hp = 10;
            this.xp = 0;
      }


}
