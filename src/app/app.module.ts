import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GameSettingsModule } from './game-settings/game-settings.module';
import { GameModule } from './game/game.module';
import { AreaStateService } from './game/shared/services/area-state.service';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PersistentStorageModule } from './shared/modules/persistent-storage/persistent-storage.module';
import { UserInputService } from './shared/services/user-input.service';
import { GameGuard } from './guards/game.guard';
import { ApplicationStateService } from './shared/services/application-state.service';



@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        MatDialogModule,
        PersistentStorageModule,
        GameModule,
        GameSettingsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        MainMenuComponent,
        GameSettingsComponent,
    ],
    providers: [
        ApplicationStateService,
        GameGuard,
        AreaStateService,
        UserInputService,
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
