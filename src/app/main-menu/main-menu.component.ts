import { Component } from '@angular/core';
import { PersistentStateService } from '../game/shared/services/persistent-state.service';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { Router } from '@angular/router';
import { BackgroundMusicService } from '../shared/services/background-music.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  public showSaveGames = false;

  constructor(
    private applicationStateService: ApplicationStateService,
    public backgroundMusicService: BackgroundMusicService,
    private router: Router
  ) {

    // Kill the music if we're loading the settings
    this.backgroundMusicService.stopMusic();
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
