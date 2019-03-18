import { Component, OnInit } from '@angular/core';
import { InventoryManagerService } from '../../shared/services/inventory-manager.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(
    public inventoryManagerService: InventoryManagerService,
  ) { }

  ngOnInit() {
  }

}
