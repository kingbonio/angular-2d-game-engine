import { IAreaElement } from ".";
import { Direction, FloorStyle } from "../../shared/enums";
import { LootBag } from "../grid-object-classes/loot-bag";

export interface IGridData {
      exitDestination: number | null;
      areaEffect: string | null;
      element: IAreaElement | null;
      floorStyle: FloorStyle | null;
      groundItem: LootBag | null;
}
