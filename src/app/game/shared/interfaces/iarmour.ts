import { IInventoryItem } from "../../item/interfaces/iinventory-item";

export interface IArmour {
      head: IInventoryItem | null;
      arms: IInventoryItem | null;
      hands: IInventoryItem | null;
      torso: IInventoryItem | null;
      legs: IInventoryItem | null;
      boots: IInventoryItem | null;
}
