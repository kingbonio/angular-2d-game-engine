import { IAreaElement } from "../../game/area/interfaces";
import { BackgroundMusic } from "../../shared/enums";

export interface IAreaConfig {
    room: number;
    backgroundMusic: BackgroundMusic;
    floorImageFileName: string;
    areaLoadMessage: string;
    areaElements: IAreaElement[];
    areaVisited: boolean;
}
