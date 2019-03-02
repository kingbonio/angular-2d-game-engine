import { CharacterType } from "../../shared/enums";

export interface ISpeech {
      text: string;
      character: CharacterType | string;
      name: string;
}
