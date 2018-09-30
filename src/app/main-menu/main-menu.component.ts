import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../shared/services/menu-state.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(public menuStateService: MenuStateService) {
  }

  ngOnInit() {
  }

}
