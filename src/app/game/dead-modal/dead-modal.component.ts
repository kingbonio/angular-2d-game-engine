import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dead-modal',
  templateUrl: './dead-modal.component.html',
  styleUrls: ['./dead-modal.component.scss']
})
export class DeadModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public restartGame() {
    window.location.reload();
  }

}
