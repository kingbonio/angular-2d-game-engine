import { IAreaStateData, IPlayerStateData, IDialogueStateData, IInventoryStateData, IGameStateData } from ".";

export interface IStateData {
      area: IAreaStateData;
      otherAreas: any;
      // player: IPlayerStateData;
      // dialogue: IDialogueStateData;
      // inventory: IInventoryStateData;
}
