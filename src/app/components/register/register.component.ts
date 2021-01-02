import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { PlannerService } from 'src/app/services/planner.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submit');

    const userToSave = new User();
    userToSave.name = this.registerForm.value.name;
    userToSave.surname = this.registerForm.value.surname;
    userToSave.email = this.registerForm.value.email;
    userToSave.password = this.registerForm.value.password;
    userToSave.permission = 'true'; //nie wiem do czego to permission mialo byc
    userToSave.groupid = 1;

    this.plannerService.registerUser(userToSave).subscribe((data) => {
      console.log(data);
    });
  }
}
