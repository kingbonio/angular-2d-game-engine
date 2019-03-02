import { UserActionTypes, UserInteractionTypes } from "../enums";
import { Direction } from "../../game/shared/enums";

export interface IUserAction {
      type: UserActionTypes;
      interaction?: UserInteractionTypes;
      direction?: Direction;
}
