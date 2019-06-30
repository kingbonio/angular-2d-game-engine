import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IInventoryItem } from '../interfaces';
import { weapons } from '../../../game-config/items';
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
    // console.log(data);
  }

  ngOnInit() {
  }

  public useItem(itemSlot: string) {
    // console.log(itemSlot);
    this.inventoryManagerService.addItemToInventory(this.target.inventoryLocations[itemSlot]);
    this.target.inventoryLocations[itemSlot] = null;
  }

}
