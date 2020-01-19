import { IAreaExits } from "../interfaces";
import { AreaExitStatus } from "../../game/area/enums";

export default {
      1: {
            north: { destination: 2, status: AreaExitStatus.locked, itemReferenceNeeded: "73c02921-f0a6-4ea1-8b24-97842ee28fb6", keyColourNeeded: "green" },
            east: null,
            south: null,
            west: null,
      } as IAreaExits,
      2: {
            north: { destination: 3, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { destination: 1, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      3: {
            north: { destination: 4, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { destination: 2, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      4: {
            north: { destination: 5, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { destination: 3, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      5: {
            north: { destination: 6, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { destination: 4, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      6: {
            north: null,
            east: null,
            south: { destination: 5, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
};
