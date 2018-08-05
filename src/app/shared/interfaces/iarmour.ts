import { IInventoryItem } from "./iinventory-item";

export interface IArmour {
      head: IInventoryItem;
      arms: IInventoryItem;
      hands: IInventoryItem;
      torso: IInventoryItem;
      legs: IInventoryItem;
      boots: IInventoryItem;
}
