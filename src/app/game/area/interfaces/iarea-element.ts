import { IMonster } from "./ienemy";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, CharacterType } from "../../shared/enums";
import { IPlayer, IPuzzleElement, INpc } from ".";

export interface IAreaElement {
      type: CharacterType;
      elementClass: IMonster | IPlayer | INpc | IInventoryItem | IPuzzleElement;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
}
