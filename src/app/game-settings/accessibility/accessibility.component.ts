import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import defaults from '../../shared/defaults';
import { GameSettingsService } from '../../shared/services/game-settings.service';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent {

  public dyslexiaFont: boolean;

  constructor(
    public gameSettingsService: GameSettingsService,
    public router: Router
  ) {
    this.dyslexiaFont = this.gameSettingsService.dyslexiaFont;
  }

  /**
   * Applies the key maps to the game settings service
   */
  public saveSettings() {
    this.gameSettingsService.saveGameSettings({
      dyslexiaFont: this.dyslexiaFont,
    });
  }

  /**
   * Pull and apply defaults to this component
   */
  public setDefaults() {
    this.dyslexiaFont = defaults.gameSettings.dyslexiaFont;
  }

  /**
   * Navigate to main menu
   */
  public loadMainMenu() {
    this.router.navigate(['/']);
  }
}
