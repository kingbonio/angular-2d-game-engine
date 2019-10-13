import { Component, OnInit } from '@angular/core';
import { IPathfindingLocation } from './interfaces';
import { IGridReferences } from '../../../../area/interfaces';
import { ILocation, ILocationData } from '../../../interfaces';
import { Direction } from '../../../enums';
import { IGridData } from '../../../../area/interfaces/igrid-data';
import { MovementComponent } from '../../../util/movement/movement.component';
import { AreaStateService } from '../../../services/area-state.service';

@Component({
  selector: 'app-pathfinding',
  template: '',
})
export class PathfindingComponent implements OnInit {


  constructor(
    private movement: MovementComponent,
    private areaStateService: AreaStateService,
  ) { }

  ngOnInit() {
  }

  /**
   * Discovers and returns the best direction to the location from the source
   * @param startLocation Source location as split location string
   * @param targetLocation Final location as split location string
   * @param locationSet The collection of grid references for the map
   * @returns Path in an array
   */
  public getShortestPath(startLocation: ILocation, targetLocation: ILocation, locationSet: IGridReferences) {
    const _frontierQueue = [];
    const cameFrom = {};

    if (!this.areaStateService.isLocationFree(targetLocation.locationY + targetLocation.locationX)) {
      return;
    }

    // Set the initial starting location
    this.placeInQueue(_frontierQueue, startLocation);

    // Start cycling over the locations in the queue
    while (_frontierQueue.length) {
      const current = this.getFromQueue(_frontierQueue);
      if (current.locationY + current.locationX === targetLocation.locationY + targetLocation.locationX) {
        break;
      }

      // Cycle over the neighbours
      for (const direction in Direction) {
        if (Direction.hasOwnProperty(direction)) {
          const nextLocation = this.movement.getNextLocation(current.locationY, current.locationX, Direction[direction] as Direction);
          const nextLocationCoords = nextLocation.locationY + nextLocation.locationX;

          // We're only interested in taking an unobstructed path
          if (nextLocation.isLocationFree && typeof cameFrom[nextLocationCoords] === "undefined") {

            // We want to check this area soon, so add it to the queue
            this.placeInQueue(_frontierQueue, {
              locationY: nextLocation.locationY,
              locationX: nextLocation.locationX,
            });

            // We now want to know which direction we came from to trace back
            cameFrom[nextLocationCoords] = current.locationY + current.locationX;
          }
        }
      }
    }

    const pathBackwards = [];

    let pathCurrent = targetLocation.locationY + targetLocation.locationX;

    // We only want to proceed if we managed to get to the target
    if (cameFrom[targetLocation.locationY + targetLocation.locationX]) {

      while (pathCurrent !== startLocation.locationY + startLocation.locationX) {
        this.placeInQueue(pathBackwards, pathCurrent);
        pathCurrent = cameFrom[pathCurrent];
      }
      this.placeInQueue(pathBackwards, startLocation.locationY + startLocation.locationX);

      pathBackwards.reverse();
      console.log("came from: ", cameFrom);
      console.log("path: ", pathBackwards);
    }














    // frontier = PriorityQueue()
    // frontier.put(start, 0)
    // came_from = {}
    // cost_so_far = {}
    // came_from[start] = None
    // cost_so_far[start] = 0

    // while not frontier.empty():
    // current = frontier.get()

    // if current == goal:
    //   break

    // for next in graph.neighbors(current):
    //   new_cost = cost_so_far[current] + graph.cost(current, next)
    // if next not in cost_so_far or new_cost < cost_so_far[next]:
    // cost_so_far[next] = new_cost
    // priority = new_cost + heuristic(goal, next)
    // frontier.put(next, priority)
    // came_from[next] = current


    // def heuristic(a, b):
    // # Manhattan distance on a square grid
    // return abs(a.x - b.x) + abs(a.y - b.y)
  }

  private placeInQueue(queue: any[], item: any) {
    queue.push(item);
  }

  private getFromQueue(queue: any[]): any {
    const selectedItem = queue.splice(0, 1);

    return selectedItem[0];
  }

}
