import { Component } from '@angular/core';
import defaults from '../../shared/defaults';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end-modal.component.html',
  styleUrls: ['./game-end-modal.component.scss']
})
export class GameEndModalComponent {
  public gameEndMessage: string;

  constructor() {
    this.gameEndMessage = defaults.gameEndMessage;
  }

  /**
   * Call to reload the main page
   */
  public returnToMainMenu(): void {
    window.location.reload();
  }
}
