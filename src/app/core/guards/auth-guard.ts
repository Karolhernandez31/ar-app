import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authSrv: AuthService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const user = await this.authSrv.getCurrentUser();
    const uid = user?.uid;
    const url = state.url;

    if ((url === '/login' || url === '/register') && uid) {
      return this.router.parseUrl('/home');
    }

    if (!uid && url !== '/login' && url !== '/register') {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
