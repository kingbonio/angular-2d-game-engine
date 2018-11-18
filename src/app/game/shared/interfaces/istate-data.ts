import { IAreaStateData, IPlayerStateData, IDialogueStateData, IInventoryStateData, IGameStateData } from ".";

export interface IStateData {
      gameState: IGameStateData;
      area: IAreaStateData;
      player: IPlayerStateData;
      dialogue: IDialogueStateData;
      inventory: IInventoryStateData;
}
