import { Direction, ElementClass, PlayerClass } from "../shared/enums";
import { Character } from "./character";

export class Player extends Character {
    public type = ElementClass.player;
    public name: string;
    public class: PlayerClass.fighter;
    public imageFileName: string;
    public direction: Direction;
    public startingDirection: Direction;
    public isMovingForwards: boolean;

    constructor(characterDetails: any) {
        super();
        this.imageFileName = characterDetails.imageFileName;
        this.isMovingForwards = false;
    }
}
