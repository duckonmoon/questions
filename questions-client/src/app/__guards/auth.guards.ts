import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observer, Observable, Subject } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    userIsAliveObs: Subject<boolean>;

    eventTosubscribe(): Subject<boolean> {
        return this.userIsAliveObs;
    }


    constructor(private router: Router) {
        this.userIsAliveObs = new Subject<boolean>();
        this.userIsAliveObs.next(this.isActive());
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    isActive(): boolean {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return false;
    }

    next() {
        this.userIsAliveObs.next(this.isActive())
    }
}