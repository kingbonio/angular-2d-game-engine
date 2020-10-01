import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ApplicationStateService } from '../shared/services/application-state.service';

@Injectable({
    providedIn: 'root'
})
export class GameGuard implements CanActivate {

    constructor(
        public applicationStateService: ApplicationStateService,
        public router: Router
    ) {
    }
    /**
     * Determines if the game can be loaded
     *
     * @param {ActivatedRouteSnapshot} next Unused
     * @param {RouterStateSnapshot} state Unused
     *
     * @returns {boolean}
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.applicationStateService.canAccessGame) {

            return true;
        }

        this.router.navigate(['/']);

        return false;
    }
}
