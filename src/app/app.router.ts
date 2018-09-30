import { Routes } from "@angular/router";
import { AreaComponent } from "./area/area.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";

export default [
      {
            path: 'level/:id',
            component: AreaComponent
      },
      {
            path: '',
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
