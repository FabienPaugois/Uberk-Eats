import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { ClientsApiService } from './services/clients-api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private clientsApiService: ClientsApiService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.clientsApiService.userAuth.user;
    const userRoles = this.parseJwt(this.clientsApiService.userAuth.jwtoken).role;
    if (user) {
      // check if route is restricted by role
      console.log(route.data.roles)
      console.log(userRoles)
      if (route.data.roles && route.data.roles.indexOf(userRoles) === -1) {
        // role not authorised so redirect to home page
        //this.router.navigate(['/']);
        window.alert("You cannot be here !")
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    )
    return JSON.parse(jsonPayload);
  }
}
