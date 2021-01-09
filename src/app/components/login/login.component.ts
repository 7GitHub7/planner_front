import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { PlannerService } from 'src/app/services/planner.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private plannerService: PlannerService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error("Incorrect e-mail or password", "Login failed");
      return;
    }
    const userToSave = new User();
    userToSave.email = this.loginForm.value.email;
    userToSave.password = this.loginForm.value.password;

    this.plannerService.loginUser(userToSave).subscribe((data: number) => {
      if (data) {
        return this.localStorageService.announceLogin(data);
      }
    });
  }
}
