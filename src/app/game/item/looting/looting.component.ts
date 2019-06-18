import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IInventoryItem } from '../interfaces';
import { Weapons } from '../../../game-config/items';

@Component({
  selector: 'app-looting',
  templateUrl: './looting.component.html',
  styleUrls: ['./looting.component.scss']
})
export class LootingComponent implements OnInit {
  items: IInventoryItem[];

  constructor(
    private dialogRef: MatDialogRef<LootingComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.items = data.loot;
    // TODO Remove this
    this.items.push(Weapons.basicKnife);
  }

  ngOnInit() {
  }

}
