import { IAreaElement } from ".";
import { Direction } from "../../shared/enums";

export interface IGridData {
      exitDestination: number | null;
      areaEffect: string | null;
      element: IAreaElement | null;
      floorStyle: string | null;
}
