import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { PuzzleType } from "../enums";

export interface IPuzzleElement {
      itemGiven: IInventoryItem;
      type: PuzzleType;
}
