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

@Component({
  selector: 'app-game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  private userInputSubscription: Subscription;
  private areaChangeSubscription: Subscription;
  private areaReadySubscription: Subscription;
  private areaConfigs = areaConfigs;
  private gameModalRef: MatDialogRef<any>;
  title = 'game';
  public loadingText = defaults.gameMenu.loadingText;
  public areaComponentAlive = true;

  constructor(
    public playerStateService: PlayerStateService,
    public equipmentManagerService: EquipmentManagerService,
    public dialogueService: DialogueService,
    public userInputService: UserInputService,
    public aiService: AiService,
    public areaStateService: AreaStateService,
    public gameStateService: GameStateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userInputSubscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
      this.userInputService.keyDownEventHandler($e);
    });

    // Destroy the area component
    this.areaChangeSubscription = this.areaStateService.areaChange.subscribe((newAreaReference) => {
      if (this.areaStateService.currentLocation !== newAreaReference) {
        this.killAreaComponent();
      }
    });

    // Reinstate area component when ready
    this.areaReadySubscription = this.areaStateService.areaReady.subscribe((newAreaReference) => {
      if (this.areaStateService.currentLocation !== newAreaReference) {
        this.createAreaComponent();
      }
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
    if (!this.gameModalRef) {
      const modalConfig = new MatDialogConfig();

      modalConfig.disableClose = false;
      modalConfig.autoFocus = true; // Maybe not necessary
      modalConfig.hasBackdrop = true;
      modalConfig.width = '600px';
      modalConfig.height = '400px';
      modalConfig.data = "hello";
      modalConfig.panelClass = "game-modal";


      this.gameModalRef = this.dialog.open(GameModalComponent, modalConfig);

      this.gameModalRef.afterClosed().subscribe(returnData => {
        this.gameModalRef = null;
      });
    }
  }

  public isAreaComponentAlive() {
    return this.areaComponentAlive;
  }

  public isLoadingArea() {
    return this.areaStateService.loadingArea;
  }

  public isLoadingScreen() {
    return this.areaStateService.loadingArea ? "show" : "hide";
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
      this.areaComponentAlive = true;
    }, 0);
  }

  ngOnDestroy() {
    this.userInputSubscription.unsubscribe();
    this.areaChangeSubscription.unsubscribe();
    this.areaReadySubscription.unsubscribe();
  }

  // public onKeyDown($e) {
  //   this.userInputService.keyDownEventHandler($e);
  // }



  // TODO: Look for a way to check menu on site load
}
