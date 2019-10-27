import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {User} from './user';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url = state.url;
    return this.authService.user.pipe(
      take(1),
      map((user: User) => {
          if (!!user) {
            return true;
          } else {
            this.authService.redirectUrl = url;
            this.router.navigate(['/login']);
            return false;
          }
        }
      ));
  }
}
