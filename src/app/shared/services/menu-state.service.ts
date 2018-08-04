import { Injectable } from '@angular/core';
import defaults from '../defaults';

@Injectable()
export class MenuStateService {
  private _menuOpen;

  constructor() {
    this.menuOpen = defaults.gameMenu.menuOpenAtLoad;
  }

  get menuOpen() {
    return this._menuOpen;
  }

  set menuOpen(menuState) {
    this._menuOpen = menuState;
  }

}
