import { IArmour } from "./iarmour";
import { IWeapons } from "./iweapons";

export interface ILoot {
      armour: IArmour;
      weapons: IWeapons;
      // TODO: Resolve any
      items: any;
}
