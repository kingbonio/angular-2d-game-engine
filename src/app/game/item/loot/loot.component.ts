import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../character-classes/character';
import { ILoot } from '../interfaces';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.scss']
})
export class LootComponent implements OnInit {
  @Input() character: Character;

  constructor() { }

  ngOnInit() {
  }

}
