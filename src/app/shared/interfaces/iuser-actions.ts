import { Direction } from "../../game/shared/enums";
import { UserActionTypes, UserInteractionTypes } from "../enums";

export interface IUserAction {
    type: UserActionTypes;
    interaction?: UserInteractionTypes;
    direction?: Direction;
}
