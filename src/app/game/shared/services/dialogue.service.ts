import { Injectable } from '@angular/core';
import defaults from '../../../shared/defaults';
import { IDialogueStateData } from '../interfaces';
import { ISpeech } from '../../dialogue/interfaces';

@Injectable()
export class DialogueService {
  messagesOnScreen: ISpeech[] = [];
  pendingMessages: ISpeech[] = [];

  constructor() { }

  /**
   * Add the message to either pending or messages on screen and set timer to remove
   * @param message data about the message
   */
  public displayDialogueMessage(message: ISpeech) {
    if (message) {
      if (this.messagesOnScreen.length >= defaults.dialogue.maximumMessagesOnScreen) {
        this.pendingMessages.push(message);
      } else {
        this.messagesOnScreen.push(message);
      }
      this.setTimer(message);
    }
  }

  /**
   * Set the wait until the oldest message should be removed from the dialogue screen
   * @param message data about the message
   */
  // TODO: This will need tidying up as it counts from the point of getting the message, not the time it's loaded
  private setTimer(message: ISpeech) {
    const timerDuration: number = message.text.length < defaults.dialogue.minimumOnScreenTime ?
      message.text.length * defaults.dialogue.textOnScreenTimeMultiplier :
      defaults.dialogue.minimumOnScreenTime;
    setTimeout(() => {
      // Remove the oldest message on screen and pull in any pending messages
      if (this.messagesOnScreen.length > 0) {
        this.messagesOnScreen.splice(0, 1);
        if (this.pendingMessages.length) {
          const nextMessage: ISpeech = this.pendingMessages[0];
          this.pendingMessages.splice(0, 1);
          this.displayDialogueMessage(nextMessage);
        }
      }
    }, timerDuration);
  }

  /**
   * Return the dialogue state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IDialogueStateData {
    return {
      pendingMessages: this.pendingMessages,
      messagesOnScreen: this.messagesOnScreen,
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
