import { IArmour, IInventoryItem, IWeapons } from "../../item/interfaces";

export interface IEquipmentStateData {
      armour: IArmour;
      weapons: IWeapons;
      activeItem: IInventoryItem;
}
