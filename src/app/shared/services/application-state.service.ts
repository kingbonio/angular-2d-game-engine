import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApplicationStateService {

    public gameOpen = false;
    public loadingFromOutsideGame = false;
    public canAccessGame = false;

    constructor() { }
}
