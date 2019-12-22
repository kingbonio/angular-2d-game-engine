import { Component, OnInit } from '@angular/core';
import { IPathfindingLocation } from './interfaces';
import { IGridReferences } from '../../../../area/interfaces';
import { ILocation, ILocationData } from '../../../interfaces';
import { Direction } from '../../../enums';;
import { MovementComponent } from '../../../util/movement/movement.component';
import { AreaStateService } from '../../../services/area-state.service';
import { PriorityQueue } from '../../../../../shared/util/priority-queue';

@Component({
  selector: 'app-pathfinding',
  template: '',
})
export class PathfindingComponent {


  constructor(
    private areaStateService: AreaStateService,
    private movement: MovementComponent
  ) { }

  /**
   * Discovers and returns the best direction to the location from the source
   * @param startLocation Source location as split location string
   * @param targetLocation Final location as split location string
   * @param locationSet The collection of grid references for the map
   * @returns Path in an array
   */
  public getShortestPath(startLocation: ILocation, targetLocation: ILocation, locationSet: IGridReferences) {
    // const _frontierQueue = [];
    const _frontierQueue = new PriorityQueue();
    const cameFrom = {};
    const costSoFar = {};

    // TODO Remove this, it's cack
    if (!this.areaStateService.isLocationFree(targetLocation.locationY + targetLocation.locationX)) {
      return;
    }

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

      const current = this.getFromQueue(_frontierQueue);


      // We have found a path to the destination
      if (current.locationY + current.locationX === targetLocation.locationY + targetLocation.locationX) {
        break;
      }
      console.log(current.locationY + current.locationX);

      // Cycle over the neighbours
      for (const direction in Direction) {
        if (Direction.hasOwnProperty(direction)) {

          // Get the next locations
          const nextLocation = this.movement.getNextLocation(current.locationY, current.locationX, Direction[direction] as Direction);

          // TODO Handle inaccessible locations (come back to this)
          if (!nextLocation.isLocationFree) {
            continue;
          }

          const nextLocationCoords = nextLocation.locationY + nextLocation.locationX;

          // For now we want to set the grid location weighting to 1
          const newCost = costSoFar[current.locationY + current.locationX] + 1;

          console.log(nextLocation, nextLocation.isLocationFree);

          // We want to only check locations which are new or have a lower travel cost
          if (typeof costSoFar[nextLocationCoords] === "undefined" || newCost < costSoFar[nextLocationCoords]) {
            // if (typeof costSoFar[nextLocationCoords] === "undefined" || newCost < costSoFar[nextLocationCoords]) {

            costSoFar[nextLocationCoords] = newCost;

            // We need to apply the priority to the location for the Priority Queue
            const priority = newCost;

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

    const pathBackwards = [];

    let pathCurrent = targetLocation.locationY + targetLocation.locationX;

    // We only want to proceed if we managed to get to the target
    if (cameFrom[targetLocation.locationY + targetLocation.locationX]) {

      while (pathCurrent !== startLocation.locationY + startLocation.locationX) {
        pathBackwards.push(pathCurrent);
        pathCurrent = cameFrom[pathCurrent];
      }
      pathBackwards.push(startLocation.locationY + startLocation.locationX);

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

  private placeInQueue(queue: PriorityQueue, item: any) {
    queue.push(item);
  }

  private getFromQueue(queue: PriorityQueue): any {

    return queue.pop();

    // const selectedItem = queue.splice(0, 1);

    // return selectedItem[0];
  }




  public testPriorityQueue() {

    // const priorityQueue = new PriorityQueue();
    // priorityQueue.push({ name: "", priority: 7 });
    // priorityQueue.push({ name: "", priority: 4 });
    // priorityQueue.push({ name: "", priority: 1 });
    // priorityQueue.push({ name: "", priority: 8 });
    // priorityQueue.push({ name: "", priority: 4 });
    // priorityQueue.push({ name: "", priority: 2 });
    // priorityQueue.push({ name: "", priority: 4 });
    // priorityQueue.push({ name: "", priority: 2 });

    // const orderedQueue = [];

    // // // console.log(priorityQueue._heap);

    // // console.log(priorityQueue.pop());

    // while (priorityQueue.size !== 0) {
    //   orderedQueue.push(priorityQueue.pop());
    // }
    // console.log("Should be ordered:");
    // console.log(orderedQueue);
  }

}
