import { WeaponType } from "../../item/enums";
import { Direction } from "../enums";

export interface IPlayerStateData {
      health: number;
      maxHealth: number;
      locationX: number;
      locationY: string;
      direction: Direction;
      selectedWeaponSlot: WeaponType;
}
