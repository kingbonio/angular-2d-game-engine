import { IMonster } from "../../shared/interfaces/imonster";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, Character } from "../../shared/enums";
import { IPlayer, IPuzzleElement, INpc } from ".";

export interface IAreaElement {
      type: Character;
      elementClass: IMonster | IPlayer | INpc | IInventoryItem | IPuzzleElement;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
}
