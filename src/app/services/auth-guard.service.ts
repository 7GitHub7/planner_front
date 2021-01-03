import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PlannerService } from './planner.service';
import { LocalStorageService } from './local-storage.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  subscription: Subscription;
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  logged: boolean;

  canActivate(): boolean {
    if (this.localStorageService.getUserIdFromLocalStorage() > 0) {
      this.logged = true;
    } else {
      this.logged = false;
      this.router.navigate(['login']);
    }
    return this.logged;
  }
}
