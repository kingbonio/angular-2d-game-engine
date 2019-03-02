import { CharacterType } from "../enums";
import { ISpeech } from "../../dialogue/interfaces";

export interface IDialogueStateData {
      textOnScreen: ISpeech | null;
      whoIsSpeaking: CharacterType | string | null;
      pendingMessages: ISpeech[];
      dialogueVisible: boolean;
}
