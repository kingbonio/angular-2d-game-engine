import { IArmourSlots } from "./iarmour-slots";
import { IWeaponSlots } from "./iweapons-slots";
import { IInventoryItem } from "./iinventory-item";

export interface ILoot {
    armour: IArmourSlots;
    weapons: IWeaponSlots;
    items: IInventoryItem[];
}
