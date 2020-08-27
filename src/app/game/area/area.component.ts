import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IAreaExits } from '../../game-config/interfaces';
import defaults from '../../shared/defaults';
import { GameSettingsService } from '../../shared/services/game-settings.service';
import { Enemy, NPC } from '../character-classes';
import { Character } from '../character-classes/character';
import { Player } from '../character-classes/player';
import { LootingModalComponent } from '../item/looting/looting-modal.component';
import { MessageModalComponent } from '../message/message-modal.component';
import { CharacterState, CharacterType, Direction, ElementClass, ObjectType } from '../shared/enums';
import { AreaConfigProviderService } from '../shared/services/area-config-provider.service';
import { AreaStateService } from '../shared/services/area-state.service';
import { BattleCalculatorService } from '../shared/services/battle-calculator.service';
import { DialogueService } from '../shared/services/dialogue.service';
import { GameStateService } from '../shared/services/game-state.service';
import { PlayerStateService } from '../shared/services/player-state.service';
import { GridObject } from './grid-object-classes/grid-object';
import { IAreaElement, IGridReferences } from './interfaces';
import { IGridData } from './interfaces/igrid-data';
import { BackgroundMusicService } from '../../shared/services/background-music.service';
import { GridHelper } from '../shared/util/area/grid-helper';
import { LootBag } from './grid-object-classes/loot-bag';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnDestroy, AfterViewInit {

  private areaConfig: any;
  private areaExits: any;
  public character = CharacterType;
  public direction = Direction;
  private modalRef: MatDialogRef<any>;
  public ElementClass = ElementClass;
  public CharacterState = CharacterState;
  public openLootingModalSubscription: Subscription;
  public openMessageModalSubscription: Subscription;

  constructor(
    public areaStateService: AreaStateService,
    public dialogueService: DialogueService,
    public areaConfigProviderService: AreaConfigProviderService,
    public backgroundMusicService: BackgroundMusicService,
    public playerStateService: PlayerStateService,
    public battleCalculatorService: BattleCalculatorService,
    public gameSettingsService: GameSettingsService,
    public gameStateService: GameStateService,
    private dialog: MatDialog,
  ) {

    this.openLootingModalSubscription = this.playerStateService.openLootingModal.subscribe((target: IGridData) => {
      this.openLootingModal(target);
    });

    this.openMessageModalSubscription = this.playerStateService.openMessageModal.subscribe((message: string) => {
      this.openMessageModal(message);
    });

    // Build the area
    this.prepareArea();

    // Play background music
    this.backgroundMusicService.startMusic(this.areaConfig.backgroundMusic);
  }

  ngAfterViewInit() {

    // Declare component loading complete
    setTimeout(() => {
      this.areaStateService.loadingArea = false;
    }, 0);
  }

  /**
   * Opens the looting component modal allowing manipulation of target's inventory
   * @param target The target grid data for looting
   */
  private openLootingModal(target: IGridData) {
    if (this.modalRef) {
      this.modalRef.close();
    } else {
      const modalConfig = new MatDialogConfig();

      modalConfig.disableClose = false;
      modalConfig.autoFocus = true; // Maybe not necessary
      modalConfig.hasBackdrop = true;
      modalConfig.width = '250px';
      modalConfig.panelClass = "looting-modal";

      // TODO This probably isn't the best way of doing this
      // Select which part of the grid data we want to loot
      if (target.element) {
        modalConfig.data = target.element;
      } else if (target.groundItem) {
        modalConfig.data = target.groundItem;
      }

      this.modalRef = this.dialog.open(LootingModalComponent, modalConfig);

      this.modalRef.afterClosed().subscribe(returnData => {

        if (target.element) {

          // Do nothing
        } else if (target.groundItem && target.groundItem.isEmpty) {

          // Get rid of the bag
          target.groundItem = null;
        }

        this.modalRef = null;
      });
    }
  }

  /**
   * Opens the dialogue component modal to show dialogue from the target element
   * @param target The target grid data for looting
   */
  private openMessageModal(message: string) {
    if (this.modalRef) {
      this.modalRef.close();
    } else {
      const modalConfig = new MatDialogConfig();

      modalConfig.disableClose = false;
      modalConfig.autoFocus = true; // Maybe not necessary
      modalConfig.hasBackdrop = true;
      modalConfig.width = '250px';
      modalConfig.height = '150px';
      modalConfig.panelClass = "dialogue-modal";
      modalConfig.data = message;

      this.modalRef = this.dialog.open(MessageModalComponent, modalConfig);

      this.modalRef.afterClosed().subscribe(returnData => {

        this.modalRef = null;
      });
    }
  }

  public getGridElementImageSource(gridElement: Character | GridObject) {
    return 'assets/images/elements/' + gridElement.imageFileName;
  }

  public getFloorImageSource(imageName: string) {
    return 'assets/images/floor-style/' + imageName;
  }

  /**
   * Concatenates the classes necessary for animations
   */
  public getAnimationClasses(isMovingForwards: boolean, element: Character) {
    const direction = this.getDirectionClass(element);

    const classes = isMovingForwards ? direction + " moving-forwards" : direction;

    return classes;
  }

  public getDirectionClass(gridElement: Character | GridObject) {
    // TODO this is proving strange, might want to come back to directions
    const isPlayer = (gridElement && gridElement.type === ElementClass.player);
    if (isPlayer) {
      return 'direction-' + this.playerStateService.direction;
    }
    return gridElement ? 'direction-' + gridElement.direction : "";
  }

  public getDeadClass(character: Character): string {
    // TODO This is representative of the character parent class issue
    return character.currentHp < 1 ? "dead" : "";
  }

  public getCharacterType(gridCharacter: Character): ElementClass {
    return gridCharacter.type;
  }

  /**
   * Gathers area data and applies to this component and to Area State Service
   */
  private prepareArea(): void {

    // // Kill any currently playing sounds
    // this.soundEffectService.stopSound();

    if (this.areaStateService.loadingExistingArea) {

      // Get the existing room config
      const newLocations: IGridReferences = this.areaStateService.getAreaState(this.areaStateService.currentArea);
      this.areaConfig = this.areaConfigProviderService.getAreaConfig(this.areaStateService.currentArea);

      // Set the locations to area state service
      this.areaStateService.locations = newLocations;

      if (!newLocations) {

        // Build fresh from config
        this.areaExits = this.areaConfigProviderService.getAreaExits(this.areaStateService.currentArea);

        GridHelper.addExitsToGrid(this.areaExits, this.areaStateService.locations);
      }
      this.rebuildArea();

    } else {
      // get the config from the provider
      this.areaConfig = this.areaConfigProviderService.getAreaConfig(this.areaStateService.currentArea);
      this.areaExits = this.areaConfigProviderService.getAreaExits(this.areaStateService.currentArea);

      // Pass by locations by reference
      GridHelper.addExitsToGrid(this.areaExits, this.areaStateService.locations);

      // Set the player location
      // TODO This won't work, needs moving into the loop with a check on player
      this.playerStateService.locationY = this.areaConfig.areaElements[0].startingPositionY;
      this.playerStateService.locationX = this.areaConfig.areaElements[0].startingPositionX;
      // Set the monsters
      GridHelper.addElementsToGrid(this.areaConfig.areaElements, this.areaStateService.locations);

      if (this.areaConfig.areaLoadMessage) {
        this.dialogueService.displayDialogueMessage({
          text: this.areaConfig.areaLoadMessage,
          character: defaults.dialogue.areaTipsType,
          name: defaults.dialogue.areaTipsName
        });
      }
    }

    // If player is entering a new area we want to update the location to be opposite the way they came in
    if (this.areaStateService.loadingArea) {
      this.updatePlayerLocation();
    }

    this.areaStateService.loadingExistingArea = false;
  }


  // TODO this seems like it's possibly unnecessary, look for a better way of doing this
  private rebuildArea(): void {
    for (const location in this.areaStateService.locations) {
      if (this.areaStateService.locations.hasOwnProperty(location)) {
        if (this.areaStateService.locations[location].element) {
        // We want to create instances of each character in the config
          switch (this.areaStateService.locations[location].element.type) {
            case ElementClass.enemy:
              this.areaStateService.locations[location].element = new Enemy(this.areaStateService.locations[location].element);
              // TODO Maybe this would be better suited somewhere more abstracted from core code
              if (this.areaStateService.locations[location].element.currentState === CharacterState.hunting && !this.areaStateService.locations[location].element.isDead()) {
                this.areaStateService.locations[location].element.currentState = CharacterState.returningToPosition;
              }
              break;
            case ElementClass.player:
              this.areaStateService.locations[location].element = new Player(this.areaStateService.locations[location].element);
              break;
            case ElementClass.npc:
              this.areaStateService.locations[location].element = new NPC(this.areaStateService.locations[location].element);
              if (this.areaStateService.locations[location].element.currentState === CharacterState.hunting && !this.areaStateService.locations[location].element.isDead()) {
                this.areaStateService.locations[location].element.currentState = CharacterState.returningToPosition;
              }
              break;
            case ElementClass.object:
              this.areaStateService.locations[location].element = new GridObject(this.areaStateService.locations[location].element);
              break;
            default:
            // Do nothing
          }
        }

        if (this.areaStateService.locations[location].groundItem) {
          switch (this.areaStateService.locations[location].groundItem.objectType) {
            case ObjectType.lootBag:
              this.areaStateService.locations[location].groundItem = new LootBag(null, this.areaStateService.locations[location].groundItem.inventoryLocations);
          }
        }
      }
    }
  }


  private updatePlayerLocation() {
    // We haven't updated the player state service yet, update that to where the player came into the area
    const previousLocation = this.areaStateService.previousPlayerLocation;

    let newLocation;

    // TODO Currently we're overwriting anything that's in the entrance location
    switch (previousLocation) {
      case defaults.areaExitLocations.northExit:
        newLocation = defaults.areaExitLocations.southExit;
        this.areaStateService.movePlayer(newLocation);
        break;
      case defaults.areaExitLocations.eastExit:
        newLocation = defaults.areaExitLocations.westExit;
        this.areaStateService.movePlayer(newLocation);
        break;
      case defaults.areaExitLocations.southExit:
        newLocation = defaults.areaExitLocations.northExit;
        this.areaStateService.movePlayer(newLocation);
        break;
      case defaults.areaExitLocations.westExit:
        newLocation = defaults.areaExitLocations.eastExit;
        this.areaStateService.movePlayer(newLocation);
        break;
    }
    const splitNewLocation = this.areaStateService.splitLocationReference(newLocation);
    this.playerStateService.locationY = splitNewLocation.locationY;
    this.playerStateService.locationX = splitNewLocation.locationX;
  }



  public locationExit(location: string, gridObject: IGridData): string {
    for (const locationReference in defaults.areaExitLocations) {
      if (defaults.areaExitLocations.hasOwnProperty(locationReference) &&
        defaults.areaExitLocations[locationReference] === location &&
        gridObject.areaExit
      ) {
        return locationReference;
      }
    }
    return "";
  }

  ngOnDestroy() {



    this.openLootingModalSubscription.unsubscribe();
    this.openMessageModalSubscription.unsubscribe();

    // Revert characters who were hunting to normal mode in this area
    this.areaStateService.huntingList = [];
    this.areaStateService.notifyAreaChange();
  }
}
