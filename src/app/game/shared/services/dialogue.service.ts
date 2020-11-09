import { Injectable } from '@angular/core';
import defaults from '../../../shared/defaults';
import { ISpeech } from '../../dialogue/interfaces';
import { IDialogueStateData } from '../interfaces';

@Injectable()
export class DialogueService {
    public messagesOnScreen: ISpeech[];
    public pendingMessages: ISpeech[];

    constructor() {
        this.setDefaults();
    }

    /**
     * Add the message to either pending or messages on screen and set timer to remove
     *
     * @param {ISpeech} message data about the message
     */
    public displayDialogueMessage(message: ISpeech): void {
        const date = new Date();
        message.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        if (this.messagesOnScreen.length >= defaults.dialogueConfig.dialogueLines) {
            this.messagesOnScreen.pop();
        }
        this.messagesOnScreen.unshift(message);
    }

    /**
     * Sets the service state to default
     */
    public setDefaults(): void {
        this.messagesOnScreen = [];
        this.pendingMessages = [];
    }

    /**
     * Return the service state for storage
     *
     * @returns {IDialogueStateData}
     */
    public gatherState(): IDialogueStateData {
        return {
            messagesOnScreen: this.messagesOnScreen,
        };
    }

    /**
     * Applies state data to this service
     *
     * @param {IDialogueStateData} newState Settings to push to this state service
     */
    public applyState(newState: IDialogueStateData): void {
        for (const stateSetting in newState) {
            if (newState.hasOwnProperty(stateSetting)) {
                this[stateSetting] = newState[stateSetting];
            }
        }
    }
}
