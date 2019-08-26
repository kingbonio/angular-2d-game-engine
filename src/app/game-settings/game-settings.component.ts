import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../shared/services/game-settings.service';
import { PersistentStateService } from '../game/shared/services/persistent-state.service';
import { IGameSettings } from '../game/shared/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { UserInputService } from '../shared/services/user-input.service';
import { GameStateService } from '../game/shared/services/game-state.service';
import { KeyInputType } from '../shared/enums';
import keyFullNames from '../shared/util/key-full-names';
import defaults from '../shared/defaults';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

  constructor(
    public gameSettingsService: GameSettingsService,
    public userInputService: UserInputService,
    public gameStateService: GameStateService,
  ) {

  }

  ngOnInit() {

  }
}
