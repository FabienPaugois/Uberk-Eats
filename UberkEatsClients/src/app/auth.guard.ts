import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
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
    if (user) {
      // Get user roles from jwt
      const userRole = this.parseJwt(this.clientsApiService.userAuth.jwtoken).role;
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(userRole) === -1) {
        // role not authorised so redirect to home page
        //this.router.navigate(['/']);
        window.alert("You cannot be here !")
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login-page']);
    return false;
  }

  getAccessibleRoutes(config: Route[], role: string): Route[] {
    return config.filter(route => route.data?.roles?.includes(role))
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
