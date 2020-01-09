import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from './models/login';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.scss']
})
export class PageSignInComponent implements OnInit {

  login: Login = {
    email: '',
    password: '',
  };

  private history: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['task']);
    }
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.history = params.history;
      }
    );
  }

  onSubmit() {
    this.authService.login(this.login)
      .then((res) => {
        this.router.navigate(this.history ? [this.history] : ['task']);
      })
      .catch((err) => {
        console.error(err);
        this.alertService.showErrorAlert('メールアドレスとパスワードに間違いがないか確認してください。');
      });
  }
}
