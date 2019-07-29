import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { IAreaElement } from './interfaces';
import { ILevelData } from './interfaces/ilevel-data';
import { AreaType } from './enums/area-type';
import { ActivatedRoute } from '@angular/router';
import { AreaStateService } from '../shared/services/area-state.service';
import { AreaConfigProviderService } from '../shared/services/area-config-provider.service';
import { CharacterType, Direction, ElementClass } from '../shared/enums';
import { PlayerStateService } from '../shared/services/player-state.service';
import { Enemy, NPC } from '../character-classes';
import { Character } from '../character-classes/character';
import { BattleCalculatorService } from '../shared/services/battle-calculator.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { LootingModalComponent } from '../item/looting/looting-modal.component';
import { GridObject } from './grid-object-classes/grid-object';
import { Player } from '../character-classes/player';
import { IAreaExits } from '../../game-config/interfaces';
import defaults from '../../shared/defaults';
import { IGridData } from './interfaces/igrid-data';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit, OnDestroy, AfterViewInit {

  private areaConfig: any;
  private areaExits: any;
  public character = CharacterType;
  public direction = Direction;
  private modalRef: MatDialogRef<any>;
  public ElementClass = ElementClass;
  public openLootinModalSubscription: Subscription;

  constructor(
    public areaStateService: AreaStateService,
    private route: ActivatedRoute,
    public areaConfigProviderService: AreaConfigProviderService,
    public playerStateService: PlayerStateService,
    public battleCalculatorService: BattleCalculatorService,
    private dialog: MatDialog,
  ) {
    this.openLootinModalSubscription = this.playerStateService.openLootingModal.subscribe((target: Character) => {
      this.openLootingModal(target);
    });
    // // Build the area
    this.prepareArea();

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Declare component loading complete
    setTimeout(() => {
      this.areaStateService.loadingArea = false;
    }, 0);
  }

  /**
   * Opens the looting component modal allowing manipulation of target's inventory
   * @param items The character we want to loot
   */
  private openLootingModal(target: Character) {
    if (!this.modalRef) {
      const modalConfig = new MatDialogConfig();

      modalConfig.disableClose = false;
      modalConfig.autoFocus = true; // Maybe not necessary
      modalConfig.hasBackdrop = true;
      modalConfig.width = '300px';
      modalConfig.height = '200px';
      modalConfig.data = target;
      modalConfig.panelClass = "looting-modal";


      this.modalRef = this.dialog.open(LootingModalComponent, modalConfig);

      this.modalRef.afterClosed().subscribe(returnData => {
        this.modalRef = null;
      });
    }
  }

  public getGridElementImageSource(gridElement: Character | GridObject) {
    return 'assets/images/elements/' + gridElement.imageFileName;
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
    if (character.type !== ElementClass.player) {
      return character.currentHp > 0 ? "" : "dead";
    }
  }

  public getCharacterType(gridCharacter: Character): ElementClass {
    return gridCharacter.type;
  }

  private prepareArea(): void {
    if (this.areaStateService.loadingExistingArea) {
      // Do nothing as area state service should be updating
      this.rebuildArea();
    } else {
      // get the config from the provider
      this.areaConfig = this.areaConfigProviderService.getAreaConfig(this.areaStateService.currentLocation);
      this.areaExits = this.areaConfigProviderService.getAreaExits(this.areaStateService.currentLocation);

      // Set the player location
      // TODO This won't work, needs moving into the loop with a check on player
      this.playerStateService.locationY = this.areaConfig.areaElements[0].startingPositionY;
      this.playerStateService.locationX = this.areaConfig.areaElements[0].startingPositionX;
      // Set the monsters
      this.addElementsToGrid(this.areaConfig.areaElements);
      this.addExitsToGrid(this.areaExits);
    }

    // If player is entering a new area we want to update the location to be opposite the way they came in
    if (this.areaStateService.loadingArea) {
      this.updatePlayerLocation();
    }
    this.areaStateService.loadingExistingArea = false;
  }

  private addElementsToGrid(elements: IAreaElement[]): void {
    elements.forEach(element => {
      // Check element's preferred grid reference and attempt to add it there
      const gridReference = element.startingPositionY + element.startingPositionX;
      if (!this.areaStateService.locations[gridReference].element) {
        // We want to create instances of each character in the config
        switch (element.type) {
          case ElementClass.enemy:
            this.areaStateService.locations[gridReference].element = new Enemy(element.elementProperties);
            break;
          case ElementClass.player:
            this.areaStateService.locations[gridReference].element = new Player(element.elementProperties);
            break;
          case ElementClass.npc:
            this.areaStateService.locations[gridReference].element = new NPC(element.elementProperties);
            break;
          case ElementClass.object:
            this.areaStateService.locations[gridReference].element = new GridObject(element.elementProperties);
            break;
          default:
            this.areaStateService.locations[gridReference].element = element;
        }
      } else {
        // TODO: Move them to another position, up to x amount (need to block overcrowding)
      }
    });
  }

  // TODO this seems like it's possibly unnecessary, look for a better way of doing this
  private rebuildArea(): void {
    for (const location in this.areaStateService.locations) {
      if (this.areaStateService.locations.hasOwnProperty(location) && this.areaStateService.locations[location].element) {
        // We want to create instances of each character in the config
        switch (this.areaStateService.locations[location].element.type) {
          case ElementClass.enemy:
            this.areaStateService.locations[location].element = new Enemy(this.areaStateService.locations[location].element);
            break;
          case ElementClass.player:
            this.areaStateService.locations[location].element = new Player(this.areaStateService.locations[location].element);
            break;
          case ElementClass.npc:
            this.areaStateService.locations[location].element = new NPC(this.areaStateService.locations[location].element);
            break;
          case ElementClass.object:
            this.areaStateService.locations[location].element = new GridObject(this.areaStateService.locations[location].element);
            break;
          default:
          // Do nothing
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

  private addExitsToGrid(areaExits: IAreaExits) {
    if (areaExits.north) {
      this.areaStateService.locations[defaults.areaExitLocations.northExit].exitDestination = areaExits.north;
    }
    if (areaExits.east) {
      this.areaStateService.locations[defaults.areaExitLocations.eastExit].exitDestination = areaExits.east;
    }
    if (areaExits.south) {
      this.areaStateService.locations[defaults.areaExitLocations.southExit].exitDestination = areaExits.south;
    }
    if (areaExits.west) {
      this.areaStateService.locations[defaults.areaExitLocations.westExit].exitDestination = areaExits.west;
    }
  }

  /**
   * Allows the area component to collect data from the level received by the router
   * @returns The details about the level
   */
  public getCurrentLevelData(): ILevelData {
    // TODO: Dummy return data for now
    return {
      name: "test level",
      width: 6,
      height: 6,
      type: AreaType.puzzle
    } as ILevelData;
  }

  public locationExit(location: string, gridObject: IGridData): string {
    for (const locationReference in defaults.areaExitLocations) {
      if (defaults.areaExitLocations.hasOwnProperty(locationReference) &&
        defaults.areaExitLocations[locationReference] === location &&
        gridObject.exitDestination
      ) {
        return locationReference;
      }
    }
    return "";
  }

  ngOnDestroy() {
    this.openLootinModalSubscription.unsubscribe();

    this.areaStateService.notifyAreaChange();
  }
}
