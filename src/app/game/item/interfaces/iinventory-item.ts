import { ArmourType, ItemClass } from "../../shared/enums";
import { WeaponType } from "../enums/weapon-type";
import { IItemProperties } from "../interfaces";


export interface IInventoryItem {
      name: string;
      class: ItemClass;
      type?: any;
      destroyedOnUse?: boolean;
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
