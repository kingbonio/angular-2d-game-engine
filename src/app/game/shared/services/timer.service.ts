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

    /**
     * Starts counting the duration pulled from config
     */
    private startCounter(): void {
        this.timer = timer(0, defaults.gameTimer);
    }

    /**
     * Starts a timer inside a promise
     *
     * @param {number} timeToCount The time we're counting to in miliseconds
     *
     * @returns {Promise<any>}
     */
    public startTimer(timeToCount: number): Promise<any> {
        return new Promise((res, rej) => {
            return setTimeout(() => {
                res("inputUnpaused");
            }, timeToCount);
        });
    }
}
