import { ItemClass } from "../enums";
import { IItemProperties } from ".";


export interface IInventoryItem {
      name: string;
      class: ItemClass;
      level: number;
      weight: number;
      inventoryHeight?: number;
      inventoryWidth?: number;
      value: number;
      imageFileName: string;
      properties: IItemProperties;
}
