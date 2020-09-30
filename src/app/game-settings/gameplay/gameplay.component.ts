import { Component } from '@angular/core';
import { GameSettingsService } from '../../shared/services/game-settings.service';
import { Router } from '@angular/router';
import defaults from '../../shared/defaults';

@Component({
    selector: 'app-gameplay',
    templateUrl: './gameplay.component.html',
    styleUrls: ['./gameplay.component.scss']
})
export class GameplayComponent {

    public showControls: boolean;

    constructor(
        public gameSettingsService: GameSettingsService,
        public router: Router
    ) {
        this.showControls = this.gameSettingsService.showControls;
    }

    /**
     * Applies the key maps to the game settings service
     */
    public saveSettings() {
        this.gameSettingsService.saveGameSettings({
            showControls: this.showControls,
        });
    }

    /**
     * Pull and apply defaults to this component
     */
    public setDefaults() {
        this.showControls = defaults.gameSettings.showControls;
    }

    /**
     * Navigate to main menu
     */
    public loadMainMenu() {
        this.router.navigate(['/']);
    }
}
