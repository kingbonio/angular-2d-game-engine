import { Injectable } from '@angular/core';
import { IArmour, IInventoryItem } from '../interfaces';
import { ItemClass } from '../enums';

@Injectable()
export class EquipmentManagerService {
  armour: IArmour;
  weapons: IInventoryItem;


  constructor() { }

  set shield(newShield: IInventoryItem) {
    if (newShield.class !== ItemClass.shield) {
      // TODO: build recipient of this and insert translation service
      // this.notificationsService("Item is not a shield");
    } else {
      this.armour.shield = newShield;
    }
  }

  get headArmour() {
    return this.armour.head;
  }

}
