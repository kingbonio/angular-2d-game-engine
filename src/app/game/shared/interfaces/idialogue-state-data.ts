import { ISpeech } from ".";
import { Character } from "../enums";

export interface IDialogueStateData {
      textOnScreen: ISpeech | null;
      whoIsSpeaking: Character| null;
      pendingMessages: ISpeech[];
      dialogueVisible: boolean;
}
