import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { PlayerComponent } from './character/player/player.component';
import { NpcComponent } from './character/npc/npc.component';
import { EnemyComponent } from './character/enemy/enemy.component';
import { AreaComponent } from './area/area.component';
import { StartComponent } from './area/start/start.component';
import { BattleComponent } from './area/battle/battle.component';
import { EndComponent } from './area/end/end.component';
import { PuzzleComponent } from './area/puzzle/puzzle.component';
import { ItemComponent } from './item/item.component';
import { WeaponComponent } from './item/weapon/weapon.component';
import { PotionComponent } from './item/potion/potion.component';
import { KeyComponent } from './item/key/key.component';
import { ArmourComponent } from './item/armour/armour.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    PlayerComponent,
    NpcComponent,
    EnemyComponent,
    AreaComponent,
    StartComponent,
    BattleComponent,
    EndComponent,
    PuzzleComponent,
    ItemComponent,
    WeaponComponent,
    PotionComponent,
    KeyComponent,
    ArmourComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
