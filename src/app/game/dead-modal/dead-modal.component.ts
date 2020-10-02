import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../shared/services/game-state.service';

@Component({
    selector: 'app-dead-modal',
    templateUrl: './dead-modal.component.html',
    styleUrls: ['./dead-modal.component.scss']
})
export class DeadModalComponent {

    constructor() { }

    /**
     * Call to reload the main page
     */
    public returnToMainMenu(): void {
        window.location.reload();
    }
}
