import { Injectable } from '@angular/core';
import { Character } from '../enums';
import defaults from '../defaults';
import { ISpeech } from '../interfaces';

@Injectable()
export class DialogueService {
  textOnScreen: ISpeech;
  whoIsSpeaking: Character;
  pendingMessages: ISpeech[];
  dialogueVisible = false;

  constructor() { }

  /**
   * Set the current on-screen dialogue
   * Set the timer to close the current message once expires
   */
  displaySpeech(speechDetails: ISpeech) {
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
  setTimer() {
    const timerDuration = this.textOnScreen.text.length < defaults.dialogue.minimumOnScreenTime ?
                          this.textOnScreen.text.length * defaults.dialogue.textOnScreenTimeMultiplyer :
                          defaults.dialogue.minimumOnScreenTime;
    setTimeout(timerDuration, () => {
      this.dialogueVisible = false;
      if (this.pendingMessages.length) {
        const nextMessage = this.pendingMessages[0];
        this.pendingMessages.shift();
        this.displaySpeech(nextMessage);
      }
    });
  }

}
