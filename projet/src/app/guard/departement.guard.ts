import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'  // Angular sait injecter ce guard globalement
})

export class  departementGuard implements CanActivate{



  
  constructor(private authService: AuthService , private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAdmin())
      return true;
    else {
      this.router.navigate(['app-forbidden']);
      return false;
    }
  }

};
