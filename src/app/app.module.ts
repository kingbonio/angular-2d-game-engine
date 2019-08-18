import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameModule } from './game/game.module';
import { MenuStateService } from './shared/services/menu-state.service';
import { UserInputService } from './shared/services/user-input.service';
import { AreaStateService } from './game/shared/services/area-state.service';
import { PersistentStorageModule } from './shared/modules/persistent-storage/persistent-storage.module';
import { GameSettingsComponent } from './game-settings/game-settings.component';


@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule,
    PersistentStorageModule,
    GameModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    MainMenuComponent,
    GameSettingsComponent,
  ],
  providers: [
    AreaStateService,
    MenuStateService,
    UserInputService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
