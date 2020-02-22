import { Component } from '@angular/core';
import { PersistentStateService } from '../game/shared/services/persistent-state.service';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { MenuStateService } from '../shared/services/menu-state.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  public showSaveGames = false;

  constructor(
    public menuStateService: MenuStateService,
    private persistentStateService: PersistentStateService,
    private applicationStateService: ApplicationStateService,
    ) {
    this.applicationStateService.gameOpen = false;
  }

  public toggleSaveGameSection() {
    this.showSaveGames = !this.showSaveGames;
  }
}
