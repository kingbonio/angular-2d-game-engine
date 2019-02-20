import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent implements OnInit {
  @ViewChild('componentHolder', { read: ViewContainerRef }) componentHolder: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public createComponent() {
  }

  ngOnInit() {
  }

}
