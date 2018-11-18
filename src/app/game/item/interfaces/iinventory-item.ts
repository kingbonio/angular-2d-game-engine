import { ItemClass, ArmourType } from "../../shared/enums";
import { IItemProperties } from "../../shared/interfaces";
import { WeaponType } from "../enums/weapon-type";


export interface IInventoryItem {
      name: string;
      class: ItemClass;
      armourSlot: ArmourType | null;
      weaponSlot: WeaponType | null;
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
