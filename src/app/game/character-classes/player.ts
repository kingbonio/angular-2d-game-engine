import { Direction, ElementClass, PlayerClass } from "../shared/enums";
import { Character } from "./character";

export class Player extends Character {
    public class: PlayerClass.fighter;
    public direction: Direction;
    public imageFileName: string;
    public isMovingForwards: boolean;
    public name: string;
    public startingDirection: Direction;
    public type = ElementClass.player;

    constructor(characterDetails: any) {
        super();
        this.imageFileName = characterDetails.imageFileName;
        this.isMovingForwards = false;
    }
}
