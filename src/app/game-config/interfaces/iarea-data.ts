import { IGridReferences } from "../../game/area/interfaces";
import { IAreaConfig } from "./iarea-config";

export interface IAreaData {
    locations: IGridReferences;
    config: IAreaConfig;
}