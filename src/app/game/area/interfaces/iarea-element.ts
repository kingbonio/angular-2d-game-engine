import { IMonster } from "../../shared/interfaces/imonster";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, Character } from "../../shared/enums";
import { IPlayer, IPuzzleElement } from ".";

export interface IAreaElement {
      type: Character;
      elementClass: IMonster | IPlayer | IInventoryItem | IPuzzleElement;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
}
