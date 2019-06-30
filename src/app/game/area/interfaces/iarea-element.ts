import { IMonster } from "./ienemy";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, CharacterType } from "../../shared/enums";
import { IPlayer, IGridObject, INpc } from ".";

export interface IAreaElement {
      type: CharacterType;
      elementProperties: IMonster | IPlayer | INpc | IInventoryItem | IGridObject;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
}
