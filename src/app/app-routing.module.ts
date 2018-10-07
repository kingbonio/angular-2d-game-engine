import { Routes, RouterModule } from "@angular/router";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { NgModule } from "@angular/core";

const appRoutes = [
      {
            path: 'game',
            component: AreaComponent
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
