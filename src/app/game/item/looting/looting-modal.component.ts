import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Character } from '../../character-classes/character';
import { InventoryManagerService } from '../services/inventory-manager.service';

@Component({
  selector: 'app-looting',
  templateUrl: './looting-modal.component.html',
  styleUrls: ['./looting-modal.component.scss']
})
export class LootingModalComponent implements OnInit {
  public target: Character;

  constructor(
    private inventoryManagerService: InventoryManagerService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.target = data;
  }

  ngOnInit() {
  }

  public useItem(itemSlot: string) {
    this.inventoryManagerService.addItemToInventory(this.target.inventoryLocations[itemSlot]);
    this.target.inventoryLocations[itemSlot] = null;
  }

}
