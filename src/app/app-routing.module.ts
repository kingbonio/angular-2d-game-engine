import { Routes, RouterModule } from "@angular/router";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { NgModule } from "@angular/core";
import { GameComponent } from "./game/game.component";

const appRoutes = [
      {
            path: 'game',
            component: GameComponent,
            data: {
                  saveSlot: "1"
            }
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
