import { Component, OnInit } from '@angular/core';
import { IInventoryItem, IMonster } from '../shared/interfaces';
import { IAreaElement, IGridReferences, IPuzzle } from './interfaces';
import { copyConfig } from '@angular/router/src/config';
import { ILevelData } from './interfaces/ilevel-data';
import { AreaType } from './enums/area-type';
import { ActivatedRoute } from '@angular/router';
import { AreaStateService } from '../shared/services/area-state.service';
import { AreaConfigProviderService } from '../shared/services/area-config-provider.service';
import { IAreaConfig } from '../../game-config/interfaces';
import { CharacterType, Direction } from '../shared/enums';
import { PlayerStateService } from '../shared/services/player-state.service';
import { Enemy, NPC, Player } from '../character-classes/';
import { Character } from '../character-classes/character';
import { BattleCalculatorService } from '../shared/services/battle-calculator.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  private areaConfig: any;
  private levelId: number;
  private items: IInventoryItem[];
  private monsters: IMonster[];
  private puzzle: IPuzzle;
  private isStart: boolean;
  private isEnd: boolean;
  public character = CharacterType;
  public direction = Direction;

  constructor(
    public areaStateService: AreaStateService,
    private route: ActivatedRoute,
    private areaConfigProvider: AreaConfigProviderService,
    public playerStateService: PlayerStateService,
    public battleCalculatorService: BattleCalculatorService,
  ) {
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
  }

  public getDirectionClass(gridCharacter: Character) {
    // TODO this is proving strange, might want to come back to directions
    const isPlayer = (gridCharacter && gridCharacter.type === CharacterType.player);
    if (isPlayer) {
      return 'direction-' + this.playerStateService.direction;
    }
    return gridCharacter ? 'direction-' + gridCharacter.direction : "";
  }

  public getDeadClass(character: Character): string {
    if (character.type !== CharacterType.player) {
      return character.currentHp > 0 ? "" : "dead";
    }
  }

  public getCharacterType(gridCharacter: Character) {
    return gridCharacter.type;
  }

  private prepareArea(): void {
    // get the config from the provider
    this.areaConfig = this.areaConfigProvider.getConfig(this.areaStateService.currentLocation);
    // Set the player location
    // TODO This won't work, needs moving into the loop with a check on player
    this.playerStateService.locationY = this.areaConfig.default.areaElements[0].startingPositionY;
    this.playerStateService.locationX = this.areaConfig.default.areaElements[0].startingPositionX;
    // Set the monsters
    this.addElementsToGrid(this.areaConfig.default.areaElements);
  }

  private addElementsToGrid(elements: IAreaElement[]): void {
    elements.forEach(element => {
      // Check element's preferred grid reference and attempt to add it there
      const gridReference = element.startingPositionY + element.startingPositionX;
      if (!this.areaStateService.locations[gridReference]) {
        // We want to create instances of each character in the config
        switch (element.type) {
          case CharacterType.enemy:
            this.areaStateService.locations[gridReference] = new Enemy(element.elementClass);
            break;
          case CharacterType.player:
            this.areaStateService.locations[gridReference] = new Player(element.elementClass);
            break;
          case CharacterType.npc:
            this.areaStateService.locations[gridReference] = new NPC(element.elementClass);
            break;
          default:
            this.areaStateService.locations[gridReference] = element;
        }
      } else {
        // TODO: Move them to another position, up to x amount (need to block overcrowding)
      }
    });
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

}
