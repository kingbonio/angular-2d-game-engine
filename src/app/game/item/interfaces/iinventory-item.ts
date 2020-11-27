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
    itemReference?: string;
    imageFileName?: string;
    gameEndTrigger?: boolean;
    properties: IItemProperties;
}
