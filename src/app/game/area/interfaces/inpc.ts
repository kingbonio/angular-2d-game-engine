import { CharacterType } from "../../shared/enums";

export interface INpc {
      type: CharacterType.npc;
      name: string;
      imageName: string;
}
