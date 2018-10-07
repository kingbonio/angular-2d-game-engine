import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { InGameMenuComponent } from './in-game-menu/in-game-menu.component';
import { GameModule } from './game/game.module';


@NgModule({
  imports: [
    BrowserModule,
    GameModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    MainMenuComponent,
    InGameMenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
