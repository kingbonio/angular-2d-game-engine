import { ElementClass, Direction } from "../../game/shared/enums";

export const player = {
    type: ElementClass.player,
    elementProperties: {
        imageFileName: "player.png",
    },
    startingPositionX: 4,
    startingPositionY: "a",
    startingDirection: Direction.N,
    direction: Direction.N,
};
