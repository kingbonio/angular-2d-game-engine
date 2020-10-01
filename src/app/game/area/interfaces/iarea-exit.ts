import { AreaExitStatus } from "../enums";
import { Direction } from "../../shared/enums";

export interface IAreaExit {
    direction: Direction;
    destination: number;
    status: AreaExitStatus;
    itemReferenceNeeded: string;
    keyColourNeeded: string;
}
