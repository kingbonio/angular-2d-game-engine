import { AreaExitStatus } from "../../game/area/enums";
import { IAreaExits } from "../interfaces";
import { Direction } from "../../game/shared/enums";

export default {
      1: {
            north: { direction: Direction.N, destination: 2, status: AreaExitStatus.locked, itemReferenceNeeded: "73c02921-f0a6-4ea1-8b24-97842ee28fb6", keyColourNeeded: "green" },
            east: null,
            south: null,
            west: null,
      } as IAreaExits,
      2: {
            north: { direction: Direction.N, destination: 3, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { direction: Direction.S, destination: 1, status: AreaExitStatus.locked, itemReferenceNeeded: "73c02921-f0a6-4ea1-8b24-97842ee28fb6", keyColourNeeded: "green" },
            west: null,
      } as IAreaExits,
      3: {
            north: { direction: Direction.N, destination: 4, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { direction: Direction.S, destination: 2, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      4: {
            north: { direction: Direction.N, destination: 5, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { direction: Direction.S, destination: 3, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      5: {
            north: { direction: Direction.N, destination: 6, status: AreaExitStatus.locked, itemReferenceNeeded: "65a25063-4303-47b6-bdbe-0ce239396e0d", keyColourNeeded: "red" },
            east: null,
            south: { direction: Direction.S, destination: 4, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      6: {
            north: null,
            east: null,
            south: { direction: Direction.S, destination: 5, status: AreaExitStatus.locked, itemReferenceNeeded: "65a25063-4303-47b6-bdbe-0ce239396e0d", keyColourNeeded: "red" },
            west: null,
      } as IAreaExits,
};
