import { Component, OnInit } from '@angular/core';

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
    public restartGame(): void {
        window.location.reload();
    }
}
