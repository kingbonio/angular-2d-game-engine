import { IAreaConfig } from "../../../game-config/interfaces";
import { IGridReferences } from "../../area/interfaces";

export interface IAreaStateData {
    currentArea: number;
    newLocation: number;
    loadingArea: boolean;
    loadingExistingArea: boolean;
    locationKeys: any;
    locations: IGridReferences;
    areaConfig: IAreaConfig;
    previousPlayerLocation: string;
    huntingList: any[];
}
