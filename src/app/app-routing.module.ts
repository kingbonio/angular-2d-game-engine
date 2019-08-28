import { Routes, RouterModule } from "@angular/router";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { NgModule } from "@angular/core";
import { GameComponent } from "./game/game.component";
import { GameSettingsComponent } from "./game-settings/game-settings.component";

const appRoutes = [
      {
            path: 'game',
            pathMatch: "full",
            component: GameComponent,
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
      // {
      //       path: 'heroes',
      //       component: HeroListComponent,
      //       data: { title: 'Heroes List' }
      // },
      // {
      //       path: '',
      //       redirectTo: '/heroes',
      //       pathMatch: 'full'
      // },
      {
            path: '**',
            redirectTo: ''
      }
] as Routes;

@NgModule({
      imports: [
            RouterModule.forRoot(
                  appRoutes,
                  { enableTracing: true }
            )
      ],
      exports: [
            RouterModule
      ]
})
export class AppRoutingModule { }
