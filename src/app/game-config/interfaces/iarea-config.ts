import { IAreaElement } from "../../game/area/interfaces";

export interface IAreaConfig {
    room: number;
    backgroundMusic: string;
    floorImageFileName: string;
    areaLoadMessage: string;
    areaElements: IAreaElement[];
}
