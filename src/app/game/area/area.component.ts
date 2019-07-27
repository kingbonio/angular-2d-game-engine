import { Component, OnInit } from '@angular/core';
import { IInventoryItem, IMonster } from '../shared/interfaces';
import { IAreaElement, IPuzzle } from './interfaces';
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

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  private areaConfig: any;
  private areaExits: any;
  private levelId: number;
  private items: IInventoryItem[];
  private monsters: IMonster[];
  private puzzle: IPuzzle;
  private isStart: boolean;
  private isEnd: boolean;
  public character = CharacterType;
  public direction = Direction;
  private modalRef: MatDialogRef<any>;
  public ElementClass = ElementClass;

  constructor(
    public areaStateService: AreaStateService,
    private route: ActivatedRoute,
    public areaConfigProviderService: AreaConfigProviderService,
    public playerStateService: PlayerStateService,
    public battleCalculatorService: BattleCalculatorService,
    private dialog: MatDialog,
  ) {
    this.playerStateService.openLootingModal.subscribe((target: Character) => {
      this.openLootingModal(target);
    });
  }

  ngOnInit() {
    // // Set the observable to see the level ID
    // this.route.paramMap.subscribe(
    //   paramMap => {
    //     // Convert from string to number with '+'
    //     this.levelId = +paramMap.get('id');
    //     // Update the current level
    //     // TODO: ^^^
    //   }
    // );
    // // Build the area
    // // Set Items first
    this.prepareArea();
    // TODO Event listener with handler openLootingModal()
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
    // get the config from the provider
    this.areaConfig = this.areaConfigProviderService.getConfig(this.areaStateService.currentLocation);
    this.areaExits = this.areaConfigProviderService.getAreaExits(this.areaStateService.currentLocation);
    // Set the player location
    // TODO This won't work, needs moving into the loop with a check on player
    this.playerStateService.locationY = this.areaConfig.areaElements[0].startingPositionY;
    this.playerStateService.locationX = this.areaConfig.areaElements[0].startingPositionX;
    this.areaStateService.room = this.areaConfig.room;
    // Set the monsters
    this.addElementsToGrid(this.areaConfig.areaElements);
    this.addExitsToGrid(this.areaExits);
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

  private addExitsToGrid(areaExits: IAreaExits) {
    if (areaExits.north) {
      this.areaStateService.locations["a4"].exitDestination = areaExits.north;
    }
    if (areaExits.east) {
      this.areaStateService.locations["d7"].exitDestination = areaExits.east;
    }
    if (areaExits.south) {
      this.areaStateService.locations["g4"].exitDestination = areaExits.south;
    }
    if (areaExits.west) {
      this.areaStateService.locations["d1"].exitDestination = areaExits.west;
    }
    console.log("YOU'RE LOADING THE MAP EXITS");
    console.log(this.areaStateService.locations);
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
}

// @Component({
//   selector: 'app-looting',
//   templateUrl: './looting-modal.component.html',
// })
// export class LootingModalComponent implements OnInit {
//   items: IInventoryItem[];

//   constructor(
//     private dialogRef: MatDialogRef<LootingModalComponent>,
//     @Inject(MAT_DIALOG_DATA) data,
//   ) {
//     this.items = data.loot;
//     // TODO Remove this
//     this.items.push(Weapons.basicKnife);
//   }

//   ngOnInit() {
//   }

// }

