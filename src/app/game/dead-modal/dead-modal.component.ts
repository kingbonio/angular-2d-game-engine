import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import defaults from '../../shared/defaults';
import { GameStateService } from '../shared/services/game-state.service';

@Component({
    selector: 'app-dead-modal',
    templateUrl: './dead-modal.component.html',
    styleUrls: ['./dead-modal.component.scss']
})
export class DeadModalComponent {
    public deadMessage: string;

    constructor() {
        this.deadMessage = defaults.deadMessage;
    }

    /**
     * Call to reload the main page
     */
    public returnToMainMenu(): void {
        window.location.reload();
    }
}
