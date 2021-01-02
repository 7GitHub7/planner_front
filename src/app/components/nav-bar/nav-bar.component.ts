import { Component, OnInit } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  subscription: Subscription;
  currentUser: number;
  constructor(
    private plannerService: PlannerService,
    private localStorageService: LocalStorageService,
    private auth: AuthGuardService
  ) {
    this.subscription = localStorageService.loginAnnounced$.subscribe(
      (currentUser) => {
        this.currentUser = currentUser;
      }
    );

    this.subscription = localStorageService.logoutAnnounced$.subscribe(
      (empty) => {
        this.currentUser = null;
      }
    );
    //when the app refresh or initialized
    this.currentUser = JSON.parse(localStorage.getItem('local_user'));
  }

  ngOnInit(): void {}

  logout(): void {
    this.plannerService.logoutUser(this.currentUser).subscribe(() => {
      console.log('logout');
      this.localStorageService.announceLogout();
    });
  }
}
