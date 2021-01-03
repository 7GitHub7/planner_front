import { Component, OnInit } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
    private auth: AuthGuardService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.subscription = localStorageService.loginAnnounced$.subscribe(
      (currentUser) => {
        if (currentUser > 0) {
          this.currentUser = currentUser;
          this.router.navigate(['calendar'])
          this.toastr.success("Logged in successfully", "Login")
        }
        else {
          this.toastr.error("Incorrect e-mail or password", "Login failed")
        }
      }
    );

    this.subscription = localStorageService.logoutAnnounced$.subscribe(() => {
      this.currentUser = null;
      this.router.navigate(['login']);
      this.toastr.success("Logged out successfully", "Logout")
    }
    );
    //when the app refresh or initialized
    this.currentUser = JSON.parse(localStorage.getItem('local_user'));
  }

  ngOnInit(): void { }

  logout(): void {
    this.plannerService.logoutUser(this.currentUser).subscribe(() => {
      this.localStorageService.announceLogout();
    });
  }
}
