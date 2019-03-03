import { Component, OnInit } from '@angular/core';
import { Character } from '../../../character-classes/character';

@Component({
  selector: 'app-battle-calculator',
  template: ''
})
export class BattleCalculatorComponent {

  constructor() { }

  public isDead(hp: number): boolean {
    console.log("reducing da health", hp);
    return (hp <= 0);
  }

  // TODO This will include a lot of armour/weapon calculations
  public calculateDamage(target: Character): number {
    return 10;
  }

}
