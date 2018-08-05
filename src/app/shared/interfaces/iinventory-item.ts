import { ItemClass } from "../enums";
import { IItemProperties } from ".";


export interface IInventoryItem {
      name: string;
      class: ItemClass;
      usable: boolean;
      equipment: boolean;
      level: number;
      weight: number;
      inventoryHeight?: number;
      inventoryWidth?: number;
      value: number;
      imageFileName: string;
      // TODO: May be a better way of assigning class-based properties
      properties: IItemProperties;
}
