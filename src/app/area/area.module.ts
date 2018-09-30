import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from '../app.component';
import { AreaComponent } from './area.component';


@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
