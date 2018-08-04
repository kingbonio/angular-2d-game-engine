import { Component, OnInit } from '@angular/core';
import { Character } from '../shared/enums';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export abstract class CharacterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  abstract speak(text: string, character: Character);

}
