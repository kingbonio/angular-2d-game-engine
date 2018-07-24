import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from '../app.component';
import { AreaComponent } from './area.component';
import { StartComponent } from './start/start.component';
import { BattleComponent } from './battle/battle.component';
import { EndComponent } from './end/end.component';
import { PuzzleComponent } from './puzzle/puzzle.component';


@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    StartComponent,
    BattleComponent,
    EndComponent,
    PuzzleComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
