import { IAreaExit } from "../../game/area/interfaces";

export interface IAreaExits {
      north: IAreaExit | null;
      east: IAreaExit | null;
      south: IAreaExit | null;
      west: IAreaExit | null;
}
