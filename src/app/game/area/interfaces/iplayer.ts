import { CharacterType, PlayerClass } from "../../shared/enums";

export interface IPlayer {
    type: CharacterType.player;
    name: string;
    imageFileName: string;
    class?: PlayerClass;
}
