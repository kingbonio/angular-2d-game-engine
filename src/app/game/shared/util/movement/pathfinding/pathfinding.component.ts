import { Component } from '@angular/core';
import { IGridReferences } from '../../../../area/interfaces';
import { ILocation } from '../../../interfaces';
import { Direction } from '../../../enums';
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
     *
     * @param {ILocation} startLocation Source location as split location string
     * @param {ILocation} targetLocation Final location as split location string
     * @param {IGridReferences} locationSet The collection of grid references for the map
     *
     * @returns {string[]}
     */
    public getShortestPath(startLocation: ILocation, targetLocation: ILocation, locationSet: IGridReferences): string[] {

        const _frontierQueue = new PriorityQueue();
        const cameFrom = {};
        const costSoFar = {};

        // Add the priority of 0 to the start location
        const startLocationForPriorityQueue: any = startLocation;
        startLocationForPriorityQueue.priority = 0;

        // Set the initial starting location
        this._placeInQueue(_frontierQueue, startLocationForPriorityQueue);

        // Set the initial cost
        costSoFar[startLocation.locationY + startLocation.locationX] = 0;

        // Start cycling over the locations in the queue
        frontierLoop:
        while (_frontierQueue.size > 0) {

            // We want to give up trying if we've scanned the whole map and can't get to the target location
            if (_frontierQueue.size === 0) {
                break;
            }

            // Get the next location from the priority queue
            const current = this._getFromQueue(_frontierQueue);

            // We have found a path to the destination
            if (current.locationY + current.locationX === targetLocation.locationY + targetLocation.locationX) {
                break;
            }

            // Cycle over the current location's neighbours
            neighbourLoop:
            for (const direction in Direction) {
                if (Direction.hasOwnProperty(direction)) {

                    // Get the next locations
                    const nextLocation = GridHelper.getNextLocation(current.locationY, current.locationX, Direction[direction] as Direction, locationSet);

                    const nextLocationCoords = nextLocation.locationY + nextLocation.locationX;

                    // Break out if we've found the target
                    if (nextLocationCoords === targetLocation.locationY + targetLocation.locationX) {

                        // We now want to know which direction we came from to trace back
                        cameFrom[nextLocationCoords] = current.locationY + current.locationX;

                        break frontierLoop;
                    } else {

                        // Ignore any locations which are impassable
                        if (!nextLocation.isLocationFree) {
                            continue;
                        }

                        // For now we want to set the grid location weighting to 1
                        const newCost = costSoFar[current.locationY + current.locationX] + 1;

                        // We want to only check locations which are new or have a lower travel cost
                        if (typeof costSoFar[nextLocationCoords] === "undefined" || newCost < costSoFar[nextLocationCoords]) {

                            costSoFar[nextLocationCoords] = newCost;

                            // Add the item into the priority queue with priority based on A*
                            const priority = (newCost + this._heuristic(startLocation, nextLocation));

                            // We want to check this area soon, so add it to the queue
                            this._placeInQueue(_frontierQueue, {
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
        }

        return this._getPathBackwards(cameFrom, startLocation, targetLocation);
    }

    /**
     * Creates an ordered array of locations to work from the end goal to the starting location
     *
     * @param {Object} cameFrom The object containing all the locations mapped and their entry points
     * @param {ILocation} startLocation The location we want to work backwards to
     * @param {ILocation} targetLocation Final we need to get a path back from
     *
     * @returns {string[]}
     */
    private _getPathBackwards(cameFrom: any, startLocation: ILocation, targetLocation: ILocation): string[] {

        // Create the path backwards based on the cameFrom array
        const pathBackwards = [];

        let pathCurrent = targetLocation.locationY + targetLocation.locationX;

        // We only want to proceed if we managed to get to the target
        if (cameFrom[targetLocation.locationY + targetLocation.locationX]) {

            while (pathCurrent !== startLocation.locationY + startLocation.locationX) {
                pathBackwards.unshift(pathCurrent);
                pathCurrent = cameFrom[pathCurrent];
            }
        }

        return pathBackwards;
    }

    /**
     * Calculates the distance between two locations
     *
     * @param {ILocation} a The first location
     * @param {ILocation} b The final location to calculate distance to
     *
     * @returns {number}
     */
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

    /**
     * Places the item into the priority queue
     *
     * @param {PriorityQueue} queue The priority queue we're pushing in to
     * @param {any} item The item we are pushing into the queue
     */
    private _placeInQueue(queue: PriorityQueue, item: any): void {
        queue.push(item);
    }

    /**
     * Gets the last item in the Priority Queue
     *
     * @param {PriorityQueue} queue The queue we're getting the item from
     *
     * @returns {any}
     */
    private _getFromQueue(queue: PriorityQueue): any {

        return queue.pop();
    }
}
