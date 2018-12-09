import { Component } from '@angular/core';
import { Direction } from './shared/enums';
import { PlayerStateService } from './shared/services/player-state.service';

@Component({
  selector: 'app-game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  title = 'game';

  constructor(public playerStateService: PlayerStateService) {

    // TODO: Look for a way to check menu on site load
  }
}
