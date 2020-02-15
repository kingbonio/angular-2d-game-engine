import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { AreaComponent } from './area/area.component';
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
import { AiService } from './shared/services/ai.service';
import { UserInputService } from '../shared/services/user-input.service';
import { GameStateService } from './shared/services/game-state.service';
import { GameModalComponent } from './game-menu/game-modal/game-modal.component';
import { PersistentStateService } from './shared/services/persistent-state.service';
import { PersistentStorageModule } from '../shared/modules/persistent-storage/persistent-storage.module';
import { DeadModalComponent } from './dead-modal/dead-modal.component';
import { PathfindingComponent } from './shared/util/movement/pathfinding/pathfinding.component';
import { MessageModalComponent } from './message/message-modal.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    PersistentStorageModule,
    NoopAnimationsModule,
    MatDialogModule,
    GameRoutingModule,
  ],
  declarations: [
    GameComponent,
    AreaComponent,
    DialogueComponent,
    MovementComponent,
    PathfindingComponent,
    EquipmentComponent,
    InventoryComponent,
    ItemGridComponent,
    LootingModalComponent,
    MessageModalComponent,
    GameModalComponent,
    DeadModalComponent,
    MessageModalComponent,
  ],
  providers: [
    AreaConfigProviderService,
    PlayerStateService,
    DialogueService,
    BattleCalculatorService,
    MovementComponent,
    PathfindingComponent,
    EquipmentManagerService,
    InventoryManagerService,
    AiService,
    UserInputService,
    GameStateService,
    PersistentStateService,
  ],
  entryComponents: [
    LootingModalComponent,
    MessageModalComponent,
    GameModalComponent,
    DeadModalComponent,
  ],
})
export class GameModule { }
