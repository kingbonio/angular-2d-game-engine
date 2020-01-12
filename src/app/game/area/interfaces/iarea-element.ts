import { IEnemy } from "./ienemy";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, CharacterType, ElementClass } from "../../shared/enums";
import { IPlayer, INpc } from ".";
import { IGridObject } from "./ipuzzle-element";
import { Character } from "../../character-classes/character";

export interface IAreaElement {
      type: ElementClass;
      elementProperties: Character | IInventoryItem | IGridObject;
      startingPositionX: number;
      startingPositionY: string;
      direction: Direction;
      startingDirection: Direction;
}
