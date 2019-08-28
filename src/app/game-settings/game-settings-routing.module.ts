import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { GameplayComponent } from "./gameplay/gameplay.component";
import { GameControlsComponent } from "./game-controls/game-controls.component";
import { GameSettingsComponent } from "./game-settings.component";

const gameSettingsRoutes = [
      {
            path: 'settings',
            component: GameSettingsComponent,
            children: [
                  {
                        path: 'gameplay',
                        pathMatch: "full",
                        component: GameplayComponent,
                  },
                  {
                        path: 'controls',
                        pathMatch: "full",
                        component: GameControlsComponent
                  },
                  {
                        path: '**',
                        redirectTo: 'gameplay'
                  }
            ]
      },

] as Routes;

@NgModule({
      imports: [
            RouterModule.forChild(
                  gameSettingsRoutes,
            )
      ],
      exports: [
            RouterModule
      ]
})
export class GameSettingsRoutingModule { }
