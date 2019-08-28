import { Injectable } from '@angular/core';
import defaults from '../defaults';

@Injectable()
export class MenuStateService {
  public menuOpen;

  constructor() {
    this.menuOpen = defaults.gameMenu.menuOpenAtLoad;
  }

}
