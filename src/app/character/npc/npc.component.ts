import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../../shared/services/dialogue.service';
import { Character } from '../../shared/enums';
import { CharacterComponent } from '../character.component';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent extends CharacterComponent implements OnInit {

  constructor(private dialogueService: DialogueService) {
    super();
  }

  ngOnInit() {

  }

  /**
   * Request speech be shown on screen via dialogue service
   * @param text the speech to be displayed
   * @param character who is speaking for dialogue box styling
   */
  speak(text: string, character: Character) {
    this.dialogueService.displaySpeech({
      text,
      character
    });
  }

}
