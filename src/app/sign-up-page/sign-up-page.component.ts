import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {RequestsService} from "../services/requests.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})

export class SignUpPageComponent implements OnInit {
  auth = {};
  loading = false;
  err = '';
  errMsg = '';
  authFail: boolean = false;
  terms = false;

  form: FormGroup =  new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
  });

  constructor(
    private requests: RequestsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      terms: new FormControl(null, [Validators.required])
    },
      {validators: [this.checkPasswords, this.termsAndConditions]})

    console.log(this.form);
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  termsAndConditions: ValidatorFn = (group:AbstractControl): ValidationErrors | null => {
    let term = group.get('terms')?.value;
    return term === false ? { noTerms: true } : null
  }

  submit() {
    this.auth = {
      "username": this.form.get('username')?.value,
      "password": this.form.get('password')?.value
    }
    console.log(this.auth);
    this.loading = true;
    //
    this.requests.authSingUp(this.auth)
      .subscribe(resp => {
        if (resp.success) {
          // this._token = resp.token;
          this.requests._token = resp.token;
          this.requests.isAuth = true;
          this.authFail = false;
          this.router.navigate(['/main-page/product-list']);
        } else {
          this.authFail = true;
          this.loading = false;
          this.err = resp;
          this.errMsg = resp.message;
        }
      })
  }

  toggle(event: any) {
    event.preventDefault();
    this.terms = !this.terms;
  }
}
