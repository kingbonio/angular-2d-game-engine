import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccessibilityComponent } from "./accessibility/accessibility.component";
import { GameControlsComponent } from "./game-controls/game-controls.component";
import { GameSettingsComponent } from "./game-settings.component";
import { GameplayComponent } from "./gameplay/gameplay.component";
import { SoundComponent } from "./sound/sound.component";

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
                path: 'sound',
                pathMatch: "full",
                component: SoundComponent,
            },
            {
                path: 'controls',
                pathMatch: "full",
                component: GameControlsComponent
            },
            {
                path: 'accessibility',
                pathMatch: "full",
                component: AccessibilityComponent
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
