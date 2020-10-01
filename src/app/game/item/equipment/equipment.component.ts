import { Component } from '@angular/core';
import defaults from '../../../shared/defaults';
import { DialogueService } from '../../shared/services/dialogue.service';
import { IInventoryItem } from '../interfaces';
import { EquipmentManagerService } from '../services/equipment-manager.service';
import { InventoryManagerService } from '../services/inventory-manager.service';
import { SoundEffects } from '../../../shared/enums';
import { SoundEffectService } from '../../../shared/services/sound-effect.service';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {

    constructor(
        public equipmentManagerService: EquipmentManagerService,
        public inventoryManagerService: InventoryManagerService,
        private dialogueService: DialogueService,
        private soundEffectsService: SoundEffectService,

    ) { }

    /**
     * Places equipped armour back into the inventory if there is space
     * 
     * @param {IInventoryItem} item the item to remove
     */
    public removeArmour(item: IInventoryItem): void {
        if (item) {
            try {
                this.inventoryManagerService.addItemToInventory(item);
                this.equipmentManagerService.removeArmour(item.armourSlot);
                this.soundEffectsService.playSound(SoundEffects.moveItem);
            } catch (err) {
                this.dialogueService.displayDialogueMessage({
                    text: defaults.dialogue.inventoryFull,
                    character: defaults.dialogue.computerCharacterType,
                    name: defaults.dialogue.computerName
                });
            }
        }
    }

    /**
     * Places equipped weapon back into the inventory if there is space
     *
     * @param {IInventoryItem} item the item to remove
     */
    public removeWeapon(item: IInventoryItem): void {
        if (item) {
            try {
                this.inventoryManagerService.addItemToInventory(item);
                this.equipmentManagerService.removeWeapon(item.weaponSlot);
                this.soundEffectsService.playSound(SoundEffects.moveItem);
            } catch (err) {
                this.dialogueService.displayDialogueMessage({
                    text: defaults.dialogue.inventoryFull,
                    character: defaults.dialogue.computerCharacterType,
                    name: defaults.dialogue.computerName
                });
            }
        }
    }

    /**
     * Places active item back into the inventory if there is space
     *
     * @param {IInventoryItem} item the item to remove
     */
    public removeActiveItem(item: IInventoryItem): void {
        if (item) {
            try {
                this.inventoryManagerService.addItemToInventory(item);
                this.equipmentManagerService.removeActiveItem();
                this.soundEffectsService.playSound(SoundEffects.moveItem);
            } catch (err) {
                this.dialogueService.displayDialogueMessage({
                    text: defaults.dialogue.inventoryFull,
                    character: defaults.dialogue.computerCharacterType,
                    name: defaults.dialogue.computerName
                });
            }
        }
    }

    /**
     * Returns the app location of an item's image
     * @param {IInventoryItem} item The item to get the image location for
     *
     * @returns {string}
     */
    public getImageSource(item: IInventoryItem): string {
        return 'assets/images/items/' + item.class + "/" + item.imageFileName;
    }
}
