import { IAreaStateData, IPlayerStateData, IDialogueStateData, IInventoryStateData, IGameStateData } from ".";
import { IEquipmentStateData } from "./iequipment-state-data";

export interface IStateData {
      area: IAreaStateData;
      otherAreas: any;
      player: IPlayerStateData;
      dialogue: IDialogueStateData;
      inventory: IInventoryStateData;
      equipment: IEquipmentStateData;
}
