import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './area/area.component';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule { }
