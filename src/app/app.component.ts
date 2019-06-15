import { Component } from '@angular/core';
import { MenuStateService } from './shared/services/menu-state.service';
import { ModalService } from './game/modal/services/modal.service';
import { ExampleComponent } from './example/example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private menuStateService: MenuStateService,
    public modal: ModalService) {
    // TODO: Look for a way to check menu on site load
    this.modal.open(ExampleComponent, {
      data: {
        message: "helllllo"
      }
    });
  }


}
