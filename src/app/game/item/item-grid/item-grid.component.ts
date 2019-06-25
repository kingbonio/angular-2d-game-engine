import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGridReferences } from '../../area/interfaces';
import { IInventoryItem } from '../interfaces';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  @Input() gridLocations: any;
  @Input() gridLocationKeys: any;
  @Output() clickItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log(this.gridLocations);
  }

  public itemSlotClicked(itemSlot: string): void {
    this.clickItem.emit(itemSlot);
  }

}
