import { IMonster } from "./ienemy";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, CharacterType, ElementClass } from "../../shared/enums";
import { IPlayer, INpc } from ".";
import { IGridObject } from "./ipuzzle-element";

export interface IAreaElement {
      type: ElementClass;
      elementProperties: IMonster | IPlayer | INpc | IInventoryItem | IGridObject;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
}
