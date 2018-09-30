import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import routes from "./app.router";
import { AppComponent } from './app.component';
import { PlayerComponent } from './character/player/player.component';
import { NpcComponent } from './character/npc/npc.component';
import { EnemyComponent } from './character/enemy/enemy.component';
import { AreaComponent } from './area/area.component';
import { WeaponComponent } from './item/weapon/weapon.component';
import { PotionComponent } from './item/potion/potion.component';
import { KeyComponent } from './item/key/key.component';
import { ArmourComponent } from './item/armour/armour.component';
import { CharacterComponent } from './character/character.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameMenuComponent } from './game-menu/game-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NpcComponent,
    EnemyComponent,
    AreaComponent,
    WeaponComponent,
    PotionComponent,
    KeyComponent,
    ArmourComponent,
    CharacterComponent,
    MainMenuComponent,
    GameMenuComponent
  ],
  imports: [
    // Always import router first, enableTracing logs routing events to console
    RouterModule.forRoot(routes, { enableTracing: true }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
