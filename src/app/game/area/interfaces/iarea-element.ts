import { Character } from "../../character-classes/character";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, ElementClass } from "../../shared/enums";
import { IGridObject } from "./ipuzzle-element";

export interface IAreaElement {
      type: ElementClass;
      elementProperties: Character | IInventoryItem | IGridObject;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
      startingDirection: Direction;
}
