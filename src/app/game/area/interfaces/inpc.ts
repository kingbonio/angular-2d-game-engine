import { CharacterType } from "../../shared/enums";

export interface INpc {
      type: CharacterType.npc;
      name: string;
      imageFileName: string;
      startingLocation: string;
      loot: any[];
}
