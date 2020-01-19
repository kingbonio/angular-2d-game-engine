import { AreaExitStatus } from "../enums";

export interface IAreaExit {
      destination: number;
      status: AreaExitStatus;
      itemReferenceNeeded: string;
      keyColourNeeded: string;
}
