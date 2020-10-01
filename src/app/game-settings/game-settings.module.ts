import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { GameSettingsRoutingModule } from './game-settings-routing.module';
import { FormsModule } from '@angular/forms';
import { SoundComponent } from './sound/sound.component';
import { MatSliderModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        MatSliderModule,
        GameSettingsRoutingModule,
    ],
    declarations: [
        GameControlsComponent,
        GameplayComponent,
        SoundComponent,
    ],
})
export class GameSettingsModule { }
