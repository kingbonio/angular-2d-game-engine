import { IInventoryItem } from "../../shared/interfaces/iinventory-item";
import { PuzzleType } from "../../shared/enums";

export interface IPuzzleElement {
      itemGiven: IInventoryItem;
      type: PuzzleType;
}
