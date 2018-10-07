import { IInventoryItem } from "../../shared/interfaces/iinventory-item";

export interface IPuzzle {
      difficulty: number;
      itemRequired: boolean;
      itemToSolve: IInventoryItem;
}
