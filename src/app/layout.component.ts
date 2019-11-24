import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.hideAlert();
  }

  pushLogin() {
    this.router.navigate(['sign-in']);
  }

  pushLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
