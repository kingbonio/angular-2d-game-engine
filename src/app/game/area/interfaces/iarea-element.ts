import { IMonster } from "../../shared/interfaces/imonster";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction } from "../../shared/enums";
import { IPlayer, IPuzzleElement } from ".";

export interface IAreaElement {
      elementClass: IMonster | IPlayer | IInventoryItem | IPuzzleElement;
      startingPositionX: string;
      startingPositionY: number;
      direction: Direction;
}
