import { Component } from '@angular/core';
import { GameStateService } from '../game/shared/services/game-state.service';
import { GameSettingsService } from '../shared/services/game-settings.service';
import { UserInputService } from '../shared/services/user-input.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent {

  constructor(
    public gameSettingsService: GameSettingsService,
    public userInputService: UserInputService,
    public gameStateService: GameStateService,
  ) { }
}
