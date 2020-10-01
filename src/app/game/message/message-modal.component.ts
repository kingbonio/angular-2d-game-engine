import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GameStateService } from '../shared/services/game-state.service';

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnDestroy {
    public message: string;

    constructor(
        private gameStateService: GameStateService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.message = data;
        this.gameStateService.gamePaused = true;
    }

    ngOnDestroy() {
        this.gameStateService.gamePaused = false;
    }

}
