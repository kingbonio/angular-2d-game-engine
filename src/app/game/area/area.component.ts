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
  private locations: IGridReferences;
  private objectKeys: any;

  constructor(
    public areaStateService: AreaStateService,
    private route: ActivatedRoute,
    private areaConfigProvider: AreaConfigProviderService
  ) {
    this.locations = {
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      a5: null,
      a6: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      b5: null,
      b6: null,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      d1: null,
      d2: null,
      d3: null,
      d4: null,
      d5: null,
      d6: null,
      e1: null,
      e2: null,
      e3: null,
      e4: null,
      e5: null,
      e6: null,
      f1: null,
      f2: null,
      f3: null,
      f4: null,
      f5: null,
      f6: null,
    };
    this.objectKeys = Object.keys;
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
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

  private prepareArea(): void {
    // get the config from the provider
    this.areaConfig = this.areaConfigProvider.getConfig(this.areaStateService.currentLocation);
    // Set the monsters
    this.addElementsToGrid(this.areaConfig.default.areaElements);
  }

  private addElementsToGrid(elements: IAreaElement[]): void {
    elements.forEach(element => {
      // Check element's preferred grid reference and attempt to add it there
      const gridReference = element.startingPositionX + element.startingPositionY;
      if (!this.locations[gridReference]) {
        this.locations[gridReference] = element;
      } else {
        // TODO: Move them to another position, up to x amount (need to block overcrowding)
      }
    });
    console.log(this.locations);
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
