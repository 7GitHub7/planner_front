import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { PlannerService } from 'src/app/services/planner.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private plannerService: PlannerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastr.error("Enter the data correctly", "Registration failed")
      return;
    }
    const userToSave = new User();
    userToSave.name = this.registerForm.value.name;
    userToSave.surname = this.registerForm.value.surname;
    userToSave.email = this.registerForm.value.email;
    userToSave.password = this.registerForm.value.password;
    userToSave.permission = 'true'; //nie wiem do czego to permission mialo byc
    userToSave.groupid = 1;

    this.plannerService.registerUser(userToSave).subscribe(
      data => console.log(data),
      err => {
        if (err.status == 401) {
          this.toastr.error("The specified user already exists", "Registration failed")
        }
      },
      () => {
        this.toastr.success("Registration was successful", "Registration");
        this.router.navigate(['login']);
      }
    );
  }
}
