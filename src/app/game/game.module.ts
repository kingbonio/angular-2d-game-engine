import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersistentStorageModule } from '../shared/modules/persistent-storage/persistent-storage.module';
import { UserInputService } from '../shared/services/user-input.service';
import { AreaComponent } from './area/area.component';
import { DeadModalComponent } from './dead-modal/dead-modal.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { GameModalComponent } from './game-menu/game-modal/game-modal.component';
import { GameComponent } from './game.component';
import { EquipmentComponent } from './item/equipment/equipment.component';
import { InventoryComponent } from './item/inventory/inventory.component';
import { ItemGridComponent } from './item/item-grid/item-grid.component';
import { LootingModalComponent } from './item/looting/looting-modal.component';
import { EquipmentManagerService } from './item/services/equipment-manager.service';
import { InventoryManagerService } from './item/services/inventory-manager.service';
import { MessageModalComponent } from './message/message-modal.component';
import { AiService } from './shared/services/ai.service';
import { AreaConfigProviderService } from './shared/services/area-config-provider.service';
import { BattleCalculatorService } from './shared/services/battle-calculator.service';
import { DialogueService } from './shared/services/dialogue.service';
import { GameStateService } from './shared/services/game-state.service';
import { PersistentStateService } from './shared/services/persistent-state.service';
import { PlayerStateService } from './shared/services/player-state.service';
import { MovementComponent } from './shared/util/movement/movement.component';
import { PathfindingComponent } from './shared/util/movement/pathfinding/pathfinding.component';
import { GameEndModalComponent } from './game-end-modal/game-end-modal.component';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        PersistentStorageModule,
        NoopAnimationsModule,
        MatDialogModule,
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
        GameEndModalComponent,
    ],
    providers: [
        AreaConfigProviderService,
        AiService,
        PlayerStateService,
        DialogueService,
        BattleCalculatorService,
        MovementComponent,
        PathfindingComponent,
        EquipmentManagerService,
        InventoryManagerService,
        UserInputService,
        GameStateService,
        PersistentStateService,
    ],
    entryComponents: [
        LootingModalComponent,
        MessageModalComponent,
        GameModalComponent,
        DeadModalComponent,
        GameEndModalComponent,
    ],
})
export class GameModule { }
