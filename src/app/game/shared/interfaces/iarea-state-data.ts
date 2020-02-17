import { IGridReferences } from "../../area/interfaces";

export interface IAreaStateData {
      currentLocation: number;
      newLocation: number;
      loadingArea: boolean;
      loadingExistingArea: boolean;
      locationKeys: any;
      locations: IGridReferences;
      previousPlayerLocation: string;
}
