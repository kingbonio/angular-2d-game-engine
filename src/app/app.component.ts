import { Component } from '@angular/core';
import { MenuStateService } from './shared/services/menu-state.service';
import { GameSettingsService } from './shared/services/game-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private menuStateService: MenuStateService,
    private gameSettingsService: GameSettingsService,
    ) {
  }
}
