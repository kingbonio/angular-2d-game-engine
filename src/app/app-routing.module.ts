import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameSettingsComponent } from "./game-settings/game-settings.component";
import { GameComponent } from "./game/game.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { GameGuard } from "./guards/game.guard";

const appRoutes = [
      {
            path: 'game',
            pathMatch: "full",
            component: GameComponent,
            canActivate: [GameGuard]
      },
      {
            path: 'settings',
            pathMatch: "full",
            component: GameSettingsComponent
      },
      {
            path: '',
            pathMatch: "full",
            component: MainMenuComponent
      },
      {
            path: '**',
            redirectTo: ''
      }
] as Routes;

@NgModule({
      imports: [
            RouterModule.forRoot(
                  appRoutes,
                  // { enableTracing: true }
            )
      ],
      providers: [
            GameGuard,
      ],
      exports: [
            RouterModule
      ]
})
export class AppRoutingModule { }
