import { Component, OnInit } from '@angular/core';
import { EquipmentManagerService } from '../services/equipment-manager.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  constructor(public equipmentManagerService: EquipmentManagerService) { }

  ngOnInit() {
  }

  public useItem(itemSlot: string) {
    if (this.equipmentManagerService.locations[itemSlot]) {
      // TODO Do this?
    }
  }

}
