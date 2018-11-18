import { IInventoryItem } from "../../item/interfaces/iinventory-item";

export interface IWeapons {
      primary: IInventoryItem;
      secondary: IInventoryItem;
      concealed: IInventoryItem;
      shield: IInventoryItem;
}
