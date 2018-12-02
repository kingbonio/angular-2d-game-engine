import defaults from '../../../shared/defaults';
import { Injectable } from '@angular/core';
import { Direction, InteractionTarget, ItemClass, Character } from '../enums';
import { IPlayerStateData, IInventoryItem } from '../interfaces';
import { AreaStateService } from './area-state.service';

@Injectable()
export class PlayerStateService {
  private _health: number;
  private _maxHealth: number;
  private _strength: number;
  private _dexterity: number;
  private _magicka: number;
  private _exp: number;
  private _locationX: number;
  private _locationY: string;
  private _direction: Direction;


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
    this._locationX = defaults.initialPlayerStats.locationX;
    this._locationY = defaults.initialPlayerStats.locationY;
    this._direction = defaults.initialPlayerStats.direction;
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

  get locationX() {
    return this._locationX;
  }

  set locationX(newLocationX) {
    this._locationX = newLocationX;
  }

  get locationY() {
    return this._locationY;
  }

  set locationY(newLocationY) {
    this._locationY = newLocationY;
  }

  get direction() {
    return this._direction;
  }

  set direction(newDirection) {
    this._direction = newDirection;
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
    // Attempt movement
    switch (direction) {
      case Direction.N:
        // Make sure the location isn't off the edge of the grid and get new reference
        const newLocationY = this.previousYReference(this.locationY);
        if (newLocationY && this.areaStateService.isLocationFree(newLocationY + this.locationX)) {
          // Update player state
          this.locationY = newLocationY;
          // Update area state
          this.areaStateService.movePlayer(newLocationY + this.locationX, this.locationY + this.locationX);
        }
      // TODO: notify player cannot move that way or silently fail
    }
    // Always update the facing direction
    this.direction = direction;
  }

  // TODO: Might want to move these somewhere more reusable
  private previousYReference(yReference: string | null): string {
    if (yReference === "a") {
      return null;
    }
    return String.fromCharCode(yReference.charCodeAt(0) - 1);
  }

  private nextYReference(yReference: string): string {
    if (yReference === "f") {
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
    if (xReference === 6) {
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
