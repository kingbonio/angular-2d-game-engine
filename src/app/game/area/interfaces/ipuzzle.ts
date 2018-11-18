import { IInventoryItem } from "../../item/interfaces/iinventory-item";

export interface IPuzzle {
      difficulty: number;
      itemRequired: boolean;
      itemToSolve: IInventoryItem;
}
