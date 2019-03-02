import { Injectable } from '@angular/core';
import { CharacterType } from '../enums';
import defaults from '../../../shared/defaults';
import { IDialogueStateData } from '../interfaces';
import { ISpeech } from '../../dialogue/interfaces';

@Injectable()
export class DialogueService {
  textOnScreen: ISpeech;
  whoIsSpeaking: CharacterType | string;
  pendingMessages: ISpeech[] = [];
  dialogueVisible = false;

  constructor() { }

  /**
   * Set the current on-screen dialogue
   * Set the timer to close the current message once expires
   * @param speechDetails text and speaker details
   */
  public displaySpeech(speechDetails: ISpeech): void {
    this.whoIsSpeaking = speechDetails.character;
    if (this.dialogueVisible) {
      this.pendingMessages.push(speechDetails);
    } else {
      this.textOnScreen = speechDetails;
      this.dialogueVisible = true;
      this.setTimer();
    }
  }

  /**
   * Sets a timer based on the length of the text on screen, with a minimum duration
   * Process the next message on the pending messages when timer ends
   */
  private setTimer(): void {
    const timerDuration = this.textOnScreen.text.length < defaults.dialogue.minimumOnScreenTime ?
      this.textOnScreen.text.length * defaults.dialogue.textOnScreenTimeMultiplyer :
      defaults.dialogue.minimumOnScreenTime;
    setTimeout(() => {
      this.dialogueVisible = false;
      if (this.pendingMessages.length) {
        const nextMessage = this.pendingMessages[0];
        this.pendingMessages.shift();
        this.displaySpeech(nextMessage);
      }
    }, timerDuration);
  }

  /**
   * Return the dialogue state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IDialogueStateData {
    return {
      textOnScreen: this.textOnScreen,
      whoIsSpeaking: this.whoIsSpeaking,
      pendingMessages: this.pendingMessages,
      dialogueVisible: this.dialogueVisible
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IDialogueStateData): void {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
