import { IAreaElement, IAreaExit } from ".";
import { FloorStyle } from "../../shared/enums";
import { LootBag } from "../grid-object-classes/loot-bag";

export interface IGridData {
      areaExit: IAreaExit;
      areaEffect: string | null;
      element: IAreaElement | null;
      floorStyle: FloorStyle | null;
      groundItem: LootBag | null;
      awaitingArrival: boolean | null;
}
