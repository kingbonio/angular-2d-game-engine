import { UserActionTypes, UserInteractionTypes } from "../enums";
import { Direction } from "../../game/shared/enums";

export default {
      moveNorth: {
            type: UserActionTypes.move,
            interaction: null,
            direction: Direction.N,
      },
      moveEast: {
            type: UserActionTypes.move,
            interaction: null,
            direction: Direction.E,
      },
      moveSouth: {
            type: UserActionTypes.move,
            interaction: null,
            direction: Direction.S,
      },
      moveWest: {
            type: UserActionTypes.move,
            interaction: null,
            direction: Direction.W,
      },
      directionNorth: {
            type: UserActionTypes.direction,
            interaction: null,
            direction: Direction.N,
      },
      directionEast: {
            type: UserActionTypes.direction,
            interaction: null,
            direction: Direction.E,
      },
      directionSouth: {
            type: UserActionTypes.direction,
            interaction: null,
            direction: Direction.S,
      },
      directionWest: {
            type: UserActionTypes.direction,
            interaction: null,
            direction: Direction.W,
      },
      interactionAttack: {
            type: UserActionTypes.interaction,
            interaction: UserInteractionTypes.attack,
            direction: null,
      },
      interactionGuard: {
            type: UserActionTypes.interaction,
            interaction: UserInteractionTypes.guard,
            direction: null,
      },
      interactionInteract: {
            type: UserActionTypes.interaction,
            interaction: UserInteractionTypes.interact,
            direction: null,
      },
      interactionSpeak: {
            type: UserActionTypes.interaction,
            interaction: UserInteractionTypes.speak,
            direction: null,
      },
};
