import { IInventoryItem } from ".";

export interface IWeapons {
      primary: IInventoryItem;
      secondary: IInventoryItem;
      concealed: IInventoryItem;
      shield: IInventoryItem;
}
