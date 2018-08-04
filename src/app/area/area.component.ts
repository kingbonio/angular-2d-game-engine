import { Component, OnInit } from '@angular/core';
import { AreaStateService } from '../shared/services/area-state.service';
import { Locations } from '../shared/enums';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  constructor(public areaStateService: AreaStateService) {
  }

  ngOnInit() {
  }

}
