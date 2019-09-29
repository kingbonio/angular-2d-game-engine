import { PotionEffectType as EffectType } from "../enums/potion-effect-type";

export interface IItemProperties {
      effectType?: EffectType;
      effectAmount?: number;
      effectDuration?: number;
      remainingEffect?: number;
      damage?: number;
      defense?: number;
      keyItem?: boolean;
}
