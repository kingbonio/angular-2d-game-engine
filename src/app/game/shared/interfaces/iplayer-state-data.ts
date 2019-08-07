import { Direction } from "../enums";
import { WeaponType } from "../../item/enums";

export interface IPlayerStateData {
      health: number;
      maxHealth: number;
      exp: number;
      locationX: number;
      locationY: string;
      direction: Direction;
      selectedWeaponSlot: WeaponType;
}
