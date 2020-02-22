import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dead-modal',
  templateUrl: './dead-modal.component.html',
  styleUrls: ['./dead-modal.component.scss']
})
export class DeadModalComponent {

  constructor() { }

  public restartGame() {
    window.location.reload();
  }
}
