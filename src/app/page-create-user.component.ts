import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Login } from './models/login';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-create-user',
  templateUrl: './page-create-user.component.html',
  styleUrls: ['./page-create-user.component.scss']
})
export class PageCreateUserComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    name: ''
  };
  isSubmitted = false;

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['task']);
    }
  }

  onSubmit(params: Array<any>) {
    this.isSubmitted = true;
    for (const param of params) {
      if (param.invalid) {
        return;
      }
    }
    this.authService.signUp(this.user)
      .then(res => {
        const login: Login = {
          email: this.user.email,
          password: this.user.password
        };
        this.authService.login(login)
          .then(() => {
            this.alertService.showSuccessAlert('ユーザー作成が完了しました。', true);
            this.router.navigate(['task']);
          })
          .catch(err => {
            console.error(err);
            this.alertService.showErrorAlert('ログインに失敗しました。', true);
            this.router.navigate(['sign-in']);
          });
      })
      .catch(err => {
        if (err.status === 400) {
          this.alertService.showErrorAlert('パラメータを確認してください。');
        } else if (err.status === 409) {
          this.alertService.showErrorAlert('登録済みのメールアドレスです。');
        } else {
          this.alertService.showErrorAlert('ユーザー作成が失敗しました。');
        }
        console.error(err);
      });
  }

}
