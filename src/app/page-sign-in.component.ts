import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './models/login';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.scss']
})
export class PageSignInComponent implements OnInit {

  email: string;
  password: string;
  login: Login = {
    email: '',
    password: '',
  };
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.email = '';
    this.password = '';

  }

  onSubmit() {
    this.authService.login(this.login)
      .then((res) => {
        this.router.navigate(['task']);
      })
      .catch((err) => {
        console.error(err);
        this.alertService.showErrorAlert('メールアドレスとパスワードに間違いがないか確認してください。');
      });
  }
}
