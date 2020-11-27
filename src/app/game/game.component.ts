import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import * as areaConfigs from "../game-config/areas";
import defaults from '../shared/defaults';
import { UserActionTypes, UserInteractionTypes } from '../shared/enums';
import { IUserAction } from '../shared/interfaces';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { GameSettingsService } from '../shared/services/game-settings.service';
import { UserInputService } from '../shared/services/user-input.service';
import { DeadModalComponent } from './dead-modal/dead-modal.component';
import { GameModalComponent } from './game-menu/game-modal/game-modal.component';
import { PotionEffectType } from './item/enums/potion-effect-type';
import { EquipmentManagerService } from './item/services/equipment-manager.service';
import { Direction } from './shared/enums';
import { AiService } from './shared/services/ai.service';
import { AreaStateService } from './shared/services/area-state.service';
import { DialogueService } from './shared/services/dialogue.service';
import { GameStateService } from './shared/services/game-state.service';
import { PlayerStateService } from './shared/services/player-state.service';
import { BackgroundMusicService } from '../shared/services/background-music.service';
import { AssetLoaderService } from './shared/services/asset-loader.service';
import { InventoryManagerService } from './item/services/inventory-manager.service';
import { GameEndModalComponent } from './game-end-modal/game-end-modal.component';
import { PersistentStateService } from './shared/services/persistent-state.service';

