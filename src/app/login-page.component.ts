import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserManager } from "app/bl/user-manager";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  template: `
    <div class="ui vertical segment">
      <div class="ui container">
        <div class="ui compact padded segment" style="margin: 0 auto;">
          <div class="ui orange header">Login</div>
          <div class="ui divider"></div>
          <div class="ui negative message" *ngIf="error">
            <i class="close icon" (click)="error = null"></i>
            <div class="header">
              An Error has occured
            </div>
            <p>{{error.message}}</p>
          </div>
          <form class="ui form" [ngClass]="{loading: loading}" [formGroup]="heroForm" (ngSubmit)="onSubmit()" novalidate>
            <div class="field" [ngClass]="{error: formErrors.email}">
              <label *ngIf="!formErrors.email">
                Email
              </label>
              <label *ngIf="formErrors.email">
                {{formErrors.email}}
              </label>
              <input type="text" formControlName="email" size="40" placeholder="eg: john@example.com">
              
            </div>
            <div class="field" [ngClass]="{error: formErrors.password}">
              <label *ngIf="!formErrors.password">
                Password
              </label>
              <label *ngIf="formErrors.password">
                {{formErrors.password}}
              </label>
              <input type="password" formControlName="password" size="40" placeholder="eg: texas shuffle">
            </div>
            <button [disabled]="heroForm.pristine || heroForm.invalid" class="ui primary button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginPageComponent {
  error: Error;
  heroForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private userManager: UserManager, private router: Router) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.heroForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)] ],
      password: ['', [Validators.required] ],
    });

    this.heroForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.heroForm) { return; }
    const form = this.heroForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email is invalid',
    },
    'password': {
      'required': 'Password is required.',
    }
  };

  onSubmit(){
    this.loading = true;
    this.error = null;
    this.userManager
      .login(this.heroForm.value.email,this.heroForm.value.password)
      .then(x => this.router.navigateByUrl('/home'))
      .catch(e => this.error = e)
      .then(x => this.loading = false);
  }
}
