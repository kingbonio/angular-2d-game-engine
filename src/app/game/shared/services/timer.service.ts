import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { timer } from 'rxjs/internal/observable/timer';
import { Observable } from 'rxjs/Observable';

import defaults from '../../../shared/defaults';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer: Observable<number>;
  private timerSubscriber: any;
  public counter: BehaviorSubject<number>;

  constructor() {
    this.counter = new BehaviorSubject(0);
    this.startCounter();
    this.timerSubscriber = this.timer.subscribe(value => {
      this.counter.next(value);
    });
  }

  private startCounter() {
    this.timer = timer(0, defaults.gameTimer);
  }

}
