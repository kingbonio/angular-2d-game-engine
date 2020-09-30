import { IInventoryItem } from '.';

export interface IArmourSlots {
    head: IInventoryItem | null;
    arms: IInventoryItem | null;
    hands: IInventoryItem | null;
    torso: IInventoryItem | null;
    legs: IInventoryItem | null;
    boots: IInventoryItem | null;
}
