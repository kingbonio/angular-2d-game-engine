import { IInventoryItem } from "../../item/interfaces";

export class GridObject {
      public canBeTraversed: boolean;
      public isInteractive: boolean;
      public itemNeededToInteract: IInventoryItem;

      constructor() {

      }
}
