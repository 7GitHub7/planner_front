import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { PlannerService } from './planner.service';
import { LocalStorageService } from './local-storage.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  subscription: Subscription;
  constructor(private localStorageService: LocalStorageService) {}

  logged: boolean;

  canActivate(): boolean {
    if (this.localStorageService.getUserIdFromLocalStorage() > 0) {
      this.logged = true;
    } else {
      this.logged = false;
    }
    return this.logged;
  }
}
