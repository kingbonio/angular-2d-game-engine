import { IArmour } from "./iarmour";
import { IWeapons } from "./iweapons";
import { IInventoryItem } from "./iinventory-item";

export interface ILoot {
    armour: IArmour;
    weapons: IWeapons;
    items: IInventoryItem[];
}
