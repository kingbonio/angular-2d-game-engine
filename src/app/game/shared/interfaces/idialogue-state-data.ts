import { CharacterType } from "../enums";
import { ISpeech } from "../../dialogue/interfaces";

export interface IDialogueStateData {
      messagesOnScreen: ISpeech[];
      // pendingMessages: ISpeech[];
}