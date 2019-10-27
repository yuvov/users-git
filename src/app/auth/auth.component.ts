import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signInForm: FormGroup;
  message: string = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSignIn(form: FormGroup) {

    this.authService.signInByEmail(form.value.email, form.value.password)
      .subscribe(
        (val) => {
          this.router.navigate([this.authService.redirectUrl]);
        },
        (err) => {
          this.message = err;
        }
      );

  }

  signInGit() {
    this.authService.signInGitHub()
      .subscribe(
        (val) => {
          this.router.navigate([this.authService.redirectUrl]);
        },
        (err) => {
          this.message = err;
        }
      );
  }

}
