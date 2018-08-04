import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../shared/services/menu-state.service';
import { MenuSettingTypes } from '../shared/enums';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public menuStateService: MenuStateService) {
  }

  ngOnInit() {
  }

}
