import { Component, OnInit } from '@angular/core';
import { IPathfindingLocation } from './interfaces';
import { IGridReferences } from '../../../../area/interfaces';
import { ILocation, ILocationData } from '../../../interfaces';
import { Direction } from '../../../enums';
import { MovementComponent } from '../../../util/movement/movement.component';
import { AreaStateService } from '../../../services/area-state.service';
import { PriorityQueue } from '../../../../../shared/util/priority-queue';
import { GridHelper } from '../../area/grid-helper';

@Component({
  selector: 'app-pathfinding',
  template: '',
})
export class PathfindingComponent {


  constructor() { }

  /**
   * Discovers and returns the best direction to the location from the source
   * @param startLocation Source location as split location string
   * @param targetLocation Final location as split location string
   * @param locationSet The collection of grid references for the map
   * @returns Path in an array
   */
  public getShortestPath(startLocation: ILocation, targetLocation: ILocation, locationSet: IGridReferences) {

    const _frontierQueue = new PriorityQueue();
    const cameFrom = {};
    const costSoFar = {};

    // Add the priority of 0 to the start location
    const startLocationForPriorityQueue: any = startLocation;
    startLocationForPriorityQueue.priority = 0;

    // Set the initial starting location
    this.placeInQueue(_frontierQueue, startLocationForPriorityQueue);

    // Set the initial cost
    costSoFar[startLocation.locationY + startLocation.locationX] = 0;

    // Start cycling over the locations in the queue
    while (_frontierQueue.size > 0) {

      // We want to give up trying if we've scanned the whole map and can't get to the target location
      if (_frontierQueue.size === 0) {
        console.log("Couldn't get to target");
        break;
      }

      // Get the next location from the priority queue
      const current = this.getFromQueue(_frontierQueue);

      // We have found a path to the destination
      if (current.locationY + current.locationX === targetLocation.locationY + targetLocation.locationX) {
        break;
      }

      // Cycle over the current location's neighbours
      for (const direction in Direction) {
        if (Direction.hasOwnProperty(direction)) {

          // Get the next locations
          const nextLocation = GridHelper.getNextLocation(current.locationY, current.locationX, Direction[direction] as Direction, locationSet);

          // Ignore any locations which are impassable
          if (!nextLocation.isLocationFree) {
            continue;
          }

          const nextLocationCoords = nextLocation.locationY + nextLocation.locationX;

          // For now we want to set the grid location weighting to 1
          const newCost = costSoFar[current.locationY + current.locationX] + 1;

          // We want to only check locations which are new or have a lower travel cost
          if (typeof costSoFar[nextLocationCoords] === "undefined" || newCost < costSoFar[nextLocationCoords]) {

            costSoFar[nextLocationCoords] = newCost;

            // Add the item into the priority queue with priority based on A*
            const priority = (newCost + this._heuristic(startLocation, nextLocation));

            // We want to check this area soon, so add it to the queue
            this.placeInQueue(_frontierQueue, {
              locationY: nextLocation.locationY,
              locationX: nextLocation.locationX,
              priority
            });

            // We now want to know which direction we came from to trace back
            cameFrom[nextLocationCoords] = current.locationY + current.locationX;
          }
        }
      }
    }

    return this._getPathBackwards(cameFrom, startLocation, targetLocation);

  }

  private _getPathBackwards(cameFrom: any, startLocation: ILocation, targetLocation: ILocation): any[] {

    // Create the path backwards based on the cameFrom array
    const pathBackwards = [];

    let pathCurrent = targetLocation.locationY + targetLocation.locationX;

    // We only want to proceed if we managed to get to the target
    if (cameFrom[targetLocation.locationY + targetLocation.locationX]) {

      while (pathCurrent !== startLocation.locationY + startLocation.locationX) {
        pathBackwards.push(pathCurrent);
        pathCurrent = cameFrom[pathCurrent];
      }
      // pathBackwards.push(startLocation.locationY + startLocation.locationX);

      pathBackwards.reverse();
      // console.log("came from: ", cameFrom);
      // console.log("path: ", pathBackwards);
    }

    return pathBackwards;
  }

  private _heuristic(a: ILocation, b: ILocation): number {
    const heuristicA = {
      x: a.locationX,
      y: GridHelper.getNumberFromYCoordinate(a.locationY)
    };

    const heuristicB = {
      x: b.locationX,
      y: GridHelper.getNumberFromYCoordinate(b.locationY)
    };

    return (heuristicA.x - heuristicB.x) + (heuristicA.y - heuristicB.y);
  }

  private placeInQueue(queue: PriorityQueue, item: any) {
    queue.push(item);
  }

  private getFromQueue(queue: PriorityQueue): any {

    return queue.pop();
  }




}
