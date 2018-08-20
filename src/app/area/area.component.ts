import { Component, OnInit } from '@angular/core';
import { AreaStateService } from '../shared/services/area-state.service';
import { IInventoryItem, IMonster } from '../shared/interfaces';
import { IAreaElement, IGridReferences, IPuzzle } from './interfaces';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  private items: IInventoryItem[];
  private monsters: IMonster[];
  private puzzle: IPuzzle;
  private isStart: boolean;
  private isEnd: boolean;
  private locations: IGridReferences;

  constructor(public areaStateService: AreaStateService) {
    // TODO: Maybe we should have a generic area which has properties of
    // puzzle, enemy, design, potential items etc.
  }

  ngOnInit() {
    // Build the area
    // Set Items first

  }

  private addElementsToGrid(element: IAreaElement): void {
    // Check element's preferred grid reference and attempt to add it there
    const gridReference = element.startingPositionX + element.startingPositionY;
    if (!this.locations[gridReference]) {
      this.locations[gridReference] = element;
    } else {
      // TODO: Do something else ???
    }
  }

}
