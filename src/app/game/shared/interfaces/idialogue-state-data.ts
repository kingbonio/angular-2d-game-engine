import { ISpeech } from ".";
import { CharacterType } from "../enums";

export interface IDialogueStateData {
      textOnScreen: ISpeech | null;
      whoIsSpeaking: CharacterType| null;
      pendingMessages: ISpeech[];
      dialogueVisible: boolean;
}
