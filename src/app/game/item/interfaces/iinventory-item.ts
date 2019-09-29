import { ItemClass, ArmourType } from "../../shared/enums";
import { IItemProperties } from "../interfaces";
import { WeaponType } from "../enums/weapon-type";


export interface IInventoryItem {
      name: string;
      class: ItemClass;
      type?: any;
      armourSlot: ArmourType | null;
      weaponSlot: WeaponType | null;
      usable: boolean;
      itemReference?: string;
      level?: number;
      weight?: number;
      inventoryHeight?: number;
      inventoryWidth?: number;
      value: number;
      imageFileName?: string;
      // TODO: May be a better way of assigning class-based properties
      properties: IItemProperties;
}
