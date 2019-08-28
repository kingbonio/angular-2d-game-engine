import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { GameSettingsRoutingModule } from './game-settings-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GameSettingsRoutingModule,
  ],
  declarations: [
    GameControlsComponent,
    GameplayComponent,
  ],
})
export class GameSettingsModule { }
