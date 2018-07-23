import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AreaComponent } from './area/start/area.component';
import { StartComponent } from './area/start/start.component';
import { BattleComponent } from './area/battle/battle.component';
import { EndComponent } from './area/end/end.component';
import { PuzzleComponent } from './area/puzzle/puzzle.component';


@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    StartComponent,
    BattleComponent,
    EndComponent,
    PuzzleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
