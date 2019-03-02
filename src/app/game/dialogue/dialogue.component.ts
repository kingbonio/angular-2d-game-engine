import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../shared/services/dialogue.service';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnInit {

  constructor(public dialogueService: DialogueService) { }

  ngOnInit() {
  }

}
