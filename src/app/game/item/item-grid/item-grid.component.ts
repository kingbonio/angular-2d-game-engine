import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInventoryItem } from '../interfaces';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent {
  @Input() gridLocations: any;
  @Input() gridLocationKeys: any;
  @Output() clickItem = new EventEmitter<string>();

  constructor() { }

  public itemSlotClicked(itemSlot: string): void {
    this.clickItem.emit(itemSlot);
  }

  // TODO duplicate code
  public getImageSource(item: IInventoryItem) {
    return 'assets/images/' + item.class + "/" + item.imageFileName;
  }

}
