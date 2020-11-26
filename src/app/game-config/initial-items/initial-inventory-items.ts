import { armour, potions } from '../items';
import { weapons } from '../items';
import { keyItems } from '../items';
import { IInventoryItem } from '../../game/item/interfaces';

export const initialInventoryItems: IInventoryItem[] = [
    armour.leatherChestPiece,
    potions.invisiblityPotion
];
