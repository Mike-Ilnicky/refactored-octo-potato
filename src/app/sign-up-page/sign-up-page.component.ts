import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  form: FormGroup =  new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
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
      ])
    })

    console.log(this.form);
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
          this.authFail = false;
          this.router.navigate(['/main-page']);
        } else {
          this.authFail = true;
          this.loading = false;
          this.err = resp;
          this.errMsg = resp.message;
        }
        // console.log(this._token);
      })

  }

}
