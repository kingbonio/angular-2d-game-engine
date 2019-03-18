import { Component, OnInit } from '@angular/core';
import { InventoryManagerService } from '../../shared/services/inventory-manager.service';
import { InteractionTarget, ItemClass } from '../../shared/enums';
import { PlayerStateService } from '../../shared/services/player-state.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private inventoryManagerService: InventoryManagerService,
              private playerStateService: PlayerStateService) { }

  ngOnInit() {

  }


  // /**
  //  * Uses the item's ability to interact with a target
  //  * @param itemName the search term of the item to use
  //  * @param target what the item will be used on
  //  */
  // public useItem(itemName: string, target: InteractionTarget): void {
  //   // TODO: This could be tidier
  //   const itemIndex = this.inventoryManagerService.getIndexOfItem(itemName);

  //   if (!itemIndex) {
  //     // TODO: build recipient of this and insert translation service
  //     // this.notificationsService("Cannot find item in inventory");
  //     return;
  //   }
  //   const item = this.inventoryManagerService.contents[itemIndex];

  //   // TODO: This could be tidier/abstracted
  //   // Restrict actions based on item class
  //   if (!item.usable ||
  //     target === InteractionTarget.object && item.class !== ItemClass.misc ||
  //     target === InteractionTarget.object && item.class === ItemClass.potion ||
  //     target === InteractionTarget.player && item.class === ItemClass.weapon
  //   ) {
  //     // TODO: build recipient of this and insert translation service
  //     // this.notificationsService("Item cannot be used in this way");
  //     return;
  //   }

  //   if (!this.playerStateService.itemTooHighLevel(item)) {
  //     switch (item.class) {
  //       case ItemClass.potion:

  //       case ItemClass.misc:

  //     }
  //   } else {
  //     // TODO: build recipient of this and insert translation service
  //     // this.notificationsService("Item is too high a level to use");
  //     return;
  //   }
  // }
}