@Component({
    selector: 'app-game-root',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

    private areaChangeSubscription: Subscription;
    private areaReadySubscription: Subscription;
    private gameEndSubscription: Subscription;
    private areaConfigs = areaConfigs;
    private deadModalRef: MatDialogRef<any>;
    private gameEndModalRef: MatDialogRef<any>;
    private gameMenuModalRef: MatDialogRef<any>;
    public title = 'game';
    public loadingText = defaults.gameMenu.loadingText;
    public areaComponentAlive = true;
    public PotionEffectType = PotionEffectType;
    public Direction = Direction;
    public UserInteractionTypes = UserInteractionTypes;
    public UserActionTypes = UserActionTypes;

    constructor(
        public playerStateService: PlayerStateService,
        public equipmentManagerService: EquipmentManagerService,
        public dialogueService: DialogueService,
        public userInputService: UserInputService,
        public aiService: AiService,
        public areaStateService: AreaStateService,
        public gameStateService: GameStateService,
        public gameSettingsService: GameSettingsService,
        public applicationStateService: ApplicationStateService,
        public backgroundMusicService: BackgroundMusicService,
        public assetLoaderService: AssetLoaderService,
        public inventoryManagerService: InventoryManagerService,
        public persistentStateService: PersistentStateService,
        private dialog: MatDialog,
    ) {
        this.applicationStateService.gameOpen = true;
        this.assetLoaderService.loadAssets();

        // If this is a new game, we want to clear the saved areas
        if (!this.areaStateService.loadingSavedGame) {
            this.persistentStateService.clearAreas();
        }
    }

    ngOnInit(): void {

        // Destroy the area component
        this.areaChangeSubscription = this.areaStateService.areaChange.subscribe((newAreaReference) => {
            this.killAreaComponent();
        });

        // Reinstate area component when ready
        this.areaReadySubscription = this.areaStateService.areaReady.subscribe((newAreaReference) => {
            this.createAreaComponent();
        });

        // Handle end game event
        this.gameEndSubscription = this.gameStateService.gameEndSubject.subscribe((newAreaReference) => {
            this.triggerGameEnd();
        });

        this.assetLoaderService.loadAssets();
    }

    /**
     * Gets a string of classes for the modal
     *
     * @returns {string}
     */
    private getModalClass() {
        return this.gameSettingsService.dyslexiaFont ? "dyslexia-font" : "";
    }

    /**
     * Opens a modal for the in-game menu
     */
    private openGameMenuModal(): void {
        if (!this.gameMenuModalRef) {
            const modalConfig = new MatDialogConfig();

            modalConfig.disableClose = false;
            modalConfig.autoFocus = true;
            modalConfig.hasBackdrop = true;
            modalConfig.width = '450px';
            modalConfig.data = "game";
            modalConfig.panelClass = this.getModalClass();

            this.gameMenuModalRef = this.dialog.open(GameModalComponent, modalConfig);

            this.gameMenuModalRef.afterClosed().subscribe(returnData => {
                this.gameMenuModalRef = null;
            });
        }
    }

    /**
     * Opens a modal to show that you've died
     */
    private openDeadModal(): void {
        if (!this.deadModalRef) {
            const modalConfig = new MatDialogConfig();

            modalConfig.disableClose = true;
            modalConfig.autoFocus = true; // Maybe not necessary
            modalConfig.hasBackdrop = true;
            modalConfig.width = '250px';
            modalConfig.height = '150px';
            modalConfig.data = "dead";
            modalConfig.panelClass = this.getModalClass();

            this.deadModalRef = this.dialog.open(DeadModalComponent, modalConfig);

            this.deadModalRef.afterClosed().subscribe(returnData => {
                this.deadModalRef = null;
            });
        }
    }

    /**
     * Opens a modal to show that you've completed the game
     */
    private openGameEndModal(): void {
        if (!this.gameEndModalRef) {
            const modalConfig = new MatDialogConfig();

            modalConfig.disableClose = true;
            modalConfig.autoFocus = true; // Maybe not necessary
            modalConfig.hasBackdrop = true;
            modalConfig.width = '250px';
            modalConfig.height = '150px';
            modalConfig.data = "success";
            modalConfig.panelClass = this.getModalClass();

            this.gameEndModalRef = this.dialog.open(GameEndModalComponent, modalConfig);

            this.gameEndModalRef.afterClosed().subscribe(returnData => {
                this.gameEndModalRef = null;
            });
        }
    }

    /**
     * Enacts the action requested by the button press
     *
     * @param {IUserAction} input Data from the action input
     */
    public buttonPress(input: IUserAction): void {

        this.userInputService.invokeAction(input);
    }

    /**
     * Provides a calculation of the player's health or triggers a modal if dead
     *
     * @returns {number}
     */
    public getCurrentHealth(): number {
        if (this.playerStateService.health < 1) {
            this.gameStateService.gameMenuOpen = true;
            this.openDeadModal();
            return 0;
        }
        const healthBuff = (this.equipmentManagerService.activeBuff &&
            this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.healthOvercharge) ?
            this.equipmentManagerService.activeBuff.properties.remainingEffect : 0;

        return this.playerStateService.health + healthBuff;
    }

    /**
     * Checks if the area component is currently active
     *
     * @returns {boolean}
     */
    public isAreaComponentAlive(): boolean {
        return this.areaComponentAlive;
    }

    /**
     * Checks if an area is being loaded
     *
     * @returns {boolean}
     */
    public isLoadingArea(): boolean {
        return this.areaStateService.loadingArea;
    }

    /**
     * Opens the in game menu
     */
    public openGameMenu(): void {
        this.gameStateService.gameMenuOpen = true;
        this.openGameMenuModal();
    }

    /**
     * Opens the game end modal
     */
    public triggerGameEnd(): void {

        // Close all existing modals first
        this.dialog.closeAll();

        // Pause the game again
        this.gameStateService.gamePaused = true;
        this.openGameEndModal();
    }

    /**
     * Stops the area component from showing as active
     */
    private killAreaComponent(): void {
        this.areaComponentAlive = false;
    }

    /**
     * Sets a message on the event queue to show area component as active
     */
    private createAreaComponent(): void {

        // Update the area state service with the new location before reload
        setTimeout(() => {
            this.areaComponentAlive = true;
        }, 0);
    }

    ngOnDestroy() {
        this.backgroundMusicService.stopMusic();

        this.areaStateService.setDefaults();
        this.playerStateService.setPlayerDefaults();
        this.dialogueService.setDefaults();
        this.equipmentManagerService.setDefaults();

        this.areaChangeSubscription.unsubscribe();
        this.areaReadySubscription.unsubscribe();
        this.gameEndSubscription.unsubscribe();

        this.gameStateService.gameEnd = false;
    }
}
