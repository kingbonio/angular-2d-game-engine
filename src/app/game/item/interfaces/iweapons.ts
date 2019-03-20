import { IInventoryItem } from ".";

export interface IWeapons {
      primary: IInventoryItem | null;
      secondary: IInventoryItem | null;
      concealed: IInventoryItem | null;
      shield: IInventoryItem | null;
}
