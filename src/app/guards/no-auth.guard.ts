import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve) => {


      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {

        if (!auth) resolve(true);

        else {
          this.utilsSvc.routerLink('/index');
          resolve(false);
        }
      })
    });
  
  
  
  }
}