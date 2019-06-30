import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayerComponent } from './character/player/player.component';
import { NpcComponent } from './character/npc/npc.component';
import { EnemyComponent } from './character/enemy/enemy.component';
import { AreaComponent } from './area/area.component';
import { CharacterComponent } from './character/character.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { GameComponent } from './game.component';
import { AreaConfigProviderService } from './shared/services/area-config-provider.service';
import { PlayerStateService } from './shared/services/player-state.service';
import { DialogueService } from './shared/services/dialogue.service';
import { MovementComponent } from './shared/util/movement/movement.component';
import { BattleCalculatorService } from './shared/services/battle-calculator.service';
import { EquipmentComponent } from './item/equipment/equipment.component';
import { EquipmentManagerService } from './item/services/equipment-manager.service';
import { InventoryManagerService } from './item/services/inventory-manager.service';
import { InventoryComponent } from './item/inventory/inventory.component';
import { ItemGridComponent } from './item/item-grid/item-grid.component';
import { LootingModalComponent } from './item/looting/looting-modal.component';
import { MatDialogModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NoopAnimationsModule,
    MatDialogModule,
    GameRoutingModule,
  ],
  declarations: [
    GameComponent,
    PlayerComponent,
    NpcComponent,
    EnemyComponent,
    AreaComponent,
    CharacterComponent,
    DialogueComponent,
    MovementComponent,
    EquipmentComponent,
    InventoryComponent,
    ItemGridComponent,
    LootingModalComponent,
  ],
  providers: [
    AreaConfigProviderService,
    PlayerStateService,
    DialogueService,
    BattleCalculatorService,
    MovementComponent,
    EquipmentManagerService,
    InventoryManagerService,
  ],
  entryComponents: [
    LootingModalComponent,
  ],
})
export class GameModule { }
