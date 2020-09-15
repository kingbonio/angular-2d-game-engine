import { ILocation } from "../../../../interfaces";

export interface IPathfindingLocation {
    location: ILocation;
    cameFrom: ILocation;
    cost: number;
}
