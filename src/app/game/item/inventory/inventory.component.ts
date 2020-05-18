import { Component } from '@angular/core';
import { PlayerStateService } from '../../shared/services/player-state.service';
import { ItemClass } from '../enums';
import { EquipmentManagerService } from '../services/equipment-manager.service';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { SoundEffects } from '../../../shared/enums';
import { SoundEffectService } from '../../../shared/services/sound-effect.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  constructor(
    public inventoryManagerService: InventoryManagerService,
    public equipmentManagerService: EquipmentManagerService,
    public playerStateService: PlayerStateService,
    private soundEffectsService: SoundEffectService,
  ) { }
  public useItem(itemSlot: string) {
    if (this.inventoryManagerService.locations[itemSlot]) {
      switch (this.inventoryManagerService.locations[itemSlot].class) {
        case (ItemClass.armour):
          // Place item in armour slot
          this.inventoryManagerService.locations[itemSlot] = this.equipmentManagerService.switchArmourType(this.inventoryManagerService.locations[itemSlot]);
          this.soundEffectsService.playSound(SoundEffects.moveItem);
          break;
        case (ItemClass.weapon):
          // Place item in weapon slot
          this.inventoryManagerService.locations[itemSlot] = this.equipmentManagerService.switchWeaponType(this.inventoryManagerService.locations[itemSlot]);
          this.soundEffectsService.playSound(SoundEffects.moveItem);
          break;
        case (ItemClass.potion):
          // Drink potion and inbue effect
          this.playerStateService.useConsumable(this.inventoryManagerService.locations[itemSlot], itemSlot);
          this.soundEffectsService.playSound(SoundEffects.moveItem);
          break;
        case (ItemClass.keyItem):
          // Assign the item to active slot
          this.inventoryManagerService.locations[itemSlot] = this.equipmentManagerService.switchActiveItem(this.inventoryManagerService.locations[itemSlot]);
          this.soundEffectsService.playSound(SoundEffects.moveItem);
        break;
      }
    }
  }
}
