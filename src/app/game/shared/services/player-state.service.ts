import defaults from '../../../shared/defaults';
import { Injectable } from '@angular/core';
import { Direction, InteractionTarget, ItemClass, CharacterType } from '../enums';
import { IPlayerStateData, IInventoryItem } from '../interfaces';
import { AreaStateService } from './area-state.service';
import { IGridReferences } from '../../area/interfaces';

@Injectable()
export class PlayerStateService {
  private _health: number;
  private _maxHealth: number;
  private _strength: number;
  private _dexterity: number;
  private _magicka: number;
  private _exp: number;
  public locationX: number;
  public locationY: string;
  public direction: Direction = Direction.N;
  // public location: string;


  constructor(private areaStateService: AreaStateService) {
  }

  onInit() {
    // Pull defaults from defaults file and assign initial values
    this._health = defaults.initialPlayerStats.health;
    this._maxHealth = defaults.initialPlayerStats.maxHealth;
    this._strength = defaults.initialPlayerStats.strength;
    this._dexterity = defaults.initialPlayerStats.dexterity;
    this._magicka = defaults.initialPlayerStats.magicka;
    this._exp = defaults.initialPlayerStats.exp;
    this.direction = defaults.initialPlayerStats.direction;
  }

  get health() {
    return this._health;
  }

  set health(newHealth) {
    this._health = newHealth;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  set maxHealth(newMaxHealth) {
    this._maxHealth = newMaxHealth;
  }

  get strength() {
    return this._strength;
  }

  set strength(newStrength) {
    this._strength = newStrength;
  }

  get dexterity() {
    return this._dexterity;
  }

  set dexterity(newDexterity) {
    this._dexterity = newDexterity;
  }

  get magicka() {
    return this._magicka;
  }

  set magicka(newMagicka) {
    this._magicka = newMagicka;
  }

  get exp() {
    return this._exp;
  }

  set exp(newExp) {
    this._exp = newExp;
  }

  get inventoryCapacity() {
    return this._strength * defaults.playerMultiplyers.inventoryStorageMultiplyer;
  }

  get level() {
    return defaults.playerMultiplyers.levelCalculation(this.exp);
  }

  public itemTooHighLevel(item: IInventoryItem): boolean {
    return item.level > this.level;
  }

  /**
   * Return the player state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IPlayerStateData {
    return {
      health: this.health,
      maxHealth: this.maxHealth,
      strength: this.strength,
      dexterity: this.dexterity,
      magicka: this.magicka,
      exp: this.exp,
      locationX: this.locationX,
      locationY: this.locationY,
      direction: this.direction
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IPlayerStateData): void {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }

  /**
   * Attempts to move the character in a direction
   * @param direction The direction to attempt to move
   */
  public move(direction: Direction) {

    console.log(this.areaStateService.locations);

    const newLocation = this.getnextLocation(this.locationY + this.locationX, direction);

    // Update area state
    if (newLocation.locationX && newLocation.locationY) {
      this.areaStateService.moveCharacter(newLocation.locationY + newLocation.locationX, this.locationY + this.locationX);
    }

    this.locationY = newLocation.locationY;
    this.locationX = newLocation.locationX;
  }

  public changeDirection(direction: Direction) {
    this.direction = direction;
    console.log(this.direction);
  }

  // TODO Maybe update this location interface/enum
  private getnextLocation(location: string, direction: Direction): { locationY: string, locationX: number } | null {

    // Attempt movement
    let newLocationY;
    let newLocationX;
    switch (direction) {
      case Direction.N:
        newLocationY = this.previousYReference(this.locationY);
        newLocationX = this.locationX;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationY && this.areaStateService.isLocationFree(newLocationY + this.locationX)) {
          return { locationY: newLocationY, locationX: newLocationX };
        }
        return null;
      case Direction.E:
        newLocationX = this.nextXReference(this.locationX);
        newLocationY = this.locationY;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationX && this.areaStateService.isLocationFree(this.locationY + newLocationX)) {
          return { locationY: newLocationY, locationX: newLocationX };
        }
        return null;
      case Direction.S:
        newLocationY = this.nextYReference(this.locationY);
        newLocationX = this.locationX;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationY && this.areaStateService.isLocationFree(newLocationY + this.locationX)) {
          return { locationY: newLocationY, locationX: newLocationX };
        }
        return null;
      case Direction.W:
        newLocationX = this.previousXReference(this.locationX);
        newLocationY = this.locationY;
        // Make sure the location isn't off the edge of the grid and get new reference
        if (newLocationX && this.areaStateService.isLocationFree(this.locationY + newLocationX)) {
          return { locationY: newLocationY, locationX: newLocationX };
        }
        return null;
      default:
        return null;
    }
  }

  /**
   * Perform an attack in the direction player is facing
   */
  public attack() {

  }

  // TODO: Might want to move these somewhere more reusable
  private previousYReference(yReference: string | null): string {
    // TODO: Should really just check if it exists in grid somehow
    if (yReference === "a") {
      return null;
    }
    return String.fromCharCode(yReference.charCodeAt(0) - 1);
  }

  private nextYReference(yReference: string): string {
    if (yReference === "g") {
      return null;
    }
    return String.fromCharCode(yReference.charCodeAt(0) + 1);
  }

  private previousXReference(xReference: number): number {
    if (xReference === 1) {
      return null;
    }
    return xReference - 1;
  }

  private nextXReference(xReference: number): number {
    if (xReference === 7) {
      return null;
    }
    return xReference + 1;
  }

  /**
   * Checks if grid reference is empty
   */
  private isGridReferenceEmpty(gridReference) {

  }
}
