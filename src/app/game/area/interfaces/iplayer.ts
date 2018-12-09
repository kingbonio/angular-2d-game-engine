import { PlayerClass } from "../../shared/enums";

export interface IPlayer {
      name: string;
      imageName: string;
      class?: PlayerClass;
}
