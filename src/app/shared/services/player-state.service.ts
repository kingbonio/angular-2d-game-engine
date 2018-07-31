import defaults from '../defaults';
import { Injectable } from '@angular/core';
import { Direction } from '../enums';

@Injectable()
export class PlayerStateService {
  private _health: number;
  private _maxHealth: number;
  private _strength: number;
  private _dexterity: number;
  private _magicka: number;
  private _exp: number;
  private _locationX: string;
  private _locationY: string;
  private _direction: Direction;


  constructor() {
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
}
