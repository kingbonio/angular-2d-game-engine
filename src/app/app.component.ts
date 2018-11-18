import { Component } from '@angular/core';
import { MenuStateService } from './shared/services/menu-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private menuStateService: MenuStateService) {
    // TODO: Look for a way to check menu on site load
  }


}
