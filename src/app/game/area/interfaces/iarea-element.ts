import { Character } from "../../character-classes/character";
import { IInventoryItem } from "../../item/interfaces/iinventory-item";
import { Direction, ElementClass } from "../../shared/enums";

export interface IAreaElement {
    type: ElementClass;
    elementProperties: Character | IInventoryItem;
    startingPositionX: number;
    startingPositionY: string;
    direction: Direction;
    startingDirection: Direction;
}
