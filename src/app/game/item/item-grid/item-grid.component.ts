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

    /**
     * Passes up the event of clicking on an item
     *
     * @param {string} itemSlot The location of the item activated
     */
    public itemSlotClicked(itemSlot: string): void {
      this.clickItem.emit(itemSlot);
    }

    /**
     * Returns the location of the item's image file
     *
     * @param {IInventoryItem} item The item to get the image for
     *
     * @returns {string}
     */
    public getImageSource(item: IInventoryItem): string {
      return 'assets/images/items/' + item.class + "/" + item.imageFileName;
    }

}
