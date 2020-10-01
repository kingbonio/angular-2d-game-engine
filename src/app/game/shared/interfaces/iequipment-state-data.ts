import { IArmourSlots, IInventoryItem, IWeaponSlots } from "../../item/interfaces";

export interface IEquipmentStateData {
    armour: IArmourSlots;
    weapons: IWeaponSlots;
    activeItem: IInventoryItem;
}
