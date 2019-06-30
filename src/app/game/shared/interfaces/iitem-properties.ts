import { MagicAbility } from "../enums";

export interface IItemProperties {
      damage?: number;
      defense?: number;
      healing?: number;
      magicAbility?: MagicAbility;
      magicPotency?: number;
      keyItem?: boolean;
}
