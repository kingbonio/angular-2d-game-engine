import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlayerStateService } from './shared/services/player-state.service';
import { DialogueService } from './shared/services/dialogue.service';
import { UserInputService } from '../shared/services/user-input.service';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { AiService } from './shared/services/ai.service';
import { EquipmentManagerService } from './item/services/equipment-manager.service';
import { AreaStateService } from './shared/services/area-state.service';
import defaults from '../shared/defaults';
import * as areaConfigs from "../game-config/areas";
import { GameStateService } from './shared/services/game-state.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { GameModalComponent } from './game-menu/game-modal/game-modal.component';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { GameSettingsService } from '../shared/services/game-settings.service';
import { TimerService } from './shared/services/timer.service';
import { PotionEffectType } from './item/enums/potion-effect-type';
import { DeadModalComponent } from './dead-modal/dead-modal.component';
import { IUserAction } from '../shared/interfaces';
import { Direction } from './shared/enums';
import { UserInteractionTypes, UserActionTypes } from '../shared/enums';

@Component({
  selector: 'app-game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  private areaChangeSubscription: Subscription;
  private areaReadySubscription: Subscription;
  private areaConfigs = areaConfigs;
  private deadModalRef: MatDialogRef<any>;
  title = 'game';
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
    private timerService: TimerService,
    private dialog: MatDialog,
  ) {
    this.applicationStateService.gameOpen = true;
  }

  ngOnInit(): void {
    // Destroy the area component
    this.areaChangeSubscription = this.areaStateService.areaChange.subscribe((newAreaReference) => {
      // if (this.areaStateService.currentLocation !== newAreaReference) {
      this.killAreaComponent();
      // }
    });

    // Reinstate area component when ready
    this.areaReadySubscription = this.areaStateService.areaReady.subscribe((newAreaReference) => {
      // if (this.areaStateService.currentLocation !== newAreaReference) {
      this.createAreaComponent();
      // }
    });

    // Clear the game history
    for (const areaReference in this.areaConfigs) {
      if (this.areaConfigs.hasOwnProperty(areaReference)) {
        const storageReference = areaReference.substring(4);
        localStorage.setItem(storageReference, "");
      }
    }
  }


  private openGameModal() {
    if (!this.deadModalRef) {
      const modalConfig = new MatDialogConfig();

      modalConfig.disableClose = false;
      modalConfig.autoFocus = true; // Maybe not necessary
      modalConfig.hasBackdrop = true;
      modalConfig.width = '450px';
      modalConfig.height = '300px';
      // TODO here
      modalConfig.data = "hello";
      modalConfig.panelClass = "menu-modal";


      this.deadModalRef = this.dialog.open(GameModalComponent, modalConfig);

      this.deadModalRef.afterClosed().subscribe(returnData => {
        this.deadModalRef = null;
      });
    }
  }

  private openDeadModal() {
    if (!this.deadModalRef) {
      const modalConfig = new MatDialogConfig();

      modalConfig.disableClose = true;
      modalConfig.autoFocus = true; // Maybe not necessary
      modalConfig.hasBackdrop = true;
      modalConfig.width = '250px';
      modalConfig.height = '150px';
      // TODO here
      modalConfig.data = "dead";
      modalConfig.panelClass = "dead-modal";


      this.deadModalRef = this.dialog.open(DeadModalComponent, modalConfig);

      this.deadModalRef.afterClosed().subscribe(returnData => {
        this.deadModalRef = null;
      });
    }
  }

  /**
   * Enacts the action requested by the button press
   * @param input Data from the on-screen button
   */
  public buttonPress(input: IUserAction) {

    this.userInputService.invokeAction(input);
  }

  getCurrentHealth() {
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

  public isAreaComponentAlive() {
    return this.areaComponentAlive;
  }

  public isLoadingArea() {
    return this.areaStateService.loadingPreviousArea;
  }

  public isLoadingScreen() {
    return this.areaStateService.loadingPreviousArea ? "show" : "hide";
  }

  public openGameMenu() {
    this.gameStateService.gameMenuOpen = true;
    this.openGameModal();
  }

  private killAreaComponent() {
    this.areaComponentAlive = false;
  }

  private createAreaComponent() {
    // Update the area state service with the new location before reload
    setTimeout(() => {

      // Reset the area loading flag
      this.areaStateService.loadingSavedGame = false;

      this.areaComponentAlive = true;

    }, 0);
  }

  ngOnDestroy() {
    this.areaChangeSubscription.unsubscribe();
    this.areaReadySubscription.unsubscribe();
  }

  // public onKeyDown($e) {
  //   this.userInputService.keyDownEventHandler($e);
  // }



  // TODO: Look for a way to check menu on site load
}
