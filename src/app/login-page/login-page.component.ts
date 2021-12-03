import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestsService} from "../services/requests.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null),
  });

  _token = '';
  auth = {};
  err = '';
  errMsg = '';
  authFail: boolean = false;
  loading = false;

  constructor(
    private requests: RequestsService,
    private router: Router,
  ) {
  }

  onBlurMethod() {
    this.authFail = false;
  }

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
    this.requests.authSignIn(this.auth)
      .subscribe(resp => {
        if (resp.success) {
          this._token = resp.token;
          this.requests._token = resp.token;
          this.requests.isAuth = true;
          this.authFail = false;
          this.router.navigate(['/main-page/product-list']);
        } else {
          console.log(resp);
          this.authFail = true;
          this.loading = false;
          this.err = resp;
          this.errMsg = resp.message;
        }
        console.log(this._token);
      });
    console.log(this.form);
    console.log('submit!!');
  }
}
