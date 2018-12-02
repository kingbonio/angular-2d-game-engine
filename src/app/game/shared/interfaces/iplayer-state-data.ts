import { Direction } from "../enums";

export interface IPlayerStateData {
      health: number;
      maxHealth: number;
      strength: number;
      dexterity: number;
      magicka: number;
      exp: number;
      locationX: number;
      locationY: string;
      direction: Direction;
}
