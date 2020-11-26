import { Injectable } from '@angular/core';
import { IInventoryItem, IInventoryStateData } from '../../shared/interfaces';
import { IInventoryReferences } from '../inventory/interfaces';
import inventoryLocationsDefaults from '../../shared/models/inventoryLocations';
import { initialInventoryItems } from '../../../game-config/initial-items';
import { Helper } from '../../../shared/util/helper';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { GameStateService } from '../../shared/services/game-state.service';

@Injectable()
export class InventoryManagerService {
    public locationKeys: any;
    public locations: IInventoryReferences;

    constructor(
        private gameStateService: GameStateService
    ) {
        this.setDefaults();
    }

    /**
     * Returns the next available slot location if one is available
     *
     * @returns {string|null}
     */
    private getNextFreeSlot(): string | null {
        for (const itemSlot in this.locations) {
            if (this.locations.hasOwnProperty(itemSlot) && !this.locations[itemSlot]) {

                return itemSlot;
            }
        }

        return null;
    }

    /**
     * Adds an inventory item to the inventory if there is space,
     * otherwise throws an error
     *
     * @param {IInventoryItem} newItem The item added to the inventory
     *
     * @throws {Error}
     */
    public addItemToInventory(newItem: IInventoryItem): void {
        const targetLocation = this.getNextFreeSlot();
        if (!targetLocation) {
            throw new Error("Inventory full");
        } else {
            this.locations[targetLocation] = newItem;
        }

        // Trigger game end if item has the correct property
        if (newItem.gameEndTrigger) {
            this.gameStateService.gameEnd = true;
            this.gameStateService.gameEndSubject.next("Game is completed");
        }
    }

    /**
     * Adds inventory items to the inventory
     *
     * @param {IInventoryItem[]} newItems The items to be added to the inventory
     */
    public addItemsToInventory(newItems: IInventoryItem[]): void {
        newItems.forEach((item: IInventoryItem) => {
            this.addItemToInventory(item);
        });
    }

    /**
     * Sets all service states to default
     */
    public setDefaults(): void {
        this.locations = Helper.cloneObject(inventoryLocationsDefaults);
        this.locationKeys = Object.keys;
        this.addItemsToInventory(initialInventoryItems);
    }

    /**
     * Return the inventory state for storage
     *
     * @returns {IInventoryStateData}
     */
    public gatherState(): IInventoryStateData {

        return {
            locationKeys: this.locationKeys,
            locations: this.locations,
        };
    }

    /**
     * Applies state data to this service
     *
     * @param {IInventoryStateData} newState Settings to push to this state service
     */
    public applyState(newState: IInventoryStateData): void {
        for (const stateSetting in newState) {
            if (newState.hasOwnProperty(stateSetting)) {
                this[stateSetting] = newState[stateSetting];
            }
        }
    }
}
