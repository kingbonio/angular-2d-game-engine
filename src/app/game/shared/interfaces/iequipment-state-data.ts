import { IArmour, IWeapons, IInventoryItem } from "../../item/interfaces";

export interface IEquipmentStateData {
      armour: IArmour;
      weapons: IWeapons;
      activeItem: IInventoryItem;
}
