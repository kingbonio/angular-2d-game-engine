import { IInventoryItem } from "../../item/interfaces";
import { Direction, ElementClass, ObjectType } from "../../shared/enums";
import { SoundEffects } from "../../../shared/enums";
import inventoryLocationsDefaults from "../../shared/models/inventoryLocations";
import { IInventoryReferences } from "../../item/inventory/interfaces";
import { Helper } from "../../../shared/util/helper";

export class GridObject {
    public canBeTraversed: boolean;
    public direction: Direction;
    public imageFileName: string;
    public isInteractive: boolean;
    public isLocked: boolean;
    public itemReferenceNeeded: string;
    public lockedDialogue: string;
    public loot: IInventoryItem[] = [];
    public name: string;
    public objectType: ObjectType;
    public soundEffect: SoundEffects;
    public startingDirection: Direction;
    public type = ElementClass.object;

    public inventoryLocations: IInventoryReferences;
    public locationKeys: any;

    constructor(elementProperties: any) {
        this.inventoryLocations = elementProperties.inventoryLocations || Helper.cloneObject(inventoryLocationsDefaults);
        this.locationKeys = Object.keys;

        this.canBeTraversed = elementProperties.canBeTraversed;
        this.direction = elementProperties.startingDirection;
        this.imageFileName = elementProperties.imageFileName;
        this.isInteractive = elementProperties.isInteractive;
        this.isLocked = elementProperties.isLocked;
        this.itemReferenceNeeded = elementProperties.itemReferenceNeeded;
        this.lockedDialogue = elementProperties.lockedDialogue;
        this.loot = elementProperties.loot;
        this.name = elementProperties.name;
        this.objectType = elementProperties.objectType;
        this.soundEffect = elementProperties.soundEffect;
        this.startingDirection = elementProperties.startingDirection;

        // Overwrite existing inventoryLocations if provided
        if (elementProperties.inventoryLocations) {
            this.inventoryLocations = elementProperties.inventoryLocations;
        } else if (this.loot && this.loot.length) {
            elementProperties.loot.forEach((item: IInventoryItem) => {
                for (const slot in this.inventoryLocations) {
                    if (this.inventoryLocations.hasOwnProperty(slot) && !this.inventoryLocations[slot]) {
                        this.inventoryLocations[slot] = item;
                        return;
                    }
                }
            });
        }
    }

    /**
     * Sets the status of the object to unlocked if relevant key item provided
     *
     * @param {IInventoryItem} item The item to attempt the unlock with
     */
    public unlock(item: IInventoryItem) {
        if (this.isLocked) {
            if (item.itemReference && (item.itemReference === this.itemReferenceNeeded)) {
                this.isLocked = false;
            }
        } else {
            this.isLocked = false;
        }
    }
}
