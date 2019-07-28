import { PlayerClass, CharacterType } from "../../shared/enums";

export interface IPlayer {
      type: CharacterType.player;
      name: string;
      imageFileName: string;
      class?: PlayerClass;
}
