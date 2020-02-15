import { IAreaExits } from "../../interfaces";
import { AreaExitStatus } from "../../../game/area/enums";

export default {
      1: {
            north: { destination: 5, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: null,
            west: null,
      } as IAreaExits,
      2: {
            north: null,
            east: { destination: 3, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: null,
            west: null,
      } as IAreaExits,
      3: {
            north: { destination: 7, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: null,
            west: { destination: 2, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      4: {
            north: { destination: 8, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: null,
            west: null,
      } as IAreaExits,
      5: {
            north: { destination: 9, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: { destination: 6, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: { destination: 1, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      6: {
            north: null,
            east: { destination: 7, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: null,
            west: { destination: 5, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      7: {
            north: null,
            east: null,
            south: { destination: 3, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: { destination: 6, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      8: {
            north: { destination: 12, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { destination: 4, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      9: {
            north: null,
            east: { destination: 10, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: { destination: 5, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
      10: {
            north: null,
            east: { destination: 11, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: null,
            west: { destination: 9, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      11: {
            north: { destination: 15, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: { destination: 12, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: null,
            west: { destination: 10, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      12: {
            north: { destination: 16, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
            east: null,
            south: { destination: 8, status: AreaExitStatus.locked, itemReferenceNeeded: "73c02921-f0a6-4ea1-8b24-97842ee28fb6", keyColourNeeded: "green" },
            west: { destination: 11, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      13: {
            north: null,
            east: { destination: 14, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: null,
            west: null,
      } as IAreaExits,
      14: {
            north: null,
            east: { destination: 15, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            south: null,
            west: { destination: 13, status: AreaExitStatus.locked, itemReferenceNeeded: "65a25063-4303-47b6-bdbe-0ce239396e0d", keyColourNeeded: "red" },
      } as IAreaExits,
      15: {
            north: null,
            east: null,
            south: { destination: 11, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: { destination: 14, status: AreaExitStatus.closed, itemReferenceNeeded: "", keyColourNeeded: "" },
      } as IAreaExits,
      16: {
            north: null,
            east: null,
            south: { destination: 12, status: AreaExitStatus.open, itemReferenceNeeded: "", keyColourNeeded: "" },
            west: null,
      } as IAreaExits,
};
