import { IArmourSlots, IWeaponSlots } from "../../game/item/interfaces";
import { weapons } from "../items";
import { armour } from "../items";

export const initialEquipment = {
    weapons: {
        primary: null,
    } as IWeaponSlots,
    armour: {
        head: null,
        arms: null,
        hands: null,
        torso: null,
        legs: null,
        boots: null,
    } as IArmourSlots,
};
