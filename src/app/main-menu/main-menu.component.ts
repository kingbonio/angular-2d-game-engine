import { Component } from '@angular/core';
import { PersistentStateService } from '../game/shared/services/persistent-state.service';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { MenuStateService } from '../shared/services/menu-state.service';
import { Router } from '@angular/router';

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
    private router: Router
    ) {
    this.applicationStateService.gameOpen = false;
  }

  public goToPage(page: string) {
    if (page === "game") {
      this.applicationStateService.canAccessGame = true;
    }
    this.router.navigate([page]);
  }

  public toggleSaveGameSection() {
    this.showSaveGames = !this.showSaveGames;
  }
}
